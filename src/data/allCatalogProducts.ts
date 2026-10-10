import { Product } from '../types';
import { allProducts } from './products';
import { girlCatalogItems } from '../pages/GirlsLandingPage';
import {
  bootaDesiProducts,
  bootaPlayProducts,
  bootaLuxeProducts,
} from '../pages/CollectionsLandingPage';
import {
  ganeshChaturthiProducts,
  navratriProducts,
  dussehraDiwaliProducts,
  babyCeremoniesProducts,
} from '../pages/OccasionsLandingPage';
import { accessoriesCatalogItems } from '../pages/AccessoriesLandingPage';
import {
  bootaDesiSaleProducts,
  bootaPlaySaleProducts,
  bootaLuxeSaleProducts,
  specialOffersProducts,
} from '../pages/SaleLandingPage';

// Combine all product lists across the entire store into a deduplicated master catalog
const rawProductCollections: Product[][] = [
  allProducts,
  girlCatalogItems,
  bootaDesiProducts,
  bootaPlayProducts,
  bootaLuxeProducts,
  ganeshChaturthiProducts,
  navratriProducts,
  dussehraDiwaliProducts,
  babyCeremoniesProducts,
  accessoriesCatalogItems,
  bootaDesiSaleProducts,
  bootaPlaySaleProducts,
  bootaLuxeSaleProducts,
  specialOffersProducts,
];

const masterProductMap = new Map<string, Product>();

rawProductCollections.forEach((list) => {
  if (Array.isArray(list)) {
    list.forEach((p) => {
      if (p && p.id && !masterProductMap.has(p.id)) {
        masterProductMap.set(p.id, p);
      }
    });
  }
});

export const masterStoreProducts: Product[] = Array.from(masterProductMap.values());

export const findStoreProductById = (id: string): Product | undefined => {
  if (!id) return undefined;
  return masterProductMap.get(id);
};

const WISHLIST_CACHE_KEY = 'boota_wishlist_cached_products_v1';

export const getCachedWishlistProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_CACHE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading cached wishlist products:', err);
  }
  return [];
};

export const saveCachedWishlistProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_CACHE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving cached wishlist products:', err);
  }
};

export const resolveWishlistProducts = (
  wishlistIds: string[],
  additionalCachedProducts: Product[] = []
): Product[] => {
  if (!wishlistIds || wishlistIds.length === 0) return [];

  const cached = getCachedWishlistProducts();
  const allAvailableSources = new Map<string, Product>();

  // 1. Populate master catalog
  masterStoreProducts.forEach((p) => {
    allAvailableSources.set(p.id, p);
  });

  // 2. Populate cached products
  cached.forEach((p) => {
    if (p && p.id && !allAvailableSources.has(p.id)) {
      allAvailableSources.set(p.id, p);
    }
  });

  // 3. Populate any extra provided products
  additionalCachedProducts.forEach((p) => {
    if (p && p.id && !allAvailableSources.has(p.id)) {
      allAvailableSources.set(p.id, p);
    }
  });

  // Return resolved products in the order of wishlistIds
  const resolved: Product[] = [];
  wishlistIds.forEach((id) => {
    const found = allAvailableSources.get(id);
    if (found) {
      resolved.push(found);
    }
  });

  return resolved;
};
