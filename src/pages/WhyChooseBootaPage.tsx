import React from 'react';
import { Check, ShieldCheck, Heart, Sparkles, Feather, Clock } from 'lucide-react';
import { productImages } from '../assets/images';
import brandStoryImg from '../assets/images/brand_story_boota_1790871016915.jpg';

interface WhyChooseBootaPageProps {
  onNavigateHome: () => void;
  onExploreCollection: () => void;
}

export const WhyChooseBootaPage: React.FC<WhyChooseBootaPageProps> = ({
  onNavigateHome,
  onExploreCollection,
}) => {
  const differentiators = [
    {
      number: '01',
      title: '100% Pure Natural Fabrics Touching Skin',
      subtitle: 'Pure Silk, Breathable Chanderi & Mulmul',
      description:
        'Children’s skin is up to 30% thinner and significantly more sensitive than adult skin. We exclusively source pure natural mulberry silks, lightweight cotton Chanderi, and breathable handlooms. We never substitute with synthetic polyester or heat-trapping nylon nets that cause redness and discomfort.',
      image: productImages.front,
      icon: Feather,
      highlight: 'Zero synthetic nets or polyester linings',
    },
    {
      number: '02',
      title: 'Cloud-Soft Mulmul Inner Lining On Every Seam',
      subtitle: 'Concealed French Seams & Wrapped Waistbands',
      description:
        'Every single piece in our collection—from regal lehengas to festive angrakhas—is lined with washed, featherlight cotton mulmul. All internal raw edges are encased in French seams, and elastic waistbands are cushioned within pure fabric layers to eliminate friction and pressure marks entirely.',
      image: productImages.flatlay,
      icon: Heart,
      highlight: 'Tested for all-day festive comfort',
    },
    {
      number: '03',
      title: 'Generous "Grow-With-Me" Seam Allowances',
      subtitle: 'Designed to Last Across Seasons and Siblings',
      description:
        'Children grow quickly, but festive heirlooms shouldn’t be outgrown after one wear. We intentionally engineer 2 to 2.5 inches of internal side seam allowances, adjustable drawstring waist ties, and generous hem margins so parents can easily let out garments as their child blossoms.',
      image: productImages.detail,
      icon: Clock,
      highlight: 'Up to 2.5 inches of built-in growth margin',
    },
    {
      number: '04',
      title: 'Child-First Ergonomic Silhouettes',
      subtitle: 'Tailored for Free Movement, Running & Twirls',
      description:
        'We design from the posture and active reality of childhood. Armholes are cut higher for free arm movement without riding up, lehenga skirts are balanced so little feet don’t trip, and dupattas are thoughtfully lightweight or pre-stitched so children can run freely without fussing with heavy drapes.',
      image: productImages.sharara,
      icon: Sparkles,
      highlight: 'Lightweight construction for effortless movement',
    },
    {
      number: '05',
      title: 'Authentic Jaipur Artisan Craftsmanship',
      subtitle: 'Heritage Gota Patti & Hand-Applied Embellishments',
      description:
        'We honor Jaipur’s centuries-old royal embellishment traditions. Our signature gota patti floral motifs and fabric tassels are hand-cut and individually stitched by generational artisans, providing authentic regal richness without scratchy machine-punched foils.',
      image: brandStoryImg,
      icon: ShieldCheck,
      highlight: 'Preserving generational Indian craft heritage',
    },
    {
      number: '06',
      title: 'Skin-Safe, Non-Toxic & Nickel-Free Trims',
      subtitle: 'Certified Hypoallergenic Details',
      description:
        'From lead-free, nickel-free snap buttons on baby sizes to certified AZO-free skin-safe dyes, every component is rigorously vetted. We ensure that our celebratory garments are as pure and gentle on your child as their daily nightwear.',
      image: productImages.pattu,
      icon: Check,
      highlight: 'Strictly hypoallergenic & skin-tested trims',
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
            <span className="text-[#962949] font-medium">Why Choose Boota?</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="pt-12 sm:pt-16 pb-12 bg-[#FFFDF9] border-b border-[#E8DADD]">
        <div className="max-w-[960px] mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
            The Boota Standard
          </span>
          <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-5">
            Why Choose Boota?
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#6F6265] max-w-2xl mx-auto leading-[1.6]">
            Every garment we create is an uncompromising balance between royal Indian ceremonial grandeur and the tender comfort required for active, joyful children.
          </p>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-16 sm:space-y-24">
          {differentiators.map((diff, index) => {
            const isEven = index % 2 === 1;
            const Icon = diff.icon;
            return (
              <div
                key={diff.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-sm bg-[#FFFDF9]">
                    <img
                      src={diff.image}
                      alt={diff.title}
                      className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-xs px-3.5 py-1.5 rounded-[4px] border border-[#E8DADD] text-[12px] font-semibold text-[#962949] shadow-xs">
                      {diff.highlight}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-[28px] font-semibold text-[#962949]/40">
                      {diff.number}
                    </span>
                    <div className="h-[1px] w-12 bg-[#E8DADD]" />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#962949]">
                      {diff.subtitle}
                    </span>
                  </div>

                  <h2 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#2B2224] leading-[1.25]">
                    {diff.title}
                  </h2>

                  <p className="text-[15px] sm:text-[16px] text-[#2B2224] leading-[1.75]">
                    {diff.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-[13.5px] font-medium text-[#962949]">
                    <Icon className="w-4 h-4" />
                    <span>Pure craft guarantee</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 bg-[#FFFDF9] border-t border-[#E8DADD] text-center">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="font-serif font-semibold text-[28px] sm:text-[34px] text-[#962949] mb-3">
            Pure Elegance, Zero Compromise
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#6F6265] mb-8 leading-[1.6]">
            Discover why thousands of mindful families trust Boota for their most treasured celebrations.
          </p>
          <button
            onClick={onExploreCollection}
            className="px-8 py-3.5 bg-[#962949] text-[#FFFFFF] hover:bg-[#7D223C] text-[13.5px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
          >
            Shop The Festive Collection
          </button>
        </div>
      </section>
    </div>
  );
};
