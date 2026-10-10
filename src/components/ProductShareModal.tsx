import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Send,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { Product } from '../types';

interface ProductShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onShowToast?: (message: string) => void;
}

export const ProductShareModal: React.FC<ProductShareModalProps> = ({
  isOpen,
  onClose,
  product,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  // Build the shareable URL and content
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : 'https://boota.in';
  const shareUrl = `${baseUrl}#pdp`;

  const shareTitle = `${product.name} | Boota Kids Heirloom Festive Wear`;
  const shareText = `Look at this beautiful kids festive outfit: "${product.name}" (₹${product.price.toLocaleString(
    'en-IN'
  )}) from Boota!`;

  const hasNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        if (onShowToast) onShowToast('Shared successfully!');
      } catch (err: unknown) {
        // User cancelled or aborted
        if ((err as Error)?.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = `${shareText}\n${shareUrl}`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (onShowToast) onShowToast('Product link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      bgColor: 'bg-[#25D366] hover:bg-[#20BD5A] text-white',
      textColor: 'text-[#25D366]',
      onClick: () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${shareText} ${shareUrl}`
        )}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bgColor: 'bg-[#1877F2] hover:bg-[#166FE5] text-white',
      textColor: 'text-[#1877F2]',
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.05-.98-.1-2.48.02-3.55l.74-3.13s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.36-.53 2.12-.15.63.32 1.15.94 1.15 1.13 0 2-1.19 2-2.91 0-1.52-1.1-2.58-2.65-2.58-1.81 0-2.87 1.36-2.87 2.76 0 .55.21 1.13.47 1.45.05.06.06.12.04.18l-.18.73c-.03.11-.1.15-.22.1-1-.46-1.63-1.9-1.63-3.06 0-2.5 1.81-4.79 5.22-4.79 2.74 0 4.88 1.95 4.88 4.56 0 2.72-1.72 4.91-4.1 4.91-.8 0-1.56-.42-1.81-.91l-.49 1.89c-.18.69-.66 1.55-.99 2.08A12.01 12.01 0 1 0 12 0z" />
        </svg>
      ),
      bgColor: 'bg-[#E60023] hover:bg-[#CC001F] text-white',
      textColor: 'text-[#E60023]',
      onClick: () => {
        const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          shareUrl
        )}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(
          shareText
        )}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bgColor: 'bg-[#000000] hover:bg-[#1a1a1a] text-white',
      textColor: 'text-black',
      onClick: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      bgColor: 'bg-[#962949] hover:bg-[#7D213C] text-white',
      textColor: 'text-[#962949]',
      onClick: () => {
        const subject = encodeURIComponent(`Kids festive outfit: ${product.name}`);
        const body = encodeURIComponent(
          `Hi,\n\nI found this lovely handcrafted kids festive outfit on Boota:\n\n${product.name}\nPrice: ₹${product.price.toLocaleString(
            'en-IN'
          )}\n\nCheck it out here: ${shareUrl}\n\nEnjoy!`
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      },
    },
    {
      id: 'sms',
      name: 'Messages / SMS',
      icon: <MessageCircle className="w-5 h-5" />,
      bgColor: 'bg-[#34B7F1] hover:bg-[#2BA3D8] text-white',
      textColor: 'text-[#34B7F1]',
      onClick: () => {
        const body = encodeURIComponent(`${shareText} ${shareUrl}`);
        window.location.href = `sms:?&body=${body}`;
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-manrope">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#FFFDF9] rounded-[8px] border border-[#E8DADD] shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          {/* Header Row */}
          <div className="flex items-start justify-between pb-3 border-b border-[#E8DADD]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF6F4] border border-[#E8DADD] flex items-center justify-center text-[#962949]">
                <Share2 className="w-4.5 h-4.5 text-[#962949]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[20px] text-[#2B2224] leading-tight">
                  Share Outfit
                </h3>
                <p className="text-[12px] text-[#6F6265]">
                  Share this handcrafted piece with family &amp; friends
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6265] hover:text-[#962949] hover:bg-[#FAF6F4] rounded-full transition-colors cursor-pointer"
              aria-label="Close share dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Mini Preview Card */}
          <div className="flex items-center gap-3 p-3 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD]">
            <div className="w-16 h-20 rounded-[4px] overflow-hidden bg-white border border-[#E8DADD] shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#962949] block">
                {product.collection || 'Boota Kids'}
              </span>
              <h4 className="font-medium text-[14px] text-[#2B2224] truncate" title={product.name}>
                {product.name}
              </h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif font-bold text-[16px] text-[#962949]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-[12px] text-[#A09598] line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent ? (
                  <span className="text-[9.5px] font-bold text-[#962949] bg-[#962949]/10 px-1.5 py-0.5 rounded-[2px]">
                    {product.discountPercent}% OFF
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Primary "Share via Any App" Button (Native Web Share for phones/tablets/desktops) */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-3 bg-[#962949] hover:bg-[#7D213C] text-white text-[13.5px] font-bold uppercase tracking-wider rounded-[4px] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Smartphone className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              <span>Share to Any App (Device Sheet)</span>
            </button>
          )}

          {/* Direct 1-Click App Sharing Grid */}
          <div>
            <span className="text-[11.5px] uppercase font-bold tracking-wider text-[#6F6265] block mb-2.5">
              Share directly via:
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {shareOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={opt.onClick}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[6px] border border-[#E8DADD] bg-white hover:bg-[#FAF6F4] hover:border-[#962949]/40 transition-all cursor-pointer text-center group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${opt.bgColor} shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    {opt.icon}
                  </div>
                  <span className="text-[11.5px] font-semibold text-[#2B2224] truncate max-w-full">
                    {opt.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link Section */}
          <div className="pt-2 border-t border-[#E8DADD] space-y-2">
            <span className="text-[11.5px] uppercase font-bold tracking-wider text-[#6F6265] block">
              Or copy outfit link:
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-white rounded-[4px] border border-[#E8DADD] text-[12.5px] text-[#6F6265] truncate font-mono select-all">
                {shareUrl}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#FAF6F4] hover:bg-[#F9D0D6]/40 border border-[#E8DADD] hover:border-[#962949] text-[#962949] text-[12px] font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#962949]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
