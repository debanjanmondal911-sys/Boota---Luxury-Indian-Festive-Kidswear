import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Order, ReturnExchangeRequest } from '../types/account';

interface ReturnsExchangesPageProps {
  allOrders: Order[];
  onStartReturnModal: (order?: Order) => void;
  onNavigateHome: () => void;
}

export const ReturnsExchangesPage: React.FC<ReturnsExchangesPageProps> = ({
  allOrders,
  onStartReturnModal,
  onNavigateHome,
}) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.replace(/\D/g, '');

    const found = allOrders.find(
      (o) =>
        o.orderNumber.toUpperCase().includes(cleanNum) ||
        cleanNum.includes(o.orderNumber.toUpperCase())
    );

    if (found) {
      onStartReturnModal(found);
    } else {
      setErrorMsg(
        'Order not found. Please verify your order number and phone number, or try sample order BT-2026-9042.'
      );
    }
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#FAF6F4] border-b border-[#E8DADD] py-12 md:py-16">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#962949] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 2-Minute Parent Self-Service
          </span>
          <h1 className="font-serif text-[32px] md:text-[44px] font-semibold text-[#2B2224] tracking-tight">
            Return &amp; Exchange Concierge
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#6F6265] max-w-xl mx-auto leading-relaxed">
            Need a larger size for your growing child or wish to return an unworn festive set? Complete the entire process online in under 2 minutes without phone calls.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-6 pt-10">
        {/* Quick Lookup Card */}
        <div className="max-w-xl mx-auto bg-white border border-[#E8DADD] rounded-[6px] shadow-sm p-6 sm:p-8 -mt-16 relative z-10 space-y-5">
          <div className="text-center pb-2">
            <h2 className="font-serif text-[22px] font-semibold text-[#2B2224]">
              Start Your Request Instantly
            </h2>
            <p className="text-[12.5px] text-[#6F6265] mt-1">
              Enter order credentials below to choose your replacement size or return.
            </p>
          </div>

          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-[12px] uppercase font-semibold text-[#2B2224] mb-1">
                Order Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BT-2026-9042"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
              />
              <span className="text-[11.5px] text-[#6F6265] mt-1 block">
                Sample order ready for test: <strong className="text-[#962949]">BT-2026-9042</strong>
              </span>
            </div>

            <div>
              <label className="block text-[12px] uppercase font-semibold text-[#2B2224] mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
              />
            </div>

            {errorMsg && (
              <div className="bg-[#FDEDED] border border-[#F8B4B4] text-[#B71C1C] p-3 rounded-[4px] text-[12.5px]">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              Open Return / Exchange Form <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#E8DADD]/60 text-[12px] text-[#6F6265]">
            Already signed in?{' '}
            <button
              onClick={() => onStartReturnModal()}
              className="text-[#962949] font-semibold hover:underline cursor-pointer"
            >
              Open from Account Dashboard
            </button>
          </div>
        </div>

        {/* 3 Pillars of Boota Parent Care */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-14">
          <div className="p-6 bg-white border border-[#E8DADD] rounded-[6px] space-y-2.5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9FA] text-[#962949] flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-serif font-semibold text-[18px] text-[#2B2224]">
              100% Free Size Swap
            </h3>
            <p className="text-[13px] text-[#6F6265] leading-relaxed">
              Kids grow fast! If the kurti or lehenga is a snug fit, exchange for the next size with complimentary doorstep pickup.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8DADD] rounded-[6px] space-y-2.5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9FA] text-[#962949] flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-serif font-semibold text-[18px] text-[#2B2224]">
              Doorstep Express Pickup
            </h3>
            <p className="text-[13px] text-[#6F6265] leading-relaxed">
              Our courier executive arrives at your home with a tamper-proof bag. No packaging or printing labels required on your end.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E8DADD] rounded-[6px] space-y-2.5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FFF9FA] text-[#962949] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-serif font-semibold text-[18px] text-[#2B2224]">
              Instant Source Refund
            </h3>
            <p className="text-[13px] text-[#6F6265] leading-relaxed">
              Automatic refund directly to your original UPI or Card account, or instant Boota Store Credit with an extra 5% bonus credit.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-14 space-y-6">
          <h2 className="font-serif text-[24px] font-semibold text-[#2B2224] text-center">
            Frequently Asked Parent Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-[#E8DADD] rounded-[6px] space-y-1.5">
              <h4 className="font-semibold text-[15px] text-[#2B2224]">
                What is the return and exchange window?
              </h4>
              <p className="text-[13px] text-[#6F6265] leading-relaxed">
                You have 7 days from the delivery date to initiate a self-service exchange or return. Outfits must have intact tags and remain unworn.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E8DADD] rounded-[6px] space-y-1.5">
              <h4 className="font-semibold text-[15px] text-[#2B2224]">
                How does Cash on Delivery (COD) refund work?
              </h4>
              <p className="text-[13px] text-[#6F6265] leading-relaxed">
                For COD orders, you can simply provide your Bank Account (IFSC &amp; Account Number) during the 2-minute request form, or choose Instant Store Credit (+5% bonus).
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E8DADD] rounded-[6px] space-y-1.5">
              <h4 className="font-semibold text-[15px] text-[#2B2224]">
                How soon will the replacement size arrive?
              </h4>
              <p className="text-[13px] text-[#6F6265] leading-relaxed">
                As soon as your reverse pickup is scanned by the courier partner, our Jaipur atelier dispatches the new requested size via BlueDart Express (2-4 business days).
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E8DADD] rounded-[6px] space-y-1.5">
              <h4 className="font-semibold text-[15px] text-[#2B2224]">
                Can I cancel an order before it ships?
              </h4>
              <p className="text-[13px] text-[#6F6265] leading-relaxed">
                Yes! From your Order Details page, click "Cancel Order" anytime while the status is "Confirmed" (before packing starts). 100% refund is automatically initiated.
              </p>
            </div>
          </div>

          {/* Need help bar */}
          <div className="mt-8 p-6 bg-[#FAF6F4] border border-[#E8DADD] rounded-[6px] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-serif font-semibold text-[18px] text-[#2B2224]">
                Prefer to chat with our Parent Concierge?
              </h4>
              <p className="text-[13px] text-[#6F6265] mt-0.5">
                Our Jaipur atelier stylists are available Monday to Saturday, 10 AM to 7 PM IST.
              </p>
            </div>
            <a
              href="https://wa.me/917291947002?text=Hi%20Boota%20Concierge,%20I%20need%20help%20with%20a%20return%20or%20exchange."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-[13px] rounded-[4px] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
