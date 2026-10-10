import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  productImages,
  ageBaby,
  ageToddler,
  ageKids,
  heroFestiveDesktop,
  heroDesiDesktop,
} from '../assets/images';

interface AccessoriesLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
}

// Full Authentic Accessories Catalog matching the reference video
export const accessoriesCatalogItems: Product[] = [
  {
    id: 'nayra-floral-pendant',
    name: 'Nayra Floral Pendant',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 1090,
    mrp: 1350,
    discountPercent: 19,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Puja'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 26,
    description: 'Delicate floral engraved kundan pendant on a soft skin-safe gold-plated chain.',
  },
  {
    id: 'pushpika-pearl-necklace',
    name: 'Pushpika Pearl Necklace',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 890,
    mrp: 1100,
    discountPercent: 19,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['Free Size'],
    color: 'White',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Lightweight string of faux freshwater pearls with adjustable silk cord closure for toddlers and kids.',
  },
  {
    id: 'chaand-kundan-necklace',
    name: 'Chaand Kundan Necklace',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 1350,
    mrp: 1650,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Heirloom',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Grand Occasion'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 42,
    description: 'Crescent moon shaped kundan necklace handcrafted with micro pearls and velvet-backed neckband.',
  },
  {
    id: 'noor-crescent-pendant',
    name: 'Noor Crescent Pendant',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 690,
    mrp: 850,
    discountPercent: 19,
    image: productImages.detail,
    hoverImage: productImages.back,
    galleryImages: [productImages.detail, productImages.back],
    sizes: ['Free Size'],
    color: 'Red',
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 19,
    description: 'Crimson enamel crescent moon pendant with pearl droplets on skin-friendly hypoallergenic thread.',
  },
  {
    id: 'noorani-pearl-necklace',
    name: 'Noorani Pearl Necklace',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 890,
    mrp: 1100,
    discountPercent: 19,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['Free Size'],
    color: 'Cream',
    badge: 'Few Pcs Left',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 22,
    description: 'Double strand dainty pearl choker designed with soft cotton thread tassels for zero neck friction.',
  },
  {
    id: 'pihu-floral-pendant',
    name: 'Pihu Floral Pendant',
    collection: 'Boota Desi',
    category: 'BABY ACCESSORY',
    price: 690,
    mrp: 850,
    discountPercent: 19,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['Free Size'],
    color: 'Green',
    badge: 'Comfort First',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Annaprashan'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 15,
    description: 'Featherlight baby pendant in jade floral enamel with cotton dori closure suitable for newborns and infants.',
  },
  {
    id: 'chandrika-maangtika',
    name: 'Chandrika Maangtika',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 1350,
    mrp: 1690,
    discountPercent: 20,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Wedding Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 38,
    description: 'Miniature kundan maangtika with gentle hair hook and pearl drop, specifically weighted for child comfort.',
  },
  {
    id: 'kundan-crescent-maangtika',
    name: 'Kundan Crescent Maangtika',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 990,
    mrp: 1250,
    discountPercent: 21,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 27,
    description: 'Artisan hand-set kundan crescent maangtika with non-slip hair slide pin.',
  },
  {
    id: 'lotus-bloom-bracelet',
    name: 'Lotus Bloom Pearl Bracelet',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 650,
    mrp: 790,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['Free Size (Adjustable)'],
    color: 'White',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 34,
    description: 'Enamel lotus motif with stretch pearl beads, tailored with safe rounded edges for small wrists.',
  },
  {
    id: 'gul-pearl-bracelet',
    name: 'Gul Pearl Bracelet',
    collection: 'Boota Luxe',
    category: 'BABY ACCESSORY',
    price: 650,
    mrp: 790,
    discountPercent: 18,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['Free Size (Adjustable)'],
    color: 'Pink',
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Puja', 'Baby ceremonies'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 17,
    description: 'Rose-tinted micro pearl bracelet with anti-snag smooth elastic cord.',
  },
  {
    id: 'komal-noor-pendant',
    name: 'Komal Noor Pendant',
    collection: 'Boota Desi',
    category: 'BOY ACCESSORY',
    price: 390,
    mrp: 490,
    discountPercent: 20,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Value',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Daily'],
    ageGroup: '1-3Y',
    rating: 4.7,
    reviewCount: 14,
    description: 'Geometric brass om/surya motif on soft woven cotton thread, ideal for young boys and unisex wear.',
  },
  {
    id: 'panna-hair-band',
    name: 'Panna Hair Band',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 290,
    mrp: 390,
    discountPercent: 26,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['Free Size'],
    color: 'Green',
    badge: 'Essential',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 22,
    description: 'Emerald green satin-wrapped comfort band with zero temple pressure.',
  },
  {
    id: 'surkh-noor-hair-band',
    name: 'Surkh Noor Hair Band',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 390,
    mrp: 490,
    discountPercent: 20,
    image: productImages.front,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.front, productImages.sharara],
    sizes: ['Free Size'],
    color: 'Red',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 29,
    description: 'Sindoor red velvet hair band featuring a central hand-embroidered gota flower button.',
  },
  {
    id: 'moonlit-kundan-headband-acc',
    name: 'Moonlit Kundan Headband',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 1250,
    mrp: 1499,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['Free Size'],
    color: 'Gold',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 48,
    description: 'Luxurious kundan studded flexible metal hairband fully encased in plush velvet cushion.',
  },
  {
    id: 'blossom-bun-scrunchie',
    name: 'Blossom Bun Scrunchie - Green',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 350,
    mrp: 450,
    discountPercent: 22,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['Free Size'],
    color: 'Green',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Play', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 19,
    description: 'Petal-shaped layered cotton scrunchie that turns simple buns into celebratory blooms.',
  },
  {
    id: 'genda-glow-parandi',
    name: 'Genda Glow Parandi',
    collection: 'Boota Desi',
    category: 'GIRL ACCESSORY',
    price: 450,
    mrp: 550,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['Free Size'],
    color: 'Yellow',
    badge: 'Haldi Special',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Mehendi'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 33,
    description: 'Braided thread hair parandi with woolen marigold pompoms and tinkling golden ghungroos.',
  },
  {
    id: 'marigold-magic-hair-clips',
    name: 'Marigold Magic Hair Clips (Pair)',
    collection: 'Boota Desi',
    category: 'BABY ACCESSORY',
    price: 350,
    mrp: 450,
    discountPercent: 22,
    image: productImages.flatlay,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.flatlay, productImages.sharara],
    sizes: ['Set of 2'],
    color: 'Yellow',
    badge: 'No-Slip Grip',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 38,
    description: 'Fabric-wrapped alligator clips featuring soft yellow marigold applique and zero metal exposure.',
  },
  {
    id: 'marigold-hair-band',
    name: 'Marigold Hair Band',
    collection: 'Boota Desi',
    category: 'GIRL ACCESSORY',
    price: 420,
    mrp: 520,
    discountPercent: 19,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['Free Size'],
    color: 'Yellow',
    badge: 'New',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Haldi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 16,
    description: 'Handcrafted marigold flower cluster set upon a gentle elastic band for festive hairstyles.',
  },
  {
    id: 'mini-meadow-bandana-purple',
    name: 'Mini Meadow Bandana - Purple',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 390,
    mrp: 490,
    discountPercent: 20,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['Free Size'],
    color: 'Purple',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Birthday', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 21,
    description: 'Soft triangle head kerchief in purple floral block print with stretch back elastic.',
  },
  {
    id: 'mini-meadow-bandana-green',
    name: 'Mini Meadow Bandana - Green',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 390,
    mrp: 490,
    discountPercent: 20,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['Free Size'],
    color: 'Green',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Birthday', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.7,
    reviewCount: 18,
    description: 'Sage green floral printed bandana with delicate crochet scalloped edging.',
  },
  {
    id: 'twirly-toes-sandals-champagne',
    name: 'Twirly Toes Kolhapuri - Champagne',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
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
    rating: 4.9,
    reviewCount: 45,
    description: 'Memory foam padded festive metallic sandals with anti-skid grooved flexible soles.',
  },
  {
    id: 'heer-bow-clip-black',
    name: 'Heer Bow Clip - Black',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 550,
    mrp: 690,
    discountPercent: 20,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['Free Size'],
    color: 'Black',
    badge: 'Classic',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Birthday', 'Party'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 15,
    description: 'Rich black velvet oversized hair bow on a secure spring clip with trailing ribbons.',
  },
  {
    id: 'roohani-bow-clip-cream',
    name: 'Roohani Bow Clip - Cream',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 790,
    mrp: 950,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['Free Size'],
    color: 'Cream',
    badge: 'Pre-Order',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Birthday'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 28,
    description: 'Ivory organza and silk layered bow with micro pearl embroidery and delicate French barrette.',
  },
  {
    id: 'heer-bow-clip-maroon',
    name: 'Heer Bow Clip - Maroon',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 550,
    mrp: 690,
    discountPercent: 20,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['Free Size'],
    color: 'Maroon',
    badge: 'Pre-Order',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 20,
    description: 'Heritage maroon silk velvet bow clip with subtle gold zardozi stitching on the edges.',
  },
  {
    id: 'classic-golden-bangles',
    name: 'Classic Golden Bangles (Set of 6)',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 450,
    mrp: 550,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['Size 1.8 (1-2Y)', 'Size 1.10 (2-4Y)', 'Size 2.0 (4-6Y)'],
    color: 'Gold',
    badge: 'Featherlight',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 52,
    description: 'Ultra-lightweight acrylic bangles coated with radiant gold zari foil, designed for tender wrists.',
  },
  {
    id: 'bubblegum-twist-bangles',
    name: 'Bubblegum Twist Bangles (Set of 6)',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 450,
    mrp: 550,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['Size 1.8 (1-2Y)', 'Size 1.10 (2-4Y)', 'Size 2.0 (4-6Y)'],
    color: 'Pink',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Birthday', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 39,
    description: 'Playful pastel pink thread wrapped mini bangles embellished with micro silver dots.',
  },
  {
    id: 'hot-pink-spark-bangles',
    name: 'Hot Pink Spark Bangles (Set of 6)',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 450,
    mrp: 550,
    discountPercent: 18,
    image: productImages.flatlay,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.flatlay, productImages.sharara],
    sizes: ['Size 1.8 (1-2Y)', 'Size 1.10 (2-4Y)', 'Size 2.0 (4-6Y)'],
    color: 'Pink',
    badge: 'Festive Twirl',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Vibrant fuchsia pink bangles wrapped in fine silk floss with golden kiran highlights.',
  },
  {
    id: 'mermaid-glow-bangles',
    name: 'Mermaid Glow Bangles (Set of 6)',
    collection: 'Boota Play',
    category: 'GIRL ACCESSORY',
    price: 450,
    mrp: 550,
    discountPercent: 18,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['Size 1.8 (1-2Y)', 'Size 1.10 (2-4Y)', 'Size 2.0 (4-6Y)'],
    color: 'Blue',
    badge: 'Summer Edit',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Birthday', 'Party'],
    ageGroup: '1-3Y',
    rating: 4.7,
    reviewCount: 23,
    description: 'Refreshing seafoam aqua bangles with iridescent shimmer and smooth inner bevel.',
  },
  {
    id: 'gulnar-silk-potli-acc',
    name: 'Gulnar Embroidered Silk Potli',
    collection: 'Boota Luxe',
    category: 'GIRL ACCESSORY',
    price: 990,
    mrp: 1250,
    discountPercent: 21,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['Free Size'],
    color: 'Pink',
    badge: 'Heirloom',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 36,
    description: 'Pure silk drawstring bag with handcrafted gota tassels for little festive treats.',
  },
];

