import React, { useState } from 'react';
import { X, Ruler, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullPage?: () => void;
  productName?: string;
}

interface SizeRow {
  size: string;
  age: string;
  chestIn: string;
  waistIn: string;
  topLenIn: string;
  bottomLenIn: string;
  chestCm: string;
  waistCm: string;
  topLenCm: string;
  bottomLenCm: string;
}

const lehengaSizes: SizeRow[] = [
  {
    size: '0-6 M',
    age: '0–6 mos',
    chestIn: '18"',
    waistIn: '16"-18"',
    topLenIn: '10"',
    bottomLenIn: '12"',
    chestCm: '46 cm',
    waistCm: '41-46 cm',
    topLenCm: '25 cm',
    bottomLenCm: '30 cm',
  },
  {
    size: '6-12 M',
    age: '6–12 mos',
    chestIn: '19"',
    waistIn: '17"-19"',
    topLenIn: '11"',
    bottomLenIn: '14"',
    chestCm: '48 cm',
    waistCm: '43-48 cm',
    topLenCm: '28 cm',
    bottomLenCm: '36 cm',
  },
  {
    size: '1-2 Y',
    age: '1–2 yrs',
    chestIn: '21"',
    waistIn: '18"-20"',
    topLenIn: '12"',
    bottomLenIn: '18"',
    chestCm: '53 cm',
    waistCm: '46-51 cm',
    topLenCm: '30 cm',
    bottomLenCm: '46 cm',
  },
  {
    size: '2-3 Y',
    age: '2–3 yrs',
    chestIn: '22"',
    waistIn: '19"-21"',
    topLenIn: '13"',
    bottomLenIn: '20"',
    chestCm: '56 cm',
    waistCm: '48-53 cm',
    topLenCm: '33 cm',
    bottomLenCm: '51 cm',
  },
  {
    size: '3-4 Y',
    age: '3–4 yrs',
    chestIn: '23"',
    waistIn: '20"-22"',
    topLenIn: '14"',
    bottomLenIn: '22"',
    chestCm: '58 cm',
    waistCm: '51-56 cm',
    topLenCm: '36 cm',
    bottomLenCm: '56 cm',
  },
  {
    size: '4-5 Y',
    age: '4–5 yrs',
    chestIn: '24"',
    waistIn: '21"-23"',
    topLenIn: '15"',
    bottomLenIn: '24"',
    chestCm: '61 cm',
    waistCm: '53-58 cm',
    topLenCm: '38 cm',
    bottomLenCm: '61 cm',
  },
  {
    size: '5-6 Y',
    age: '5–6 yrs',
    chestIn: '25.5"',
    waistIn: '22"-24"',
    topLenIn: '16"',
    bottomLenIn: '26"',
    chestCm: '65 cm',
    waistCm: '56-61 cm',
    topLenCm: '41 cm',
    bottomLenCm: '66 cm',
  },
  {
    size: '6-7 Y',
    age: '6–7 yrs',
    chestIn: '27"',
    waistIn: '23"-25"',
    topLenIn: '17"',
    bottomLenIn: '28"',
    chestCm: '69 cm',
    waistCm: '58-64 cm',
    topLenCm: '43 cm',
    bottomLenCm: '71 cm',
  },
  {
    size: '7-8 Y',
    age: '7–8 yrs',
    chestIn: '28.5"',
    waistIn: '24"-26"',
    topLenIn: '18"',
    bottomLenIn: '30"',
    chestCm: '72 cm',
    waistCm: '61-66 cm',
    topLenCm: '46 cm',
    bottomLenCm: '76 cm',
  },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onViewFullPage,
  productName,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] shadow-2xl p-5 sm:p-7 z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#6F6265] hover:text-[#2B2224] hover:bg-[#F9D0D6]/30 cursor-pointer rounded-full p-1.5 transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-5 pr-8">
            <div className="flex items-center space-x-2 text-[#962949] text-[12px] font-bold uppercase tracking-wider mb-1">
              <Ruler className="w-4 h-4" />
              <span>Garment Sizing Chart</span>
            </div>
            <h3 className="font-serif font-bold text-[24px] sm:text-[28px] text-[#2B2224] leading-tight">
              {productName ? `${productName} Size Guide` : 'Size Guide & Measurements'}
            </h3>
            <p className="text-[12.5px] sm:text-[13px] text-[#6F6265] mt-1">
              Tailored with 2–3 inches of relaxed comfort margin and soft cotton lining. All measurements refer to garment dimensions.
            </p>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8DADD]">
            <span className="text-[12.5px] font-semibold text-[#2B2224] uppercase tracking-wide">
              Measurement Units:
            </span>
            <div className="flex items-center border border-[#E8DADD] p-0.5 rounded-[4px] text-[12.5px] bg-[#FAF6F4]">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 cursor-pointer font-semibold rounded-[3px] transition-colors ${
                  unit === 'inches'
                    ? 'bg-[#962949] text-white shadow-2xs'
                    : 'text-[#6F6265] hover:text-[#2B2224]'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 cursor-pointer font-semibold rounded-[3px] transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#962949] text-white shadow-2xs'
                    : 'text-[#6F6265] hover:text-[#2B2224]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto rounded-[4px] border border-[#E8DADD]">
            <table className="w-full text-[12.5px] text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF6F4] border-b border-[#E8DADD] text-[#2B2224]">
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[#962949]">Size</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Age Group</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Chest</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Waist (Elastic)</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Top Length</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Bottom Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DADD]/70 text-[#55474B] bg-white">
                {lehengaSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#F9D0D6]/15 transition-colors">
                    <td className="py-2 px-3 font-bold text-[#962949] bg-[#FAF6F4]/50">{row.size}</td>
                    <td className="py-2 px-3">{row.age}</td>
                    <td className="py-2 px-3">
                      {unit === 'inches' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-2 px-3">
                      {unit === 'inches' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-2 px-3">
                      {unit === 'inches' ? row.topLenIn : row.topLenCm}
                    </td>
                    <td className="py-2 px-3">
                      {unit === 'inches' ? row.bottomLenIn : row.bottomLenCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Fit Advice Strip */}
          <div className="mt-4 p-3 bg-[#FAF6F4] rounded-[4px] border border-[#E8DADD] flex items-start space-x-2.5 text-[12px] text-[#6F6265]">
            <Sparkles className="w-4 h-4 text-[#962949] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#2B2224]">Fit Tip:</span> If your child falls between two sizes, we suggest choosing the larger size for room to grow and effortless celebration comfort. All waists feature gentle elastic bands with comfortable stretch.
            </div>
          </div>

          {/* Footer with Full Page Link */}
          <div className="mt-5 pt-3.5 border-t border-[#E8DADD] flex flex-col sm:flex-row items-center justify-between gap-3">
            {onViewFullPage && (
              <button
                type="button"
                onClick={onViewFullPage}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#962949] hover:underline cursor-pointer"
              >
                <span>View Full Size Guide Page & Video Tutorial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-[#962949] text-white hover:bg-[#80223d] text-[12.5px] font-bold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer text-center ml-auto"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
