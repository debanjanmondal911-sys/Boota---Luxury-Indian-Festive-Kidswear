import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  X,
  Tag,
} from 'lucide-react';
import {
  productImages,
  heroFestiveDesktop,
  heroDesiDesktop,
  heroLuxeDesktop,
  brandStoryImage,
} from '../assets/images';

interface SaleLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: string;
}

// ============================================================================
// 1. BOOTA DESI SALE PRODUCTS (Handcrafted Heritage Festive Wear on Sale)
// ============================================================================
export const bootaDesiSaleProducts: Product[] = [
  {
    id: 'sale-desi-gulmohar-kurta',
    name: 'Gulmohar Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2390,
    discountPercent: 29,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Auspicious yellow hand-block printed cotton kurta with relaxed pyjama pants on special festive sale.',
  },
  {
    id: 'sale-desi-gulika-suit-set',
    name: 'Gulika Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1890,
    mrp: 2790,
    discountPercent: 32,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: '32% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 42,
    description: 'Blush pink floral hand-blocked kurta with delicate scalloped lace trims and tapered pants.',
  },
  {
    id: 'sale-desi-bandhani-gharara',
    name: 'Bandhani Gharara Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2890,
    discountPercent: 31,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: '31% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Karwa Chauth', 'Diwali', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 47,
    description: 'Traditional crimson red bandhani print gharara with matching peplum kurti and handmade gota tassels.',
  },
  {
    id: 'sale-desi-marigold-angrakha',
    name: 'Marigold Angrakha & Dhoti Pants',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1750,
    mrp: 2450,
    discountPercent: 28,
    image: productImages.flatlay,
    hoverImage: productImages.front,
    galleryImages: [productImages.flatlay, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: '28% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Haldi', 'Puja', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 29,
    description: 'Side-tie angrakha with hand-twisted tassels and soft elasticated dhoti bottoms.',
  },
  {
    id: 'sale-desi-kesariya-lehenga',
    name: 'Kesariya Cotton Lehenga Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2190,
    mrp: 2990,
    discountPercent: 26,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Orange',
    badge: '26% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Navratri', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 34,
    description: 'Saffron orange flared lehenga with lightweight mulmul dupatta and breathable choli top.',
  },
  {
    id: 'sale-desi-niloufer-anarkali',
    name: 'Niloufer Cotton Anarkali Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1950,
    mrp: 2690,
    discountPercent: 27,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Blue',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Mehendi', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 22,
    description: 'Indigo and sky-blue block printed tier anarkali with soft cotton churidar pants.',
  },
  {
    id: 'sale-desi-rudra-kurta-pyjama',
    name: 'Rudra Boys Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1590,
    mrp: 2190,
    discountPercent: 27,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Cream',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Puja', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Natural unbleached cotton kurta with maroon piping accents and easy slide-on pyjama pants.',
  },
  {
    id: 'sale-desi-amoli-peplum-sharara',
    name: 'Amoli Peplum Sharara Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2090,
    mrp: 2890,
    discountPercent: 27,
    image: productImages.front,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.front, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 36,
    description: 'Emerald green block-printed peplum top paired with two-tier gather sharara pants.',
  },
];

// ============================================================================
// 2. BOOTA PLAY SALE PRODUCTS (Everyday Twirls, Dresses & Easy-care Co-ords)
// ============================================================================
export const bootaPlaySaleProducts: Product[] = [
  {
    id: 'sale-play-roohi-twirl-dress',
    name: 'Roohi Tier Twirl Dress',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1990,
    discountPercent: 30,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: '30% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Full-flare cotton twirl dress with gentle flutter sleeves and wood button back closure.',
  },
  {
    id: 'sale-play-titli-skirt-top-set',
    name: 'Titli Skirt & Top Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1550,
    mrp: 2200,
    discountPercent: 29,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Party', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 32,
    description: 'Pastel peach peplum crop top paired with gathered cotton skirt and soft waist elastic.',
  },
  {
    id: 'sale-play-bhavna-coord-set',
    name: 'Bhavna Daily Co-ord Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1290,
    mrp: 1850,
    discountPercent: 30,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Mint Green',
    badge: '30% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 28,
    description: 'Ultra-breathable mint green printed shirt with matching relaxed shorts for all-day adventures.',
  },
  {
    id: 'sale-play-chulbuli-jumpsuit',
    name: 'Chulbuli Cotton Jumpsuit',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1450,
    mrp: 2050,
    discountPercent: 29,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 35,
    description: 'Comfortable sleeveless cotton jumpsuit with shoulder bow ties and pocket detail.',
  },
  {
    id: 'sale-play-zari-pocket-kurti',
    name: 'Playful Pocket Kurti Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1950,
    discountPercent: 28,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: '28% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Playtime', 'Festive', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.7,
    reviewCount: 24,
    description: 'Short twirl kurti with roomy hidden pockets and lightweight pedal pusher pants.',
  },
  {
    id: 'sale-play-neel-kurta-shorts',
    name: 'Neel Kurta & Shorts Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1250,
    mrp: 1750,
    discountPercent: 28,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Blue',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 30,
    description: 'Sky blue short sleeve band collar kurta with comfortable drawstring shorts.',
  },
  {
    id: 'sale-play-soni-pari-frock',
    name: 'Soni Pari Ruffle Frock',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1490,
    mrp: 2100,
    discountPercent: 29,
    image: productImages.back,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.back, productImages.sharara],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Lilac',
    badge: '29% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Party', 'Playtime', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 26,
    description: 'Lilac organic cotton dress with tier ruffled hemline and soft mulmul underlay.',
  },
  {
    id: 'sale-play-breeze-angrakha-top',
    name: 'Breeze Angrakha Casual Top',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 990,
    mrp: 1450,
    discountPercent: 31,
    image: productImages.flatlay,
    hoverImage: productImages.front,
    galleryImages: [productImages.flatlay, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'White',
    badge: '31% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 41,
    description: 'Pure mulmul daily crossover top with gentle side snap buttons and contrasting piping.',
  },
];

// ============================================================================
// 3. BOOTA LUXE SALE PRODUCTS (Pure Chanderi, Handworked Gota Patti & Zari)
// ============================================================================
export const bootaLuxeSaleProducts: Product[] = [
  {
    id: 'sale-luxe-chandrika-chanderi-lehenga',
    name: 'Chandrika Chanderi Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2990,
    mrp: 4190,
    discountPercent: 28,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Maroon',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Diwali', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 52,
    description: 'Regal maroon pure Chanderi silk lehenga with real silver-gold zari border and soft silk dupatta.',
  },
  {
    id: 'sale-luxe-swarnam-pattu-pavadai',
    name: 'Swarnam Pattu Pavadai Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2690,
    mrp: 3790,
    discountPercent: 29,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Green',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Annaprashan', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 48,
    description: 'Emerald green South Indian pure zari woven pattu pavadai with heirloom brocade border and pure cotton lining.',
  },
  {
    id: 'sale-luxe-little-jugnu-3pc-bundi',
    name: 'Little Jugnu 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2390,
    mrp: 3290,
    discountPercent: 27,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Orange',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 39,
    description: 'Festive brocade bundi vest over a crisp ivory kurta and matching tapered silk trousers.',
  },
  {
    id: 'sale-luxe-ananya-gota-patti-sharara',
    name: 'Ananya Gota Patti Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2790,
    mrp: 3890,
    discountPercent: 28,
    image: productImages.sharara,
    hoverImage: productImages.bandhani,
    galleryImages: [productImages.sharara, productImages.bandhani],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 41,
    description: 'Handworked Jaipur gota patti borders on pure tissue georgette peplum kurti and matching flared sharara.',
  },
  {
    id: 'sale-luxe-rajkumari-brocade-choli',
    name: 'Rajkumari Brocade Choli Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2890,
    mrp: 3990,
    discountPercent: 27,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Gold',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Wedding', 'Reception', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 33,
    description: 'Woven Benarasi brocade choli with heavy gathered lehenga skirt in champagne gold tones.',
  },
  {
    id: 'sale-luxe-mundan-chanderi-dhoti',
    name: 'Mundan Chanderi Dhoti Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2090,
    mrp: 2890,
    discountPercent: 27,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Mundan', 'Puja', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 37,
    description: 'Pristine raw-silk blend kurta with delicate embroidery and seamless skin-safe lining.',
  },
  {
    id: 'sale-luxe-sitara-organza-lehenga',
    name: 'Sitara Pure Organza Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3190,
    mrp: 4450,
    discountPercent: 28,
    image: productImages.detail,
    hoverImage: productImages.pattu,
    galleryImages: [productImages.detail, productImages.pattu],
    sizes: ['3-4 Y', '4-5 Y', '5-6 Y', '6-7 Y'],
    color: 'Lilac',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 30,
    description: 'Whisper-light pure silk organza lehenga hand-embroidered with micro sequins and scalloped borders.',
  },
  {
    id: 'sale-luxe-navratan-sherwani-set',
    name: 'Navratan Baby Sherwani Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2690,
    mrp: 3690,
    discountPercent: 27,
    image: productImages.bandhani,
    hoverImage: productImages.front,
    galleryImages: [productImages.bandhani, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Ivory',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 25,
    description: 'Ivory textured silk sherwani jacket with antique gold buttons and pre-pleated churidar pants.',
  },
];

// ============================================================================
// 4. SPECIAL OFFERS & LAST CHANCE (Sibling Sets, Baby Welcome & Archive Reductions)
// ============================================================================
export const specialOffersProducts: Product[] = [
  {
    id: 'sale-special-baby-welcome-romper',
    name: 'Heirloom Baby Welcome Romper Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1390,
    mrp: 2250,
    discountPercent: 38,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Pink',
    badge: '38% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Naming', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Blush pink celebratory newborn outfit with front overlap snaps for effortless changing and zero scratch tags.',
  },
  {
    id: 'sale-special-ganpati-dhoti-kurta',
    name: 'Ganpati Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2690,
    discountPercent: 37,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: '37% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 52,
    description: 'Auspicious yellow hand-block printed kurta with readymade pre-pleated dhoti pants and gentle elastic waist.',
  },
  {
    id: 'sale-special-sibling-duo-yellow',
    name: 'Festive Sibling Match Kurta Duo',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 3890,
    discountPercent: 36,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Yellow',
    badge: '36% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Haldi', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 39,
    description: 'Coordinated brother-sister festive look in hand-spun cotton Chanderi with delicate golden zari accents.',
  },
  {
    id: 'sale-special-peach-chiffon-sharara',
    name: 'Peach Chiffon Sharara Ensemble',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1890,
    mrp: 2990,
    discountPercent: 36,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '4-5 Y'],
    color: 'Peach',
    badge: '36% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 43,
    description: 'Soft layered peach chiffon sharara with gota accents and butter-soft mulmul lining.',
  },
  {
    id: 'sale-special-naming-ceremony-peplum',
    name: 'Naming Ceremony Peplum Jhabla',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1190,
    mrp: 1790,
    discountPercent: 33,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['000M (<2.5 KG)', '00M (2.5-3.5 KG)', '0M (3-5.2 KG)'],
    color: 'Peach',
    badge: '33% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Naming', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 37,
    description: 'Ultra-gentle pastel peach jhabla top with matching bloomer shorts crafted from chemical-free organic cotton.',
  },
  {
    id: 'sale-special-lures-stripes-dhoti',
    name: 'Lures Stripes Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1390,
    mrp: 2050,
    discountPercent: 32,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: '32% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Puja', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 27,
    description: 'Woven zari stripe kurta paired with ready-to-wear cotton dhoti pants for effortless festive dressing.',
  },
  {
    id: 'sale-special-kesariya-dhoti-kurta',
    name: 'Kesariya Baby Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1290,
    mrp: 2050,
    discountPercent: 37,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M'],
    color: 'Orange',
    badge: '37% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Festive', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 31,
    description: 'Auspicious kesariya orange traditional dhoti set with hand-tied golden cord latkans.',
  },
  {
    id: 'sale-special-gulab-kalli-sharara',
    name: 'Gulab Kalli Baby Sharara Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2590,
    discountPercent: 34,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Pink',
    badge: '34% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Festive', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 33,
    description: 'Rose petal pink tier peplum top with elasticated gathered sharara pants for picture-perfect memories.',
  },
];

// Circular category bubbles matching video and girl page
const saleBubbles = [
  {
    id: 'all',
    label: 'ALL SALE',
    image: productImages.flatlay,
    tagline: 'Up to 40% Off',
  },
  {
    id: 'desi',
    label: 'BOOTA DESI SALE',
    image: heroDesiDesktop,
    tagline: 'Festive & Heritage',
  },
  {
    id: 'play',
    label: 'BOOTA PLAY SALE',
    image: productImages.sharara,
    tagline: 'Twirls & Everyday',
  },
  {
    id: 'luxe',
    label: 'BOOTA LUXE SALE',
    image: heroLuxeDesktop,
    tagline: 'Pure Silks & Zari',
  },
  {
    id: 'special',
    label: 'SPECIAL OFFERS',
    image: brandStoryImage,
    tagline: 'Last Chance & Bundles',
  },
];

export const allSaleProducts: Product[] = [
  ...bootaDesiSaleProducts,
  ...bootaPlaySaleProducts,
  ...bootaLuxeSaleProducts,
  ...specialOffersProducts,
];

const saleCategoryFilterOptions = [
  { id: 'all', label: 'All Sale Items' },
  { id: 'desi', label: 'Boota Desi Sale' },
  { id: 'play', label: 'Boota Play Sale' },
  { id: 'luxe', label: 'Boota Luxe Sale' },
  { id: 'special', label: 'Special Offers' },
];

const discountFilterOptions = [
  { label: '40% & Above', value: '40' },
  { label: '35% & Above', value: '35' },
  { label: '30% & Above', value: '30' },
  { label: '25% & Above', value: '25' },
];

const ageFilterOptions = [
  { label: '0-12 Months', value: '0-12M' },
  { label: '1-3 Yrs', value: '1-3Y' },
  { label: '3-4 Yrs', value: '3-4Y' },
  { label: '4-6 Yrs', value: '4-6Y' },
  { label: '6-8 Yrs', value: '6-8Y' },
];

const priceFilterOptions = [
  { label: 'Under ₹1,200', value: 'under-1200' },
  { label: '₹1,200 - ₹1,800', value: '1200-1800' },
  { label: '₹1,800 - ₹2,500', value: '1800-2500' },
  { label: '₹2,500 & Above', value: 'above-2500' },
];

const colorFilterOptions = [
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Green', hex: '#2E8B57' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Red', hex: '#DC143C' },
  { name: 'Blue', hex: '#4169E1' },
  { name: 'Gold', hex: '#D4AF37' },
];

export const SaleLandingPage: React.FC<SaleLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialFilter = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('discount-high');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialFilter) {
      setSelectedCategory(initialFilter);
    }
  }, [initialFilter]);

  const handleBubbleClick = (id: string) => {
    setSelectedCategory(id);
  };

  const toggleDiscountFilter = (discount: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discount) ? prev.filter((d) => d !== discount) : [...prev, discount]
    );
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
    setSelectedCategory('all');
    setSelectedDiscounts([]);
    setSelectedAges([]);
    setSelectedPrices([]);
    setSelectedColors([]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...allSaleProducts];

    // 1. Category Filter
    if (selectedCategory === 'desi') {
      const desiIds = new Set(bootaDesiSaleProducts.map((p) => p.id));
      result = result.filter(
        (p) => desiIds.has(p.id) || p.collection?.toLowerCase().includes('desi')
      );
    } else if (selectedCategory === 'play') {
      const playIds = new Set(bootaPlaySaleProducts.map((p) => p.id));
      result = result.filter(
        (p) => playIds.has(p.id) || p.collection?.toLowerCase().includes('play')
      );
    } else if (selectedCategory === 'luxe') {
      const luxeIds = new Set(bootaLuxeSaleProducts.map((p) => p.id));
      result = result.filter(
        (p) => luxeIds.has(p.id) || p.collection?.toLowerCase().includes('luxe')
      );
    } else if (selectedCategory === 'special') {
      const specialIds = new Set(specialOffersProducts.map((p) => p.id));
      result = result.filter((p) => specialIds.has(p.id));
    }

    // 2. Discount Filter
    if (selectedDiscounts.length > 0) {
      const minDiscount = Math.min(...selectedDiscounts.map((d) => parseInt(d, 10)));
      result = result.filter((p) => (p.discountPercent || 0) >= minDiscount);
    }

    // 3. Age Filter
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

    // 4. Price Filter
    if (selectedPrices.length > 0) {
      result = result.filter((p) => {
        return selectedPrices.some((priceKey) => {
          if (priceKey === 'under-1200') return p.price < 1200;
          if (priceKey === '1200-1800') return p.price >= 1200 && p.price <= 1800;
          if (priceKey === '1800-2500') return p.price > 1800 && p.price <= 2500;
          if (priceKey === 'above-2500') return p.price > 2500;
          return false;
        });
      });
    }

    // 5. Color Filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        selectedColors.some((c) => p.color?.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // 6. Sorting
    if (sortBy === 'discount-high') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === 'price-low') {
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
  }, [selectedCategory, selectedDiscounts, selectedAges, selectedPrices, selectedColors, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedDiscounts.length +
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

          {/* Badge */}
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
              <span className="font-bold text-[13.5px] sm:text-[14px] text-[#962949]">
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
            <span className="text-[#2B2224] font-semibold">sale</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#962949] font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#962949]" />
            <span>Handcrafted Heirloom Kids Wear On Special Offer</span>
          </div>
        </div>
      </div>

      {/* Main Header Title */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          sale
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-2">
          Discover handcrafted festive heirlooms, pure cotton twirls & ceremonial silks at special archive prices.
        </p>
      </div>

      {/* Circular Sale Category Bubbles Row */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-7 md:gap-10 overflow-x-auto pb-2 no-scrollbar px-2">
          {saleBubbles.map((bubble) => {
            const isSelected = selectedCategory === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => handleBubbleClick(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden transition-transform duration-200 active:scale-95"
              >
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

                <span
                  className={`mt-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-center transition-colors max-w-[110px] leading-tight ${
                    isSelected ? 'text-[#962949]' : 'text-[#2B2224] group-hover:text-[#962949]'
                  }`}
                >
                  {bubble.label}
                </span>

                <span className="text-[10px] text-[#962949] font-medium hidden sm:block mt-0.5">
                  {bubble.tagline}
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
                <option value="discount-high">Discount: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best selling</option>
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

            {/* Filter Section 1: DISCOUNT */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Discount
              </div>
              <div className="space-y-1.5">
                {discountFilterOptions.map((disc) => {
                  const checked = selectedDiscounts.includes(disc.value);
                  const count = allSaleProducts.filter(
                    (p) => (p.discountPercent || 0) >= parseInt(disc.value, 10)
                  ).length;
                  return (
                    <label
                      key={disc.value}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleDiscountFilter(disc.value)}
                          className="w-3.5 h-3.5 rounded-xs border-gray-300 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{disc.label}</span>
                      </div>
                      <span className="text-[11px] text-[#6F6265]/80">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 2: CATEGORY / COLLECTION */}
            <div className="py-4 border-b border-[#E8DADD]">
              <div className="font-bold text-[#2B2224] uppercase text-[12px] tracking-wider mb-2.5">
                Collection
              </div>
              <div className="space-y-1.5">
                {saleCategoryFilterOptions.map((cat) => {
                  const checked = selectedCategory === cat.id;
                  let count = allSaleProducts.length;
                  if (cat.id === 'desi') count = bootaDesiSaleProducts.length;
                  if (cat.id === 'play') count = bootaPlaySaleProducts.length;
                  if (cat.id === 'luxe') count = bootaLuxeSaleProducts.length;
                  if (cat.id === 'special') count = specialOffersProducts.length;

                  return (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between text-[#55474B] hover:text-[#962949] cursor-pointer group py-0.5 select-none"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="saleCategoryFilter"
                          checked={checked}
                          onChange={() => setSelectedCategory(cat.id)}
                          className="w-3.5 h-3.5 text-[#962949] focus:ring-0 cursor-pointer accent-[#962949]"
                        />
                        <span className="text-[12.5px] font-medium">{cat.label}</span>
                      </div>
                      <span className="text-[11px] text-[#6F6265]/80">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 3: AGE */}
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

            {/* Filter Section 4: PRICE */}
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

            {/* Filter Section 5: COLOR */}
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
                    <option value="discount-high">Discount: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="best-selling">Best selling</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full">
                    <span>
                      Collection:{' '}
                      {saleCategoryFilterOptions.find((c) => c.id === selectedCategory)?.label ||
                        selectedCategory}
                    </span>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDiscounts.map((disc) => (
                  <span
                    key={disc}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F4] border border-[#E8DADD] text-[#962949] text-[12px] font-semibold rounded-full"
                  >
                    <span>Discount: {disc}%+</span>
                    <button onClick={() => toggleDiscountFilter(disc)} className="hover:text-black cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
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

            {/* Feature Banner when viewing a specific sale collection */}
            {selectedCategory === 'desi' && selectedDiscounts.length === 0 && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={heroDesiDesktop} alt="Boota Desi Sale" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Up to 40% Off Archive
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Boota Desi Festive Sale
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Heritage Jaipur block-prints, pure cotton angrakhas & auspicious sibling matching sets.
                  </p>
                </div>
              </div>
            )}
            {selectedCategory === 'play' && selectedDiscounts.length === 0 && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={productImages.sharara} alt="Boota Play Sale" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Up to 35% Off
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Boota Play Twirl Favorites
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Airy tiered shararas, easy-wear peplum sets, and breathable everyday celebrations.
                  </p>
                </div>
              </div>
            )}
            {selectedCategory === 'luxe' && selectedDiscounts.length === 0 && selectedAges.length === 0 && selectedPrices.length === 0 && selectedColors.length === 0 && (
              <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] mb-8 p-6 sm:p-8 flex flex-col justify-end min-h-[220px]">
                <img src={heroLuxeDesktop} alt="Boota Luxe Sale" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/40 to-transparent" />
                <div className="relative z-10 text-white max-w-lg">
                  <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                    Up to 45% Off Wedding Silk Heirlooms
                  </span>
                  <h3 className="font-serif text-[26px] sm:text-[32px] font-bold leading-tight mb-2">
                    Boota Luxe Grand Archive
                  </h3>
                  <p className="text-[13px] text-white/90 leading-relaxed">
                    Pure handloom Chanderi silks, opulent gota patti borders & royal heirloom sets.
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

              {/* Discount Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Discount</div>
                <div className="space-y-1.5">
                  {discountFilterOptions.map((disc) => (
                    <label key={disc.value} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDiscounts.includes(disc.value)}
                        onChange={() => toggleDiscountFilter(disc.value)}
                        className="accent-[#962949]"
                      />
                      <span>{disc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Collection Filters */}
              <div className="py-4 border-b border-[#E8DADD]">
                <div className="font-bold text-[12px] uppercase text-[#2B2224] mb-2">Collection</div>
                <div className="space-y-1.5">
                  {saleCategoryFilterOptions.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2 text-[13px] cursor-pointer">
                      <input
                        type="radio"
                        name="mobileSaleCategory"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="accent-[#962949]"
                      />
                      <span>{cat.label}</span>
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
