import React from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleReviews: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Priyanka Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '12 days ago',
    title: 'Exquisite silk and so comfortable for my 3-year-old!',
    comment:
      'The Gulnar lehenga set is breathtaking! Usually my daughter complains about heavy ethnic wear, but the pure cotton lining inside made it so soft against her skin. She danced through the entire wedding ceremony without fuss.',
    verified: true,
    sizePurchased: '3-4 Y',
  },
  {
    id: 'r2',
    author: 'Ananya Mehra',
    location: 'New Delhi',
    rating: 5,
    date: '3 weeks ago',
    title: 'Hand-finished gota detailing is top notch',
    comment:
      'The finish is extraordinary. You can immediately see the craftsmanship in the delicate gota patti borders and the tassels. Rani pink color is vibrant and looks gorgeous in photographs.',
    verified: true,
    sizePurchased: '2-3 Y',
  },
  {
    id: 'r3',
    author: 'Sunita Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: '1 month ago',
    title: 'True to size and prompt delivery',
    comment:
      'Arrived in 4 days in neat boutique packaging. Sizing fits true to age as described. Very happy with the quality and customer support.',
    verified: true,
    sizePurchased: '4-5 Y',
  },
  {
    id: 'r4',
    author: 'Meenakshi Iyer',
    location: 'Bengaluru, Karnataka',
    rating: 4.8,
    date: '1 month ago',
    title: 'Comfortable waist and great silhouette',
    comment:
      'The elasticated waist makes all the difference for active kids. High quality silk and pure breathable lining. Will definitely order from Boota again.',
    verified: true,
    sizePurchased: '1-2 Y',
  },
];

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#6F6265] hover:text-[#2B2224] rounded-[4px] p-1 cursor-pointer"
            aria-label="Close reviews"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pb-6 border-b border-[#E8DADD]">
            <span className="text-[12px] uppercase tracking-[0.06em] text-[#962949] font-semibold block mb-1">
              Customer Reviews
            </span>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-4xl font-serif font-semibold text-[#962949]">4.9</div>
              <div>
                <div className="flex items-center text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[13px] text-[#6F6265]">Based on 18 verified customer ratings</div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            {sampleReviews.map((rev) => (
              <div key={rev.id} className="border-b border-[#E8DADD] pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13.5px] text-[#2B2224]">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[11px] text-[#962949] bg-[#962949]/10 px-2 py-0.5 rounded-[4px] font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-[#6F6265]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2 mt-1.5 mb-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#6F6265]">Size: {rev.sizePurchased}</span>
                  <span className="text-[12px] text-[#6F6265]">• {rev.location}</span>
                </div>

                <h5 className="font-serif font-semibold text-[17px] text-[#2B2224] mb-1">
                  {rev.title}
                </h5>
                <p className="text-[14px] text-[#2B2224] leading-[1.6]">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
