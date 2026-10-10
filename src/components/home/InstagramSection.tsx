import React from 'react';
import { productImages } from '../../assets/images';
import { Instagram } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const instagramTiles = [
    {
      id: 'ig-1',
      image: productImages.front,
      caption: 'Twirls in Gulnar silk #BootaFestive',
    },
    {
      id: 'ig-2',
      image: productImages.sharara,
      caption: 'Pastel peach tissue details #BootaLuxe',
    },
    {
      id: 'ig-3',
      image: productImages.bandhani,
      caption: 'Sunshine yellow bandhani laughter #BootaDesi',
    },
    {
      id: 'ig-4',
      image: productImages.detail,
      caption: 'Intricate handmade gota patti ribboning #BootaCraft',
    },
    {
      id: 'ig-5',
      image: productImages.pattu,
      caption: 'Brocade heritage pattu pavada moments #BootaTradition',
    },
    {
      id: 'ig-6',
      image: productImages.flatlay,
      caption: 'Unboxing celebration-ready heirloom outfits #BootaUnboxing',
    },
  ];

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FFFFFF]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
            Social Community
          </span>
          <h2 className="font-serif text-[30px] md:text-[38px] text-[#2B2224] font-medium tracking-tight mb-3">
            Follow @boota
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6F6265] leading-relaxed mb-6">
            Tag us to be featured in our celebratory family gallery.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#962949] text-[#962949] hover:bg-[#962949] hover:text-white transition-all duration-200 text-[12.5px] font-semibold uppercase tracking-[0.06em] shadow-2xs"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @boota on Instagram</span>
          </a>
        </div>

        {/* 6 Tiles Grid: 6 tiles on Desktop, 2 x 3 on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {instagramTiles.map((tile) => (
            <div
              key={tile.id}
              className="group relative aspect-square overflow-hidden rounded-[4px] border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer"
            >
              <img
                src={tile.image}
                alt={tile.caption}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#2B2224]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 stroke-[1.8] drop-shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
