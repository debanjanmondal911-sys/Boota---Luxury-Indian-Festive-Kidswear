import React, { useRef } from 'react';
import { Product } from '../../types';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  badgeText,
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onViewAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FAF6F4]/50 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-7 gap-4">
          <div>
            {badgeText && (
              <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
                {badgeText}
              </span>
            )}
            <h2 className="font-serif text-[28px] md:text-[34px] text-[#2B2224] font-medium tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[14px] text-[#6F6265] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Navigation Controls */}
          <div className="flex items-center space-x-3">
            {onViewAll && (
              <button
                onClick={onViewAll}
                className="text-[13px] font-semibold tracking-[0.04em] text-[#962949] hover:underline uppercase mr-3 cursor-pointer"
              >
                View All
              </button>
            )}
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-[#E8DADD] bg-white hover:bg-[#F9D0D6]/20 text-[#2B2224] hover:text-[#962949] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-[#E8DADD] bg-white hover:bg-[#F9D0D6]/20 text-[#2B2224] hover:text-[#962949] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Carousel Container (~4.5 cards visible on desktop, ~2.2 on mobile) */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 md:space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="flex-shrink-0 w-[44%] sm:w-[32%] md:w-[26%] lg:w-[21.5%] snap-start group cursor-pointer flex flex-col bg-white border border-[#E8DADD] rounded-[4px] overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#962949]/30"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/5] bg-[#FAF6F4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      loading="lazy"
                    />
                  )}

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-1 bg-[#962949] text-white text-[10.5px] font-semibold uppercase tracking-[0.06em] rounded-[2px] shadow-2xs">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-white text-[#962949] shadow-xs'
                        : 'bg-white/80 hover:bg-white text-[#2B2224] hover:text-[#962949]'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.8] ${
                        isWishlisted ? 'fill-[#962949]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Card Details */}
                <div className="p-3.5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#962949]/80 mb-1">
                      {product.collection}
                    </div>
                    <h3 className="font-serif text-[15px] font-medium text-[#2B2224] group-hover:text-[#962949] transition-colors line-clamp-1 mb-1.5">
                      {product.name}
                    </h3>

                    {/* Price and Discount */}
                    <div className="flex items-center space-x-2 text-[14px] mb-2.5">
                      <span className="font-semibold text-[#2B2224]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp > product.price && (
                        <>
                          <span className="text-[12.5px] text-[#6F6265] line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] font-medium text-[#962949]">
                            ({product.discountPercent}% OFF)
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Available Sizes List */}
                  <div className="pt-2 border-t border-[#E8DADD]/60 flex items-center gap-1 overflow-x-hidden text-[10.5px] text-[#6F6265]">
                    <span className="font-medium mr-0.5">Sizes:</span>
                    <span className="truncate">{product.sizes.join(', ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