// Circular category bubbles matching video
const accessoryCategoryBubbles = [
  {
    id: 'all',
    label: 'ALL ACCESSORIES',
    image: productImages.flatlay,
    subText: 'Complete Collection',
  },
  {
    id: 'BABY ACCESSORY',
    label: 'BABY ACCESSORY',
    image: ageBaby,
    subText: 'Gentle Hairclips & Pins',
  },
  {
    id: 'GIRL ACCESSORY',
    label: 'GIRL ACCESSORY',
    image: productImages.front,
    subText: 'Jewellery & Headbands',
  },
  {
    id: 'BOY ACCESSORY',
    label: 'BOY ACCESSORY',
    image: ageKids,
    subText: 'Pendants & Brooches',
  },
];

const accessoryAgeOptions = [
  { label: '6-12 Months', count: 1 },
  { label: '1-2 Yrs', count: 3 },
  { label: '2-3 Yrs', count: 5 },
  { label: '3-4 Yrs', count: 7 },
  { label: '4-5 Yrs', count: 7 },
  { label: '5-6 Yrs', count: 7 },
  { label: '6-7 Yrs', count: 7 },
  { label: '7-8 Yrs', count: 7 },
  { label: '8-10 Yrs', count: 6 },
];

const accessoryColorOptions = [
  { name: 'Beige', hex: '#E8D8C8', count: 2 },
  { name: 'Black', hex: '#1E1E1E', count: 4 },
  { name: 'Blue', hex: '#4169E1', count: 6 },
  { name: 'Brown', hex: '#8B4513', count: 2 },
  { name: 'Cream', hex: '#FFFDD0', count: 3 },
  { name: 'Gold', hex: '#D4AF37', count: 12 },
  { name: 'Green', hex: '#2E8B57', count: 17 },
  { name: 'Maroon', hex: '#800000', count: 5 },
  { name: 'Orange', hex: '#FFA500', count: 3 },
  { name: 'Peach', hex: '#FFDAB9', count: 4 },
  { name: 'Pink', hex: '#FF69B4', count: 18 },
  { name: 'Purple', hex: '#8A2BE2', count: 6 },
  { name: 'Red', hex: '#DC143C', count: 9 },
  { name: 'Silver', hex: '#C0C0C0', count: 3 },
  { name: 'White', hex: '#FFFFFF', count: 14 },
  { name: 'Yellow', hex: '#FFD700', count: 8 },
];

