/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HomePage } from './components/home/HomePage';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetails } from './components/ProductDetails';
import { TheDetailsSection } from './components/TheDetailsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductShareModal } from './components/ProductShareModal';
import { ReviewsModal } from './components/ReviewsModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FloatingChat } from './components/FloatingChat';
import { CartItem, Product, AnnouncementMessage } from './types';
import { initialAnnouncements, allProducts } from './data/products';
import {
  resolveWishlistProducts,
  findStoreProductById,
  saveCachedWishlistProducts,
  getCachedWishlistProducts,
} from './data/allCatalogProducts';
import { Settings } from 'lucide-react';
import { BestPairedWith } from './components/BestPairedWith';
import { SimilarStyleCarousel } from './components/SimilarStyleCarousel';
import { AdminProductSettingsModal } from './components/AdminProductSettingsModal';

// Specialized Content & Brand Pages
import { GirlsLandingPage } from './pages/GirlsLandingPage';
import { AccessoriesLandingPage } from './pages/AccessoriesLandingPage';
import { CollectionsLandingPage } from './pages/CollectionsLandingPage';
import { OccasionsLandingPage } from './pages/OccasionsLandingPage';
import { SaleLandingPage } from './pages/SaleLandingPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { WhyChooseBootaPage } from './pages/WhyChooseBootaPage';
import { BlogPage } from './pages/BlogPage';
import { GiftCardPage } from './pages/GiftCardPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { WholesalePage } from './pages/WholesalePage';
import { FAQPage } from './pages/FAQPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { ReturnsExchangesPage } from './pages/ReturnsExchangesPage';

// Customer Account, Orders & Returns System
import { UserProfile, Order, ReturnExchangeRequest } from './types/account';
import {
  getStoredUserProfile,
  saveStoredUserProfile,
  getStoredOrders,
  saveStoredOrders,
  getStoredReturns,
  saveStoredReturns,
} from './data/mockAccountData';
import { AccountDashboard } from './components/account/AccountDashboard';
import { AuthModal } from './components/account/AuthModal';
import { OrderDetailModal } from './components/account/OrderDetailModal';
import { ReturnExchangeModal } from './components/account/ReturnExchangeModal';

export type AppView =
  | 'home'
  | 'girl'
  | 'collection'
  | 'accessories'
  | 'occasions'
  | 'sale'
  | 'pdp'
  | 'about'
  | 'why-boota'
  | 'blog'
  | 'gift-card'
  | 'contact'
  | 'wholesale'
  | 'faq'
  | 'size-guide'
  | 'returns';

export interface HistoryState {
  view: AppView;
  productId?: string;
  collectionFilter?: 'all' | 'desi' | 'play' | 'luxe';
  occasionFilter?: string;
  saleFilter?: string;
  girlAge?: string;
}

export const VALID_VIEWS: AppView[] = [
  'home',
  'girl',
  'collection',
  'accessories',
  'occasions',
  'sale',
  'pdp',
  'about',
  'why-boota',
  'blog',
  'gift-card',
  'contact',
  'wholesale',
  'faq',
  'size-guide',
  'returns',
];

