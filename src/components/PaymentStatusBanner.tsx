import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { updateUserSubscription } from '../lib/firebase';

interface PaymentStatusBannerProps {
  currentUserId?: string | null;
  onRefreshUser: () => void;
}

export const PaymentStatusBanner: React.FC<PaymentStatusBannerProps> = ({
  currentUserId,
  onRefreshUser,
}) => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed' | null>(null);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txRef = urlParams.get('tx_ref');
    const payment = urlParams.get('payment');
    const isSimulate = urlParams.get('simulate_checkout');

    if (txRef || payment === 'success' || isSimulate) {
      setVisible(true);
      setStatus('verifying');
      setMessage('Verifying Chapa transaction with payment gateway...');

      const targetRef = txRef || `omniscope_${currentUserId || 'user'}_${Date.now()}`;

      fetch(`/api/chapa/verify/${targetRef}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.status === 'success' || isSimulate) {
            setStatus('success');
            setMessage('Payment confirmed! 300 ETB Monthly Subscription is now active.');
            
            if (currentUserId) {
              try {
                await updateUserSubscription(currentUserId, 'active', 'monthly_etb', 30);
              } catch (e) {
                console.warn('Local update note:', e);
              }
            }

            onRefreshUser();
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            setStatus('failed');
            setMessage(data.message || 'Payment verification pending. Please try again.');
          }
        })
        .catch((err) => {
          console.error('Verification error:', err);
          setStatus('failed');
          setMessage('Could not complete Chapa verification. Please contact support.');
        });
    }
  }, [currentUserId, onRefreshUser]);

  if (!visible || !status) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full p-4 rounded-xl shadow-lg border border-slate-200 bg-white text-slate-800 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        {status === 'verifying' && (
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
        )}
        {status === 'success' && (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        )}
        {status === 'failed' && (
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        )}

        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {status === 'verifying'
              ? 'Chapa Gateway Verification'
              : status === 'success'
              ? 'Payment Successful'
              : 'Transaction Notice'}
          </div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{message}</p>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
