import React, { useState, useEffect, useMemo } from 'react';
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
  heroDesiDesktop,
  heroLuxeDesktop,
  ageBaby,
  ageToddler,
  ageKids,
  brandStoryImage,
} from '../assets/images';

interface OccasionsLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: string;
}

// ============================================================================
// 1. Ganesh Chaturthi Products (matching video 00:00 - 00:02)
// ============================================================================
export const ganeshChaturthiProducts: Product[] = [
  {
    id: 'ganpati-dhoti-kurta-set',
    name: 'Ganpati Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2250,
    mrp: 2690,
    discountPercent: 16,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Auspicious yellow hand-block printed kurta with readymade pre-pleated dhoti pants and gentle soft elastic waistband.',
  },
  {
    id: 'boy-ganesha-kurta-yellow',
    name: 'Boy Ganesha Kurta Set - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3290,
    mrp: 3890,
    discountPercent: 15,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: 'Pure Chanderi',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 52,
    description: 'Radiant turmeric yellow chanderi silk kurta with delicate golden zari motifs and matching ivory churidar pants.',
  },
  {
    id: 'boy-ganesha-kurta-cream',
    name: 'Boy Ganesha Kurta Set - Cream',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3290,
    mrp: 3890,
    discountPercent: 15,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Cream',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Heirloom cream raw-silk blend kurta detailed with Ganesha embroidered motif and maroon piping accents.',
  },
  {
    id: 'ganesh-blessing-kurta-pyjama',
    name: 'Ganesh Blessing Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'White',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 26,
    description: 'Featherlight pure mulmul white kurta with subtle golden embroidery and non-pinch comfort pyjama bottoms.',
  },
  {
    id: 'little-jugnu-3pc-bundi',
    name: 'Little Jugnu 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 2990,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Orange',
    badge: 'Festive Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Tangerine orange bundi jacket set over a crisp cotton-silk kurta and tailored matching straight trousers.',
  },
  {
    id: 'little-jugnu-dhoti-kurta',
    name: 'Little Jugnu Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Baby ceremonies'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Peach comfort cotton kurta with traditional gold foil border and easy slide-on ready pleated dhoti.',
  },
  {
    id: 'baby-boy-yellow-bandhani-set',
    name: 'Yellow Printed Bandhani Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1200,
    mrp: 1490,
    discountPercent: 19,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 19,
    description: 'Cheerful mustard yellow bandhani printed cotton kurta with breathable cotton mulmul pyjama pants.',
  },
  {
    id: 'lures-stripes-dhoti-kurta',
    name: 'Lures Stripes Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2050,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 22,
    description: 'Refreshing mint green woven stripe kurta with soft gold lurex accents and pre-stitched white dhoti.',
  },
];

// ============================================================================
// 2. Navratri & Durga Puja Products (matching video 00:03 - 00:05)
// ============================================================================
export const navratriProducts: Product[] = [
  {
    id: 'devi-durga-coord-cream',
    name: 'Devi Durga Co-ord Set - Cream',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Cream',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 39,
    description: 'Ethereal cream crop choli and gathered festive skirt with intricate temple threadwork and mirror details.',
  },
  {
    id: 'devi-durga-coord-red',
    name: 'Devi Durga Co-ord Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: 'Festive Twirl',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Navratri', 'Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 48,
    description: 'Sindoor red celebratory top and flared palazzo set with golden gotta patti borders and tassel tie-ups.',
  },
  {
    id: 'devi-durga-angrakha-red',
    name: 'Devi Durga Angrakha Set - Red',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3450,
    mrp: 4100,
    discountPercent: 16,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Red',
    badge: 'Pure Silk Blend',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Puja', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 43,
    description: 'Traditional crimson angrakha featuring authentic gota work, handmade latkans and twirling sharara pants.',
  },
  {
    id: 'devi-durga-lehenga-red',
    name: 'Devi Durga Lehenga Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 4290,
    mrp: 4990,
    discountPercent: 14,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '6-7 Y'],
    color: 'Red',
    badge: 'Heirloom Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 56,
    description: 'Regal red pure chanderi silk lehenga with heavy zari hem, puff sleeve choli and tissue net dupatta.',
  },
  {
    id: 'desi-girl-sari-set-pink',
    name: "D' Desi Girl Sari Set - Pink",
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3392,
    mrp: 3990,
    discountPercent: 15,
    image: productImages.pattu,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.pattu, productImages.sharara],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 37,
    description: 'Ready-to-wear pre-stitched baby sari set in hot pink chiffon with elastic waist for non-slip festive dancing.',
  },
  {
    id: 'desi-girl-sari-set-blue',
    name: "D' Desi Girl Sari Set - Blue",
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3392,
    mrp: 3990,
    discountPercent: 15,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Blue',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 34,
    description: 'Royal sapphire blue pre-draped sari with sparkling gold sequin border and halter sweetheart blouse.',
  },
  {
    id: 'hoot-raani-coord-set',
    name: 'Hoot Raani Co-ord Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.front, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Brown',
    badge: 'Twirl Ready',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Navratri', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 25,
    description: 'Whimsical printed peplum kurti with flared tiered sharara trousers for comfortable garba celebration.',
  },
  {
    id: 'hawa-mahal-kurta-set',
    name: 'Hawa Mahal Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: 'Hand Block',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 42,
    description: 'Dusty rose Jaipur hand-blocked kurti with scalloped border and featherlight mulmul straight pants.',
  },
];

