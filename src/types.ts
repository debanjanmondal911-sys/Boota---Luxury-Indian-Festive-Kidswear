export interface CartItem {
  id: string;
  name: string;
  collection: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  collection: 'Boota Desi' | 'Boota Play' | 'Boota Luxe';
  category: string;
  price: number;
  mrp: number;
  discountPercent?: number;
  image: string;
  hoverImage?: string;
  galleryImages?: string[];
  pairedProductIds?: string[];
  sizes: string[];
  color: string;
  badge?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  occasions?: string[];
  ageGroup?: '0-12M' | '1-3Y' | '3Y+';
  rating: number;
  reviewCount: number;
  description: string;
  packageContains?: string;
  fabricDetails?: string;
  careInstructions?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  productName?: string;
}

export interface AnnouncementMessage {
  id: string;
  text: string;
  active: boolean;
  type: 'collection' | 'shipping' | 'seasonal';
}
