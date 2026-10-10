import React from 'react';
import { productImages } from '../assets/images';
import { ArrowRight } from 'lucide-react';

export type NavTab = 'GIRL' | 'COLLECTION' | 'OCCASIONS' | 'ACCESSORIES' | 'SALE';

interface MegaMenuProps {
  activeTab: NavTab | null;
  onClose: () => void;
  onSelectCategory?: (category: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeTab,
  onClose,
  onSelectCategory,
}) => {
  if (!activeTab) return null;

  const handleItemClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E8DADD] shadow-lg z-40 transition-all duration-200"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-10">
        {/* TAB 1: GIRL */}
        {activeTab === 'GIRL' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 gap-y-8 lg:gap-y-10">
            {/* ROW 1 - Col 1: Boota Desi */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Desi
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#suit-sets"
                    onClick={(e) => handleItemClick(e, 'Suit Sets')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Suit Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#lehenga-sets"
                    onClick={(e) => handleItemClick(e, 'Lehenga Sets')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Lehenga Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#sharara-sets"
                    onClick={(e) => handleItemClick(e, 'Sharara Sets')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Sharara Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#anarkali-sets"
                    onClick={(e) => handleItemClick(e, 'Anarkalis')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Anarkali Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 2: Shop by Age */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Shop by Age
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#baby"
                    onClick={(e) => handleItemClick(e, '0-12M')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Baby (0–12 months)
                  </a>
                </li>
                <li>
                  <a
                    href="#toddler"
                    onClick={(e) => handleItemClick(e, '1-3Y')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Toddler (1–3 years)
                  </a>
                </li>
                <li>
                  <a
                    href="#kids"
                    onClick={(e) => handleItemClick(e, '3Y+')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Kids (3+ years)
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 3: Accessories */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Accessories
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#hair-accessories"
                    onClick={(e) => handleItemClick(e, 'Hair Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Hair Accessories
                  </a>
                </li>
                <li>
                  <a
                    href="#bangles"
                    onClick={(e) => handleItemClick(e, 'Bangles')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Bangles &amp; Bracelets
                  </a>
                </li>
                <li>
                  <a
                    href="#jewellery"
                    onClick={(e) => handleItemClick(e, 'Jewellery')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Jewellery
                  </a>
                </li>
                <li>
                  <a
                    href="#bags"
                    onClick={(e) => handleItemClick(e, 'Bags')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Bags &amp; Potlis
                  </a>
                </li>
                <li>
                  <a
                    href="#sale"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] font-medium transition-colors block leading-relaxed"
                  >
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 1: Boota Play */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Play
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#dresses"
                    onClick={(e) => handleItemClick(e, 'Dresses')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Dresses &amp; Frocks
                  </a>
                </li>
                <li>
                  <a
                    href="#top-sets"
                    onClick={(e) => handleItemClick(e, 'Top Sets')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Top &amp; Skirt Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#tops"
                    onClick={(e) => handleItemClick(e, 'Tops')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Tops &amp; Peplums
                  </a>
                </li>
                <li>
                  <a
                    href="#co-ords"
                    onClick={(e) => handleItemClick(e, 'Co-ords')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Co-ords &amp; Playwear
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 2: New Arrivals (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                New Arrivals
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'New Arrivals')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.front}
                  alt="New Arrivals - Gulnar Silk Lehenga"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Gulnar Silk Lehenga
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 2 - Col 3: Bestsellers (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Bestsellers
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Bestsellers')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.sharara}
                  alt="Bestsellers - Peach Chiffon Sharara"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Peach Chiffon Sharara
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COLLECTION */}
        {activeTab === 'COLLECTION' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 gap-y-8 lg:gap-y-10">
            {/* ROW 1 - Col 1: Boota Desi */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Desi
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#desi-suit-sets"
                    onClick={(e) => handleItemClick(e, 'Boota Desi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Traditional Suit Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#desi-lehenga-sets"
                    onClick={(e) => handleItemClick(e, 'Boota Desi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Heirloom Lehenga Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#desi-shararas"
                    onClick={(e) => handleItemClick(e, 'Boota Desi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Shararas &amp; Ghararas
                  </a>
                </li>
                <li>
                  <a
                    href="#desi-chanderi"
                    onClick={(e) => handleItemClick(e, 'Boota Desi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Pure Chanderi Edit
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 2: Boota Play */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Play
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#play-dresses"
                    onClick={(e) => handleItemClick(e, 'Boota Play')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Twirl Dresses &amp; Frocks
                  </a>
                </li>
                <li>
                  <a
                    href="#play-top-sets"
                    onClick={(e) => handleItemClick(e, 'Boota Play')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Everyday Top Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#play-coords"
                    onClick={(e) => handleItemClick(e, 'Boota Play')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Easy-twirl Co-ords
                  </a>
                </li>
                <li>
                  <a
                    href="#play-kurtis"
                    onClick={(e) => handleItemClick(e, 'Boota Play')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Cotton Tunics &amp; Kurtis
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 3: Boota Luxe */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Luxe
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#luxe-lehengas"
                    onClick={(e) => handleItemClick(e, 'Boota Luxe')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Grand Festive Lehengas
                  </a>
                </li>
                <li>
                  <a
                    href="#luxe-pure-silk"
                    onClick={(e) => handleItemClick(e, 'Boota Luxe')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Pure Silk Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#luxe-gota-patti"
                    onClick={(e) => handleItemClick(e, 'Boota Luxe')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Handcrafted Gota Patti
                  </a>
                </li>
                <li>
                  <a
                    href="#luxe-zari"
                    onClick={(e) => handleItemClick(e, 'Boota Luxe')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Heirloom Zari Brocades
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 1: Craft & Handlooms */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Craft &amp; Fabric
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#handloom-bandhani"
                    onClick={(e) => handleItemClick(e, 'Handloom')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Authentic Bandhani &amp; Leheriya
                  </a>
                </li>
                <li>
                  <a
                    href="#pure-silk-lining"
                    onClick={(e) => handleItemClick(e, 'Mulmul')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Breathable Mulmul Linings
                  </a>
                </li>
                <li>
                  <a
                    href="#pure-chanderi"
                    onClick={(e) => handleItemClick(e, 'Chanderi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Jaipur Hand-blocked Silks
                  </a>
                </li>
                <li>
                  <a
                    href="#seamless-linings"
                    onClick={(e) => handleItemClick(e, 'Soft Finish')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Irritation-free Seam Finish
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 2: New Arrivals (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                New Season Edit
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'New Arrivals')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.bandhani}
                  alt="Bandhani Kurta Gharara"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Bandhani Kurta Gharara
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 2 - Col 3: Boota Luxe Edit (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Boota Luxe Edit
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Boota Luxe')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.pattu}
                  alt="Royal Brocade Pattu"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Royal Brocade Pattu
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OCCASIONS */}
        {activeTab === 'OCCASIONS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 gap-y-8 lg:gap-y-10">
            {/* ROW 1 - Col 1: Baby Ceremonies */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Baby Ceremonies
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#baby-naming"
                    onClick={(e) => handleItemClick(e, 'Baby ceremonies')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Baby Welcome &amp; Naming
                  </a>
                </li>
                <li>
                  <a
                    href="#mundan"
                    onClick={(e) => handleItemClick(e, 'Baby ceremonies')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Head Shave: Mundan
                  </a>
                </li>
                <li>
                  <a
                    href="#annaprashan"
                    onClick={(e) => handleItemClick(e, 'Baby ceremonies')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    First Food: Annaprashan
                  </a>
                </li>
                <li>
                  <a
                    href="#cradle"
                    onClick={(e) => handleItemClick(e, 'Baby ceremonies')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Cradle Ceremony Ensembles
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 2: Wedding Celebrations */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Wedding Festivities
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#haldi"
                    onClick={(e) => handleItemClick(e, 'Haldi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Haldi Sunshine Outfits
                  </a>
                </li>
                <li>
                  <a
                    href="#mehendi"
                    onClick={(e) => handleItemClick(e, 'Wedding')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Mehendi Celebrations
                  </a>
                </li>
                <li>
                  <a
                    href="#sangeet"
                    onClick={(e) => handleItemClick(e, 'Sangeet')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Sangeet Twirls &amp; Reception
                  </a>
                </li>
                <li>
                  <a
                    href="#wedding"
                    onClick={(e) => handleItemClick(e, 'Wedding')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Grand Wedding Day Ensembles
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 3: Upcoming Festivals */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Festivals
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#diwali"
                    onClick={(e) => handleItemClick(e, 'Diwali')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Diwali Festive Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#navratri"
                    onClick={(e) => handleItemClick(e, 'Navratri')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Navratri &amp; Durga Puja
                  </a>
                </li>
                <li>
                  <a
                    href="#ganesh"
                    onClick={(e) => handleItemClick(e, 'Ganesh Chaturthi')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Ganesh Chaturthi
                  </a>
                </li>
                <li>
                  <a
                    href="#raksha-bandhan"
                    onClick={(e) => handleItemClick(e, 'Festive')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Raksha Bandhan Sibling Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 1: Milestones & Birthdays */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Milestones &amp; Birthdays
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#first-birthday"
                    onClick={(e) => handleItemClick(e, 'Festive Celebrations')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    First Birthday Twirls
                  </a>
                </li>
                <li>
                  <a
                    href="#cake-smash"
                    onClick={(e) => handleItemClick(e, 'Festive Celebrations')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Cake Smash Pure Cotton Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#family-portraits"
                    onClick={(e) => handleItemClick(e, 'Festive Celebrations')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Family Festive Portraits
                  </a>
                </li>
                <li>
                  <a
                    href="#gift-keepsakes"
                    onClick={(e) => handleItemClick(e, 'Festive Celebrations')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Ceremonial Blessing Gifts
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 2: The Festive Edit (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                The Festive Edit
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Festive Celebrations')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.detail}
                  alt="The Festive Edit - Handcrafted Gota Patti"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Handcrafted Gota Patti
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 2 - Col 3: Wedding Milestone Sets (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Wedding Milestone Sets
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Wedding')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.front}
                  alt="Wedding Milestone Sets - Gulnar Silk Lehenga"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Gulnar Silk Lehenga
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACCESSORIES */}
        {activeTab === 'ACCESSORIES' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 gap-y-8 lg:gap-y-10">
            {/* ROW 1 - Col 1: Baby Essentials */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Baby Essentials
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#swaddles"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Organic Cotton Swaddles
                  </a>
                </li>
                <li>
                  <a
                    href="#mustard-pillows"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Mustard Seed Pillows
                  </a>
                </li>
                <li>
                  <a
                    href="#soft-booties"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Soft Handloom Booties
                  </a>
                </li>
                <li>
                  <a
                    href="#soft-toys"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Handmade Rattle Toys
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 2: Girls Adornments */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Girls Adornments
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#hair-bows"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Handcrafted Hair Bows &amp; Clips
                  </a>
                </li>
                <li>
                  <a
                    href="#hairbands"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Embellished Festive Hairbands
                  </a>
                </li>
                <li>
                  <a
                    href="#potli-bags"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Embroidered Potli Bags
                  </a>
                </li>
                <li>
                  <a
                    href="#clutches"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Mini Handloom Clutches
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 3: Traditional Jewellery */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Traditional Jewellery
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#thread-bangles"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Silk Thread Bangles
                  </a>
                </li>
                <li>
                  <a
                    href="#maang-tikka"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Festive Maang Tikka
                  </a>
                </li>
                <li>
                  <a
                    href="#anklets"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Silver-toned Soft Anklets
                  </a>
                </li>
                <li>
                  <a
                    href="#brooches"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Heritage Festive Brooches
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 1: Gifts & Keepsakes */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Gifts &amp; Keepsakes
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#gift-trunks"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Heirloom Gift Trunks
                  </a>
                </li>
                <li>
                  <a
                    href="#blessing-sets"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Baby Blessing Keepsake Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#shagun"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Embroidered Shagun Envelopes
                  </a>
                </li>
                <li>
                  <a
                    href="#gift-card"
                    onClick={(e) => handleItemClick(e, 'Accessories')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Boota Festive Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 2: Hair Accessories (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Hair Accessories
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Accessories')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.flatlay}
                  alt="Handcrafted Accessories"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Festive Hair Adornments
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 2 - Col 3: Heirloom Accents (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Heirloom Accents
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Accessories')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.detail}
                  alt="Heirloom Bangles & Potlis"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Bangles &amp; Potli Sets
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SALE */}
        {activeTab === 'SALE' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 gap-y-8 lg:gap-y-10">
            {/* ROW 1 - Col 1: Festive Clearance */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Festive Clearance
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#sale-lehengas"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed font-medium text-[#962949]"
                  >
                    Festive Lehengas on Sale
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-shararas"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Sharara &amp; Kurta Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-anarkalis"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Anarkalis &amp; Festive Gowns
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-dupattas"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Handloom Silk Dupattas
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 2: Shop Sale by Age */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Shop Sale by Age
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#sale-baby"
                    onClick={(e) => handleItemClick(e, '0-12M')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Baby Sale (0–12 months)
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-toddler"
                    onClick={(e) => handleItemClick(e, '1-3Y')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Toddler Sale (1–3 years)
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-kids"
                    onClick={(e) => handleItemClick(e, '3Y+')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Kids Sale (3+ years)
                  </a>
                </li>
                <li>
                  <a
                    href="#last-chance"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed font-medium text-[#962949]"
                  >
                    Last Chance Sizes
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 1 - Col 3: Special Offers */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Special Offers
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#first-time-sale"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed font-medium text-[#962949]"
                  >
                    First Time on Sale
                  </a>
                </li>
                <li>
                  <a
                    href="#special-prices"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Special Festive Prices
                  </a>
                </li>
                <li>
                  <a
                    href="#bundle-offers"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Sibling Bundle Offers
                  </a>
                </li>
                <li>
                  <a
                    href="#seasonal-markdowms"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Seasonal Markdowns
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 1: Playwear Sale */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Everyday Playwear Sale
              </h4>
              <ul className="space-y-3 text-[15px] text-[#55474B]">
                <li>
                  <a
                    href="#sale-cotton-dresses"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Cotton Twirl Dresses
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-top-sets"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Top &amp; Skirt Sets
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-coords"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Easy-care Co-ords
                  </a>
                </li>
                <li>
                  <a
                    href="#sale-peplums"
                    onClick={(e) => handleItemClick(e, 'Sale')}
                    className="hover:text-[#962949] transition-colors block leading-relaxed"
                  >
                    Playwear Peplums &amp; Tops
                  </a>
                </li>
              </ul>
            </div>

            {/* ROW 2 - Col 2: The Sale Edit (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                The Sale Edit
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Sale')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.sharara}
                  alt="The Sale Edit"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Peach Chiffon Sharara
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Shop Sale</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* ROW 2 - Col 3: Curated Specials (photo) */}
            <div>
              <h4 className="font-serif font-bold text-[22px] md:text-[24px] text-[#962949] mb-4">
                Curated Specials
              </h4>
              <div
                onClick={(e) => handleItemClick(e, 'Sale')}
                className="group/photo relative w-full aspect-[16/10] rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <img
                  src={productImages.bandhani}
                  alt="Curated Specials"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-2.5 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex items-center justify-between">
                  <span className="font-serif font-bold text-[15px] sm:text-[16px] text-[#962949] tracking-tight">
                    Bandhani Gharara Set
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#962949] uppercase tracking-wide flex items-center gap-1 group-hover/photo:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
