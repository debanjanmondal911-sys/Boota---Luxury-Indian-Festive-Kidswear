import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { brandStoryImage, productImages } from '../../assets/images';

interface BrandStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandStoryModal: React.FC<BrandStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#E8DADD] rounded-[6px] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6F6265] hover:text-[#2B2224] p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
          Rooted in Tradition
        </span>

        <h2 className="font-serif text-[30px] sm:text-[36px] text-[#2B2224] font-medium tracking-tight mb-4">
          The Boota Story
        </h2>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] mb-6 border border-[#E8DADD]">
          <img
            src={brandStoryImage}
            alt="Boota artisan workshop"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="space-y-4 text-[14.5px] text-[#55474B] leading-relaxed font-light">
          <p>
            Boota was founded on a simple realization: Indian festivals and weddings are the most joyful celebrations in a child’s life, yet traditional children’s wear is too often stiff, scratchy, and uncomfortable.
          </p>
          <p>
            We set out to reinvent festive dressing for little ones. Every silhouette in our atelier begins with heritage natural textiles — mulberry silks, airy Chanderi weaves, and unbleached organic mulmul.
          </p>
          <p>
            Our master artisans hand-finish each garment with delicate gota patti ribbons, authentic handloom brocades, and flat-felled soft seams with zero exposed synthetic thread against delicate skin.
          </p>
          <div className="p-4 bg-[#F9D0D6]/30 border border-[#E8DADD] rounded-[4px] text-[#962949] text-[14px] italic font-serif">
            “Because festive clothes should twirl, play, and run as freely as the children wearing them.”
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-[#E8DADD] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#962949] text-white text-[13px] font-semibold tracking-[0.06em] uppercase rounded-[4px] hover:bg-[#80223d] transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