// ============================================================================
// 3. Dussehra & Diwali Products (matching video 00:06 - 00:09)
// ============================================================================
export const dussehraDiwaliProducts: Product[] = [
  {
    id: 'hanuman-blessing-kurta-yellow',
    name: 'Hanuman Blessing Kurta Pyjama - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 50,
    description: 'Sun yellow festive organic cotton kurta with hand-embroidered blessing motif and soft drawstring pyjamas.',
  },
  {
    id: 'jai-shri-ram-kurta-red',
    name: 'Jai Shri Ram Kurta Pyjama Set - Red',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Red',
    badge: 'Auspicious Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 61,
    description: 'Deep crimson silk-cotton kurta with gold kiran lace trim, designed for Dussehra and Diwali festivities.',
  },
  {
    id: 'jai-shri-ram-kurta-yellow',
    name: 'Jai Shri Ram Kurta Pyjama - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Yellow',
    badge: 'Soft Mulmul',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Dussehra', 'Diwali', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 33,
    description: 'Marigold yellow auspicious festive kurti set with featherlight lining and easy dressing front buttons.',
  },
  {
    id: 'divine-bow-dhoti-cream',
    name: 'Divine Bow Dhoti Kurta Set - Cream',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 47,
    description: 'Cream silk blend angrakha with delicate hand-tied side tassels and festive ready-to-wear dhoti trousers.',
  },
  {
    id: 'firecracker-nehru-red',
    name: 'Firecracker Nehru Jacket Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: 'Brocade Silk',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Diwali', 'Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Celebratory red brocade nehru waistcoat layered over an ivory kurta and comfortable churidar.',
  },
  {
    id: 'firecracker-nehru-pink',
    name: 'Firecracker Nehru Jacket Set - Pink',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Pure Chanderi',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 29,
    description: 'Fuchsia pink floral zari jacket with wooden carved buttons, perfect for Diwali evening gatherings.',
  },
  {
    id: 'firecracker-nehru-yellow',
    name: 'Firecracker Nehru Jacket Set - Yellow',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.bandhani,
    hoverImage: productImages.front,
    galleryImages: [productImages.bandhani, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: 'Silk Blend',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 41,
    description: 'Golden yellow festive vest with mandarin collar, soft cotton lining and matching bottoms.',
  },
  {
    id: 'pataka-baby-girl-angrakha-pink',
    name: 'Pataka Baby Girl Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2450,
    mrp: 2990,
    discountPercent: 18,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Pink',
    badge: 'Gota Borders',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 54,
    description: 'Playful baby pink angrakha kurti with authentic golden gota borders and soft flared tulip pants.',
  },
];

// ============================================================================
// 4. Baby Ceremonies Products (Milestones, Naming, Annaprashan & Mundan)
// ============================================================================
export const babyCeremoniesProducts: Product[] = [
  {
    id: 'annaprashan-angrakha-yellow',
    name: 'Annaprashan First Food Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: 'Organic Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Annaprashan', 'Puja'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Traditional turmeric yellow side-tie angrakha with organic mulmul lining for baby’s sacred first food milestone.',
  },
  {
    id: 'mundan-silk-dhoti-kurta',
    name: 'Mundan Silk Dhoti Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2190,
    mrp: 2650,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Soft Lining',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Mundan', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 39,
    description: 'Pristine ivory chanderi silk kurta with pure zari borders and skin-soft seamless lining for baby’s head shaving ceremony.',
  },
  {
    id: 'naming-ceremony-peplum-jhabla',
    name: 'Naming Ceremony Peplum Jhabla Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1790,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['000M (<2.5 KG)', '00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Peach',
    badge: 'Pure Mulmul',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Baby Welcome & Naming'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 33,
    description: 'Ultra-gentle pastel peach jhabla top with matching bloomer shorts crafted from chemical-free organic cotton.',
  },
  {
    id: 'heirloom-baby-welcome-set',
    name: 'Heirloom Baby Welcome Romper Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1850,
    mrp: 2250,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Pink',
    badge: 'Soft Seams',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Baby Welcome & Naming'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 28,
    description: 'Blush pink celebratory newborn outfit with front overlap snaps for effortless changing and Zero-scratch tags.',
  },
  {
    id: 'kesariya-baby-dhoti-set',
    name: 'Kesariya Baby Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2050,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Orange',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 31,
    description: 'Auspicious kesariya orange traditional dhoti set with hand-tied golden cord latkans.',
  },
  {
    id: 'gulab-kalli-baby-sharara',
    name: 'Gulab Kalli Baby Sharara Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Pink',
    badge: 'Baby Safe',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 27,
    description: 'Rose petal pink tier peplum top with elasticated gathered sharara pants for picture-perfect milestone memories.',
  },
  {
    id: 'swarnam-pattu-pavadai-set',
    name: 'Swarnam Pattu Pavadai Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2590,
    mrp: 3100,
    discountPercent: 16,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Silk Heritage',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Annaprashan', 'Festive'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 40,
    description: 'Traditional green and golden woven pattu pavadai lehenga set with pure zari borders and soft cotton lining.',
  },
  {
    id: 'shree-angrakha-dhoti-pants',
    name: 'Shree Angrakha & Dhoti Pants',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.front, productImages.sharara],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Cream',
    badge: 'Hand Stitched',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 24,
    description: 'Cream angrakha with maroon piping and pre-draped dhoti trousers designed for effortless comfort.',
  },
];

