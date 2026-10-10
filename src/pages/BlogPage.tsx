import React, { useState } from 'react';
import { Calendar, Share2, Copy, Check, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { allProducts } from '../data/products';
import { productImages } from '../assets/images';
import brandStoryImg from '../assets/images/brand_story_boota_1790871016915.jpg';

export interface BlogPost {
  id: string;
  title: string;
  category: 'Occasion guides' | 'Styling' | 'Size & care' | 'Festive calendar';
  date: string;
  excerpt: string;
  heroImage: string;
  readTime: string;
  content: string[];
  relatedProductIds: string[];
}

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'diwali-sibling-styling-guide',
    title: 'Coordinating Sibling Festive Wear Without Matching Exactly',
    category: 'Styling',
    date: 'October 15, 2026',
    readTime: '4 min read',
    excerpt:
      'Elevate your family festive portraits with harmonious color palettes, complementary handlooms, and joyful touches that let each child’s personality shine.',
    heroImage: productImages.sharara,
    relatedProductIds: ['gulnar-silk-lehenga', 'noorani-tissue-sharara'],
    content: [
      'The era of dressing siblings in identical carbon-copy outfits is gently yielding to a much more refined, timeless aesthetic: coordinated harmony. Rather than dressing a four-year-old sister and two-year-old brother in identical fabric yards, modern celebratory dressing focuses on shared color undertones, tactile handloom textures, and thoughtful heritage accents.',
      'When styling siblings for Diwali or a family Sangeet, begin by picking an anchor shade from your primary heritage ensemble. If your daughter is wearing our Gulnar Silk Lehenga in deep Rani Pink, don’t look for an identical pink kurta for your son. Instead, select a warm saffron, ivory, or pale peach cotton Chanderi angrakha, accented with subtle pink gota patti edging.',
      'Always prioritize physical comfort over rigid coordination. A younger toddler will invariably move more, crawl on carpets, and need quick access for diaper checks. Ensuring their base layer is ultra-soft mulmul cotton while sharing the celebratory mood through handloom texture creates pictures you’ll cherish for decades without a single tear on celebration day.',
    ],
  },
  {
    id: 'haldi-mehendi-kids-fabric-guide',
    title: 'The Ultimate Guide to Dressing Little Ones for Haldi & Mehendi',
    category: 'Occasion guides',
    date: 'September 28, 2026',
    readTime: '5 min read',
    excerpt:
      'From haldi-friendly turmeric hues to smudge-free lightweight silhouettes, here is how to keep children joyful throughout outdoor wedding rituals.',
    heroImage: productImages.front,
    relatedProductIds: ['gulnar-silk-lehenga', 'chand-sitara-kurta-set'],
    content: [
      'Haldi and Mehendi ceremonies are among the most joyous rituals of Indian weddings—bursting with dhol beats, fragrant flower petals, and sunlight. Yet for young children, outdoor day ceremonies with thick pastes and warm sunshine can quickly become overwhelming if their clothing isn’t carefully chosen.',
      'Natural Turmeric-Friendly Hues: When choosing an ensemble for the Haldi ceremony, embrace cheerful yellows, marigold oranges, and warm mustards. If turmeric paste inadvertently brushes against the sleeve, the garment remains unstained and ceremonial.',
      'Breathability Is King: Outdoor day functions require fabrics that breathe naturally. Pure cotton Chanderi and hand-block mulmul allow natural air circulation, preventing prickly heat. Avoid stiff heavy brocades during afternoon poolside rituals and save the heavier silks for evening receptions.',
    ],
  },
  {
    id: 'caring-for-pure-silk-kids-wear',
    title: 'How to Care for & Preserve Handcrafted Kids Silk Lehengas',
    category: 'Size & care',
    date: 'September 10, 2026',
    readTime: '3 min read',
    excerpt:
      'Simple, time-tested heirloom preservation techniques so your child’s festive garments can be lovingly passed down to younger siblings.',
    heroImage: productImages.detail,
    relatedProductIds: ['noorani-tissue-sharara', 'gulnar-silk-lehenga'],
    content: [
      'Pure silk, zari tissue, and hand-embroidered gota patti are treasured craft heirlooms. While children’s active festivities can occasionally result in festive sweet crumbs or a drop of kheer, caring for these garments at home is surprisingly straightforward when done mindfully.',
      'Spot Cleaning First: Never rush to immerse a pure silk lehenga in water. For minor sugary spills, gently blot the spot with a clean, damp white mulmul cloth dipped in cold water. Never rub aggressively, as friction can fracture delicate silk fibers.',
      'Storage In Muslin: Plastic dry-cleaning bags trap atmospheric moisture and cause metallic zari to oxidize and darken over time. Always wrap your child’s festive ensembles in breathable unbleached mulmul or muslin covers with a few dried neem leaves.',
    ],
  },
  {
    id: 'indian-festive-calendar-2026-childrens-curation',
    title: 'The 2026 Festive Calendar: Curating Your Child’s Wardrobe',
    category: 'Festive calendar',
    date: 'August 24, 2026',
    readTime: '6 min read',
    excerpt:
      'A month-by-month curation guide for Navratri garba twirls, Diwali puja poetics, and winter wedding soirees for boys and girls.',
    heroImage: brandStoryImg,
    relatedProductIds: ['gulnar-silk-lehenga', 'noorani-tissue-sharara'],
    content: [
      'From the playful rhythm of Navratri dandiya nights to the quiet spiritual intimacy of Raksha Bandhan and the grand splendour of winter wedding processions, the Indian festive calendar is a tapestry of celebration.',
      'Planning your children’s festive wardrobe ahead of time ensures you avoid frantic last-minute boutique scrambles and ill-fitting garments. We recommend curating an adaptable three-piece capsule: an ultra-soft angrakha or kurta set for intimate home pujas, a twirl-friendly tiered sharara for daytime sangeets, and a regal pure silk lehenga for the grand evening.',
    ],
  },
];

