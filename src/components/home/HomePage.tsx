import React, { useState } from 'react';
import { Product } from '../../types';
import { allProducts, realCustomerReviews } from '../../data/products';
import { HeroBanner } from './HeroBanner';
import { ShopByAge } from './ShopByAge';
import { ProductCarousel } from './ProductCarousel';
import { ShopByCollection } from './ShopByCollection';
import { ShopByOccasion } from './ShopByOccasion';
import { BrandStory } from './BrandStory';
import { WhyBoota } from './WhyBoota';
import { CustomerReviews } from './CustomerReviews';
import { InstagramSection } from './InstagramSection';
import { NewsletterSection } from './NewsletterSection';
import { BrandStoryModal } from './BrandStoryModal';

interface HomePageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenReviewsModal: () => void;
  onFilterChange?: (filterType: string, value: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onOpenReviewsModal,
  onFilterChange,
}) => {
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  // 10 Admin-selected products for Best Sellers (Section 5)
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 10);

  // 10 Admin-selected products for New Arrivals / Featured (Section 7)
  const newArrivals = allProducts.filter((p) => p.isNewArrival).slice(0, 10);

  const handleCategoryNav = (cat: string) => {
    const match = allProducts.find(
      (p) =>
        p.category.toLowerCase().includes(cat.toLowerCase()) ||
        p.collection.toLowerCase().includes(cat.toLowerCase())
    ) || allProducts[0];
    onSelectProduct(match);
  };

  const handleAgeNav = (age: string) => {
    const match = allProducts.find((p) => p.ageGroup === age) || allProducts[0];
    onSelectProduct(match);
  };

  const handleCollectionNav = (col: string) => {
    const match = allProducts.find((p) => p.collection.toLowerCase().includes(col.toLowerCase())) || allProducts[0];
    onSelectProduct(match);
  };

  const handleOccasionNav = (occ: string) => {
    const match = allProducts.find((p) => p.occasions?.some((o) => o.toLowerCase().includes(occ.toLowerCase()))) || allProducts[0];
    onSelectProduct(match);
  };

  return (
    <div className="w-full bg-[#FFFDF9]">
      {/* Section 3: Hero Banner */}
      <HeroBanner onSelectCategory={handleCategoryNav} />

      {/* Section 4: Shop by Age */}
      <ShopByAge onSelectAge={handleAgeNav} />

      {/* Section 5: Best Sellers (10 admin-selected products) */}
      <ProductCarousel
        title="Best Sellers"
        subtitle="Our most loved heirloom styles, trusted by parents for grand festivities."
        badgeText="Curated Favorites"
        products={bestSellers}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onSelectProduct={onSelectProduct}
        onViewAll={() => handleCategoryNav('Bestsellers')}
      />

      {/* Section 6: Shop by Collection (Boota Desi, Boota Play, Boota Luxe) */}
      <ShopByCollection onSelectCollection={handleCollectionNav} />

      {/* Section 7: Featured / New Arrivals (10 admin-selected products) */}
      <ProductCarousel
        title="Featured & New Arrivals"
        subtitle="Fresh handlooms, vibrant bandhanis, and new festive twirl additions."
        badgeText="Just Landed"
        products={newArrivals}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onSelectProduct={onSelectProduct}
        onViewAll={() => handleCategoryNav('New Arrivals')}
      />

      {/* Section 8: Shop by Occasion (4-6 visual tiles) */}
      <ShopByOccasion onSelectOccasion={handleOccasionNav} />

      {/* Section 9: Brand Story — "Rooted in Tradition" (60-80 words, genuine craft image) */}
      <BrandStory onOpenStory={() => setStoryModalOpen(true)} />

      {/* Section 10: Why Boota (Trust strip: Delivery, COD, Easy exchange, Secure payments) */}
      <WhyBoota />

      {/* Section 11: Our Happy Customers (Automatically hidden until >= 5 real reviews) */}
      <CustomerReviews
        reviews={realCustomerReviews}
        onOpenReviewModal={onOpenReviewsModal}
      />

      {/* Section 12: Instagram (6 tiles desktop, 2x3 mobile, Follow @boota CTA) */}
      <InstagramSection />

      {/* Section 13: Newsletter ("Join the Boota family", unchecked WhatsApp opt-in) */}
      <NewsletterSection />

      {/* Brand Story Modal */}
      <BrandStoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
      />
    </div>
  );
};