// Circular category bubbles matching video
const occasionBubbles = [
  {
    id: 'all',
    label: 'ALL OCCASIONS',
    image: productImages.flatlay,
    tagline: 'All Festive Occasions',
  },
  {
    id: 'ganesh-chaturthi',
    label: 'GANESH CHATURTHI',
    image: ageBaby,
    tagline: 'Ganpati Celebrations',
  },
  {
    id: 'navratri',
    label: 'NAVRATRI',
    image: ageKids,
    tagline: '9 Nights of Twirls',
  },
  {
    id: 'diwali',
    label: 'DUSSEHRA & DIWALI',
    image: heroDesiDesktop,
    tagline: 'Auspicious Lights Edit',
  },
  {
    id: 'baby-ceremonies',
    label: 'BABY CEREMONIES',
    image: ageToddler,
    tagline: 'Milestones & Pujas',
  },
];

export const allOccasionProducts: Product[] = [
  ...ganeshChaturthiProducts,
  ...navratriProducts,
  ...dussehraDiwaliProducts,
  ...babyCeremoniesProducts,
];

const occasionFilterOptions = [
  { id: 'all', label: 'All Occasions' },
  { id: 'ganesh-chaturthi', label: 'Ganesh Chaturthi' },
  { id: 'navratri', label: 'Navratri Garba' },
  { id: 'diwali', label: 'Dussehra & Diwali' },
  { id: 'baby-ceremonies', label: 'Baby Ceremonies' },
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
  { name: 'Orange', hex: '#FFA500' },
];

