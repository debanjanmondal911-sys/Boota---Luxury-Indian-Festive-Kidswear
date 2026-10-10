import React, { useState } from 'react';
import { Gift, Check, Sparkles, Mail, Calendar, ShieldCheck, Heart } from 'lucide-react';

interface GiftCardPageProps {
  onNavigateHome: () => void;
  onAddToCart: (item: {
    id: string;
    name: string;
    collection: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
  showToast: (msg: string) => void;
}

export const GiftCardPage: React.FC<GiftCardPageProps> = ({
  onNavigateHome,
  onAddToCart,
  showToast,
}) => {
  const fixedAmounts = [1000, 2000, 5000];
  const [selectedAmount, setSelectedAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sendDate, setSendDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isPurchased, setIsPurchased] = useState(false);

  const effectiveAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleSelectFixed = (val: number) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes('@')) {
      showToast('Please enter a valid recipient email address');
      return;
    }
    if (effectiveAmount < 500) {
      showToast('Minimum gift card amount is ₹500');
      return;
    }

    setIsPurchased(true);
    showToast(`Added ₹${effectiveAmount.toLocaleString('en-IN')} Gift Card to bag!`);

    // Add to cart drawer
    onAddToCart({
      id: `gift-card-${Date.now()}`,
      name: `Boota Digital Gift Card (₹${effectiveAmount.toLocaleString('en-IN')})`,
      collection: 'Boota Gifting',
      color: 'Festive Gold & Maroon',
      size: 'Digital Delivery',
      price: effectiveAmount,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    });
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#2B2224]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8DADD] bg-[#FFFDF9]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-3.5">
          <nav className="flex items-center text-[13px] text-[#6F6265] space-x-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#962949] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#962949] font-medium">Gift Card</span>
          </nav>
        </div>
      </div>

      {/* Main Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="max-w-[700px] mx-auto text-center mb-12">
            <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
              The Gift of Choice
            </span>
            <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-4">
              Boota Digital Gift Card
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#6F6265] leading-[1.6]">
              Delight young parents with the freedom to select hand-finished silks and heirloom festives, delivered instantly via email with your bespoke blessings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Visual Card Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-[8px] p-7 sm:p-8 bg-gradient-to-br from-[#962949] via-[#80223C] to-[#5C162A] text-[#FFFFFF] shadow-md border border-[#F9D0D6]/30 overflow-hidden">
                {/* Background ornamental foil shimmer */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#F9D0D6]/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FFFFFF]/10 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-[230px] sm:h-[260px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif font-bold text-[28px] tracking-tight text-[#FFFFFF]">
                        Boota
                      </span>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#F9D0D6]">
                        Atelier Jaipur
                      </p>
                    </div>
                    <Gift className="w-6 h-6 text-[#F9D0D6]" />
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#F9D0D6]/80 block">
                      Gift Value
                    </span>
                    <span className="font-serif font-semibold text-[36px] sm:text-[42px] leading-none text-[#FFFFFF]">
                      ₹{effectiveAmount ? effectiveAmount.toLocaleString('en-IN') : '0'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#FFFFFF]/20 flex items-center justify-between text-[11.5px] text-[#F9D0D6]/90">
                    <span>
                      {recipientName ? `For: ${recipientName}` : 'Digital E-Gift Card'}
                    </span>
                    <span>Redeemable at checkout</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-[#FFFDF9] border border-[#E8DADD] p-5 rounded-[4px] space-y-3 text-[13.5px] text-[#6F6265]">
                <div className="flex items-center gap-2 text-[#2B2224] font-medium">
                  <Sparkles className="w-4 h-4 text-[#962949]" /> Instant digital delivery or scheduled date
                </div>
                <div className="flex items-center gap-2 text-[#2B2224] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#962949]" /> 1-year validity from date of issuance
                </div>
                <div className="flex items-center gap-2 text-[#2B2224] font-medium">
                  <Check className="w-4 h-4 text-[#962949]" /> Usable across all collections &amp; custom sizing
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8DADD] p-6 sm:p-8 rounded-[4px] shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Select Amount */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#2B2224] mb-2.5">
                    1. Select Gift Card Value *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {fixedAmounts.map((amt) => {
                      const isSelected = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleSelectFixed(amt)}
                          className={`py-3 px-4 rounded-[4px] font-serif text-[18px] sm:text-[20px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#962949] text-[#FFFFFF] border-2 border-[#962949] shadow-xs'
                              : 'bg-[#FFFDF9] text-[#2B2224] border border-[#E8DADD] hover:border-[#962949]'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3">
                    <label className="block text-[12.5px] text-[#6F6265] mb-1">
                      Or enter custom amount (Min. ₹500):
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-[#6F6265]">
                        ₹
                      </span>
                      <input
                        type="text"
                        placeholder="e.g. 7500"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className="w-full pl-8 pr-4 py-2.5 border border-[#E8DADD] rounded-[4px] text-[15px] focus:outline-none focus:border-[#962949] bg-[#FFFDF9]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Recipient Information */}
                <div className="space-y-4 pt-2 border-t border-[#E8DADD]/60">
                  <label className="block text-[14px] font-semibold text-[#2B2224]">
                    2. Recipient &amp; Personal Blessings
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#6F6265] mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        placeholder="Baby Ananya / Parents"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[15px] focus:outline-none focus:border-[#962949]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6F6265] mb-1">
                        Recipient Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="parent@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[15px] focus:outline-none focus:border-[#962949]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] text-[#6F6265] mb-1">
                        Your Name (Sender)
                      </label>
                      <input
                        type="text"
                        placeholder="Masi / Chachi / Grandparents"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[15px] focus:outline-none focus:border-[#962949]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-[#6F6265] mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        value={sendDate}
                        onChange={(e) => setSendDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[14px] focus:outline-none focus:border-[#962949]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] text-[#6F6265] mb-1">
                      Personal Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Wishing the little star joyful festive twirls and blessings on their special day!"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[14.5px] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#962949] hover:bg-[#7D223C] text-[#FFFFFF] text-[14px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    Purchase Gift Card • ₹{effectiveAmount.toLocaleString('en-IN')}
                  </button>
                  <p className="text-[12px] text-[#6F6265] text-center mt-2.5">
                    Redeemable during checkout on any order. No hidden convenience fees.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
