import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  productImages,
  heroFestiveDesktop,
  heroFestiveMobile,
  heroDesiDesktop,
  heroDesiMobile,
  heroLuxeDesktop,
  heroLuxeMobile,
  ageBaby,
  ageToddler,
  ageKids,
} from '../assets/images';

interface CollectionsLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: 'all' | 'desi' | 'play' | 'luxe';
}

// 1. Boota Desi Products
export const bootaDesiProducts: Product[] = [
  {
    id: 'gulmohar-kurta-pyjama',
    name: 'Gulmohar Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Auspicious yellow hand-block printed cotton kurta with relaxed pyjama pants.',
  },
  {
    id: 'gulika-suit-set-desi',
    name: 'Gulika Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 42,
    description: 'Fuchsia pink peplum kurta with white gota borders and tulip sharara pants.',
  },
  {
    id: 'vasant-kurta-pyjama',
    name: 'Vasant Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1790,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Peach',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Puja', 'Baby ceremonies'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 22,
    description: 'Gentle organic mulmul kurta with hand-carved wooden buttons and non-pinch waist pants.',
  },
  {
    id: 'petal-grace-suit-set',
    name: 'Petal Grace Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2660,
    mrp: 3200,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: 'New',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Mehendi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Sage green tiered peplum with delicate rose petal motifs and matching flared bottoms.',
  },
  {
    id: 'heritage-bloom-dhoti-set',
    name: 'Heritage Bloom Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Green',
    badge: 'Hand Block',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Festive', 'Annaprashan'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 19,
    description: 'Mint green hand-blocked kurta with ready-to-wear pre-pleated dhoti pants.',
  },
  {
    id: 'parampara-dhoti-kurta-set',
    name: 'Parampara Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Purple',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 27,
    description: 'Lilac and gold bordered angrakha with contrast purple dhoti pants.',
  },
  {
    id: 'peach-blossom-angrakha-desi',
    name: 'Peach Blossom Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2620,
    mrp: 3150,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 54,
    description: 'Peach side-tie angrakha with authentic gota work and twirl sharara pants.',
  },
  {
    id: 'purple-blossom-angrakha-desi',
    name: 'Purple Blossom Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2620,
    mrp: 3150,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Purple',
    badge: 'Few Pcs Left',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 36,
    description: 'Royal violet peplum top with hand-tied dori latkans and scalloped gharara pants.',
  },
];

// 2. Boota Play Products
export const bootaPlayProducts: Product[] = [
  {
    id: 'candy-stripe-peplum',
    name: 'Candy Stripe Peplum Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1690,
    discountPercent: 18,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Pink',
    badge: 'Everyday Twirls',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Play', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 29,
    description: 'Vibrant candy striped peplum with elasticated ankle trousers for uninhibited games.',
  },
  {
    id: 'bow-belle-top-pant',
    name: 'Bow Belle Top & Pant Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1650,
    mrp: 1990,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Peach',
    badge: 'Play Friendly',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Party', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 24,
    description: 'Soft pastel peplum with back bow accent and ultra-comfortable relaxed culottes.',
  },
  {
    id: 'little-miss-stripe-set',
    name: 'Little Miss Stripe Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1450,
    mrp: 1750,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.flatlay, productImages.sharara],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Day Out', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.7,
    reviewCount: 18,
    description: 'Mint and ivory striped breezy summer set tailored in featherlight voile.',
  },
  {
    id: 'gulabo-lehenga-play',
    name: 'Gulabo Lehenga Set with Bandana',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 4050,
    mrp: 4890,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Matching Bandana',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 47,
    description: 'Playful floral printed tiered lehenga with halter top and matching soft bandana.',
  },
  {
    id: 'amaya-suit-play',
    name: 'Amaya Suit Set - Lime Green',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 33,
    description: 'Lime green cotton-silk peplum with scalloped trim and stretch-fit comfort pants.',
  },
  {
    id: 'noor-kurta-play',
    name: 'Noor Kurta Set - Lavender',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1990,
    mrp: 2450,
    discountPercent: 19,
    image: productImages.pattu,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.pattu, productImages.flatlay],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Purple',
    badge: 'Soft Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Everyday Twirls', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 20,
    description: 'Pastel lavender A-line kurti with loose elasticated pajama pants.',
  },
  {
    id: 'mini-meadow-bandana-set',
    name: 'Mini Meadow Bandana Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1290,
    mrp: 1590,
    discountPercent: 19,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Purple',
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Play', 'Picnic'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 16,
    description: 'Floral printed comfort top with matching bandana and easy stretch bottoms.',
  },
  {
    id: 'cheetah-twirl-jhabla',
    name: 'Cheetah Twirl Jhabla Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1195,
    mrp: 1450,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M'],
    color: 'Yellow',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Daily Comfort', 'Play'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 28,
    description: 'Playful hand-printed jhabla top with matching bloomers in pure organic cotton.',
  },
];

