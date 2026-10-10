import React, { useState } from 'react';
import { ReviewItem } from '../../types';
import { CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface CustomerReviewsProps {
  reviews: ReviewItem[];
  onOpenReviewModal?: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onOpenReviewModal,
}) => {
  // CRITICAL REQUIREMENT:
  // "The section should be automatically hidden until there are at least 5 published real reviews"
  const publishedGenuineReviews = reviews.filter((r) => r.verified);

  if (publishedGenuineReviews.length < 5) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? publishedGenuineReviews.length - 1 : prev - 1
    );
  };

  const nextReview = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % publishedGenuineReviews.length
    );
  };

  return (
    <section className="w-full py-5 md:py-8 lg:py-10 bg-[#FAF6F4] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4">
          <div>
            <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
              From Families Who Celebrate With Us
            </span>
            <h2 className="font-serif text-[30px] md:text-[38px] text-[#2B2224] font-medium tracking-tight">
              Our Happy Customers
            </h2>
            <p className="text-[14px] text-[#6F6265] mt-1">
              Genuine verified purchase experiences from parents across India.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {onOpenReviewModal && (
              <button
                onClick={onOpenReviewModal}
                className="text-[13px] font-semibold tracking-[0.04em] text-[#962949] hover:underline uppercase mr-2 cursor-pointer"
              >
                Write a Review
              </button>
            )}
            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-[#E8DADD] bg-white hover:bg-[#F9D0D6]/20 text-[#2B2224] hover:text-[#962949] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 rounded-full border border-[#E8DADD] bg-white hover:bg-[#F9D0D6]/20 text-[#2B2224] hover:text-[#962949] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid (Shows 3 at a time on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % publishedGenuineReviews.length;
            const review = publishedGenuineReviews[index];

            return (
              <div
                key={review.id}
                className="bg-white border border-[#E8DADD] rounded-[4px] p-6 md:p-8 flex flex-col justify-between shadow-2xs transition-all duration-300 hover:shadow-md hover:border-[#962949]/30"
              >
                <div>
                  {/* Quote Icon & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-7 h-7 text-[#F9D0D6] fill-[#F9D0D6]" />
                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#962949]/10 text-[#962949] text-[11px] font-medium">
                      <CheckCircle2 className="w-3 h-3 stroke-[2]" />
                      <span>Verified Buyer</span>
                    </div>
                  </div>

                  {/* Review Title */}
                  <h3 className="font-serif text-[17px] font-medium text-[#2B2224] mb-2 leading-snug">
                    "{review.title}"
                  </h3>

                  {/* Comment */}
                  <p className="text-[13.5px] text-[#55474B] leading-relaxed font-light mb-6">
                    {review.comment}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#E8DADD]/60 flex items-center justify-between text-[12px] text-[#6F6265]">
                  <div>
                    <div className="font-semibold text-[#2B2224] text-[13px]">
                      {review.author}
                    </div>
                    <div>{review.location} · {review.productName}</div>
                  </div>
                  <div className="text-[#6F6265]/70">
                    Size: {review.sizePurchased}
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
