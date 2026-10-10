import React from 'react';
import {
  X,
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Sparkles,
  User,
} from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenAccountWishlist?: () => void;
  onExploreCollections?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveItem,
  onAddToCart,
  onSelectProduct,
  onOpenAccountWishlist,
  onExploreCollections,
}) => {
  if (!isOpen) return null;

  const handleMoveAllToBag = () => {
    products.forEach((p) => {
      const defaultSize = p.sizes?.[0] || '1-2 Y';
      const defaultColor = p.color || 'Pink';
      onAddToCart(p, defaultSize, defaultColor);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-manrope">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#2B2224]/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E8DADD] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DADD] flex items-center justify-between bg-[#FFFFFF] sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF6F4] border border-[#E8DADD] flex items-center justify-center text-[#962949]">
                <Heart className="w-4 h-4 fill-[#962949] stroke-[1.8]" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-[19px] sm:text-[21px] text-[#962949] leading-tight">
                  Saved Wishlist
                </h2>
                <span className="text-[12px] text-[#6F6265]">
                  {products.length} {products.length === 1 ? 'item' : 'items'} saved
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6265] hover:text-[#962949] hover:bg-[#FAF6F4] rounded-full transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader banner */}
          <div className="bg-[#FAF6F4] px-5 py-2.5 border-b border-[#E8DADD]/70 flex items-center justify-between text-[12px] text-[#6F6265]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#962949]" />
              <span>Heirloom celebrations &amp; milestone wear</span>
            </span>
            {onOpenAccountWishlist && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAccountWishlist();
                }}
                className="text-[#962949] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <span>My Account</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {products.length === 0 ? (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FDF8EE] border border-[#E8DADD] flex items-center justify-center text-[#962949] shadow-2xs">
                  <Heart className="w-8 h-8 text-[#962949] stroke-[1.5]" />
                </div>
                <div className="space-y-1.5 max-w-xs">
                  <h3 className="font-serif text-[20px] font-bold text-[#2B2224]">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-[13px] text-[#6F6265] leading-relaxed">
                    Click the heart icon on any celebratory outfit, twirl lehenga, or handcrafted accessory to save it here.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onExploreCollections) onExploreCollections();
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#962949] hover:bg-[#7D223C] text-white text-[13px] font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Outfits</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 divide-y divide-[#E8DADD]/60">
                {products.map((item) => {
                  const defaultSize = item.sizes?.[0] || '1-2 Y';
                  const defaultColor = item.color || 'Pink';

                  return (
                    <div
                      key={item.id}
                      className="pt-3.5 first:pt-0 flex gap-3.5 items-start group"
                    >
                      {/* Thumbnail Image */}
                      <div
                        onClick={() => {
                          onSelectProduct(item);
                          onClose();
                        }}
                        className="relative w-20 h-26 sm:w-22 sm:h-28 rounded-[4px] overflow-hidden bg-[#FAF6F4] border border-[#E8DADD] shrink-0 cursor-pointer group-hover:opacity-95 transition-opacity"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.badge && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#962949] text-white text-[9px] font-bold rounded-[2px] leading-none uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              onClick={() => {
                                onSelectProduct(item);
                                onClose();
                              }}
                              className="font-medium text-[14px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer truncate"
                              title={item.name}
                            >
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-[#6F6265] hover:text-[#B71C1C] rounded-full transition-colors cursor-pointer shrink-0"
                              title="Remove from wishlist"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-[12px] text-[#6F6265] flex items-center gap-2 mt-0.5">
                            <span>{item.collection || 'Boota Edition'}</span>
                            {item.color && (
                              <>
                                <span>•</span>
                                <span>{item.color}</span>
                              </>
                            )}
                          </div>

                          {/* Pricing */}
                          <div className="flex items-baseline gap-2 mt-1.5">
                            <span className="font-serif font-bold text-[16px] text-[#962949]">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            {item.mrp && item.mrp > item.price && (
                              <span className="text-[12px] text-[#A09598] line-through">
                                ₹{item.mrp.toLocaleString('en-IN')}
                              </span>
                            )}
                            {item.discountPercent ? (
                              <span className="text-[10px] font-bold text-[#962949] bg-[#962949]/10 px-1.5 py-0.5 rounded-[2px]">
                                {item.discountPercent}% OFF
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="mt-3 pt-2 border-t border-[#E8DADD]/40 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectProduct(item);
                              onClose();
                            }}
                            className="text-[11.5px] font-semibold text-[#6F6265] hover:text-[#962949] transition-colors cursor-pointer"
                          >
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onAddToCart(item, defaultSize, defaultColor);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#962949] hover:bg-[#7D223C] text-white text-[11.5px] font-semibold uppercase tracking-wider rounded-[4px] shadow-2xs transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Controls (when wishlist has items) */}
          {products.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8DADD] bg-[#FFFFFF] space-y-2.5 sticky bottom-0 z-10 shadow-lg">
              <button
                type="button"
                onClick={handleMoveAllToBag}
                className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white text-[13px] font-bold uppercase tracking-wider rounded-[4px] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag ({products.length})</span>
              </button>

              <div className="flex items-center justify-between text-[12px] pt-1 px-1">
                {onOpenAccountWishlist && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAccountWishlist();
                    }}
                    className="text-[#962949] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Manage in My Account</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    products.forEach((p) => onRemoveItem(p.id));
                  }}
                  className="text-[#6F6265] hover:text-[#B71C1C] transition-colors cursor-pointer ml-auto"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