// 3. Boota Luxe Products
export const bootaLuxeProducts: Product[] = [
  {
    id: 'gulnar-silk-lehenga-luxe',
    name: 'Gulnar Silk Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2899,
    mrp: 3499,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '6-7 Y'],
    color: 'Pink',
    badge: 'Pure Silk',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Grand Occasion'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 65,
    description: 'Heirloom Rani pink pure silk lehenga set with intricate hand-embroidered gota work.',
  },
  {
    id: 'noorani-tissue-sharara-luxe',
    name: 'Noorani Tissue Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3199,
    mrp: 3799,
    discountPercent: 16,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: 'Heirloom Craft',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 52,
    description: 'Opulent peach tissue chanderi peplum top with tiered sharara pants and kiran lace.',
  },
  {
    id: 'kanak-banarasi-pattu-luxe',
    name: 'Kanak Banarasi Pattu Pavada',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3399,
    mrp: 3999,
    discountPercent: 15,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '7-8 Y'],
    color: 'Green',
    badge: 'Heritage Brocade',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Milestones'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 38,
    description: 'Traditional brocade pattu pavada with temple zari border and contrast magenta choli.',
  },
  {
    id: 'chandani-chanderi-luxe',
    name: 'Chandani Chanderi Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2999,
    mrp: 3599,
    discountPercent: 17,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Handloom',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Blush pink handloom chanderi silk lehenga with delicate zari buttis and mulmul lining.',
  },
  {
    id: 'inara-peplum-luxe',
    name: 'Inara Peplum Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2550,
    mrp: 3100,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Peach',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 35,
    description: 'Powder pink peplum kurta with dabka work and voluminous gathered sharara.',
  },
  {
    id: 'aparajita-suit-luxe',
    name: 'Aparajita Suit Set - Violet',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.bandhani,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.bandhani, productImages.sharara],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '6-7 Y'],
    color: 'Purple',
    badge: 'Regal Edit',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Wedding', 'Reception'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 29,
    description: 'Royal violet silk kurti with pre-draped dhoti skirt and pure zari brocade accents.',
  },
  {
    id: 'gulbahar-bundi-luxe',
    name: 'Gulbahar 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 4290,
    mrp: 4990,
    discountPercent: 14,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'White',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 41,
    description: 'Cream silk kurta with hand-embroidered floral bundi jacket and straight trousers.',
  },
  {
    id: 'rose-garden-kurta-luxe',
    name: 'Rose Garden Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 2990,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Pure Silk Blend',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 22,
    description: 'Ivory chanderi kurta with delicate miniature rose embroidery and silk pyjama pants.',
  },
];

// Circular category bubbles matching video
const collectionBubbles = [
  {
    id: 'all',
    label: 'ALL',
    image: productImages.flatlay,
    tagline: 'All Boota Collections',
  },
  {
    id: 'desi',
    label: 'DESI',
    image: productImages.bandhani,
    tagline: 'Boota Desi',
  },
  {
    id: 'play',
    label: 'PLAY',
    image: productImages.sharara,
    tagline: 'Boota Play',
  },
  {
    id: 'luxe',
    label: 'LUXE',
    image: productImages.front,
    tagline: 'Boota Luxe',
  },
];

