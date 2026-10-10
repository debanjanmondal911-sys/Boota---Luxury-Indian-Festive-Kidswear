import React from 'react';
import { productImages } from '../../assets/images';
import { ArrowRight } from 'lucide-react';

interface ShopByCollectionProps {
  onSelectCollection?: (collectionName: string) => void;
}

export const ShopByCollection: React.FC<ShopByCollectionProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'boota-desi',
      name: 'Boota Desi',
      tagline: 'Traditional Indian Ethnic Styles',
      description: 'Heritage angrakhas, hand-blocked bandhani ghararas & nostalgic festive silhouettes.',
      image: productImages.bandhani,
      badge: 'Heritage',
    },
    {
      id: 'boota-play',
      name: 'Boota Play',
      tagline: 'Playful & Modern Kidswear',
      description: 'Twirl-worthy peplums and easy-wear kurtis designed for uninhibited games and comfort.',
      image: productImages.sharara,
      badge: 'Everyday Twirls',
    },
    {
      id: 'boota-luxe',
      name: 'Boota Luxe',
      tagline: 'Premium & Luxury Collection',
      description: 'Opulent pure silks, hand-worked gota patti & heirloom zari brocades for wedding milestones.',
      image: productImages.front,
      badge: 'Heirloom Craft',
    },
  ];

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-1.5">
            Curated Universes
          </span>
          <h2 className="font-serif text-[28px] md:text-[34px] text-[#2B2224] font-medium tracking-tight mb-2">
            Shop by Collection
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] text-[#6F6265] leading-relaxed">
            From playful everyday festivities to regal wedding heirloom sets, explore Boota’s signature craftsmanship.
          </p>
        </div>

        {/* Refined Proportion Cards — reduced size, elegant portrait display */}
        <div className="max-w-[820px] md:max-w-[860px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 justify-center">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection && onSelectCollection(col.name)}
              className="group relative cursor-pointer overflow-hidden rounded-[8px] border border-[#E8DADD] bg-[#FAF6F4] transition-all duration-300 hover:shadow-lg hover:border-[#962949]/40 flex flex-col max-w-[260px] sm:max-w-none mx-auto w-full"
            >
              {/* Balanced Portrait Image Frame */}
              <div className="relative aspect-[4/5] max-h-[300px] md:max-h-[320px] w-full overflow-hidden bg-[#FAF6F4]">
                <img
                  src={col.image}
                  alt={`Boota ${col.name} collection`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Light ivory/white shade on the lower portion of the image behind the name */}
                <div className="absolute inset-x-0 bottom-0 pt-8 pb-3 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex flex-col items-center justify-end text-center transition-all duration-300">
                  <h3 className="font-serif font-bold text-[17px] sm:text-[18px] md:text-[20px] text-[#962949] tracking-tight leading-tight m-0 group-hover:scale-[1.02] transition-transform">
                    {col.name}
                  </h3>
                  <span className="text-[11px] sm:text-[11.5px] font-medium text-[#6F6265] tracking-wide mt-0.5 line-clamp-1">
                    {col.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
