import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import type { UserProfile } from '../types';
import { recordTransaction } from '../lib/hubStore';

interface PricingSectionProps {
  user: UserProfile | null;
  onOpenAuth: () => void;
  onPaymentSuccess: (txRef: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  user,
  onOpenAuth,
  onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const isSubscribed = user?.subscriptionStatus === 'active';

  const formatValidUntil = (validUntil: any) => {
    if (!validUntil) return '30 days from confirmation';
    try {
      if (typeof validUntil.toDate === 'function') {
        return validUntil.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      return new Date(validUntil).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '30 days from confirmation';
    }
  };

  const handleChapaPayment = async (forceSimulate = false) => {
    if (!user) {
      onOpenAuth();
      return;
    }

    setError(null);
    setCheckoutNotice(null);
    setLoading(true);

    try {
      const response = await fetch('/api/chapa/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          userId: user.uid,
          amount: 300,
          simulate: forceSimulate,
          returnUrl: `${window.location.origin}/?payment=success`
        })
      });

      const data = await response.json();

      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to initialize Chapa payment transaction.');
      }

      // If simulated / test mode, allow instant verification confirmation
      if (data.isSimulated) {
        setCheckoutNotice('Simulating Chapa Payment Confirmation for Ethiopian Birr (300 ETB)...');
        const verifyRes = await fetch(`/api/chapa/verify/${data.txRef}`);
        const verifyData = await verifyRes.json();
        
        if (verifyData.status === 'success') {
          recordTransaction({
            txRef: data.txRef,
            userId: user.uid,
            email: user.email || '',
            amount: 300,
            currency: 'ETB',
            status: 'success',
            createdAt: Date.now(),
            method: 'Chapa (Telebirr/Card)'
          });
          onPaymentSuccess(data.txRef);
          setCheckoutNotice('Payment confirmed! 30-Day OmniScope Access Activated.');
        } else {
          await fetch('/api/chapa/simulate-success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ txRef: data.txRef, userId: user.uid })
          });
          recordTransaction({
            txRef: data.txRef,
            userId: user.uid,
            email: user.email || '',
            amount: 300,
            currency: 'ETB',
            status: 'success',
            createdAt: Date.now(),
            method: 'Chapa Sandbox Simulator'
          });
          onPaymentSuccess(data.txRef);
          setCheckoutNotice('Subscription activated successfully via Chapa Gateway.');
        }
      } else if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error('Chapa Initialization Error:', err);
      setError(err.message || 'Payment initiation error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing-section" className="py-14 sm:py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Chapa ETB Payment Gateway</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Transparent Monthly Subscription
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Pay seamlessly using Telebirr, CBE Birr, Amole, or local Ethiopian debit and credit cards.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl bg-white border-2 border-blue-600 p-6 sm:p-8 shadow-sm">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-xs">
              All-Access Plan
            </div>

            {/* Plan Title & Price */}
            <div className="text-center pb-6 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Full Ethiopian Opportunity Ecosystem
              </span>
              <div className="mt-3 flex items-baseline justify-center gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  300
                </span>
                <span className="text-lg font-bold text-blue-600">ETB</span>
                <span className="text-xs sm:text-sm text-slate-500 font-medium ml-1">/ month</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Direct access to Omniscope Jobs now + priority entry for upcoming Tenders and Grants.
              </p>
            </div>

            {/* Notice / Feedback */}
            {checkoutNotice && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{checkoutNotice}</span>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Features List */}
            <div className="py-6 space-y-3.5">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Included in your subscription:
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-slate-900">[omniscope-jobs] Active Access:</strong> Verified listings, direct hiring contacts, and salary transparent filters.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-slate-900">All 4 Upcoming Hub Portals:</strong> Automatic VIP access to Tenders, Scholarships, Biz Guides & Macro Insights.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-slate-900">Single Sign-On (SSO):</strong> Sync your account across devices with persistent Google & Email credentials.
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong className="text-slate-900">Instant Verification:</strong> Real-time confirmation via Chapa webhooks with automated 30-day renewal tracking.
                </span>
              </div>
            </div>

            {/* Payment Method Badges */}
            <div className="py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <div className="text-[11px] text-slate-500 mb-2 flex items-center justify-between font-medium">
                <span>Supported Chapa payment channels:</span>
                <span className="text-blue-600 font-semibold">Chapa Verified</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white text-[11px] font-bold text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-xs">
                  <Smartphone className="w-3 h-3 text-emerald-600" />
                  Telebirr
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white text-[11px] font-bold text-slate-700 border border-slate-200 shadow-xs">
                  CBE Birr
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white text-[11px] font-bold text-slate-700 border border-slate-200 shadow-xs">
                  Amole
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white text-[11px] font-bold text-slate-700 border border-slate-200 flex items-center gap-1 shadow-xs">
                  <CreditCard className="w-3 h-3 text-blue-600" />
                  Visa / Mastercard
                </span>
              </div>
            </div>

            {/* Main Action Button */}
            {isSubscribed ? (
              <div className="space-y-2">
                <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscription Active (Valid until: {formatValidUntil(user?.validUntil)})</span>
                </div>
                <p className="text-center text-[11px] text-slate-500">
                  Your 30-day access is active. Launch any available application from your dashboard above.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  id="pay-chapa-btn"
                  onClick={() => handleChapaPayment(false)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connecting to Chapa (ETB)...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4 text-white" />
                      <span>Pay via Telebirr / Cards (Chapa)</span>
                    </>
                  )}
                </button>

                <button
                  id="simulate-chapa-btn"
                  onClick={() => handleChapaPayment(true)}
                  disabled={loading}
                  className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-medium transition cursor-pointer"
                >
                  ⚡ Sandbox Instant Test Mode (1-Click Activate 300 ETB)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