export const buildUrl = (state: HistoryState): string => {
  const params = new URLSearchParams();
  if (state.view === 'home') {
    params.set('view', 'home');
  } else {
    params.set('view', state.view);
  }
  if (state.view === 'pdp' && state.productId) {
    params.set('product', state.productId);
  }
  if (state.view === 'collection' && state.collectionFilter && state.collectionFilter !== 'all') {
    params.set('collection', state.collectionFilter);
  }
  if (state.view === 'occasions' && state.occasionFilter && state.occasionFilter !== 'all') {
    params.set('occasion', state.occasionFilter);
  }
  if (state.view === 'sale' && state.saleFilter && state.saleFilter !== 'all') {
    params.set('sale', state.saleFilter);
  }
  if (state.view === 'girl' && state.girlAge) {
    params.set('age', state.girlAge);
  }
  return `${window.location.pathname}?${params.toString()}`;
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      const params = new URLSearchParams(window.location.search);
      const rawTarget = params.get('view') || hash;
      if (rawTarget) {
        let t = rawTarget.toLowerCase();
        if (t === 'girls') t = 'girl';
        if (t === 'collections') t = 'collection';
        if (t === 'accessory' || t === 'acc') t = 'accessories';
        if (t === 'occasion') t = 'occasions';
        if (t === 'sales') t = 'sale';
        if (t === 'returns-exchanges' || t === 'return') t = 'returns';
        if (t === 'contact-us') t = 'contact';
        if (VALID_VIEWS.includes(t as AppView)) return t as AppView;
      }
      return 'pdp';
    }
    return 'pdp';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      if (prodId) {
        const found = findStoreProductById(prodId) || allProducts.find((p) => p.id === prodId);
        if (found) return found;
      }
    }
    return allProducts[0];
  });

  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>(initialAnnouncements);

  const [collectionFilter, setCollectionFilter] = useState<'all' | 'desi' | 'play' | 'luxe'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const col = params.get('collection');
      if (col === 'desi' || col === 'play' || col === 'luxe') return col;
    }
    return 'all';
  });

  const [occasionFilter, setOccasionFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const occ = params.get('occasion');
      if (occ) return occ;
    }
    return 'all';
  });

  const [saleFilter, setSaleFilter] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sale = params.get('sale');
      if (sale) return sale;
    }
    return 'all';
  });

  const [girlAge, setGirlAge] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const age = params.get('age');
      if (age) return age;
    }
    return '';
  });

  // Customer Account & Orders State
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [returnsList, setReturnsList] = useState<ReturnExchangeRequest[]>(getStoredReturns);

  // Account & Returns Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('boota_wishlist_ids');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading wishlist from storage:', e);
      }
    }
    return [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<
    'orders' | 'returns' | 'profile' | 'addresses' | 'wishlist' | 'comms' | 'delete'
  >('orders');
  const [productShareOpen, setProductShareOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync wishlist IDs to localStorage whenever modified
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('boota_wishlist_ids', JSON.stringify(wishlistIds));
      } catch (e) {
        console.error('Error saving wishlist to storage:', e);
      }
    }
  }, [wishlistIds]);

  // Unified resolution of all wishlist items across all product sections & catalogs
  const resolvedWishlistProducts = useMemo(() => {
    return resolveWishlistProducts(wishlistIds);
  }, [wishlistIds]);

  // Admin Configurable Return Window & Best Paired With Map
  const [returnDays, setReturnDays] = useState<number>(() => {
    const saved = localStorage.getItem('boota_return_days');
    return saved ? Number(saved) : 7;
  });

  const [pairedProductMap, setPairedProductMap] = useState<{ [productId: string]: string[] }>(() => {
    const saved = localStorage.getItem('boota_paired_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      'gulnar-silk-lehenga': ['kundan-headband', 'kolhapuri-sandals', 'potli-bag'],
      'noorani-tissue-sharara': ['kundan-headband', 'lac-bangles', 'potli-bag'],
      'kesar-bandhani-gharara': ['lac-bangles', 'kolhapuri-sandals', 'potli-bag'],
    };
  });

  const [adminSettingsOpen, setAdminSettingsOpen] = useState(false);

  const handleUpdateReturnDays = (days: number) => {
    setReturnDays(days);
    localStorage.setItem('boota_return_days', String(days));
    showToast(`Return window updated to ${days} days`);
  };

  const handleUpdatePairedProducts = (productId: string, pairedIds: string[]) => {
    setPairedProductMap((prev) => {
      const updated = { ...prev, [productId]: pairedIds };
      localStorage.setItem('boota_paired_products', JSON.stringify(updated));
      return updated;
    });
    showToast('Best paired with products updated!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleWishlist = (productId: string, productParam?: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from Wishlist' : 'Saved to your Wishlist');
      return updated;
    });

    const prodToCache = productParam || findStoreProductById(productId);
    if (prodToCache) {
      const currentCached = getCachedWishlistProducts();
      if (!currentCached.some((p) => p.id === prodToCache.id)) {
        saveCachedWishlistProducts([...currentCached, prodToCache]);
      }
    }
  };

  const pushView = (
    view: AppView,
    options?: {
      product?: Product;
      collectionFilter?: 'all' | 'desi' | 'play' | 'luxe';
      occasionFilter?: string;
      saleFilter?: string;
      girlAge?: string;
      replace?: boolean;
    }
  ) => {
    const nextProduct = options?.product !== undefined ? options.product : selectedProduct;
    const nextCol = options?.collectionFilter !== undefined ? options.collectionFilter : collectionFilter;
    const nextOcc = options?.occasionFilter !== undefined ? options.occasionFilter : occasionFilter;
    const nextSale = options?.saleFilter !== undefined ? options.saleFilter : saleFilter;
    const nextAge = options?.girlAge !== undefined ? options.girlAge : girlAge;

    setCurrentView(view);
    if (options?.product !== undefined) setSelectedProduct(options.product);
    if (options?.collectionFilter !== undefined) setCollectionFilter(options.collectionFilter);
    if (options?.occasionFilter !== undefined) setOccasionFilter(options.occasionFilter);
    if (options?.saleFilter !== undefined) setSaleFilter(options.saleFilter);
    if (options?.girlAge !== undefined) setGirlAge(options.girlAge);

    // Cleanly close modal drawers on page transitions
    setCartOpen(false);
    setWishlistOpen(false);
    setSearchOpen(false);
    setSizeGuideOpen(false);
    setReviewsOpen(false);
    setProductShareOpen(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      const stateToPush: HistoryState = {
        view,
        productId: view === 'pdp' ? (nextProduct?.id || 'gulnar-silk-lehenga') : undefined,
        collectionFilter: nextCol,
        occasionFilter: nextOcc,
        saleFilter: nextSale,
        girlAge: nextAge,
      };
      const targetUrl = buildUrl(stateToPush);
      if (options?.replace) {
        window.history.replaceState(stateToPush, '', targetUrl);
      } else {
        window.history.pushState(stateToPush, '', targetUrl);
      }
    }
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      pushView('home');
    }
  };

  const handleSelectProduct = (product: Product) => {
    pushView('pdp', { product });
  };

  const handleAddToBag = (size: string, color: string, productParam?: Product) => {
    const prod = productParam || selectedProduct || allProducts[0];
    const existingIndex = cartItems.findIndex(
      (item) => item.name === prod.name && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: `${prod.id}-${Date.now()}`,
          name: prod.name,
          collection: prod.collection,
          color: color,
          size: size,
          price: prod.price,
          quantity: 1,
          image: prod.image,
        },
      ]);
    }
    setCartOpen(true);
    showToast(`Added ${prod.name} (${size}, ${color}) to bag`);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenAccount = (
    tabParam: 'orders' | 'returns' | 'profile' | 'addresses' | 'wishlist' | 'comms' | 'delete' = 'orders'
  ) => {
    setAccountInitialTab(tabParam);
    if (userProfile.isLoggedIn) {
      setDashboardOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled' as const,
          cancellable: false,
          trackingTimeline: [
            {
              status: 'Cancelled',
              timestamp: 'Just now',
              description: 'Order cancelled by customer. 100% refund initiated to source.',
              completed: true,
              current: true,
            },
            ...o.trackingTimeline,
          ],
        };
      }
      return o;
    });
    setOrders(updated);
    saveStoredOrders(updated);
    showToast(
      `Order #${target?.orderNumber || ''} cancelled. Automatic refund of ₹${
        target?.total || 0
      } initiated.`
    );
  };

  const handleCreateReturnSuccess = (newReq: ReturnExchangeRequest) => {
    const updated = [newReq, ...returnsList];
    setReturnsList(updated);
    saveStoredReturns(updated);
    showToast(`Request #${newReq.requestNumber} confirmed! Doorstep pickup scheduled.`);
  };

  const handleUpdateUserProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveStoredUserProfile(updated);
  };

  const handleLogout = () => {
    const loggedOut: UserProfile = { ...userProfile, isLoggedIn: false };
    setUserProfile(loggedOut);
    saveStoredUserProfile(loggedOut);
    setDashboardOpen(false);
    showToast('Signed out of your Boota account.');
  };

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUserProfile(loggedUser);
    saveStoredUserProfile(loggedUser);
    setAuthModalOpen(false);
    setDashboardOpen(true);
    showToast(`Welcome back, ${loggedUser.name}!`);
  };

  // Synchronize history state on initial mount so root entry has complete state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialState: HistoryState = {
        view: currentView,
        productId: currentView === 'pdp' ? (selectedProduct?.id || 'gulnar-silk-lehenga') : undefined,
        collectionFilter,
        occasionFilter,
        saleFilter,
        girlAge,
      };
      if (!window.history.state) {
        window.history.replaceState(initialState, '', buildUrl(initialState));
      }
    }
  }, []);

  // Listen to browser Back and Forward navigation events (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Close all interactive modal drawers when navigating with browser back/forward
      setCartOpen(false);
      setWishlistOpen(false);
      setSearchOpen(false);
      setSizeGuideOpen(false);
      setReviewsOpen(false);
      setProductShareOpen(false);
      setAuthModalOpen(false);
      setDashboardOpen(false);
      setReturnModalOpen(false);
      setAdminSettingsOpen(false);

      const state = event.state as HistoryState | null;
      if (state && state.view) {
        setCurrentView(state.view);
        if (state.productId) {
          const match =
            findStoreProductById(state.productId) ||
            allProducts.find((p) => p.id === state.productId);
          if (match) setSelectedProduct(match);
        }
        if (state.collectionFilter) setCollectionFilter(state.collectionFilter);
        if (state.occasionFilter) setOccasionFilter(state.occasionFilter);
        if (state.saleFilter) setSaleFilter(state.saleFilter);
        if (state.girlAge !== undefined) setGirlAge(state.girlAge);
      } else {
        // Fallback: parse current search parameters and hash
        const params = new URLSearchParams(window.location.search);
        const hash = window.location.hash.replace('#', '').trim();
        const rawTarget = params.get('view') || hash || 'home';
        let target = rawTarget.toLowerCase();
        if (target === 'girls') target = 'girl';
        if (target === 'collections') target = 'collection';
        if (target === 'accessory' || target === 'acc') target = 'accessories';
        if (target === 'occasion') target = 'occasions';
        if (target === 'sales') target = 'sale';
        if (target === 'returns-exchanges' || target === 'return') target = 'returns';
        if (target === 'contact-us') target = 'contact';

        if (VALID_VIEWS.includes(target as AppView)) {
          setCurrentView(target as AppView);
        } else {
          setCurrentView('home');
        }

        const prodId = params.get('product');
        if (prodId) {
          const match =
            findStoreProductById(prodId) ||
            allProducts.find((p) => p.id === prodId);
          if (match) setSelectedProduct(match);
        }
        const col = params.get('collection');
        if (col === 'desi' || col === 'play' || col === 'luxe') {
          setCollectionFilter(col);
        }
        if (params.get('occasion')) setOccasionFilter(params.get('occasion')!);
        if (params.get('sale')) setSaleFilter(params.get('sale')!);
        if (params.get('age')) setGirlAge(params.get('age')!);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigatePage = (page: string) => {
    let target: string = page.toLowerCase().replace('#', '').trim();
    if (target === 'girls') target = 'girl';
    if (target === 'collections') target = 'collection';
    if (target === 'accessory' || target === 'acc') target = 'accessories';
    if (target === 'occasion') target = 'occasions';
    if (target === 'sales') target = 'sale';
    if (target === 'contact-us') target = 'contact';
    if (target === 'return' || target === 'returns-exchanges') target = 'returns';

    // Route category hashes from mobile directly to the proper page
    if (
      [
        'lehenga-sets',
        'suit-sets',
        'sharara-sets',
        'anarkalis',
        'anarkali-sets',
        'dresses',
        'tops',
        'top-sets',
        'baby-age',
        'toddler-age',
        'kids-age',
      ].includes(target)
    ) {
      pushView('girl');
      return;
    }

    if (['boota-desi', 'boota-play', 'boota-luxe'].includes(target)) {
      let col: 'desi' | 'play' | 'luxe' = 'desi';
      if (target === 'boota-desi') col = 'desi';
      if (target === 'boota-play') col = 'play';
      if (target === 'boota-luxe') col = 'luxe';
      pushView('collection', { collectionFilter: col });
      return;
    }

    if (VALID_VIEWS.includes(target as AppView)) {
      pushView(target as AppView);
    }
  };

  const handleSelectCategory = (cat: string) => {
    const lower = cat.toLowerCase().trim();
    if (lower === 'girl' || lower === 'girls') {
      pushView('girl');
      return;
    }
    if (lower === '0-12m' || lower.includes('0-12') || lower.includes('baby (0-12')) {
      pushView('girl', { girlAge: '0-12M' });
      return;
    }
    if (lower === '1-3y' || lower.includes('1-3') || lower.includes('toddler (1-3')) {
      pushView('girl', { girlAge: '1-3Y' });
      return;
    }
    if (lower === '3y+' || lower.includes('3+') || lower.includes('kids (3+')) {
      pushView('girl', { girlAge: '3Y+' });
      return;
    }
    if (lower === 'collection' || lower === 'collections') {
      pushView('collection', { collectionFilter: 'all' });
      return;
    }
    if (lower.includes('desi')) {
      pushView('collection', { collectionFilter: 'desi' });
      return;
    }
    if (lower.includes('play')) {
      pushView('collection', { collectionFilter: 'play' });
      return;
    }
    if (lower.includes('luxe')) {
      pushView('collection', { collectionFilter: 'luxe' });
      return;
    }
    if (
      lower === 'accessories' ||
      lower === 'accessory' ||
      lower.includes('swaddle') ||
      lower.includes('pillow') ||
      lower.includes('toy') ||
      lower.includes('hair') ||
      lower.includes('bangle') ||
      lower.includes('jewel') ||
      lower.includes('bag')
    ) {
      pushView('accessories');
      return;
    }
    if (lower === 'occasions' || lower === 'occasion') {
      pushView('occasions', { occasionFilter: 'all' });
      return;
    }
    if (lower.includes('ganesh') || lower.includes('ganpati')) {
      pushView('occasions', { occasionFilter: 'ganesh-chaturthi' });
      return;
    }
    if (lower.includes('navratri') || lower.includes('durga')) {
      pushView('occasions', { occasionFilter: 'navratri' });
      return;
    }
    if (lower.includes('diwali') || lower.includes('dussehra')) {
      pushView('occasions', { occasionFilter: 'diwali' });
      return;
    }
    if (
      lower.includes('baby welcome') ||
      lower.includes('mundan') ||
      lower.includes('annaprashan') ||
      lower.includes('baby ceremonies')
    ) {
      pushView('occasions', { occasionFilter: 'baby-ceremonies' });
      return;
    }
    if (
      lower.includes('wedding') ||
      lower.includes('mehendi') ||
      lower.includes('haldi') ||
      lower.includes('sangeet')
    ) {
      pushView('occasions', { occasionFilter: 'wedding' });
      return;
    }
    if (lower === 'sale' || lower === 'all sale') {
      pushView('sale', { saleFilter: 'all' });
      return;
    }
    if (lower.includes('sale') && lower.includes('desi')) {
      pushView('sale', { saleFilter: 'desi' });
      return;
    }
    if (lower.includes('sale') && lower.includes('play')) {
      pushView('sale', { saleFilter: 'play' });
      return;
    }
    if (lower.includes('sale') && lower.includes('luxe')) {
      pushView('sale', { saleFilter: 'luxe' });
      return;
    }
    if (
      lower.includes('special offer') ||
      lower.includes('special prices') ||
      lower.includes('last chance') ||
      lower.includes('first time on sale') ||
      lower.includes('special')
    ) {
      pushView('sale', { saleFilter: 'special' });
      return;
    }
    if (
      lower.includes('suit') ||
      lower.includes('lehenga') ||
      lower.includes('sharara') ||
      lower.includes('dress') ||
      lower.includes('kurti') ||
      lower.includes('top') ||
      lower.includes('anarkali')
    ) {
      pushView('girl');
      return;
    }
    const match =
      findStoreProductById(lower) ||
      allProducts.find(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          p.collection.toLowerCase().includes(lower)
      );
    if (match) {
      pushView('pdp', { product: match });
      showToast(`Viewing ${match?.name}`);
      return;
    }
    pushView('girl');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2224] flex flex-col font-sans">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar
        messages={announcements}
        onUpdateMessages={(newMsgs) => setAnnouncements(newMsgs)}
      />

      {/* 2. Global Header & Navigation */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentView={currentView}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={handleOpenAccount}
        onNavigateHome={() => pushView('home')}
        onNavigatePage={handleNavigatePage}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'sale' && (
          <SaleLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => pushView('home')}
            initialFilter={saleFilter}
          />
        )}

        {currentView === 'occasions' && (
          <OccasionsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => pushView('home')}
            initialFilter={occasionFilter}
          />
        )}

        {currentView === 'collection' && (
          <CollectionsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => pushView('home')}
            initialFilter={collectionFilter}
          />
        )}

        {currentView === 'accessories' && (
          <AccessoriesLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || 'Free Size', p.color, p);
            }}
            onNavigateHome={() => pushView('home')}
          />
        )}

        {currentView === 'girl' && (
          <GirlsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => pushView('home')}
          />
        )}

        {currentView === 'home' && (
          <HomePage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onOpenReviewsModal={() => setReviewsOpen(true)}
            onFilterChange={(type, val) => {
              showToast(`Browsing ${val}`);
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutUsPage
            onNavigateHome={() => pushView('home')}
            onExploreCollection={(cat) => {
              pushView('collection');
              showToast(cat ? `Viewing ${cat} Collection` : 'Exploring Collection');
            }}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentView === 'why-boota' && (
          <WhyChooseBootaPage
            onNavigateHome={() => pushView('home')}
            onExploreCollection={() => {
              pushView('collection');
              showToast('Exploring Festive Collection');
            }}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            onNavigateHome={() => pushView('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'gift-card' && (
          <GiftCardPage
            onNavigateHome={() => pushView('home')}
            onAddToCart={(item) => {
              setCartItems((prev) => [...prev, item]);
              setCartOpen(true);
            }}
            showToast={showToast}
          />
        )}

        {currentView === 'contact' && (
          <ContactUsPage onNavigateHome={() => pushView('home')} />
        )}

        {currentView === 'wholesale' && (
          <WholesalePage onNavigateHome={() => pushView('home')} />
        )}

        {currentView === 'faq' && (
          <FAQPage
            onNavigateHome={() => pushView('home')}
            onNavigateContact={() => pushView('contact')}
            onNavigateSizeGuide={() => pushView('size-guide')}
          />
        )}

        {currentView === 'size-guide' && (
          <SizeGuidePage
            onNavigateHome={() => pushView('home')}
            onNavigateContact={() => pushView('contact')}
          />
        )}

        {currentView === 'returns' && (
          <ReturnsExchangesPage
            allOrders={orders}
            onStartReturnModal={(targetOrder) => {
              setReturnModalOrder(targetOrder || null);
              setReturnModalOpen(true);
            }}
            onNavigateHome={() => pushView('home')}
          />
        )}

        {currentView === 'pdp' && (
          /* Product Detail Page View with Back Navigation */
          <div className="w-full">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] pt-6 pb-2">
              <div className="flex items-center justify-between">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center space-x-2 text-[13px] text-[#6F6265] font-normal flex-wrap"
                >
                    <button
                      type="button"
                      onClick={() => pushView('home')}
                      className="hover:text-[#962949] transition-colors cursor-pointer hover:underline"
                    >
                      Home
                    </button>
                    <span className="text-[#A09598]">/</span>
                    <button
                      type="button"
                      onClick={() => {
                        const col = (selectedProduct?.collection || '').toLowerCase();
                        if (col.includes('desi')) {
                          pushView('collection', { collectionFilter: 'desi' });
                        } else if (col.includes('play')) {
                          pushView('collection', { collectionFilter: 'play' });
                        } else if (col.includes('luxe')) {
                          pushView('collection', { collectionFilter: 'luxe' });
                        } else if (selectedProduct?.category?.toLowerCase().includes('accessor')) {
                          pushView('accessories');
                        } else {
                          pushView('girl');
                        }
                      }}
                      className="hover:text-[#962949] transition-colors cursor-pointer hover:underline text-[#6F6265]"
                      title={`View ${selectedProduct?.collection || 'collection'} styles`}
                    >
                      {selectedProduct?.collection || 'Boota Collection'}
                    </button>
                    <span className="text-[#A09598]">/</span>
                    <span className="text-[#2B2224] font-medium truncate max-w-[260px] sm:max-w-none">
                      {selectedProduct?.name || 'Gulnar Silk Lehenga Set'}
                    </span>
                  </nav>
                </div>
              </div>

            {/* Product Hero 2-Column Split */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-6 lg:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left: Minimum 6 images gallery with hover zoom & lightbox */}
                <div className="lg:col-span-7">
                  <ProductGallery
                    product={selectedProduct}
                    onShare={() => setProductShareOpen(true)}
                  />
                </div>

                {/* Right: Sticky product information & purchase details */}
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <ProductDetails
                    product={selectedProduct}
                    onAddToBag={handleAddToBag}
                    onToggleWishlist={() =>
                      selectedProduct && handleToggleWishlist(selectedProduct.id)
                    }
                    isWishlisted={
                      selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
                    }
                    onOpenSizeGuide={() => setSizeGuideOpen(true)}
                    onOpenReviews={() => setReviewsOpen(true)}
                    onOpenReturnsPolicy={() => handleNavigatePage('returns')}
                    returnDays={returnDays}
                    onShowToast={showToast}
                    onOpenShare={() => setProductShareOpen(true)}
                  />
                </div>
              </div>

              {/* "Best paired with" cross-sell section */}
              <BestPairedWith
                currentProduct={selectedProduct}
                allProducts={allProducts}
                pairedIds={pairedProductMap[selectedProduct?.id || '']}
                onAddToBag={(item) =>
                  handleAddToBag(item.sizes[0] || 'Free Size', item.color, item)
                }
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            </div>

            {/* Product Craft Details Section */}
            <TheDetailsSection />

            {/* Bottom: "similar style" scrollable row */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
              <SimilarStyleCarousel
                currentProduct={selectedProduct}
                allProducts={allProducts}
                onSelectProduct={handleSelectProduct}
                onAddToBag={(item) =>
                  handleAddToBag(item.sizes[0] || '1-2 Y', item.color, item)
                }
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            </div>
          </div>
        )}
      </main>

      {/* 14. Full Boota Footer (4 Columns, Legal Bar, Payment Icons) */}
      <Footer
        onOpenAccount={handleOpenAccount}
        onNavigatePage={handleNavigatePage}
        onOpenSizeGuide={() => handleNavigatePage('size-guide')}
      />

      {/* Interactive Overlays */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Interactive Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        products={resolvedWishlistProducts}
        onRemoveItem={handleToggleWishlist}
        onAddToCart={(prod, size, color) => {
          handleAddToBag(size, color, prod);
          showToast(`Added ${prod.name} to bag`);
        }}
        onSelectProduct={handleSelectProduct}
        onOpenAccountWishlist={() => {
          setAccountInitialTab('wishlist');
          setDashboardOpen(true);
        }}
        onExploreCollections={() => {
          handleNavigatePage('girl');
        }}
      />

      {/* Product Share Modal */}
      <ProductShareModal
        isOpen={productShareOpen}
        onClose={() => setProductShareOpen(false)}
        product={selectedProduct}
        onShowToast={showToast}
      />

      <ReviewsModal
        isOpen={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(prod) => {
          handleSelectProduct(prod);
          setSearchOpen(false);
          showToast(`Viewing ${prod.name}`);
        }}
        onSelectItem={(productName: string) => {
          const match =
            findStoreProductById(productName) ||
            allProducts.find((p) =>
              p.name.toLowerCase().includes(productName.toLowerCase())
            );
          if (match) {
            handleSelectProduct(match);
            showToast(`Viewing ${match.name}`);
          }
          setSearchOpen(false);
        }}
        onNavigateCategory={(categoryOrPage) => {
          handleSelectCategory(categoryOrPage);
          setSearchOpen(false);
        }}
        onAddToCart={(product, size) => {
          handleAddToBag(size || product.sizes[0] || '1-2 Y', product.color, product);
          showToast(`Added ${product.name} to bag`);
        }}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* Sizing Pop-up Modal for Clothes */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onViewFullPage={() => {
          setSizeGuideOpen(false);
          handleNavigatePage('size-guide');
        }}
        productName={selectedProduct?.name}
      />

      {/* Customer Account Dashboard Modal */}
      <AccountDashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        user={userProfile}
        orders={orders}
        returns={returnsList}
        onUpdateUser={handleUpdateUserProfile}
        onLogout={handleLogout}
        onViewOrder={(ord) => setDetailOrder(ord)}
        onStartReturn={(ord) => {
          setReturnModalOrder(ord || null);
          setReturnModalOpen(true);
        }}
        onCancelOrder={handleCancelOrder}
        wishlistProducts={resolvedWishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color) => handleAddToBag(size, color, prod)}
        initialTab={accountInitialTab}
        onSelectProduct={handleSelectProduct}
      />

      {/* Auth Modal (Mobile OTP primary, Email/Password, Guest) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenGuestReturn={() => {
          setReturnModalOrder(null);
          setReturnModalOpen(true);
        }}
      />

      {/* Order Detail Modal with Timeline, Invoice & Cancel */}
      <OrderDetailModal
        isOpen={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
        order={detailOrder}
        onCancelOrder={handleCancelOrder}
        onInitiateReturn={(ord) => {
          setReturnModalOrder(ord);
          setReturnModalOpen(true);
        }}
      />

      {/* 2-Minute Self-Service Return / Exchange Modal */}
      <ReturnExchangeModal
        isOpen={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={returnModalOrder}
        allOrders={orders}
        onSuccess={handleCreateReturnSuccess}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2B2224] text-white text-[13.5px] px-5 py-2.5 rounded-[4px] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Store Admin Settings Modal (Editable Return Days & Best Paired With) */}
      <AdminProductSettingsModal
        isOpen={adminSettingsOpen}
        onClose={() => setAdminSettingsOpen(false)}
        returnDays={returnDays}
        onUpdateReturnDays={handleUpdateReturnDays}
        allProducts={allProducts}
        currentProduct={selectedProduct}
        pairedProductMap={pairedProductMap}
        onUpdatePairedProducts={handleUpdatePairedProducts}
      />

      {/* WhatsApp Concierge / Floating Help */}
      <FloatingChat />
    </div>
  );
}
