import React, { useRef } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';

interface SimilarStyleCarouselProps {
  currentProduct?: Product | null;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const SimilarStyleCarousel: React.FC<SimilarStyleCarouselProps> = ({
  currentProduct,
  allProducts,
  onSelectProduct,
  onAddToBag,
  onToggleWishlist,
  wishlistIds,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter similar products (same collection, category, or occasion, excluding current)
  const similarProducts = allProducts.filter((p) => {
    if (!currentProduct) return true;
    if (p.id === currentProduct.id) return false;
    const sameCollection = p.collection === currentProduct.collection;
    const sameCategory = p.category === currentProduct.category;
    const similarPrice = Math.abs(p.price - currentProduct.price) < 1500;
    return (sameCollection || sameCategory || similarPrice) && p.category !== 'Accessories';
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (similarProducts.length === 0) return null;

  return (
    <section className="w-full mt-14 pt-10 border-t border-[#E8DADD] pb-8">
      {/* Section Header with Left / Right Arrows */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif font-bold text-[24px] sm:text-[30px] text-[#962949] tracking-tight">
          similar style
        </h3>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-9 h-9 rounded-full border border-[#E8DADD] bg-white hover:bg-[#FAF6F4] text-[#2B2224] hover:text-[#962949] shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-9 h-9 rounded-full border border-[#E8DADD] bg-white hover:bg-[#FAF6F4] text-[#2B2224] hover:text-[#962949] shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 sm:space-x-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {similarProducts.map((item) => {
          const isWishlisted = wishlistIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-[200px] sm:w-[230px] md:w-[250px] snap-start bg-white border border-[#E8DADD] rounded-[6px] overflow-hidden hover:shadow-md hover:border-[#962949]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Photo */}
              <div
                onClick={() => onSelectProduct(item)}
                className="relative aspect-[4/5] w-full bg-[#FAF6F4] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {item.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#962949] text-white text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider rounded-[3px] shadow-2xs">
                    {item.badge}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#6F6265] hover:text-[#962949] transition-colors shadow-xs"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4
                    onClick={() => onSelectProduct(item)}
                    className="font-serif font-bold text-[15px] sm:text-[16px] text-[#2B2224] group-hover:text-[#962949] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-sans font-bold text-[14px] sm:text-[15px] text-[#962949]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.mrp && item.mrp > item.price && (
                      <span className="text-[12px] text-[#6F6265] line-through font-normal">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E8DADD]/60">
                  <button
                    type="button"
                    onClick={() => onAddToBag(item)}
                    className="w-full py-2 px-2 bg-[#FAF6F4] hover:bg-[#962949] text-[#962949] hover:text-white border border-[#E8DADD] hover:border-[#962949] rounded-[4px] text-[12px] font-bold uppercase tracking-[0.04em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
