import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Scissors, Compass } from 'lucide-react';
import { productImages } from '../assets/images';
import brandStoryImg from '../assets/images/brand_story_boota_1790871016915.jpg';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onExploreCollection: (category?: string) => void;
  onNavigatePage: (page: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onExploreCollection,
  onNavigatePage,
}) => {
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
            <span className="text-[#962949] font-medium">About Boota</span>
          </nav>
        </div>
      </div>

      {/* Hero / Header Section */}
      <section className="pt-12 sm:pt-16 pb-12 bg-[#FFFDF9] border-b border-[#E8DADD]">
        <div className="max-w-[960px] mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
            Our Heritage &amp; Promise
          </span>
          <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-5">
            About Boota
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#6F6265] max-w-2xl mx-auto leading-[1.6]">
            Rooted in Jaipur’s living craft traditions, we handcraft celebratory heirlooms designed for the delicate skin, unhurried laughter, and boundless twirls of childhood.
          </p>
        </div>
      </section>

      {/* Founder Story & Why Boota Started (400–700 words genuine narrative) */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-sm bg-[#FFFDF9]">
                <img
                  src={brandStoryImg}
                  alt="Boota artisan workshop and founder crafting children's wear"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-[#FFFDF9] border-t border-[#E8DADD]">
                  <p className="text-[13px] text-[#6F6265] italic font-serif">
                    "A child should never have to endure itchiness or discomfort to look celebratory."
                  </p>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-[#962949] mt-1">
                    — The Boota Atelier, Jaipur
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-[#2B2224]">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-2">
                  Founder Story
                </span>
                <h2 className="font-serif font-semibold text-[28px] sm:text-[36px] text-[#2B2224] leading-[1.2]">
                  Why Boota Started
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.75] text-[#2B2224]">
                <p>
                  Boota began in a living room strewn with festive lehengas and itchy polyester linings. Like so many parents preparing for Diwali and family weddings, our founders searched tirelessly across boutiques for traditional Indian festive wear for their two-year-old daughter.
                </p>
                <p>
                  What they encountered was a heartbreakingly uniform reality: market racks were flooded with stiff, synthetic net fabrics, scratchy metallic zari threads directly abrading fragile skin, and ill-proportioned silhouettes that left children cranky and desperate to tear their clothes off within twenty minutes.
                </p>
                <p>
                  The industry assumed that because occasion wear is worn only for a few hours, discomfort is a necessary trade-off for grandeur. We fundamentally rejected that compromise. Childhood celebrations are made of impulsive twirls, sitting cross-legged on ancestral carpets, and falling asleep on a grandparent’s shoulder.
                </p>
                <p>
                  In 2021, Boota was born with a singular, uncompromising question: <em>What if children's ceremonial clothing was constructed with the reverence of museum-quality Indian textiles and the tenderness of newborn swaddles?</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft & Fabric Approach */}
      <section className="py-14 sm:py-18 bg-[#FFFDF9] border-y border-[#E8DADD]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-2">
              Uncompromising Standards
            </span>
            <h2 className="font-serif font-semibold text-[30px] sm:text-[38px] text-[#2B2224] leading-[1.2]">
              Our Craft &amp; Fabric Approach
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#6F6265] mt-3">
              Every detail is engineered from the inside out to ensure skin-contact surfaces are as soothing as a lullaby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[4px] border border-[#E8DADD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-[4px] bg-[#F9D0D6]/40 flex items-center justify-center text-[#962949] mb-5">
                  <Heart className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-serif font-semibold text-[22px] text-[#962949] mb-2.5">
                  100% Pure Mulmul Linings
                </h3>
                <p className="text-[14.5px] text-[#6F6265] leading-[1.65]">
                  Every lehenga skirt, choli bodice, and angrakha is fully lined with pre-washed, unbleached, ultra-fine cotton mulmul. Zero synthetic facing or hot nylon ever brushes against delicate skin.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8DADD]/60 text-[13px] font-medium text-[#962949]">
                Zero-abrasion internal seams
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[4px] border border-[#E8DADD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-[4px] bg-[#F9D0D6]/40 flex items-center justify-center text-[#962949] mb-5">
                  <Scissors className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-serif font-semibold text-[22px] text-[#962949] mb-2.5">
                  Slow Handloom Weaves
                </h3>
                <p className="text-[14.5px] text-[#6F6265] leading-[1.65]">
                  We partner directly with artisanal weaving families in Chanderi, Varanasi, and Jaipur. Our pure silks, featherlight tissue brocades, and hand-block prints preserve authentic heritage weaves without harmful chemical finishes.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8DADD]/60 text-[13px] font-medium text-[#962949]">
                Fair wage master artisans
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[4px] border border-[#E8DADD] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-[4px] bg-[#F9D0D6]/40 flex items-center justify-center text-[#962949] mb-5">
                  <Sparkles className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-serif font-semibold text-[22px] text-[#962949] mb-2.5">
                  Grow-With-Me Engineering
                </h3>
                <p className="text-[14.5px] text-[#6F6265] leading-[1.65]">
                  Children grow swiftly, but heirloom garments should endure. We craft generous 2.5-inch side seam allowances, adjustable drawstring waists, and hidden hem margins so each piece lasts across seasons and siblings.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-[#E8DADD]/60 text-[13px] font-medium text-[#962949]">
                Heirloom longevity across siblings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Team / Workshop Photography & Details */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-2">
                Jaipur Atelier
              </span>
              <h2 className="font-serif font-semibold text-[30px] sm:text-[38px] text-[#2B2224] leading-[1.2] mb-5">
                Real Hands Behind Every Stitch
              </h2>
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#6F6265] leading-[1.7]">
                <p>
                  At our Jaipur studio, each garment passes through the hands of three generations of master craftspeople. From the initial pattern drafting calibrated specifically for active little torsos, to the hand-sewn gota patti tassels and soft fabric buttons.
                </p>
                <p>
                  We do not mass-produce in faceless automated mills. Our garments are cut in small, mindful batches. Our tailors take pride in French seams (concealed raw edges), soft elastic casings wrapped in mulmul, and necklines tested to slide smoothly over toddler heads without tears.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-[13px] font-medium text-[#2B2224]">
                <span className="flex items-center gap-1.5 bg-[#FFFDF9] border border-[#E8DADD] px-3.5 py-1.5 rounded-[4px]">
                  <ShieldCheck className="w-4 h-4 text-[#962949]" /> Zero plastic fastenings
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9] border border-[#E8DADD] px-3.5 py-1.5 rounded-[4px]">
                  <ShieldCheck className="w-4 h-4 text-[#962949]" /> Nickel-free snaps
                </span>
                <span className="flex items-center gap-1.5 bg-[#FFFDF9] border border-[#E8DADD] px-3.5 py-1.5 rounded-[4px]">
                  <ShieldCheck className="w-4 h-4 text-[#962949]" /> AZO-free skin-safe dyes
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-xs">
                <img
                  src={productImages.detail}
                  alt="Close up of hand-stitched gota patti work"
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 bg-[#FFFDF9] text-[12px] text-[#6F6265] text-center border-t border-[#E8DADD]">
                  Hand-applied heritage Gota Patti
                </div>
              </div>
              <div className="rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-xs">
                <img
                  src={productImages.flatlay}
                  alt="Mulmul lined lehenga inner construction"
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 bg-[#FFFDF9] text-[12px] text-[#6F6265] text-center border-t border-[#E8DADD]">
                  Mulmul inner construction &amp; soft seams
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 bg-[#FFFDF9] border-t border-[#E8DADD] text-center">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="font-serif font-semibold text-[28px] sm:text-[36px] text-[#962949] mb-3">
            Experience the Boota Difference
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6F6265] mb-8 leading-[1.6]">
            Browse our celebratory edits, designed with boundless love, pure heritage fabrics, and unmatched comfort for your little ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onExploreCollection('GIRL')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#962949] text-[#FFFFFF] hover:bg-[#7D223C] text-[13.5px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
            >
              Explore Festive Collection
            </button>
            <button
              onClick={() => onNavigatePage('why-boota')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FFFFFF] text-[#962949] border border-[#962949] hover:bg-[#F9D0D6]/20 text-[13.5px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
            >
              Why Choose Boota?
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
