import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // CRITICAL REQUIREMENT: "The checkbox should not be pre-selected, in accordance with the site's consent requirements."
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full py-8 md:py-12 lg:py-14 bg-[#F9D0D6]/25">
      <div className="max-w-[760px] mx-auto px-4 md:px-8 text-center">
        <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
          Exclusive Previews & Festive Curations
        </span>

        <h2 className="font-serif text-[32px] md:text-[40px] text-[#2B2224] font-medium tracking-tight mb-3">
          Join the Boota family
        </h2>

        <p className="text-[14px] md:text-[15px] text-[#6F6265] leading-relaxed mb-8 max-w-lg mx-auto">
          Be the first to explore seasonal handloom drops, private preview invitations, and thoughtful styling guides for your little ones.
        </p>

        {submitted ? (
          <div className="bg-[#FFFFFF] border border-[#962949]/30 rounded-[4px] p-6 max-w-md mx-auto shadow-sm text-center">
            <CheckCircle2 className="w-10 h-10 text-[#962949] mx-auto mb-2" />
            <h3 className="font-serif text-[18px] text-[#2B2224] font-medium mb-1">
              Welcome to Boota!
            </h3>
            <p className="text-[13px] text-[#6F6265]">
              Thank you for subscribing. We’ve sent a welcome token to{' '}
              <span className="font-medium text-[#2B2224]">{email}</span>.
              {whatsappOptIn && ' You will also receive gentle WhatsApp festive reminders.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            {/* Email and Subscribe input group */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-[#E8DADD] rounded-[4px] text-[#2B2224] placeholder-[#6F6265]/60 px-4 py-3 text-[14px] focus:outline-none focus:border-[#962949] shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#962949] hover:bg-[#80223d] text-white text-[13px] font-semibold tracking-[0.06em] uppercase rounded-[4px] shadow-sm transition-all duration-200 cursor-pointer flex-shrink-0"
              >
                Subscribe
              </button>
            </div>

            {/* Optional WhatsApp Opt-in Checkbox (NOT pre-selected) */}
            <div className="pt-2 text-left bg-white/70 border border-[#E8DADD]/80 rounded-[4px] p-3 text-[12.5px] text-[#55474B]">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="mt-0.5 rounded border-[#E8DADD] text-[#962949] focus:ring-[#962949]"
                />
                <div className="flex-1">
                  <span className="font-medium text-[#2B2224]">
                    Receive updates on WhatsApp (Optional)
                  </span>
                  <p className="text-[11.5px] text-[#6F6265] mt-0.5 leading-normal">
                    Get dispatch alerts, celebration previews, and size assistance on WhatsApp. You can opt out anytime.
                  </p>
                </div>
              </label>

              {whatsappOptIn && (
                <div className="mt-3 pt-2.5 border-t border-[#E8DADD]/60 animate-in fade-in duration-200">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit WhatsApp number (e.g. 9876543210)"
                    className="w-full bg-white border border-[#E8DADD] rounded-[4px] text-[#2B2224] px-3 py-2 text-[13px] focus:outline-none focus:border-[#962949]"
                  />
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