const categories = [
  'All',
  'Occasion guides',
  'Styling',
  'Size & care',
  'Festive calendar',
] as const;

interface BlogPageProps {
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeArticle = sampleBlogPosts.find((p) => p.id === activeArticleId);

  const filteredPosts =
    selectedCategory === 'All'
      ? sampleBlogPosts
      : sampleBlogPosts.filter((p) => p.category === selectedCategory);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = (title: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Read this from Boota: "${title}"\n${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

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
            {activeArticle ? (
              <>
                <button
                  onClick={() => setActiveArticleId(null)}
                  className="hover:text-[#962949] transition-colors cursor-pointer"
                >
                  Blog
                </button>
                <span>/</span>
                <span className="text-[#962949] font-medium truncate max-w-[200px] sm:max-w-md">
                  {activeArticle.title}
                </span>
              </>
            ) : (
              <span className="text-[#962949] font-medium">Blog</span>
            )}
          </nav>
        </div>
      </div>

      {activeArticle ? (
        /* ================= Individual Article Page ================= */
        <article className="py-12 sm:py-16">
          <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
            {/* Back button */}
            <div className="max-w-[700px] mx-auto mb-6">
              <button
                onClick={() => setActiveArticleId(null)}
                className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#962949] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </button>
            </div>

            {/* Article Header (700px Reading Width) */}
            <div className="max-w-[700px] mx-auto mb-8 text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] bg-[#F9D0D6]/40 px-3 py-1 rounded-[4px]">
                  {activeArticle.category}
                </span>
                <span className="text-[13px] text-[#6F6265] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activeArticle.date}
                </span>
                <span className="text-[13px] text-[#6F6265]">•</span>
                <span className="text-[13px] text-[#6F6265]">{activeArticle.readTime}</span>
              </div>

              <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[50px] leading-[1.18] text-[#962949] mb-4">
                {activeArticle.title}
              </h1>

              <p className="text-[16px] sm:text-[17px] text-[#6F6265] leading-[1.6]">
                {activeArticle.excerpt}
              </p>
            </div>

            {/* Hero Image */}
            <div className="max-w-[900px] mx-auto mb-12 rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-sm">
              <img
                src={activeArticle.heroImage}
                alt={activeArticle.title}
                className="w-full h-[360px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content: EXACTLY 700px Reading Width as specified */}
            <div className="w-full max-w-[700px] mx-auto space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-[#2B2224] pb-10 border-b border-[#E8DADD]">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-[#2B2224]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Buttons Block (700px Width) */}
            <div className="max-w-[700px] mx-auto py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DADD]">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#2B2224]">
                <Share2 className="w-4 h-4 text-[#962949]" /> Share this guide:
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleShareWhatsApp(activeArticle.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFDF9] border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] rounded-[4px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-[#962949]" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Related Products Block */}
            <div className="max-w-[1100px] mx-auto pt-14">
              <div className="text-center mb-8">
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#962949] block mb-2">
                  Featured in this story
                </span>
                <h3 className="font-serif font-semibold text-[26px] sm:text-[32px] text-[#2B2224]">
                  Related Boota Heirlooms
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] p-3.5 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-[#FFFDF9] mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#962949]">
                      {product.collection}
                    </span>
                    <h4 className="font-serif font-semibold text-[17px] text-[#2B2224] group-hover:text-[#962949] transition-colors mt-0.5 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-[15px] text-[#2B2224]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp && (
                        <span className="text-[13px] text-[#6F6265] line-through">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* ================= Blog Listing Page ================= */
        <section className="py-12 sm:py-16">
          <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
            {/* Header */}
            <div className="max-w-[800px] mx-auto text-center mb-10">
              <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
                The Boota Chronicle
              </span>
              <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-4">
                Festive Journal &amp; Guides
              </h1>
              <p className="text-[15px] sm:text-[17px] text-[#6F6265] leading-[1.6]">
                Occasion dressing advice, fabric care rituals, and styling secrets directly from our Jaipur atelier.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-[4px] text-[13px] font-medium tracking-[0.03em] transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#962949] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFDF9] text-[#2B2224] border border-[#E8DADD] hover:border-[#962949]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Grid: Image, Category, Title, Date, 2-line excerpt */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setActiveArticleId(post.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#FFFDF9]">
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#962949] text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[2px] border border-[#E8DADD]">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[12.5px] text-[#6F6265]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title: Cormorant Garamond Semibold 24–28px */}
                      <h2 className="font-serif font-semibold text-[22px] sm:text-[24px] text-[#2B2224] group-hover:text-[#962949] transition-colors leading-[1.3] line-clamp-2">
                        {post.title}
                      </h2>

                      {/* 2-line Excerpt: Manrope 14–16px Muted Taupe #6F6265 */}
                      <p className="text-[14.5px] text-[#6F6265] leading-[1.6] line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#962949] group-hover:underline">
                      Read Complete Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
