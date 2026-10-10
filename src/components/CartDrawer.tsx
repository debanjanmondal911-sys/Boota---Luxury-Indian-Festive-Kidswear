import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 1499;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#2B2224]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E8DADD] flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DADD] flex items-center justify-between bg-[#FFFFFF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#962949]" />
              <h2 className="font-serif font-semibold text-[20px] text-[#962949]">
                Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#6F6265] hover:text-[#2B2224] rounded-[4px] cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress: Soft Blush background, Soft Border */}
          <div className="bg-[#F9D0D6] px-5 py-3 border-b border-[#E8DADD] text-[13px]">
            {qualifiesForFreeShipping ? (
              <span className="text-[#962949] font-medium flex items-center gap-1.5">
                <span>🎉</span> You qualify for Free Express Shipping!
              </span>
            ) : (
              <div>
                <span className="text-[#2B2224]">
                  Add <strong className="text-[#962949]">₹{remainingForFreeShipping}</strong> more
                  to unlock <strong>Free Shipping</strong>
                </span>
                <div className="w-full bg-[#FFFFFF]/80 h-1.5 rounded-[4px] mt-2 overflow-hidden border border-[#E8DADD]">
                  <div
                    className="bg-[#962949] h-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6F6265]">
                <ShoppingBag className="w-12 h-12 text-[#E8DADD] stroke-[1.2] mb-3" />
                <p className="font-serif font-semibold text-[22px] text-[#962949] mb-1">Your bag is empty</p>
                <p className="text-[14px] text-[#6F6265] max-w-xs mb-6">
                  Explore our handcrafted festive pieces designed for joyful celebrations.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] text-[13px] uppercase tracking-[0.06em] font-semibold py-3 px-6 rounded-[4px] cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 pb-4 border-b border-[#E8DADD]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-[4px] border border-[#E8DADD] bg-[#F9D0D6] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-[#6F6265]">
                            {item.collection}
                          </span>
                          <h4 className="font-serif font-semibold text-[17px] text-[#2B2224] leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#6F6265] hover:text-[#B3261E] p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[13px] text-[#6F6265] mt-1 flex items-center gap-2">
                        <span>Color: {item.color}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8DADD] rounded-[4px] text-[13px] bg-[#FFFFFF]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-[#F9D0D6] text-[#2B2224] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 font-semibold text-[#2B2224]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-[#F9D0D6] text-[#2B2224] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price: Manrope Semibold */}
                      <div className="text-[15.5px] font-semibold text-[#962949]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8DADD] bg-[#FFFFFF] space-y-3">
              <div className="flex justify-between text-[13px] text-[#6F6265]">
                <span>Shipping</span>
                <span className="text-[#962949] font-medium">
                  {qualifiesForFreeShipping ? 'FREE' : '₹99'}
                </span>
              </div>
              <div className="flex justify-between text-[15px] font-medium text-[#2B2224] pt-1">
                <span>Estimated Total</span>
                <span className="text-[18px] font-semibold text-[#962949]">
                  ₹{(subtotal + (qualifiesForFreeShipping ? 0 : 99)).toLocaleString()}
                </span>
              </div>
              <p className="text-[12px] text-[#6F6265]">
                Taxes included. Cash on Delivery available at checkout.
              </p>

              <button
                onClick={() => {
                  alert('Thank you! Redirecting to secure checkout...');
                }}
                className="w-full bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] py-3.5 px-4 text-[13.5px] font-semibold uppercase tracking-[0.06em] rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#6F6265] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#962949]" />
                <span>100% Handcrafted • Easy 7-Day Size Exchange</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
