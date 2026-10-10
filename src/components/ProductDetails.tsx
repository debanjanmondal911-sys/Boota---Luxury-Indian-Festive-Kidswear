import React, { useState } from 'react';
import {
  Star,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Tag,
  Gift,
  CheckCircle2,
  ShieldCheck,
  Feather,
  Sparkles,
  Smile,
  Copy,
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { ProductShareModal } from './ProductShareModal';

interface ProductDetailsProps {
  product?: Product | null;
  onAddToBag: (size: string, color: string) => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  onOpenSizeGuide?: () => void;
  onOpenReviews: () => void;
  onOpenReturnsPolicy?: () => void;
  returnDays?: number;
  onShowToast?: (message: string) => void;
  onOpenShare?: () => void;
}

const defaultSizes = [
  '0M (3-5.2 KG)',
  '3M',
  '6M',
  '1Y',
  '2Y',
  '3Y',
  '4Y',
  '5-6Y',
];

interface ColorOption {
  name: string;
  hex: string;
}

const colors: ColorOption[] = [
  { name: 'Rani Pink', hex: '#962949' },
  { name: 'Haldi Yellow', hex: '#E5A93B' },
];

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
  onOpenReviews,
  onOpenReturnsPolicy,
  returnDays = 7,
  onShowToast,
  onOpenShare,
}) => {
  const currentSizes =
    product?.sizes && product.sizes.length > 0 ? product.sizes : defaultSizes;
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(
    currentSizes[0] || '1-2 Y'
  );

  // Share modal state
  const [shareOpen, setShareOpen] = useState(false);

  // Offers state
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  // Pincode Delivery Check state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    code: string;
    deliveryDate: string;
    codAvailable: boolean;
    message: string;
  } | null>(null);

  // Collapsible Accordions
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({
    productDetails: true,
    shippingReturns: false,
    intlShipping: false,
    supplierInfo: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAdd = () => {
    onAddToBag(selectedSize, selectedColor.name);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  // Pincode calculation logic
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || isNaN(Number(cleanPin))) {
      setPincodeStatus({
        checked: true,
        valid: false,
        code: cleanPin,
        deliveryDate: '',
        codAvailable: false,
        message: 'Please enter a valid 6-digit Indian pincode.',
      });
      return;
    }

    // Calculate delivery date 3-5 days from now
    const now = new Date();
    const minDays = 3;
    const maxDays = 5;
    const minDate = new Date(now.getTime() + minDays * 24 * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    const formattedRange = `${minDate.toLocaleDateString(
      'en-IN',
      options
    )} – ${maxDate.toLocaleDateString('en-IN', options)}`;

    // Set successful result
    setPincodeStatus({
      checked: true,
      valid: true,
      code: cleanPin,
      deliveryDate: formattedRange,
      codAvailable: true,
      message: 'Delivery available to this location.',
    });
  };

  const productName = product ? product.name : 'Gulnar Silk Lehenga Set';
  const productPrice = product ? product.price : 2899;
  const productMrp = product?.mrp || Math.round(productPrice * 1.2);
  const discountPercent =
    product?.discountPercent ||
    Math.round(((productMrp - productPrice) / productMrp) * 100);

  return (
    <div className="w-full flex flex-col justify-start">
      {/* Product Name: Cormorant Garamond Bold */}
      <h1 className="font-serif font-bold text-[28px] sm:text-[34px] md:text-[38px] text-[#2B2224] leading-[1.15] tracking-normal mb-2">
        {productName}
      </h1>

      {/* Ratings / Reviews bar with Quick Share */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <button
            onClick={onOpenReviews}
            className="text-[13px] text-[#6F6265] hover:text-[#962949] transition-colors underline cursor-pointer"
          >
            {product
              ? `${product.rating} · (${product.reviewCount} customer reviews)`
              : '5.0 · (42 customer reviews)'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => (onOpenShare ? onOpenShare() : setShareOpen(true))}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E8DADD] hover:border-[#962949] bg-white hover:bg-[#FAF6F4] text-[#6F6265] hover:text-[#962949] text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs"
          title="Share this product on WhatsApp, Instagram or any app"
          aria-label="Share product"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Price: MRP, Current Price, Struck-through MRP, % Off */}
      <div className="flex flex-wrap items-baseline gap-2.5 mb-1">
        <span className="text-[14px] uppercase font-bold text-[#6F6265]">
          MRP
        </span>
        <span className="font-sans font-bold text-[26px] sm:text-[30px] text-[#962949] tracking-tight">
          ₹{productPrice.toLocaleString('en-IN')}
        </span>
        {productMrp > productPrice && (
          <span className="text-[16px] text-[#6F6265] line-through decoration-[#6F6265]/70 font-medium">
            ₹{productMrp.toLocaleString('en-IN')}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="text-[14px] font-bold text-[#962949] tracking-wide">
            ({discountPercent}% OFF)
          </span>
        )}
      </div>

      {/* "Inclusive of all taxes" */}
      <div className="text-[12.5px] text-[#6F6265] font-normal mb-3">
        Inclusive of all taxes
      </div>

      {/* Stock status: READY TO SHIP */}
      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-[4px] bg-[#962949]/10 text-[#962949] text-[12px] font-bold uppercase tracking-[0.06em]">
          <span className="w-2 h-2 rounded-full bg-[#962949] mr-1.5 animate-pulse" />
          READY TO SHIP
        </span>
      </div>

      {/* Size Selector with Size Guide Link */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-[13px] mb-2.5">
          <span className="font-bold text-[#2B2224] uppercase tracking-[0.06em]">
            SIZE
          </span>
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-[#962949] hover:underline font-semibold text-[13px] uppercase tracking-[0.04em] cursor-pointer"
          >
            SIZE GUIDE
          </button>
        </div>

        {/* Size Buttons Row: border-radius 4px, clean buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
          {currentSizes.map((s) => {
            const isSelected = selectedSize === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`py-2.5 px-2 text-[12.5px] font-semibold rounded-[4px] border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#962949] text-white border-[#962949] shadow-xs'
                    : 'bg-white text-[#2B2224] border-[#E8DADD] hover:border-[#962949] hover:text-[#962949]'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons: Add to Bag, Wishlist, and Share */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-[#962949] hover:bg-[#7D213C] text-white py-3.5 px-4 sm:px-6 text-[13.5px] sm:text-[14px] uppercase font-bold tracking-[0.06em] rounded-[4px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center"
        >
          Add to Bag
        </button>

        <button
          type="button"
          onClick={onToggleWishlist}
          aria-label={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3.5 border rounded-[4px] text-[13px] font-semibold uppercase tracking-[0.05em] transition-all cursor-pointer shrink-0 ${
            isWishlisted
              ? 'border-[#962949] text-[#962949] bg-[#F9D0D6]/40'
              : 'border-[#E8DADD] text-[#2B2224] hover:border-[#962949] hover:text-[#962949] bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#962949] text-[#962949]' : 'text-[#6F6265]'
            }`}
          />
          <span className="whitespace-nowrap hidden sm:inline">
            {isWishlisted ? 'Wishlisted' : 'Save'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => (onOpenShare ? onOpenShare() : setShareOpen(true))}
          aria-label="Share product on any app"
          className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-3.5 border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] bg-white rounded-[4px] text-[13px] font-semibold uppercase tracking-[0.05em] transition-all cursor-pointer shrink-0 shadow-2xs"
          title="Share product with family & friends on any app"
        >
          <Share2 className="w-4 h-4 text-[#6F6265]" />
          <span className="whitespace-nowrap hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Exciting Offers Box */}
      <div className="border border-[#E8DADD] rounded-[6px] p-4 bg-[#FFFDF9] mb-4">
        <div className="flex items-center space-x-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#2B2224] mb-2">
          <Tag className="w-3.5 h-3.5 text-[#962949]" />
          <span>Exciting Offers</span>
        </div>
        <div className="flex items-center justify-between text-[13px] text-[#2B2224]">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#962949]">BOOTANEW10</span>
            <span className="text-[#6F6265]">– First time buyers, get 10% Off</span>
          </div>
          <button
            type="button"
            onClick={() => handleCopyCode('BOOTANEW10')}
            className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-[#962949] hover:underline flex items-center gap-1 cursor-pointer bg-[#F9D0D6]/40 px-2 py-1 rounded-[2px]"
          >
            {copiedCoupon ? (
              <>
                <Check className="w-3 h-3 text-[#962949]" />
                <span className="text-[#962949]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gift Wrap Available Option */}
      <div className="flex items-center space-x-2.5 mb-5 text-[13px] text-[#2B2224]">
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="w-4 h-4 rounded-[2px] text-[#962949] accent-[#962949] border-[#E8DADD] focus:ring-[#962949]"
          />
          <Gift className="w-4 h-4 text-[#962949]" />
          <span>Gift wrap available (+₹50 for celebratory box &amp; note)</span>
        </label>
      </div>

      {/* 4 Trust Badges Strip (matching reference) */}
      <div className="grid grid-cols-4 gap-2 text-center py-3.5 px-2 border-y border-[#E8DADD] mb-6">
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-5 h-5 text-[#962949] mb-1" />
          <span className="text-[11px] font-medium text-[#2B2224] leading-tight">
            Global Standards
          </span>
          <span className="text-[10px] text-[#6F6265]">Construction</span>
        </div>
        <div className="flex flex-col items-center">
          <Sparkles className="w-5 h-5 text-[#962949] mb-1" />
          <span className="text-[11px] font-medium text-[#2B2224] leading-tight">
            Exclusive
          </span>
          <span className="text-[10px] text-[#6F6265]">Design</span>
        </div>
        <div className="flex flex-col items-center">
          <Smile className="w-5 h-5 text-[#962949] mb-1" />
          <span className="text-[11px] font-medium text-[#2B2224] leading-tight">
            Jhanjhat Ready
          </span>
          <span className="text-[10px] text-[#6F6265]">Easy Movement</span>
        </div>
        <div className="flex flex-col items-center">
          <Feather className="w-5 h-5 text-[#962949] mb-1" />
          <span className="text-[11px] font-medium text-[#2B2224] leading-tight">
            No Pokey
          </span>
          <span className="text-[10px] text-[#6F6265]">Mulmul Lining</span>
        </div>
      </div>

      {/* Pincode & Delivery Section */}
      <div className="p-4 bg-[#FAF6F4] border border-[#E8DADD] rounded-[6px] mb-5">
        <div className="flex items-center space-x-2 text-[14px] font-bold text-[#2B2224] mb-2">
          <Truck className="w-4 h-4 text-[#962949]" />
          <span>Delivery in 3–7 days</span>
        </div>
        <p className="text-[12.5px] text-[#6F6265] mb-3">
          Enter your delivery pincode to check instant estimated dispatch &amp; Cash on Delivery availability.
        </p>

        {/* Pincode box with "Check" button directly below */}
        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit Pincode (e.g. 110001)"
            className="flex-1 bg-white border border-[#E8DADD] rounded-[4px] px-3.5 py-2 text-[13.5px] text-[#2B2224] placeholder-[#6F6265]/60 focus:outline-none focus:border-[#962949]"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-[#962949] hover:bg-[#7D213C] text-white text-[13px] font-bold uppercase tracking-[0.04em] rounded-[4px] transition-colors cursor-pointer shrink-0"
          >
            Check
          </button>
        </form>

        {/* Pincode Result: Expected Delivery Date & COD Availability */}
        {pincodeStatus && pincodeStatus.checked && (
          <div className="mt-3.5 pt-3 border-t border-[#E8DADD]/80 text-[13px]">
            {pincodeStatus.valid ? (
              <div className="space-y-1.5 text-[#2B2224]">
                <div className="flex items-center space-x-1.5 text-[#962949] font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Delivery available for {pincodeStatus.code}</span>
                </div>
                <div className="text-[13px] pl-5">
                  Expected Delivery: <strong className="text-[#2B2224] font-bold">{pincodeStatus.deliveryDate}</strong>
                </div>
                <div className="text-[12.5px] pl-5 text-[#962949] font-medium">
                  ✓ Cash on Delivery (COD) is available
                </div>
              </div>
            ) : (
              <div className="text-[#B3261E] text-[12.5px]">
                {pincodeStatus.message}
              </div>
            )}
          </div>
        )}

        {/* Return Window: Directly below pincode check */}
        <div className="mt-3.5 pt-3 border-t border-[#E8DADD]/80 flex items-center justify-between text-[13px]">
          <div className="flex items-center space-x-2 text-[#2B2224]">
            <RotateCcw className="w-4 h-4 text-[#962949]" />
            <span>
              Easy <strong className="font-bold text-[#962949]">{returnDays}-day</strong> return / exchange
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenReturnsPolicy}
            className="text-[#962949] hover:underline font-semibold text-[12.5px] cursor-pointer"
          >
            View Policy
          </button>
        </div>
      </div>

      {/* Product Details Collapsible Sections */}
      <div className="border-t border-[#E8DADD] divide-y divide-[#E8DADD]">
        {/* Section 1: Product Details */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('productDetails')}
            className="w-full flex items-center justify-between text-left text-[14px] font-bold text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span className="font-serif text-[18px]">Product Details</span>
            {openAccordions.productDetails ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.productDetails && (
            <div className="mt-3 text-[13.5px] text-[#55474B] leading-relaxed space-y-2">
              <p>{product?.description || 'A little twirl, a touch of tradition, and a whole lot of joyful comfort. This 100% pure silk and mulmul festive ensemble brings timeless craftsmanship to life.'}</p>
              
              <ul className="list-disc pl-5 space-y-1.5 pt-1 text-[#2B2224]">
                <li>
                  <strong>Package Contains:</strong>{' '}
                  {product?.packageContains || '1 Kurta/Choli, 1 Lehenga/Bottom, 1 Dupatta'}
                </li>
                <li>
                  <strong>Fabric:</strong>{' '}
                  {product?.fabricDetails || '100% Pure Silk Chanderi with Breathable Cotton Mulmul Lining'}
                </li>
                <li>
                  <strong>Design Details:</strong> Hand-worked delicate gota patti, comfortable elasticated waistband, and non-scratchy soft interior seams.
                </li>
                <li>
                  <strong>Care Instruction:</strong>{' '}
                  {product?.careInstructions || 'Gentle Dry Clean or Gentle Hand Wash'}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Section 2: Shipping and Returns - India */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('shippingReturns')}
            className="w-full flex items-center justify-between text-left text-[14px] font-bold text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span className="font-serif text-[18px]">Shipping and Returns - India</span>
            {openAccordions.shippingReturns ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.shippingReturns && (
            <div className="mt-3 text-[13px] text-[#55474B] leading-relaxed space-y-1.5">
              <p>• Dispatched within 24–48 hours from our Jaipur atelier.</p>
              <p>• Free prepaid shipping across India for orders above ₹1,499.</p>
              <p>• Easy {returnDays}-day size exchange &amp; return with doorstep pick-up across 18,000+ pincodes.</p>
            </div>
          )}
        </div>

        {/* Section 3: International Shipping */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('intlShipping')}
            className="w-full flex items-center justify-between text-left text-[14px] font-bold text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span className="font-serif text-[18px]">International Shipping</span>
            {openAccordions.intlShipping ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.intlShipping && (
            <div className="mt-3 text-[13px] text-[#55474B] leading-relaxed space-y-1.5">
              <p>• We ship worldwide via DHL &amp; FedEx Express (5–7 business days transit).</p>
              <p>• Customs duties and local import taxes are handled transparently at checkout.</p>
            </div>
          )}
        </div>

        {/* Section 4: Supplier Information */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion('supplierInfo')}
            className="w-full flex items-center justify-between text-left text-[14px] font-bold text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span className="font-serif text-[18px]">Supplier Information</span>
            {openAccordions.supplierInfo ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.supplierInfo && (
            <div className="mt-3 text-[13px] text-[#55474B] leading-relaxed space-y-1">
              <p><strong>Manufactured &amp; Packed By:</strong> Boota Kids Heritage Pvt. Ltd.</p>
              <p><strong>Atelier Location:</strong> Plot 14, C-Scheme, Jaipur, Rajasthan, 302001, India.</p>
              <p><strong>Customer Care:</strong> care@bootakids.com | +91 7291947002</p>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal Dialog */}
      <ProductShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        product={product}
        onShowToast={onShowToast}
      />
    </div>
  );
};