export const AccessoriesLandingPage: React.FC<AccessoriesLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
}) => {
  const [selectedBubble, setSelectedBubble] = useState<string>('all');
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(['Girls']);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [showAllAges, setShowAllAges] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allAccessories = useMemo(() => {
    return accessoriesCatalogItems;
  }, []);

  const filteredAccessories = useMemo(() => {
    let result = [...allAccessories];

    if (selectedBubble !== 'all') {
      result = result.filter((p) => p.category === selectedBubble);
    }

    if (selectedAges.length > 0) {
      result = result.filter((p) => {
        return selectedAges.some((age) => {
          if (age.includes('6-12')) return p.ageGroup === '0-12M';
          if (age.includes('1-2') || age.includes('2-3') || age.includes('3-4')) return p.ageGroup === '1-3Y';
          return p.ageGroup === '3Y+';
        });
      });
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        selectedColors.some((c) => p.color?.toLowerCase().includes(c.toLowerCase()))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [allAccessories, selectedBubble, selectedAges, selectedColors, sortBy]);

  const activeFilterCount =
    (selectedBubble !== 'all' ? 1 : 0) +
    selectedAges.length +
    selectedColors.length;

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
            <span className="text-[#2B2224] font-semibold">all accessories</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Handcrafted Heirloom Jewels & Hair Accents
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "all accessories" */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          all accessories
        </h1>
      </div>

      {/* Circular Quick Category Bubbles Row matching video */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-10 overflow-x-auto pb-2 no-scrollbar">
          {accessoryCategoryBubbles.map((bubble) => {
            const isSelected = selectedBubble === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => setSelectedBubble(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden"
              >
                {/* Circular Image with active ring */}
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden border-2 transition-all duration-200 p-0.5 ${
                    isSelected
                      ? 'border-[#962949] ring-2 ring-[#962949]/20 scale-105 shadow-sm'
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
                  className={`mt-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-center transition-colors max-w-[100px] leading-tight ${
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
                {(showAllAges ? accessoryAgeOptions : accessoryAgeOptions.slice(0, 6)).map((age) => {
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
                  { label: 'Boys', count: 38 },
                  { label: 'Girls', count: 78 },
                  { label: 'Unisex', count: 7 },
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
                {(showAllColors ? accessoryColorOptions : accessoryColorOptions.slice(0, 8)).map((col) => {
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
                Showing <strong className="text-[#2B2224]">{filteredAccessories.length}</strong> styles
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
              {filteredAccessories.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);

                return (
                  <div key={product.id} className="group flex flex-col relative">
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
                          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                            product.hoverImage ? 'group-hover:opacity-0 transition-opacity duration-300' : ''
                          }`}
                          loading="lazy"
                        />
                        {product.hoverImage && (
                          <img
                            src={product.hoverImage}
                            alt={`${product.name} alternate view`}
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Top-Left Badge (PRE-ORDER, NEW, BESTSELLER) */}
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
                );
              })}
            </div>

            {/* Empty State */}
            {filteredAccessories.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-[16px] text-[#6F6265] mb-4">
                  No accessories found matching the selected filters.
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
                  {accessoryAgeOptions.map((age) => (
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
                  {accessoryColorOptions.map((col) => (
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
