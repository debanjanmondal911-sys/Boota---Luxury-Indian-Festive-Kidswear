import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem } from '../types';
import {
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import {
  productImages,
  ageBaby,
  ageToddler,
  ageKids,
  heroFestiveDesktop,
  heroDesiDesktop,
} from '../assets/images';

interface GirlsLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialAge?: string;
}

// 24 Authentic Girl Ethnic & Indo-Western Styles matching the video catalog
export const girlCatalogItems: Product[] = [
  {
    id: 'gulika-suit-set',
    name: 'Gulika Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: 'New',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Festive', 'Wedding', 'Family Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Vibrant handcrafted cotton-silk peplum kurta with matching dhoti pants and delicate gota border.',
    fabricDetails: 'Pure Chanderi Silk with Mulmul Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'peach-blossom-angrakha',
    name: 'Peach Blossom Angrakha Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2520,
    mrp: 2990,
    discountPercent: 15,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail, productImages.flatlay],
    sizes: ['3-6 M', '6-12 M', '1-2 Y', '2-3 Y', '4-5 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Mehendi', 'Sangeet', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 46,
    description: 'Subtle peach side-tie angrakha with gold kiran lace and gathered sharara pants for twirling.',
    fabricDetails: 'Organic Cotton Voile with Gold Foil Print',
    careInstructions: 'Gentle hand wash cold',
  },
  {
    id: 'purple-blossom-angrakha',
    name: 'Purple Blossom Angrakha Set',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2520,
    mrp: 3100,
    discountPercent: 19,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front, productImages.back],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Purple',
    badge: 'Few Pcs Left',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Diwali', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 29,
    description: 'Lilac and violet flared angrakha with golden hand-tied dori latkans and tulip dhoti pants.',
    fabricDetails: 'Brocade Silk with Soft Cotton Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'meera-angrakha-pink',
    name: 'Meera Angrakha Set - Pink',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3990,
    mrp: 4790,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front, productImages.sharara],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Wedding', 'Festive', 'Annaprashan'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 31,
    description: 'Hand-embroidered pure silk angrakha with layered gharara pants and contrast piping.',
    fabricDetails: 'Pure Raw Silk with Mulmul Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'meera-angrakha-green',
    name: 'Meera Angrakha Set - Green',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3990,
    mrp: 4790,
    discountPercent: 17,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '6-7 Y'],
    color: 'Green',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Mehendi', 'Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 52,
    description: 'Rich emerald green festive angrakha featuring authentic gota patti motifs and flared pants.',
    fabricDetails: 'Pure Silk Blend with Cotton Voile Lining',
    careInstructions: 'Gentle dry clean',
  },
  {
    id: 'aangan-angrakha-yellow',
    name: 'Aangan Angrakha Set - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3990,
    mrp: 4500,
    discountPercent: 11,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Puja', 'Baby Shower'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 44,
    description: 'Auspicious turmeric yellow peplum angrakha with golden handloom lace and comfy gathered trousers.',
    fabricDetails: 'Breathable Jaipur Cotton with Soft Lining',
    careInstructions: 'Cold hand wash with mild detergent',
  },
  {
    id: 'tara-gota-kurta-red',
    name: 'Tara Gota Kurta Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2820,
    mrp: 3400,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.front,
    galleryImages: [productImages.flatlay, productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Red',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Karwa Chauth', 'Wedding'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 27,
    description: 'Sindoor red straight kurta embellished with micro gota lines, paired with ivory culotte pants.',
    fabricDetails: 'Cotton Satin with Soft Lining',
    careInstructions: 'Dry clean recommended',
  },
  {
    id: 'gulnar-silk-lehenga-allgirls',
    name: 'Gulnar Silk Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2899,
    mrp: 3499,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y', '6-7 Y'],
    color: 'Pink',
    badge: 'New',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Sangeet', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 65,
    description: 'Heirloom Rani pink pure silk lehenga set with intricate hand-embroidered gota border and dupatta.',
    fabricDetails: '100% Pure Silk Chanderi with Cotton Mulmul',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'genda-phool-suit-set',
    name: 'Genda Phool Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3750,
    mrp: 4400,
    discountPercent: 15,
    image: productImages.bandhani,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.bandhani, productImages.sharara, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: 'Haldi Special',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 33,
    description: 'Marigold floral print flared peplum with mirror accents and elasticated pajama pants.',
    fabricDetails: 'Hand-block Printed Cotton',
    careInstructions: 'Gentle hand wash cold',
  },
  {
    id: 'bandhani-noor-angrakha',
    name: 'Bandhani Noor Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2250,
    mrp: 2700,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Best Value',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Puja', 'Baby ceremonies', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 41,
    description: 'Heritage yellow bandhani angrakha with white gota stripes and matching flared pants.',
    fabricDetails: 'Soft Cotton with Mulmul Lining',
    careInstructions: 'Hand wash cold',
  },
  {
    id: 'gulnoor-angrakha-set',
    name: 'Gulnoor Angrakha Set - Lilac',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2190,
    mrp: 2650,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Purple',
    badge: 'Few Pcs Left',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Birthday', 'Sangeet', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.7,
    reviewCount: 22,
    description: 'Delicate pastel lilac flared top with scalloped organza hem and matching straight trousers.',
    fabricDetails: 'Chanderi Silk with Soft Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'gulabo-lehenga-bandana',
    name: 'Gulabo Lehenga Set with Bandana',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 4050,
    mrp: 4890,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.front, productImages.flatlay, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Matching Bandana Included',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Birthday', 'Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 39,
    description: 'Festive floral print tiered lehenga skirt with halter-neck tie choli and matching soft hair bandana.',
    fabricDetails: 'Pure Cotton Mulmul & Silk Weave',
    careInstructions: 'Gentle cold wash',
  },
  {
    id: 'noor-kurta-set',
    name: 'Noor Kurta Set - Lavender',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1990,
    mrp: 2450,
    discountPercent: 19,
    image: productImages.detail,
    hoverImage: productImages.back,
    galleryImages: [productImages.detail, productImages.back, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Purple',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Everyday Twirls', 'Birthday', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 18,
    description: 'Comfortable button-down A-line kurti with loose elasticated pajama pants in refreshing lavender.',
    fabricDetails: '100% Breathable Organic Cotton',
    careInstructions: 'Machine wash gentle',
  },
  {
    id: 'amaya-suit-set',
    name: 'Amaya Suit Set - Lime Green',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.back,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.back, productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: 'Play Friendly',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday', 'Mehendi'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 25,
    description: 'Zesty lime green peplum top with scalloped sleeves and ankle-length stretch pants.',
    fabricDetails: 'Cotton Silk with Soft Voile Lining',
    careInstructions: 'Gentle hand wash',
  },
  {
    id: 'laher-suit-set',
    name: 'Laher Suit Set - Magenta',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Pink',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Diwali', 'Festive', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 28,
    description: 'Magenta leheriya print kurta set with gathered cuffs and comfortable non-pinch waist.',
    fabricDetails: 'Soft Jaipur Leheriya Cotton',
    careInstructions: 'Hand wash cold',
  },
  {
    id: 'inara-peplum-sharara',
    name: 'Inara Peplum Sharara - Powder Pink',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2550,
    mrp: 3100,
    discountPercent: 18,
    image: productImages.sharara,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.sharara, productImages.flatlay, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '6-7 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Sangeet', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 47,
    description: 'Powder pink peplum top with hand-worked dabka embroidery and two-tier flared sharara.',
    fabricDetails: 'Chanderi Silk with Mulmul Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'bandhani-bliss-lehenga',
    name: 'Bandhani Bliss Lehenga Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2650,
    mrp: 3200,
    discountPercent: 17,
    image: productImages.bandhani,
    hoverImage: productImages.back,
    galleryImages: [productImages.bandhani, productImages.back, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Purple',
    badge: 'New Arrival',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Festive', 'Wedding', 'Family Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 36,
    description: 'Royal purple bandhani lehenga with wide golden border and lightweight matching blouse.',
    fabricDetails: 'Pure Cotton Bandhani with Voile Lining',
    careInstructions: 'Dry clean recommended',
  },
  {
    id: 'aparajita-suit-set',
    name: 'Aparajita Suit Set - Violet',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail, productImages.front],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '6-7 Y'],
    color: 'Purple',
    badge: 'Regal Edit',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Wedding', 'Reception', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 19,
    description: 'Rich royal violet silk kurti paired with pre-draped dhoti skirt and brocade accents.',
    fabricDetails: 'Banarasi Brocade with Cotton Lining',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'kundan-headband-girls',
    name: 'Moonlit Kundan Headband',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORIES',
    price: 1250,
    mrp: 1499,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 24,
    description: 'Velvet-padded comfortable kundan headband designed not to pinch tender temples.',
    fabricDetails: 'Imitation Kundan, Pearls, Soft Velvet',
    careInstructions: 'Spot clean only',
  },
  {
    id: 'gulnar-silk-potli-girls',
    name: 'Embroidered Silk Potli Bag',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORIES',
    price: 990,
    mrp: 1250,
    discountPercent: 21,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['Free Size'],
    color: 'Pink',
    badge: 'Accessories',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 19,
    description: 'Miniature matching silk potli bag with handmade gota tassels for festive coins.',
    fabricDetails: 'Pure Chanderi Silk with Braided Dori',
    careInstructions: 'Dry clean only',
  },
  {
    id: 'kolhapuri-sandals-girls',
    name: 'Twirly Toes Kolhapuri Sandals',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORIES',
    price: 1490,
    mrp: 1790,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['Size 20', 'Size 22', 'Size 24', 'Size 26'],
    color: 'Gold',
    badge: 'Cushioned Sole',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 32,
    description: 'Soft memory foam padded festive gold sandals with flexible non-slip soles.',
    fabricDetails: 'Vegan Metallic Leather, Memory Foam',
    careInstructions: 'Wipe clean with soft cloth',
  },
  {
    id: 'silk-bangles-set-girls',
    name: 'Silk Thread Bangles Set (4 Pcs)',
    collection: 'Boota Desi',
    category: 'GIRL ACCESSORIES',
    price: 850,
    mrp: 1100,
    discountPercent: 23,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['1-2Y', '2-4Y', '4-6Y'],
    color: 'Pink',
    badge: 'Handmade',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 15,
    description: 'Featherlight silk wrapped mini bangles embellished with micro golden pearls.',
    fabricDetails: 'Silk Thread, Acrylic, Micro Zari',
    careInstructions: 'Store in airtight pouch',
  },
];

