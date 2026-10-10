import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Heart, Check } from 'lucide-react';

interface BestPairedWithProps {
  currentProduct?: Product | null;
  allProducts: Product[];
  pairedIds?: string[];
  onAddToBag: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const BestPairedWith: React.FC<BestPairedWithProps> = ({
  currentProduct,
  allProducts,
  pairedIds,
  onAddToBag,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Determine effective paired products
  const targetIds =
    pairedIds && pairedIds.length > 0
      ? pairedIds
      : currentProduct?.pairedProductIds || ['kundan-headband', 'kolhapuri-sandals', 'potli-bag'];

  const pairedProducts = allProducts.filter((p) =>
    targetIds.includes(p.id) && p.id !== currentProduct?.id
  );

  if (pairedProducts.length === 0) return null;

  return (
    <section className="w-full mt-10 pt-8 border-t border-[#E8DADD]">
      {/* Heading: Cormorant Garamond Bold */}
      <h3 className="font-serif font-bold text-[24px] sm:text-[28px] text-[#962949] tracking-tight mb-5">
        best paired with
      </h3>

      {/* Grid / Row of Paired items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {pairedProducts.map((item) => {
          const isWishlisted = wishlistIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="group flex flex-col bg-white border border-[#E8DADD] rounded-[6px] overflow-hidden hover:shadow-md hover:border-[#962949]/30 transition-all duration-300"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(item)}
                className="relative aspect-square w-full bg-[#FAF6F4] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Wishlist toggle icon */}
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

              {/* Item Info */}
              <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h4
                    onClick={() => onSelectProduct(item)}
                    className="font-serif font-bold text-[14.5px] sm:text-[15.5px] text-[#2B2224] group-hover:text-[#962949] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
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

                {/* Add to Bag Button */}
                <div className="mt-3 pt-2 border-t border-[#E8DADD]/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onAddToBag(item)}
                    className="w-full py-2 px-3 bg-[#FAF6F4] hover:bg-[#962949] text-[#962949] hover:text-white border border-[#E8DADD] hover:border-[#962949] rounded-[4px] text-[12px] font-bold uppercase tracking-[0.04em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