export const OccasionsLandingPage: React.FC<OccasionsLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialFilter = 'all',
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialFilter);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialFilter) {
      setSelectedOccasion(initialFilter);
    }
  }, [initialFilter]);

  const handleBubbleClick = (id: string) => {
    setSelectedOccasion(id);
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
    setSelectedOccasion('all');
    setSelectedAges([]);
    setSelectedPrices([]);
    setSelectedColors([]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...allOccasionProducts];

    // 1. Occasion Filter
    if (selectedOccasion === 'ganesh-chaturthi') {
      const ganeshIds = new Set(ganeshChaturthiProducts.map((p) => p.id));
      result = result.filter(
        (p) => ganeshIds.has(p.id) || p.occasions?.some((o) => o.toLowerCase().includes('ganesh'))
      );
    } else if (selectedOccasion === 'navratri') {
      const navratriIds = new Set(navratriProducts.map((p) => p.id));
      result = result.filter(
        (p) =>
          navratriIds.has(p.id) ||
          p.occasions?.some(
            (o) => o.toLowerCase().includes('navratri') || o.toLowerCase().includes('garba')
          )
      );
    } else if (selectedOccasion === 'diwali') {
      const diwaliIds = new Set(dussehraDiwaliProducts.map((p) => p.id));
      result = result.filter(
        (p) =>
          diwaliIds.has(p.id) ||
          p.occasions?.some(
            (o) => o.toLowerCase().includes('diwali') || o.toLowerCase().includes('dussehra')
          )
      );
    } else if (selectedOccasion === 'baby-ceremonies') {
      const babyIds = new Set(babyCeremoniesProducts.map((p) => p.id));
      result = result.filter(
        (p) =>
          babyIds.has(p.id) ||
          p.occasions?.some(
            (o) => o.toLowerCase().includes('baby') || o.toLowerCase().includes('ceremon')
          )
      );
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
  }, [selectedOccasion, selectedAges, selectedPrices, selectedColors, sortBy]);

  const activeFilterCount =
    (selectedOccasion !== 'all' ? 1 : 0) +
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
            <span className="text-[#2B2224] font-semibold">upcoming occasions</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Handcrafted Festive Occasion Wear by Boota
          </div>
        </div>
      </div>

      {/* Main Header Title */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          upcoming occasions
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-2">
          From auspicious pujas and haldi rituals to midnight garba twirls and Diwali fireworks, dress your little one for lifetime memories.
        </p>
      </div>

      {/* Circular Quick Occasion Bubbles Row */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-8 md:gap-11 overflow-x-auto pb-2 no-scrollbar px-2">
          {occasionBubbles.map((bubble) => {
            const isSelected = selectedOccasion === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => handleBubbleClick(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden transition-transform duration-200 active:scale-95"
              >
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

                <span
                  className={`mt-2 text-[11px] sm:text-[12px] md:text-[12.5px] font-bold tracking-wider uppercase text-center transition-colors max-w-[110px] leading-tight ${
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

            {/* Filter Section 1: OCCASION */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Occasion
              </div>
              <div className="space-y-1.5">
                {occasionFilterOptions.map((occ) => {
                  const checked = selectedOccasion === occ.id;
                  let count = allOccasionProducts.length;
                  if (occ.id === 'ganesh-chaturthi') count = ganeshChaturthiProducts.length;
                  if (occ.id === 'navratri') count = navratriProducts.length;
                  if (occ.id === 'diwali') count = dussehraDiwaliProducts.length;
                  if (occ.id === 'baby-ceremonies') count = babyCeremoniesProducts.length;

                  return (
                    <label
                      key={occ.id}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="occasionFilter"
                          checked={checked}
                          onChange={() => setSelectedOccasion(occ.id)}
                          className="w-3.5 h-3.5 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{occ.label}</span>
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
                          checked={selectedColors.includes(col.name)}
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
                {selectedOccasion !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full">
                    <span>
                      Occasion:{' '}
                      {occasionFilterOptions.find((o) => o.id === selectedOccasion)?.label ||
                        selectedOccasion}
                    </span>
                    <button
                      onClick={() => setSelectedOccasion('all')}
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

            {/* Feature Banner when viewing a specific occasion */}
            {selectedOccasion === 'ganesh-chaturthi' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={ageBaby} alt="Ganesh Chaturthi" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Ganpati Bappa Morya
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Auspicious Yellows & Dhoti Sets
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Sacred festive haldi yellows, breathable Jaipuri angrakhas, and easy pre-pleated dhotis for blissful rituals.
                  </p>
                </div>
              </div>
            )}
            {selectedOccasion === 'navratri' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={ageKids} alt="Navratri Garba" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    9 Nights of Twirls
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Kutchi Mirrorwork & Bandhani
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Extra-flair circular lehengas, vibrant tassels, and sweat-absorbing pure mulmul linings designed for non-stop dandiya dancing.
                  </p>
                </div>
              </div>
            )}
            {selectedOccasion === 'diwali' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={heroDesiDesktop} alt="Diwali Lights" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Festival of Lights
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Laxmi Puja Grand Heirlooms
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Rich crimson reds, glistening gota borders, and handcrafted Chanderi sets blessed with auspicious charm.
                  </p>
                </div>
              </div>
            )}
            {selectedOccasion === 'baby-ceremonies' && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={ageToddler} alt="Baby Ceremonies" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Sacred First Milestones
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Namkaran & Annaprashan Attire
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Ultra-gentle seamless inner seams, organic washed cotton jhablas, and pre-tied soft dhotis for tender newborns.
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

              {/* Occasion Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Occasion</div>
                <div className="space-y-1.5">
                  {occasionFilterOptions.map((occ) => (
                    <label key={occ.id} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="radio"
                        name="mobileOccasion"
                        checked={selectedOccasion === occ.id}
                        onChange={() => setSelectedOccasion(occ.id)}
                        className="accent-[#962949]"
                      />
                      <span>{occ.label}</span>
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
