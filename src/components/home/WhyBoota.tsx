import React from 'react';
import { Truck, Banknote, RefreshCw, ShieldCheck } from 'lucide-react';

export const WhyBoota: React.FC = () => {
  const trustPoints = [
    {
      icon: Truck,
      title: 'Prompt Delivery',
      desc: '3–5 business days dispatch with live tracking updates',
    },
    {
      icon: Banknote,
      title: 'Cash on Delivery',
      desc: 'COD available across 18,000+ pincodes across India',
    },
    {
      icon: RefreshCw,
      title: 'Easy 7-Day Exchange',
      desc: 'Doorstep size exchange pick-up with zero hassle',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Payments',
      desc: 'Bank-grade 256-bit encryption for UPI, Cards & Net Banking',
    },
  ];

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DADD]">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start space-x-4 pt-4 sm:pt-0 ${
                  index !== 0 ? 'sm:pl-6' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-[4px] bg-[#F9D0D6]/40 border border-[#E8DADD] text-[#962949] flex-shrink-0 flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="font-serif text-[17px] font-medium text-[#2B2224] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#6F6265] leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
