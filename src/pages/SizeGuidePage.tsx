import React, { useState } from 'react';
import { Ruler, MessageCircle, HelpCircle, Check, Info } from 'lucide-react';

interface SizeRow {
  age: string;
  sizeTag: string;
  chestCm: string;
  chestIn: string;
  waistCm: string;
  waistIn: string;
  topLengthCm: string;
  topLengthIn: string;
  bottomLengthCm: string;
  bottomLengthIn: string;
  childHeightCm: string;
  childHeightIn: string;
}

export const SizeGuidePage: React.FC<{ onNavigateHome: () => void; onNavigateContact: () => void }> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [garmentCategory, setGarmentCategory] = useState<'lehenga' | 'kurta' | 'dress'>('lehenga');

  const sizeChart: SizeRow[] = [
    {
      age: '0–6 Months',
      sizeTag: '0-6M',
      chestCm: '43–46',
      chestIn: '17–18',
      waistCm: '41–43',
      waistIn: '16–17',
      topLengthCm: '25',
      topLengthIn: '10',
      bottomLengthCm: '30',
      bottomLengthIn: '12',
      childHeightCm: '60–68',
      childHeightIn: '24–27',
    },
    {
      age: '6–12 Months',
      sizeTag: '6-12M',
      chestCm: '46–48',
      chestIn: '18–19',
      waistCm: '43–46',
      waistIn: '17–18',
      topLengthCm: '28',
      topLengthIn: '11',
      bottomLengthCm: '36',
      bottomLengthIn: '14',
      childHeightCm: '68–76',
      childHeightIn: '27–30',
    },
    {
      age: '1–2 Years',
      sizeTag: '1-2Y',
      chestCm: '51–53',
      chestIn: '20–21',
      waistCm: '48–51',
      waistIn: '19–20',
      topLengthCm: '30',
      topLengthIn: '12',
      bottomLengthCm: '43',
      bottomLengthIn: '17',
      childHeightCm: '76–86',
      childHeightIn: '30–34',
    },
    {
      age: '2–3 Years',
      sizeTag: '2-3Y',
      chestCm: '53–56',
      chestIn: '21–22',
      waistCm: '51–53',
      waistIn: '20–21',
      topLengthCm: '33',
      topLengthIn: '13',
      bottomLengthCm: '51',
      bottomLengthIn: '20',
      childHeightCm: '86–94',
      childHeightIn: '34–37',
    },
    {
      age: '3–4 Years',
      sizeTag: '3-4Y',
      chestCm: '56–58',
      chestIn: '22–23',
      waistCm: '53–56',
      waistIn: '21–22',
      topLengthCm: '36',
      topLengthIn: '14',
      bottomLengthCm: '58',
      bottomLengthIn: '23',
      childHeightCm: '94–102',
      childHeightIn: '37–40',
    },
    {
      age: '4–5 Years',
      sizeTag: '4-5Y',
      chestCm: '58–61',
      chestIn: '23–24',
      waistCm: '56–58',
      waistIn: '22–23',
      topLengthCm: '38',
      topLengthIn: '15',
      bottomLengthCm: '64',
      bottomLengthIn: '25',
      childHeightCm: '102–110',
      childHeightIn: '40–43',
    },
    {
      age: '5–6 Years',
      sizeTag: '5-6Y',
      chestCm: '61–64',
      chestIn: '24–25',
      waistCm: '58–61',
      waistIn: '23–24',
      topLengthCm: '41',
      topLengthIn: '16',
      bottomLengthCm: '71',
      bottomLengthIn: '28',
      childHeightCm: '110–118',
      childHeightIn: '43–46',
    },
    {
      age: '7–8 Years',
      sizeTag: '7-8Y',
      chestCm: '66–69',
      chestIn: '26–27',
      waistCm: '61–64',
      waistIn: '24–25',
      topLengthCm: '46',
      topLengthIn: '18',
      bottomLengthCm: '79',
      bottomLengthIn: '31',
      childHeightCm: '122–130',
      childHeightIn: '48–51',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#2B2224]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8DADD] bg-[#FFFDF9]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-3.5">
          <nav className="flex items-center text-[13px] text-[#6F6265] space-x-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#962949] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#962949] font-medium">Children’s Size Guide</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="pt-12 sm:pt-16 pb-10 bg-[#FFFDF9] border-b border-[#E8DADD]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
            Perfect Comfort &amp; Fit
          </span>
          <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-4">
            Size &amp; Fit Guide
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#6F6265] max-w-2xl mx-auto leading-[1.6]">
            Every Boota garment is cut with child-first comfort ease and up to 2.5 inches of built-in seam allowance, so your little one can twirl freely and grow without outgrowing.
          </p>
        </div>
      </section>

      {/* How Boota Sizes Work */}
      <section className="py-12 border-b border-[#E8DADD]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] p-6 sm:p-8">
            <h2 className="font-serif font-semibold text-[22px] sm:text-[26px] text-[#2B2224] mb-3">
              How Boota Sizes Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14.5px] text-[#6F6265] leading-[1.65]">
              <div className="space-y-1">
                <span className="font-semibold text-[#962949] block">True to Age-Height</span>
                <p>
                  Our sizing is calibrated around Indian children’s growth percentiles. If your child is an average 3-year-old, our 2-3Y or 3-4Y will fit with comfortable ease.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[#962949] block">Built-In "Grow-With-Me" Margins</span>
                <p>
                  We keep 2–2.5 inches of un-snipped fabric along the side seams of cholis, kurtas, and skirts. Loosening a single inner stitch gives you an extra season of wear.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-[#962949] block">Elastic + Drawstring Flexibility</span>
                <p>
                  All bottoms (lehenga skirts, shararas, dhotis) feature a covered soft elastic back with a functional handloom drawstring at the front for a tailored waist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Chart Controls & Table */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-1">
                Measurements Table
              </span>
              <h3 className="font-serif font-semibold text-[26px] sm:text-[32px] text-[#2B2224]">
                Garment &amp; Body Dimensions
              </h3>
            </div>

            {/* Controls: Unit Toggle & Garment Type */}
            <div className="flex items-center gap-3">
              {/* Unit Switcher */}
              <div className="inline-flex rounded-[4px] border border-[#E8DADD] p-1 bg-[#FFFDF9]">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-semibold transition-all cursor-pointer ${
                    unit === 'in'
                      ? 'bg-[#962949] text-[#FFFFFF] shadow-xs'
                      : 'text-[#6F6265] hover:text-[#2B2224]'
                  }`}
                >
                  Inches (in)
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3.5 py-1.5 rounded-[2px] text-[13px] font-semibold transition-all cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-[#962949] text-[#FFFFFF] shadow-xs'
                      : 'text-[#6F6265] hover:text-[#2B2224]'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-[#E8DADD] rounded-[4px] shadow-xs bg-[#FFFFFF]">
            <table className="w-full text-left border-collapse text-[14px] sm:text-[15px]">
              {/* Table Heading: Soft Blush #F9D0D6 accent */}
              <thead>
                <tr className="bg-[#F9D0D6]/40 border-b border-[#E8DADD] text-[#2B2224] font-medium text-[13.5px] uppercase tracking-wider">
                  <th className="py-4 px-5">Age Group</th>
                  <th className="py-4 px-4">Size Tag</th>
                  <th className="py-4 px-4">Child Height ({unit})</th>
                  <th className="py-4 px-4">Chest ({unit})</th>
                  <th className="py-4 px-4">Waist ({unit})</th>
                  <th className="py-4 px-4">Top Length ({unit})</th>
                  <th className="py-4 px-4">Skirt / Bottom Length ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DADD] text-[#2B2224]">
                {sizeChart.map((row, idx) => (
                  <tr
                    key={row.sizeTag}
                    className={`hover:bg-[#FFFDF9] transition-colors ${
                      idx % 2 === 1 ? 'bg-[#FFFDF9]/40' : 'bg-[#FFFFFF]'
                    }`}
                  >
                    <td className="py-4 px-5 font-semibold text-[#962949] whitespace-nowrap">
                      {row.age}
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-[#2B2224]">
                      {row.sizeTag}
                    </td>
                    <td className="py-4 px-4 text-[#6F6265]">
                      {unit === 'in' ? row.childHeightIn : row.childHeightCm}
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {unit === 'in' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-4 px-4 font-medium">
                      {unit === 'in' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-4 px-4 text-[#6F6265]">
                      {unit === 'in' ? row.topLengthIn : row.topLengthCm}
                    </td>
                    <td className="py-4 px-4 text-[#6F6265]">
                      {unit === 'in' ? row.bottomLengthIn : row.bottomLengthCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12.5px] text-[#6F6265] mt-2.5 italic">
            * Note: Garments include an additional 1.5 to 2.5 inches of comfort ease over body measurements to allow relaxed sitting, eating, and playing.
          </p>
        </div>
      </section>

      {/* How to Measure & Fit Advice */}
      <section className="py-14 bg-[#FFFDF9] border-t border-[#E8DADD]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* How to Measure Illustration / Step-by-Step */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#962949]">
                <Ruler className="w-5 h-5" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em]">
                  Measurement Technique
                </span>
              </div>
              <h3 className="font-serif font-semibold text-[26px] sm:text-[30px] text-[#2B2224] mb-4">
                How to Measure Your Child
              </h3>
              <p className="text-[14.5px] text-[#6F6265] mb-6 leading-[1.6]">
                Use a flexible tailor’s tape measure over light cotton undergarments. Keep the tape snug but never tight enough to compress the skin.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] shadow-2xs">
                  <span className="font-serif font-semibold text-[17px] text-[#962949] block mb-1">
                    1. Chest / Bust
                  </span>
                  <p className="text-[14px] text-[#2B2224] leading-[1.6]">
                    Measure around the fullest part of the child’s chest, directly under the armpits, with arms resting naturally at sides. Keep the tape horizontal.
                  </p>
                </div>

                <div className="p-4 bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] shadow-2xs">
                  <span className="font-serif font-semibold text-[17px] text-[#962949] block mb-1">
                    2. Natural Waist
                  </span>
                  <p className="text-[14px] text-[#2B2224] leading-[1.6]">
                    Measure around the belly button where the lehenga skirt or dhoti waist naturally sits. Don't ask the child to pull in their tummy.
                  </p>
                </div>

                <div className="p-4 bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] shadow-2xs">
                  <span className="font-serif font-semibold text-[17px] text-[#962949] block mb-1">
                    3. Skirt / Bottom Length
                  </span>
                  <p className="text-[14px] text-[#2B2224] leading-[1.6]">
                    Measure from the natural waistline down to the ankle bone. For lehengas, we recommend leaving 1 inch above the floor so the child doesn’t step on the hem while running.
                  </p>
                </div>
              </div>
            </div>

            {/* Fit Advice (Manrope 15–16px) */}
            <div className="bg-[#FFFFFF] border border-[#E8DADD] p-6 sm:p-8 rounded-[4px] shadow-xs space-y-6">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-1">
                  Atelier Guidance
                </span>
                <h3 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#2B2224] mb-3">
                  Fit Advice From Our Master Tailor
                </h3>
              </div>

              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#2B2224] leading-[1.75]">
                <p>
                  <strong>When in Doubt, Always Size Up:</strong> Children grow swiftly in spurts. Sizing up by one age group ensures you get joyful wear during this festive season, and our generous drawstring waist ensures the skirt stays securely in place right now.
                </p>
                <p>
                  <strong>Choli Blouse Comfort:</strong> Our cholis are designed to sit comfortably at the natural high waist, leaving a delicate 1–2 inch glimpse of midriff for lehengas. Back closures feature soft fabric-covered buttons and hook loops that lay flat against the spine.
                </p>
                <p>
                  <strong>Zero-Itch Guarantee:</strong> Because our linings are 100% pure mulmul cotton, there is never a need to wear an undershirt or slip underneath. The garment is already self-lined for newborn-level softness.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DADD]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[14px] font-semibold text-[#2B2224] block">
                      Need custom sizing assistance?
                    </span>
                    <a
                      href="https://wa.me/917291947002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[#962949] font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Chat with Master Stylist on WhatsApp (+91 7291947002)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
