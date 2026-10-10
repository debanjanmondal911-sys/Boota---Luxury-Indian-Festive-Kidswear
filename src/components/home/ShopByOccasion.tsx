import React, { useState } from 'react';
import { occasionsData } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

interface ShopByOccasionProps {
  onSelectOccasion?: (occasionTag: string) => void;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ onSelectOccasion }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredOccasions =
    activeFilter === 'All'
      ? occasionsData
      : occasionsData.filter((occ) => occ.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FFFDF9]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-1.5">
            Festive Celebrations
          </span>
          <h2 className="font-serif text-[28px] md:text-[34px] text-[#2B2224] font-medium tracking-tight mb-2">
            Shop by Occasion
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] text-[#6F6265] leading-relaxed">
            From sacred rituals and haldi laughter to grand wedding evenings, discover attire crafted for joyful memories.
          </p>

          {/* Seasonal Occasion Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-5">
            {['All', 'Wedding', 'Haldi', 'Sangeet', 'Baby ceremonies', 'Festive Celebrations'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-medium transition-colors cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#962949] text-white shadow-2xs'
                      : 'bg-white border border-[#E8DADD] text-[#2B2224] hover:border-[#962949] hover:text-[#962949]'
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* 6 Visual Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredOccasions.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ.tag)}
              className="group relative cursor-pointer overflow-hidden rounded-[6px] border border-[#E8DADD]/80 bg-white transition-all duration-300 hover:shadow-md hover:border-[#962949]/40 flex flex-col"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF6F4] relative">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Light ivory/white shade on the lower portion of each image behind the name */}
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-2.5 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <h3 className="font-serif font-bold text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#962949] tracking-tight leading-tight m-0">
                    {occ.title}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#962949] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
