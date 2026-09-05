/**
 * Next.js API Route for Chapa Payment Checkout
 * Located at: /api/pay/route.js
 * 
 * Supports Next.js App Router (POST/GET) and standard Node/Pages router export.
 * Reads: process.env.CHAPA_SECRET_KEY
 */

export async function POST(request) {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { email, amount = 300, userId, returnUrl, simulate } = body;

    const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
    const hasValidKey = Boolean(
      chapaSecretKey &&
      chapaSecretKey.trim() !== '' &&
      !chapaSecretKey.includes('...')
    );

    if (!email || !userId) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Both email and userId are required to initialize Chapa payment.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const txRef = `omniscope_${userId}_${Date.now()}`;
    const appUrl = process.env.APP_URL || (typeof request.url === 'string' ? new URL(request.url).origin : 'http://localhost:3000');
    const callbackUrl = `${appUrl}/api/webhooks/chapa`;
    const finalReturnUrl = returnUrl || `${appUrl}/?payment=success&tx_ref=${txRef}`;

    // If sandbox / test simulation requested or no valid Chapa key is configured
    if (simulate || !hasValidKey) {
      return new Response(
        JSON.stringify({
          status: 'success',
          message: 'Transaction initialized successfully (Sandbox Simulation)',
          txRef,
          checkoutUrl: `${appUrl}/?simulate_checkout=true&tx_ref=${txRef}&amount=${amount}&email=${encodeURIComponent(email)}`,
          isSimulated: true
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Call live Chapa transaction initialize
    const chapaPayload = {
      amount: String(amount),
      currency: 'ETB',
      email,
      first_name: 'Omniscope',
      last_name: 'Member',
      tx_ref: txRef,
      callback_url: callbackUrl,
      return_url: finalReturnUrl,
      'customization[title]': 'Omniscope Hub Monthly Access',
      'customization[description]': 'Unlimited access to Ethiopian jobs, tenders & opportunity apps'
    };

    const chapaResponse = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${chapaSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chapaPayload)
    });

    const contentType = chapaResponse.headers.get('content-type') || '';
    if (!chapaResponse.ok || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Payment service endpoint not found or invalid API key.'
        }),
        {
          status: chapaResponse.status || 502,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const chapaData = await chapaResponse.json();

    if (chapaData.status !== 'success') {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: chapaData.message || 'Payment service endpoint not found or invalid API key.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        message: chapaData.message || 'Hosted Link generated',
        checkoutUrl: chapaData.data?.checkout_url,
        txRef,
        isSimulated: false
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('[Chapa route.js error]:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message || 'Payment service endpoint not found or invalid API key.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function GET(request) {
  const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
  const isConfigured = Boolean(
    chapaSecretKey &&
    chapaSecretKey.trim() !== '' &&
    !chapaSecretKey.includes('...')
  );

  return new Response(
    JSON.stringify({
      status: 'ok',
      endpoint: '/api/pay',
      configured: isConfigured,
      message: isConfigured ? 'Chapa API active' : 'Payment service endpoint not found or invalid API key.'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Next.js Pages router or standard Node.js handler export
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const fakeRequest = {
      json: async () => req.body,
      url: req.url
    };
    const response = await POST(fakeRequest);
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      endpoint: '/api/pay',
      configured: Boolean(process.env.CHAPA_SECRET_KEY)
    });
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).json({ status: 'error', message: `Method ${req.method} Not Allowed` });
}
