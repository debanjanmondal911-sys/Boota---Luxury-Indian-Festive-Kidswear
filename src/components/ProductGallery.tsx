import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2 } from 'lucide-react';
import { Product } from '../types';
import { getProductGalleryImages } from '../data/products';

interface ProductGalleryProps {
  product?: Product | null;
  onShare?: () => void;
}

interface ZoomState {
  isHovering: boolean;
  x: number;
  y: number;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product, onShare }) => {
  const images = getProductGalleryImages(product);

  // Lightbox Modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalZoomed, setModalZoomed] = useState(false);

  // Track hover zoom per image index
  const [hoverStates, setHoverStates] = useState<{ [index: number]: ZoomState }>({});
  const cardRefs = useRef<{ [index: number]: HTMLDivElement | null }>({});

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setHoverStates((prev) => ({
      ...prev,
      [index]: { isHovering: true, x, y },
    }));
  };

  const handleMouseEnter = (index: number) => {
    setHoverStates((prev) => ({
      ...prev,
      [index]: { isHovering: true, x: 50, y: 50 },
    }));
  };

  const handleMouseLeave = (index: number) => {
    setHoverStates((prev) => ({
      ...prev,
      [index]: { isHovering: false, x: 50, y: 50 },
    }));
  };

  // Keyboard navigation for Lightbox
  const handleNextModal = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((prev) => ((prev ?? 0) + 1) % images.length);
    setModalZoomed(false);
  }, [modalIndex, images.length]);

  const handlePrevModal = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
    setModalZoomed(false);
  }, [modalIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === 'Escape') setModalIndex(null);
      if (e.key === 'ArrowRight') handleNextModal();
      if (e.key === 'ArrowLeft') handlePrevModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, handleNextModal, handlePrevModal]);

  return (
    <div className="w-full">
      {/* 2-Column Responsive Grid with minimum 6 images, clean without text labels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        {images.map((src, index) => {
          const hover = hoverStates[index] || { isHovering: false, x: 50, y: 50 };

          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => {
                setModalIndex(index);
                setModalZoomed(false);
              }}
              className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-[#E8DADD] bg-[#FAF6F4] cursor-zoom-in shadow-2xs transition-all duration-200 select-none group"
              title="Click to view large with zoom"
            >
              <img
                src={src}
                alt={`${product?.name || 'Product photo'} - view ${index + 1}`}
                referrerPolicy="no-referrer"
                style={{
                  transformOrigin: `${hover.x}% ${hover.y}%`,
                  transform: hover.isHovering ? 'scale(2.2)' : 'scale(1)',
                }}
                className="w-full h-full object-cover object-center transition-transform duration-200 ease-out will-change-transform pointer-events-none"
                loading={index < 2 ? 'eager' : 'lazy'}
              />

              {/* Hover Zoom Hint badge (top right, non-intrusive) */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-xs text-[#962949] p-1.5 rounded-full shadow-xs pointer-events-none">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Large View Modal with Zoom & Prev/Next Arrows */}
      {modalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalIndex(null)}
          className="fixed inset-0 z-50 bg-[#2B2224]/85 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Controls Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between text-white pb-3 px-2 z-20"
          >
            <div className="flex items-center space-x-3">
              <span className="font-serif font-bold text-[18px] sm:text-[20px] text-white tracking-wide">
                {product?.name || 'Gulnar Silk Lehenga Set'}
              </span>
              <span className="text-white/70 text-[13px] bg-white/15 px-2.5 py-0.5 rounded-full">
                {modalIndex + 1} / {images.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {onShare && (
                <button
                  type="button"
                  onClick={onShare}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Share Outfit"
                  aria-label="Share Outfit"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setModalZoomed((prev) => !prev)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title={modalZoomed ? 'Zoom Out' : 'Zoom In'}
                aria-label="Toggle Zoom"
              >
                {modalZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Large Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex-1 max-h-[80vh] flex items-center justify-center overflow-hidden"
          >
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrevModal}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#2B2224] shadow-md flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNextModal}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-[#2B2224] shadow-md flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Large Image with optional modal zoom */}
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              <img
                src={images[modalIndex]}
                alt={`${product?.name || 'Product'} view ${modalIndex + 1}`}
                className={`max-h-[76vh] w-auto max-w-full object-contain rounded-[4px] transition-transform duration-300 ${
                  modalZoomed ? 'scale-150 cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                onClick={() => setModalZoomed((prev) => !prev)}
              />
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl flex items-center justify-center space-x-2 pt-3 z-20 overflow-x-auto py-1"
          >
            {images.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setModalIndex(idx);
                  setModalZoomed(false);
                }}
                className={`w-14 h-16 rounded-[4px] overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  idx === modalIndex
                    ? 'border-white scale-105 shadow-md'
                    : 'border-white/30 opacity-60 hover:opacity-90'
                }`}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