export const allCollectionProducts: Product[] = [
  ...bootaDesiProducts,
  ...bootaPlayProducts,
  ...bootaLuxeProducts,
];

const ageFilterOptions = [
  { label: '0-12 Months', value: '0-12M' },
  { label: '1-3 Yrs', value: '1-3Y' },
  { label: '3-4 Yrs', value: '3-4Y' },
  { label: '4-6 Yrs', value: '4-6Y' },
  { label: '6-8 Yrs', value: '6-8Y' },
];

const priceFilterOptions = [
  { label: 'Under ₹1,500', value: 'under-1500' },
  { label: '₹1,500 - ₹2,500', value: '1500-2500' },
  { label: '₹2,500 & Above', value: 'above-2500' },
];

const colorFilterOptions = [
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Red', hex: '#DC143C' },
  { name: 'Green', hex: '#2E8B57' },
  { name: 'Blue', hex: '#4169E1' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Gold', hex: '#D4AF37' },
  { name: 'White', hex: '#FFFFFF' },
];

export const CollectionsLandingPage: React.FC<CollectionsLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialFilter = 'all',
}) => {
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'desi' | 'play' | 'luxe'>(
    initialFilter
  );
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialFilter) {
      setSelectedCollection(initialFilter);
    }
  }, [initialFilter]);

  const handleBubbleClick = (id: string) => {
    setSelectedCollection(id as any);
  };

  const toggleAgeFilter = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const togglePriceFilter = (price: string) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedCollection('all');
    setSelectedAges([]);
    setSelectedPrices([]);
    setSelectedColors([]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...allCollectionProducts];

    // 1. Collection Filter
    if (selectedCollection === 'desi') {
      result = result.filter((p) => p.collection?.toLowerCase().includes('desi'));
    } else if (selectedCollection === 'play') {
      result = result.filter((p) => p.collection?.toLowerCase().includes('play'));
    } else if (selectedCollection === 'luxe') {
      result = result.filter((p) => p.collection?.toLowerCase().includes('luxe'));
    }

    // 2. Age Filter
    if (selectedAges.length > 0) {
      result = result.filter((p) => {
        return selectedAges.some((age) => {
          if (age === '0-12M') {
            return p.ageGroup === '0-12M' || p.sizes.some((s) => s.includes('M'));
          }
          if (age === '1-3Y') {
            return p.ageGroup === '1-3Y' || p.sizes.some((s) => s.includes('1-2') || s.includes('2-3'));
          }
          if (age === '3-4Y') {
            return p.sizes.some((s) => s.includes('3-4'));
          }
          if (age === '4-6Y') {
            return p.sizes.some((s) => s.includes('4-5') || s.includes('5-6'));
          }
          if (age === '6-8Y') {
            return p.sizes.some((s) => s.includes('6-7') || s.includes('7-8'));
          }
          return false;
        });
      });
    }

    // 3. Price Filter
    if (selectedPrices.length > 0) {
      result = result.filter((p) => {
        return selectedPrices.some((priceKey) => {
          if (priceKey === 'under-1500') return p.price < 1500;
          if (priceKey === '1500-2500') return p.price >= 1500 && p.price <= 2500;
          if (priceKey === 'above-2500') return p.price > 2500;
          return false;
        });
      });
    }

    // 4. Color Filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        selectedColors.some((c) => p.color?.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // 5. Sorting
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
  }, [selectedCollection, selectedAges, selectedPrices, selectedColors, sortBy]);

  const activeFilterCount =
    (selectedCollection !== 'all' ? 1 : 0) +
    selectedAges.length +
    selectedPrices.length +
    selectedColors.length;

  const renderProductCard = (product: Product) => {
    const isWishlisted = wishlistIds.includes(product.id);
    return (
      <div key={product.id} className="group flex flex-col relative">
        <div className="relative aspect-[3/4] w-full bg-[#FAF6F4] rounded-[4px] overflow-hidden border border-[#E8DADD]/70 transition-all duration-300">
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
                alt={`${product.name} view`}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            )}
          </div>

          {product.badge && (
            <div className="absolute top-2 left-2 pointer-events-none">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px] text-white bg-[#962949] shadow-2xs">
                {product.badge}
              </span>
            </div>
          )}

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

        <div className="pt-2 pb-1 flex flex-col justify-between flex-1">
          <h4
            onClick={() => onSelectProduct(product)}
            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h4>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-[13.5px] sm:text-[14px] text-[#2B2224]">
                Rs. {product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[11.5px] text-[#6F6265] line-through">
                  Rs. {product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-20 font-manrope">
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
            <span className="text-[#2B2224] font-semibold">all collections</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Boota Signature Curations
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "all collections" */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          all collections
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-2">
          From breathable Jaipur cotton angrakhas to handloom Chanderi silks, explore curated festive universes.
        </p>
      </div>

      {/* Circular Collection Bubbles Row matching video: DESI, PLAY, LUXE */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto pb-2 no-scrollbar px-2">
          {collectionBubbles.map((bubble) => {
            const isSelected = selectedCollection === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => handleBubbleClick(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden transition-transform duration-200 active:scale-95"
              >
                {/* Circular Image with active ring */}
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden border-2 bg-white transition-all duration-200 p-0.5 shadow-2xs ${
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
                  className={`mt-2 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-center transition-colors ${
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
          {/* Mobile Filter & Sort Bar */}
          <div className="lg:hidden w-full flex items-center justify-between py-2.5 border-b border-[#E8DADD] mb-4">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#962949] text-[#962949] rounded-[4px] text-[13px] font-semibold cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-[#6F6265]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-[#2B2224] focus:outline-hidden cursor-pointer text-[13px]"
              >
                <option value="best-selling">Best selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
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

            {/* Filter Section 1: COLLECTION */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Collection
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'desi', label: 'Boota Desi' },
                  { id: 'play', label: 'Boota Play' },
                  { id: 'luxe', label: 'Boota Luxe' },
                ].map((col) => {
                  const checked = selectedCollection === col.id;
                  const count = col.id === 'all'
                    ? allCollectionProducts.length
                    : allCollectionProducts.filter((p) => p.collection?.toLowerCase().includes(col.id)).length;
                  return (
                    <label
                      key={col.id}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="collectionFilter"
                          checked={checked}
                          onChange={() => setSelectedCollection(col.id as any)}
                          className="w-3.5 h-3.5 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{col.label}</span>
                      </div>
                      <span className="text-[11px] text-[#6F6265]/80">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 2: AGE */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Age
              </div>
              <div className="space-y-1.5">
                {ageFilterOptions.map((age) => {
                  const checked = selectedAges.includes(age.value);
                  return (
                    <label
                      key={age.value}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAgeFilter(age.value)}
                          className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{age.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 3: PRICE */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Price
              </div>
              <div className="space-y-1.5">
                {priceFilterOptions.map((price) => {
                  const checked = selectedPrices.includes(price.value);
                  return (
                    <label
                      key={price.value}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedPrices.includes(price.value)}
                          onChange={() => togglePriceFilter(price.value)}
                          className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{price.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 4: COLOR */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Colour
              </div>
              <div className="space-y-1.5">
                {colorFilterOptions.map((col) => {
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
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CATALOG GRID */}
          <main className="flex-1 w-full">
            {/* Catalog Toolbar: Showing Count & Sort Dropdown */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-[#E8DADD] mb-6">
              <span className="text-[13px] text-[#6F6265] font-medium">
                Showing <strong className="text-[#2B2224]">{filteredProducts.length}</strong> styles
              </span>

              {/* Sort by Dropdown */}
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

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCollection !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full">
                    <span>Collection: {selectedCollection.toUpperCase()}</span>
                    <button
                      onClick={() => setSelectedCollection('all')}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedAges.map((age) => (
                  <span
                    key={age}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full"
                  >
                    <span>Age: {age}</span>
                    <button onClick={() => toggleAgeFilter(age)} className="hover:text-black cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedPrices.map((price) => (
                  <span
                    key={price}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full"
                  >
                    <span>Price: {price}</span>
                    <button onClick={() => togglePriceFilter(price)} className="hover:text-black cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedColors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full"
                  >
                    <span>Color: {color}</span>
                    <button onClick={() => toggleColorFilter(color)} className="hover:text-black cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleClearAllFilters}
                  className="text-[12px] text-[#962949] font-bold hover:underline cursor-pointer ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Feature Banner when viewing a specific collection */}
            {selectedCollection === 'desi' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <picture className="absolute inset-0 w-full h-full">
                  <source media="(max-width: 640px)" srcSet={heroDesiMobile} />
                  <img src={heroDesiDesktop} alt="Boota Desi" className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Cotton Prints & Gota
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Hawamahal Edit
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Heritage angrakhas, hand-blocked bandhani ghararas & nostalgic festive silhouettes in breathable Jaipur cotton.
                  </p>
                </div>
              </div>
            )}
            {selectedCollection === 'play' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <picture className="absolute inset-0 w-full h-full">
                  <source media="(max-width: 640px)" srcSet={heroFestiveMobile} />
                  <img src={heroFestiveDesktop} alt="Boota Play" className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Floral Prints & Twirls
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Phool Bahaar
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Twirl-worthy peplums, breezy sets, and cheerful celebratory kurtis made for joyful celebrations and endless games.
                  </p>
                </div>
              </div>
            )}
            {selectedCollection === 'luxe' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <picture className="absolute inset-0 w-full h-full">
                  <source media="(max-width: 640px)" srcSet={heroLuxeMobile} />
                  <img src={heroLuxeDesktop} alt="Boota Luxe" className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Pure Silks & Brocades
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Rajgharana Heirlooms
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Pure handloom Chanderi silks, zardozi embroidery, and heirloom dupattas for grand wedding milestones.
                  </p>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-9">
              {filteredProducts.map(renderProductCard)}
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
                  className="px-5 py-2 bg-[#962949] text-white rounded-[4px] text-[13px] font-bold uppercase tracking-wider cursor-pointer hover:bg-[#7D223C] transition-colors"
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
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-xs">
          <div className="w-[85%] max-w-xs bg-white h-full ml-auto p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DADD]">
                <h3 className="font-bold text-[16px] text-[#2B2224]">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#6F6265] hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collection Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Collection</div>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Collections' },
                    { id: 'desi', label: 'Boota Desi' },
                    { id: 'play', label: 'Boota Play' },
                    { id: 'luxe', label: 'Boota Luxe' },
                  ].map((col) => (
                    <label key={col.id} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="radio"
                        name="mobileCollection"
                        checked={selectedCollection === col.id}
                        onChange={() => setSelectedCollection(col.id as any)}
                        className="accent-[#962949]"
                      />
                      <span>{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Age</div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {ageFilterOptions.map((age) => (
                    <label key={age.value} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAges.includes(age.value)}
                        onChange={() => toggleAgeFilter(age.value)}
                        className="accent-[#962949]"
                      />
                      <span>{age.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Price</div>
                <div className="space-y-1.5">
                  {priceFilterOptions.map((price) => (
                    <label key={price.value} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(price.value)}
                        onChange={() => togglePriceFilter(price.value)}
                        className="accent-[#962949]"
                      />
                      <span>{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Colour</div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {colorFilterOptions.map((col) => (
                    <label key={col.name} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(col.name)}
                        onChange={() => toggleColorFilter(col.name)}
                        className="accent-[#962949]"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-gray-300 inline-block shrink-0"
                        style={{ backgroundColor: col.hex }}
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
                className="flex-1 py-2 border border-[#E8DADD] rounded-[4px] text-[13px] font-bold cursor-pointer hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 bg-[#962949] text-white rounded-[4px] text-[13px] font-bold cursor-pointer hover:bg-[#7D223C]"
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
