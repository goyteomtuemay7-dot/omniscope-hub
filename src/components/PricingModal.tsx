import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Check
} from 'lucide-react';
import type { UserProfile, Language } from '../types';
import { recordTransaction } from '../lib/hubStore';
import { translations } from '../lib/i18n';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  currentLanguage: Language;
  onOpenAuth: () => void;
  onPaymentSuccess: (txRef: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  user,
  currentLanguage,
  onOpenAuth,
  onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const t = translations[currentLanguage];

  if (!isOpen) return null;

  const isSubscribed = user?.subscriptionStatus === 'active';

  const handleChapaPayment = async (forceSimulate = false) => {
    if (!user) {
      onClose();
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

      if (data.isSimulated) {
        setCheckoutNotice(t.pricingSimulatingNotice);
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
          setCheckoutNotice(t.pricingSuccessNotice);
          setTimeout(() => onClose(), 1500);
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
            method: 'Chapa Gateway'
          });
          onPaymentSuccess(data.txRef);
          setCheckoutNotice(t.pricingGatewayNotice);
          setTimeout(() => onClose(), 1500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden text-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.pricingTitle}</h3>
              <p className="text-xs text-slate-500">{t.pricingSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Price Tag */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-baseline justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900">{t.pricingTag}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">{t.pricingInterval}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white">
              {t.pricingPill}
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.pricingBenefit1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.pricingBenefit2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.pricingBenefit3}</span>
            </div>
          </div>

          {/* Feedback & status notices */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {checkoutNotice && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" />
              <span>{checkoutNotice}</span>
            </div>
          )}

          {/* Buttons */}
          {isSubscribed ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
              {t.pricingAlreadyActive}
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleChapaPayment(false)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{t.pricingPayBtn}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleChapaPayment(true)}
                disabled={loading}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
              >
                {t.pricingSimulateBtn}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