// Circular category tabs matching the video at top
const categoryBubbles = [
  {
    id: 'all',
    label: 'ALL GIRLS',
    image: productImages.front,
    subText: 'Full Edit',
  },
  {
    id: 'GIRLS ETHNIC WEAR',
    label: 'GIRLS ETHNIC WEAR',
    image: productImages.sharara,
    subText: 'Lehengas & Angrakhas',
  },
  {
    id: 'GIRLS INDO WESTERN WEAR',
    label: 'GIRLS INDO WESTERN WEAR',
    image: productImages.pattu,
    subText: 'Peplums & Dhotis',
  },
  {
    id: 'GIRL ACCESSORIES',
    label: 'GIRL ACCESSORIES',
    image: productImages.flatlay,
    subText: 'Jewels & Footwear',
  },
];

const ageFilterOptions = [
  { label: '000M (<2.5 Kg)', count: 34 },
  { label: '00M (2.5-3.5 Kg)', count: 60 },
  { label: '0M (3-5.2 Kg)', count: 105 },
  { label: '0-3 Months', count: 161 },
  { label: '3-6 Months', count: 219 },
  { label: '6-12 Months', count: 285 },
  { label: '1-2 Yrs', count: 321 },
  { label: '2-3 Yrs', count: 318 },
  { label: '3-4 Yrs', count: 324 },
  { label: '4-5 Yrs', count: 316 },
  { label: '5-6 Yrs', count: 290 },
  { label: '6-7 Yrs', count: 180 },
  { label: '7-8 Yrs', count: 150 },
];

