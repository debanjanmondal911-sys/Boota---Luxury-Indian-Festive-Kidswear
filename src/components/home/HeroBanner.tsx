import React, { useState, useEffect, useRef, useCallback } from 'react';
import { heroSlidesData } from '../../assets/images';

interface HeroBannerProps {
  onSelectCategory?: (category: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = heroSlidesData.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay automatically every 2.5 seconds (2-3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, [nextSlide, currentSlide]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleSlideClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF6F4] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Homepage Hero Carousel"
    >
      {/* Slides Container */}
      <div className="relative w-full h-[580px] md:h-[600px] lg:h-[640px]">
        {heroSlidesData.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={slide.id}
              onClick={() => handleSlideClick(slide.category)}
              style={{
                visibility: isActive ? 'visible' : 'hidden',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none invisible'
              }`}
            >
              {/* Desktop Image (High-res 16:9 banner) */}
              <div className="hidden md:block w-full h-full relative">
                <img
                  src={slide.desktopImg}
                  alt={slide.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle soft gradient scrim on left for crystal-clear readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B2224]/55 via-[#2B2224]/20 to-transparent" />
              </div>

              {/* Mobile Image (Separate 4:5 mobile framing, not just cropped desktop) */}
              <div className="block md:hidden w-full h-full relative">
                <img
                  src={slide.mobileImg}
                  alt={slide.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                {/* Mobile overlay for calm text placement */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/80 via-[#2B2224]/30 to-black/20" />
              </div>

              {/* Text Overlay - Placed in calm area with luxury editorial typography */}
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="max-w-[1320px] w-full mx-auto px-6 md:px-12 lg:px-[56px] pb-14 md:pb-0">
                  <div className="max-w-xl text-left flex flex-col justify-end space-y-3 sm:space-y-4">
                    <div>
                      <span className="inline-block text-[11px] sm:text-[12px] uppercase font-semibold tracking-[0.16em] text-[#F9D0D6] drop-shadow-xs">
                        {slide.tag || 'Festive Heritage Edition'}
                      </span>
                    </div>
                    <h1 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] leading-[1.2] sm:leading-[1.15] text-white font-medium tracking-normal drop-shadow-md m-0">
                      {slide.headline}
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-white/95 leading-[1.5] font-light max-w-md drop-shadow-xs !mt-1.5 sm:!mt-2 block">
                      {slide.subline}
                    </p>
                    <div className="pt-2 sm:pt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlideClick(slide.category);
                        }}
                        className="inline-flex items-center justify-center px-7 py-3.5 bg-[#962949] text-white hover:bg-[#7D213C] text-[13px] font-semibold tracking-[0.06em] uppercase rounded-[4px] shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center space-x-2.5">
        {heroSlidesData.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-7 h-2 bg-white shadow-xs'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
