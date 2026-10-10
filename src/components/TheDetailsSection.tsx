import React from 'react';
import { productImages } from '../assets/images';

interface DetailCard {
  id: string;
  bg: string;
  label: string;
  title: string;
  imageSrc?: string;
  alt: string;
}

const detailCards: DetailCard[] = [
  {
    id: 'cotton-lining',
    bg: '#F9D0D6',
    label: 'Detail photo · Soft cotton lining',
    title: 'Soft cotton lining',
    imageSrc: productImages.detail,
    alt: 'Soft breathable cotton lining detail',
  },
  {
    id: 'gota-work',
    bg: '#F9D0D6',
    label: 'Detail photo · Hand-finished gota work',
    title: 'Hand-finished gota work',
    imageSrc: productImages.flatlay,
    alt: 'Hand-finished gota work craftsmanship',
  },
  {
    id: 'comfort-fit',
    bg: '#F9D0D6',
    label: 'Detail photo · Comfort-first fit',
    title: 'Comfort-first fit',
    imageSrc: productImages.front,
    alt: 'Comfort-first festive fit for kids',
  },
];

export const TheDetailsSection: React.FC = () => {
  return (
    <section className="w-full py-14 lg:py-24 border-t border-[#E8DADD] bg-[#FFFDF9]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-[13px] uppercase tracking-[0.06em] font-medium text-[#962949] block mb-2">
            THE DETAILS
          </span>
          <h2 className="text-h2 mb-3 text-[#962949]">
            Made to twirl, play and celebrate
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6F6265] leading-[1.6]">
            Thoughtful details make this occasion piece feel special without getting in the way of
            being a child.
          </p>
        </div>

        {/* 3 Detail Cards Grid with 24px gutters (gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {detailCards.map((card) => (
            <div key={card.id} className="flex flex-col group cursor-pointer">
              {/* Photo Box with Soft Blush background, Soft Border, 4px border radius */}
              <div className="relative w-full aspect-[4/3] overflow-hidden flex items-end p-4 border border-[#E8DADD] rounded-[6px] bg-[#FAF6F4]">
                {card.imageSrc && (
                  <img
                    src={card.imageSrc}
                    alt={card.alt}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                )}

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Title below card: Cormorant Garamond Semibold (text-h3) */}
              <h3 className="text-h3 mt-3.5 text-[#2B2224] group-hover:text-[#962949] transition-colors">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