const colorFilterOptions = [
  { name: 'Beige', hex: '#E8D8C8', count: 5 },
  { name: 'Black', hex: '#1E1E1E', count: 7 },
  { name: 'Blue', hex: '#4169E1', count: 50 },
  { name: 'Brown', hex: '#8B4513', count: 5 },
  { name: 'Cream', hex: '#FFFDD0', count: 22 },
  { name: 'Gold', hex: '#D4AF37', count: 5 },
  { name: 'Green', hex: '#2E8B57', count: 47 },
  { name: 'Grey', hex: '#808080', count: 5 },
  { name: 'Maroon', hex: '#800000', count: 2 },
  { name: 'Navy', hex: '#000080', count: 8 },
  { name: 'Orange', hex: '#FFA500', count: 15 },
  { name: 'Peach', hex: '#FFDAB9', count: 24 },
  { name: 'Pink', hex: '#FF69B4', count: 54 },
  { name: 'Purple', hex: '#8A2BE2', count: 35 },
  { name: 'Red', hex: '#DC143C', count: 24 },
  { name: 'Silver', hex: '#C0C0C0', count: 5 },
  { name: 'White', hex: '#FFFFFF', count: 25 },
  { name: 'Yellow', hex: '#FFD700', count: 36 },
];

export const GirlsLandingPage: React.FC<GirlsLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialAge,
}) => {
  const [selectedBubble, setSelectedBubble] = useState<string>('all');
  const [selectedAges, setSelectedAges] = useState<string[]>(() => {
    if (initialAge === '0-12M') return ['0-3 Months', '3-6 Months', '6-12 Months'];
    if (initialAge === '1-3Y') return ['1-2 Yrs', '2-3 Yrs'];
    if (initialAge === '3Y+') return ['3-4 Yrs', '4-5 Yrs', '5-6 Yrs'];
    return [];
  });
  const [selectedGenders, setSelectedGenders] = useState<string[]>(['Girls']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [showAllAges, setShowAllAges] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialAge === '0-12M') {
      setSelectedAges(['0-3 Months', '3-6 Months', '6-12 Months']);
    } else if (initialAge === '1-3Y') {
      setSelectedAges(['1-2 Yrs', '2-3 Yrs']);
    } else if (initialAge === '3Y+') {
      setSelectedAges(['3-4 Yrs', '4-5 Yrs', '5-6 Yrs']);
    }
  }, [initialAge]);

  // Combine parent products with catalog items
  const allGirlProducts = useMemo(() => {
    return girlCatalogItems;
  }, []);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let result = [...allGirlProducts];

    // Filter by quick bubble category
    if (selectedBubble !== 'all') {
      result = result.filter((p) => p.category === selectedBubble);
    }

    // Filter by Age
    if (selectedAges.length > 0) {
      result = result.filter((p) => {
        return selectedAges.some((age) => {
          if (age.includes('0-3') || age.includes('0M') || age.includes('3-6') || age.includes('6-12')) {
            return p.ageGroup === '0-12M' || p.sizes.some((s) => s.includes('M'));
          }
          if (age.includes('1-2') || age.includes('2-3') || age.includes('3-4')) {
            return p.ageGroup === '1-3Y' || p.sizes.some((s) => s.includes('Y'));
          }
          if (age.includes('4-5') || age.includes('5-6') || age.includes('6-7') || age.includes('7-8')) {
            return p.ageGroup === '3Y+' || p.sizes.some((s) => s.includes('Y'));
          }
          return true;
        });
      });
    }

    // Filter by Color
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        selectedColors.some((c) => p.color?.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      // Default: best-selling
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [allGirlProducts, selectedBubble, selectedAges, selectedColors, sortBy]);

  const activeFilterCount =
    (selectedBubble !== 'all' ? 1 : 0) +
    selectedAges.length +
    selectedColors.length +
    (selectedGenders.length > 1 ? 1 : 0);

  const handleClearAllFilters = () => {
    setSelectedBubble('all');
    setSelectedAges([]);
    setSelectedColors([]);
    setSelectedGenders(['Girls']);
  };

  const toggleAgeFilter = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-16 font-manrope">
      {/* Breadcrumb Bar */}
      <div className="w-full border-b border-[#E8DADD]/60 bg-[#FAF6F4]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 flex items-center justify-between text-[12.5px] text-[#6F6265]">
          <div className="flex items-center space-x-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#962949] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#2B2224] font-semibold">all girls</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Handcrafted Heirloom Kids Wear
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "all girls" */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          all girls
        </h1>
      </div>

      {/* Circular Quick Category Bubbles Row matching video */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-7 md:gap-10 overflow-x-auto pb-2 no-scrollbar px-2">
          {categoryBubbles.map((bubble) => {
            const isSelected = selectedBubble === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => setSelectedBubble(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden transition-transform duration-200 active:scale-95"
              >
                {/* Circular Image with active ring */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden border-2 bg-white transition-all duration-200 p-0.5 shadow-2xs ${
                    isSelected
                      ? 'border-[#962949] ring-2 ring-[#962949]/30 scale-105 shadow-sm'
                      : 'border-[#E8DADD] hover:border-[#962949]/60'
                  }`}
                >
                  <img
                    src={bubble.image}
                    alt={bubble.label}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Uppercase Category Label */}
                <span
                  className={`mt-2.5 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-center transition-colors max-w-[110px] leading-tight ${
                    isSelected ? 'text-[#962949]' : 'text-[#2B2224] group-hover:text-[#962949]'
                  }`}
                >
                  {bubble.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Left Sidebar Filters + Right Product Grid */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Mobile Filter Trigger Bar */}
          <div className="lg:hidden w-full flex items-center justify-between py-2 border-b border-[#E8DADD]">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#962949] text-[#962949] rounded-[4px] text-[13px] font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-[#6F6265]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-[#2B2224] focus:outline-hidden cursor-pointer"
              >
                <option value="best-selling">Best selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* LEFT SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block w-[240px] xl:w-[260px] shrink-0 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-3 text-[13px] no-scrollbar">
            {/* Header: FILTERS & Clear All */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DADD]">
              <span className="font-bold uppercase tracking-[0.08em] text-[#2B2224] text-[13.5px]">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="px-2.5 py-0.5 bg-[#962949] text-white text-[11px] font-bold rounded-full hover:bg-[#7D223C] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Clear all</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Section 1: AGE */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Age
              </div>
              <div className="space-y-1.5">
                {(showAllAges ? ageFilterOptions : ageFilterOptions.slice(0, 8)).map((age) => {
                  const checked = selectedAges.includes(age.label);
                  return (
                    <label
                      key={age.label}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAgeFilter(age.label)}
                          className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{age.label}</span>
                      </div>
                      <span className="text-[11px] text-[#6F6265]/80">({age.count})</span>
                    </label>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowAllAges(!showAllAges)}
                className="mt-2 text-[12px] text-[#962949] hover:underline font-semibold cursor-pointer block"
              >
                {showAllAges ? '- Show less' : '+ Show more'}
              </button>
            </div>

            {/* Filter Section 2: GENDER */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Gender
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Girls', count: 352 },
                  { label: 'Unisex', count: 190 },
                ].map((g) => (
                  <label
                    key={g.label}
                    className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer py-0.5 select-none"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedGenders.includes(g.label)}
                        onChange={() => {
                          setSelectedGenders((prev) =>
                            prev.includes(g.label)
                              ? prev.filter((item) => item !== g.label)
                              : [...prev, g.label]
                          );
                        }}
                        className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                      />
                      <span className="text-[12.5px] font-medium">{g.label}</span>
                    </div>
                    <span className="text-[11px] text-[#6F6265]/80">({g.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section 3: COLOUR */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Colour
              </div>
              <div className="space-y-1.5">
                {(showAllColors ? colorFilterOptions : colorFilterOptions.slice(0, 9)).map((col) => {
                  const checked = selectedColors.includes(col.name);
                  return (
                    <label
                      key={col.name}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleColorFilter(col.name)}
                          className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 inline-block shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-[12.5px] font-medium">{col.name}</span>
                      </div>
                      <span className="text-[11px] text-[#6F6265]/80">({col.count})</span>
                    </label>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setShowAllColors(!showAllColors)}
                className="mt-2 text-[12px] text-[#962949] hover:underline font-semibold cursor-pointer block"
              >
                {showAllColors ? '- Show less' : '+ Show more'}
              </button>
            </div>
          </aside>

          {/* RIGHT MAIN CATALOG GRID */}
          <main className="flex-1 w-full">
            {/* Catalog Toolbar: Showing Count & Sort Dropdown */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#E8DADD] mb-6">
              <span className="text-[13px] text-[#6F6265] font-medium">
                Showing <strong className="text-[#2B2224]">{filteredProducts.length}</strong> styles
              </span>

              {/* Sort by Dropdown matching video */}
              <div className="flex items-center space-x-2 text-[13px]">
                <span className="text-[#6F6265]">Sort by:</span>
                <div className="relative inline-block border border-[#E8DADD] rounded-[4px] bg-white px-3 py-1.5 shadow-2xs">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-medium text-[#2B2224] focus:outline-hidden cursor-pointer pr-5 text-[13px]"
                  >
                    <option value="best-selling">Best selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4-Column Product Grid on Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-9">
              {filteredProducts.map((product, index) => {
                const isWishlisted = wishlistIds.includes(product.id);

                return (
                  <React.Fragment key={product.id}>
                    {/* INLINE EDITORIAL PROMO BANNER: Slot 4 on 2nd row (like video timestamp 00:09) */}
                    {index === 7 && (
                      <div className="relative group overflow-hidden rounded-[4px] border border-[#E8DADD] bg-[#FDF8EE] p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                        <div>
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#962949] mb-1">
                            Festive Edit
                          </span>
                          <h3 className="font-serif font-bold text-[22px] sm:text-[24px] text-[#2B2224] leading-tight mb-2">
                            Ultimate Birthday Dresses
                          </h3>
                          <p className="text-[12.5px] text-[#6F6265] leading-relaxed mb-4">
                            With picture-perfect heirloom flair & breathable cotton lining.
                          </p>
                        </div>

                        <div className="aspect-[3/4] w-full rounded-[4px] overflow-hidden my-2">
                          <img
                            src={heroFestiveDesktop}
                            alt="Birthday Dresses"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedBubble('GIRLS INDO WESTERN WEAR')}
                          className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#962949] uppercase tracking-wider hover:underline"
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Standard Product Card */}
                    <div className="group flex flex-col relative">
                      {/* Image Frame in Portrait Aspect Ratio */}
                      <div className="relative aspect-[3/4] w-full bg-[#FAF6F4] rounded-[4px] overflow-hidden border border-[#E8DADD]/70 transition-all duration-300">
                        {/* Primary & Hover Image */}
                        <div
                          onClick={() => onSelectProduct(product)}
                          className="w-full h-full cursor-pointer relative overflow-hidden"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
                              product.hoverImage ? 'group-hover:opacity-0 transition-opacity duration-300' : ''
                            }`}
                            loading="lazy"
                          />
                          {product.hoverImage && (
                            <img
                              src={product.hoverImage}
                              alt={`${product.name} alternate view`}
                              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                          )}
                        </div>

                        {/* Top-Left Badge (NEW, SALE, FEW PCS LEFT) */}
                        {product.badge && (
                          <div className="absolute top-2 left-2 pointer-events-none">
                            <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-[3px] text-white shadow-2xs bg-[#962949]">
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* Top-Right Heart Wishlist Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2B2224] hover:text-[#962949] shadow-2xs transition-colors cursor-pointer"
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 stroke-[1.8] ${
                              isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product Details Info */}
                      <div className="pt-2.5 pb-1 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Title */}
                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="font-sans font-medium text-[13.5px] sm:text-[14px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h3>

                          {/* Price & Add to Cart button */}
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline space-x-1.5">
                              <span className="font-bold text-[14px] sm:text-[15px] text-[#2B2224]">
                                Rs. {product.price.toLocaleString('en-IN')}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[12px] text-[#6F6265] line-through">
                                  Rs. {product.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>

                            {/* Circular Shopping Cart button matching video */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
                              title="Add to Shopping Cart"
                              aria-label={`Add ${product.name} to bag`}
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FULL-WIDTH EMBEDDED EDITORIAL BREAK (like video timestamp 00:22) */}
                    {index === 11 && (
                      <div className="col-span-full my-6 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD] overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                          <div className="md:col-span-7 p-6 sm:p-10">
                            <span className="text-[12px] uppercase font-bold tracking-[0.14em] text-[#962949] block mb-2">
                              Explore Collection
                            </span>
                            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#2B2224] font-bold leading-tight mb-3">
                              Festive Edit 2026
                            </h2>
                            <p className="text-[14px] text-[#55474B] leading-relaxed max-w-lg mb-6">
                              Hand-finished pure silk lehengas, vibrant bandhani ghararas, and comfortable angrakha sets designed for uninhibited celebration.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedBubble('GIRLS ETHNIC WEAR');
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="px-6 py-2.5 bg-[#962949] text-white hover:bg-[#7D223C] text-[12.5px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-xs"
                            >
                              View All →
                            </button>
                          </div>
                          <div className="md:col-span-5 h-[260px] md:h-[340px]">
                            <img
                              src={heroDesiDesktop}
                              alt="Festive Edit Collection"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[16px] text-[#6F6265] mb-4">
                  No styles found matching the selected filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="px-5 py-2 bg-[#962949] text-white rounded-[4px] text-[13px] font-bold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50">
          <div className="w-[85%] max-w-xs bg-white h-full ml-auto p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DADD]">
                <h3 className="font-bold text-[16px] text-[#2B2224]">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#6F6265]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Age Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Age</div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {ageFilterOptions.map((age) => (
                    <label key={age.label} className="flex items-center space-x-2 text-[13px]">
                      <input
                        type="checkbox"
                        checked={selectedAges.includes(age.label)}
                        onChange={() => toggleAgeFilter(age.label)}
                        className="accent-[#962949]"
                      />
                      <span>{age.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Colour</div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {colorFilterOptions.map((col) => (
                    <label key={col.name} className="flex items-center space-x-2 text-[13px]">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(col.name)}
                        onChange={() => toggleColorFilter(col.name)}
                        className="accent-[#962949]"
                      />
                      <span>{col.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DADD] flex gap-2">
              <button
                onClick={handleClearAllFilters}
                className="flex-1 py-2 border border-[#E8DADD] rounded-[4px] text-[13px] font-bold"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 bg-[#962949] text-white rounded-[4px] text-[13px] font-bold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
