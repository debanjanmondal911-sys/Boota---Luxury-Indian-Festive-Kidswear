import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  Clock,
  ArrowUpRight,
  Star,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Check,
  Tag,
  Flame,
} from 'lucide-react';
import { Product } from '../types';
import { masterStoreProducts } from '../data/allCatalogProducts';
import { allProducts } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectItem?: (term: string) => void;
  onNavigateCategory?: (category: string) => void;
  onAddToCart?: (product: Product, size?: string) => void;
  onToggleWishlist?: (productId: string, product?: Product) => void;
  wishlistIds?: string[];
}

const POPULAR_SEARCH_TERMS = [
  'Gulnar Silk Lehenga',
  'Tissue Peplum Sharara',
  'Kesar Bandhani Gharara',
  'Yellow Haldi Sets',
  'Baby Annaprashan Kurta',
  'Chanderi Suit Sets',
  'Organic Cotton Swaddles',
  'Diwali Festive Edit',
  'Pattu Pavadai Sets',
  'Velvet Potli Bag',
];

const CURATED_CATEGORIES = [
  { label: 'Lehenga Sets', query: 'lehenga', count: 'Heirloom Silk' },
  { label: 'Sharara & Gharara', query: 'sharara', count: 'Twirl-Ready' },
  { label: 'Suit Sets & Kurtas', query: 'suit', count: 'Pure Chanderi' },
  { label: 'Baby & Toddler', query: 'baby', count: '0-12M & Ceremonies' },
  { label: 'Festive Luxe', query: 'luxe', count: 'Handcrafted Zari' },
  { label: 'Accessories', query: 'accessories', count: 'Jewellery & Potlis' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectItem,
  onNavigateCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCollection, setActiveCollection] = useState<string>('all');
  const [activePrice, setActivePrice] = useState<string>('all');
  const [activeAge, setActiveAge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('relevance');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('boota_recent_searches');
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load recent searches:', e);
      }
    }
  }, [isOpen]);

  // Focus input automatically on open and listen to Esc key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
      setActiveCollection('all');
      setActivePrice('all');
      setActiveAge('all');
      setSortBy('relevance');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('boota_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent search:', e);
      }
    }
  };

  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((t) => t !== termToRemove);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('boota_recent_searches', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('boota_recent_searches');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Curated fallback products (bestsellers)
  const bestsellerProducts = useMemo(() => {
    const pool = masterStoreProducts.length > 0 ? masterStoreProducts : allProducts;
    return pool.filter((p) => p.isBestSeller || p.rating >= 4.8).slice(0, 6);
  }, []);

  // Real-time intelligent search scoring & filtering
  const searchResults = useMemo(() => {
    const rawQuery = searchTerm.trim().toLowerCase();
    const pool = masterStoreProducts.length > 0 ? masterStoreProducts : allProducts;

    if (!rawQuery) {
      return [];
    }

    const tokens = rawQuery.split(/\s+/).filter(Boolean);

    // Compute scored matches
    const scoredList = pool.map((product) => {
      const name = product.name.toLowerCase();
      const category = (product.category || '').toLowerCase();
      const collection = (product.collection || '').toLowerCase();
      const desc = (product.description || '').toLowerCase();
      const color = (product.color || '').toLowerCase();
      const fabric = (product.fabricDetails || '').toLowerCase();
      const occasions = (product.occasions || []).join(' ').toLowerCase();
      const age = (product.ageGroup || '').toLowerCase();

      let score = 0;

      // 1. Exact & Prefix Matches
      if (name === rawQuery) score += 200;
      else if (name.startsWith(rawQuery)) score += 100;
      else if (name.includes(rawQuery)) score += 60;

      // 2. Token Matching
      tokens.forEach((token) => {
        if (name.includes(token)) score += 35;
        if (category.includes(token)) score += 28;
        if (collection.includes(token)) score += 22;
        if (color.includes(token)) score += 18;
        if (occasions.includes(token)) score += 18;
        if (fabric.includes(token)) score += 14;
        if (desc.includes(token)) score += 10;
        if (age.includes(token)) score += 12;

        // Domain Intent Synonyms
        if ((token.includes('leheng') || token === 'ghagra' || token === 'choli') && (category.includes('lehenga') || name.includes('lehenga'))) {
          score += 40;
        }
        if ((token.includes('sharar') || token.includes('gharar')) && (category.includes('sharara') || category.includes('gharara') || name.includes('sharara'))) {
          score += 40;
        }
        if ((token.includes('suit') || token.includes('kurta') || token.includes('anarkali')) && (category.includes('suit') || category.includes('anarkali') || name.includes('kurta') || name.includes('anarkali'))) {
          score += 35;
        }
        if ((token === 'haldi' || token === 'yellow') && (occasions.includes('haldi') || color.includes('yellow') || name.includes('yellow') || name.includes('kesar'))) {
          score += 35;
        }
        if ((token === 'diwali' || token === 'festive') && (occasions.includes('diwali') || collection.includes('luxe') || desc.includes('festive') || desc.includes('twirling'))) {
          score += 30;
        }
        if ((token === 'wedding' || token === 'sangeet' || token === 'mehendi') && (occasions.includes('wedding') || occasions.includes('sangeet') || occasions.includes('mehendi'))) {
          score += 30;
        }
        if ((token.includes('baby') || token === 'infant' || token === 'newborn') && (product.ageGroup === '0-12M' || occasions.includes('baby') || category.includes('baby') || name.includes('baby') || name.includes('swaddle') || name.includes('pillow'))) {
          score += 35;
        }
        if ((token.includes('silk') || token === 'tissue' || token === 'chanderi') && (fabric.includes(token) || desc.includes(token) || name.includes(token))) {
          score += 25;
        }
        if ((token.includes('access') || token.includes('jewel') || token.includes('bangle') || token.includes('potli') || token.includes('clip') || token.includes('headband')) && (category.includes('access') || category.includes('jewel') || category.includes('bangle') || name.includes('potli') || name.includes('headband') || name.includes('clip'))) {
          score += 35;
        }
      });

      if (product.isBestSeller) score += 8;
      if (product.isNewArrival) score += 4;

      return { product, score };
    });

    // Keep items with score > 0
    let filtered = scoredList.filter((item) => item.score > 0);

    // Filter by Collection
    if (activeCollection !== 'all') {
      if (activeCollection === 'accessories') {
        filtered = filtered.filter(
          (item) =>
            item.product.category.toLowerCase().includes('accessories') ||
            item.product.category.toLowerCase().includes('jewellery') ||
            item.product.category.toLowerCase().includes('bangle') ||
            item.product.category.toLowerCase().includes('swaddle') ||
            item.product.category.toLowerCase().includes('pillow') ||
            item.product.name.toLowerCase().includes('headband') ||
            item.product.name.toLowerCase().includes('potli')
        );
      } else {
        filtered = filtered.filter((item) => item.product.collection === activeCollection);
      }
    }

    // Filter by Price
    if (activePrice === 'under-2500') {
      filtered = filtered.filter((item) => item.product.price < 2500);
    } else if (activePrice === '2500-3500') {
      filtered = filtered.filter((item) => item.product.price >= 2500 && item.product.price <= 3500);
    } else if (activePrice === 'above-3500') {
      filtered = filtered.filter((item) => item.product.price > 3500);
    }

    // Filter by Age
    if (activeAge !== 'all') {
      filtered = filtered.filter((item) => item.product.ageGroup === activeAge);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.product.price - b.product.price;
      if (sortBy === 'price-desc') return b.product.price - a.product.price;
      if (sortBy === 'rating') return b.product.rating - a.product.rating;
      if (sortBy === 'discount') return (b.product.discountPercent || 0) - (a.product.discountPercent || 0);
      return b.score - a.score;
    });

    return filtered.map((item) => item.product);
  }, [searchTerm, activeCollection, activePrice, activeAge, sortBy]);

  // Aggregated matching categories for query suggestions
  const matchingCategories = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const counts = new Map<string, number>();
    searchResults.forEach((p) => {
      const cat = p.category || p.collection;
      counts.set(cat, (counts.get(cat) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count })).slice(0, 4);
  }, [searchResults, searchTerm]);

  // Handlers
  const handleProductClick = (prod: Product) => {
    saveRecentSearch(prod.name);
    if (onSelectProduct) {
      onSelectProduct(prod);
    } else if (onSelectItem) {
      onSelectItem(prod.name);
    }
    onClose();
  };

  const handleTermClick = (term: string) => {
    setSearchTerm(term);
    saveRecentSearch(term);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || product.sizes[0] || '1-2 Y';
    if (onAddToCart) {
      onAddToCart(product, size);
      setAddedItemEffect(product.id);
      setTimeout(() => setAddedItemEffect(null), 1600);
    }
  };

  const handleToggleFav = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id, product);
    }
  };

  const handleCategoryShortcut = (catQuery: string) => {
    if (onNavigateCategory) {
      onNavigateCategory(catQuery);
      onClose();
    } else {
      setSearchTerm(catQuery);
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        saveRecentSearch(searchTerm);
      }
      if (searchResults.length > 0) {
        handleProductClick(searchResults[0]);
      }
    }
  };

  // Highlight search term matches
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <span key={i} className="text-[#962949] font-bold underline decoration-[#962949]/40">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/70 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Main Search Container */}
      <div className="relative w-full max-w-4xl mx-3 sm:mx-6 my-4 sm:my-8 bg-[#FFFDF9] border border-[#E8DADD] shadow-2xl rounded-[8px] flex flex-col max-h-[92vh] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* 1. Header & Live Search Bar */}
        <div className="p-4 sm:p-6 bg-[#FFFFFF] border-b border-[#E8DADD] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 flex items-center bg-[#F9F7F5] border border-[#E8DADD] focus-within:border-[#962949] focus-within:ring-2 focus-within:ring-[#962949]/15 rounded-[6px] px-3.5 py-2.5 transition-all">
              <Search className="w-5 h-5 text-[#962949] shrink-0 mr-2.5" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Search lehengas, suit sets, shararas, pure silk, baby gifts, yellow haldi..."
                className="w-full text-[15px] sm:text-[16px] outline-none text-[#2B2224] placeholder-[#8F8184] bg-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 hover:bg-[#E8DADD]/50 text-[#6F6265] hover:text-[#2B2224] rounded-full transition-colors cursor-pointer mr-1"
                  aria-label="Clear search"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-3 py-2 text-[#6F6265] hover:text-[#2B2224] hover:bg-[#F9D0D6]/30 rounded-[6px] text-[13px] font-medium tracking-wide transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Close search"
            >
              <span>Esc</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Facets Bar (Real-life e-commerce style) */}
          <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[12.5px]">
            <span className="text-[#8F8184] font-medium text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>

            {/* Collection Filter */}
            <button
              onClick={() => setActiveCollection('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeCollection === 'all'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              All Collections
            </button>
            <button
              onClick={() => setActiveCollection('Boota Luxe')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeCollection === 'Boota Luxe'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Boota Luxe
            </button>
            <button
              onClick={() => setActiveCollection('Boota Desi')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeCollection === 'Boota Desi'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Boota Desi
            </button>
            <button
              onClick={() => setActiveCollection('Boota Play')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeCollection === 'Boota Play'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Boota Play
            </button>
            <button
              onClick={() => setActiveCollection('accessories')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeCollection === 'accessories'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Accessories
            </button>

            {/* Price Filter */}
            <div className="h-4 w-px bg-[#E8DADD] shrink-0 mx-1" />
            <button
              onClick={() => setActivePrice((prev) => (prev === 'under-2500' ? 'all' : 'under-2500'))}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activePrice === 'under-2500'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Under ₹2,500
            </button>
            <button
              onClick={() => setActivePrice((prev) => (prev === '2500-3500' ? 'all' : '2500-3500'))}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activePrice === '2500-3500'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              ₹2,500 - ₹3,500
            </button>

            {/* Age Filter */}
            <div className="h-4 w-px bg-[#E8DADD] shrink-0 mx-1" />
            <button
              onClick={() => setActiveAge((prev) => (prev === '0-12M' ? 'all' : '0-12M'))}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeAge === '0-12M'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Baby (0-12M)
            </button>
            <button
              onClick={() => setActiveAge((prev) => (prev === '1-3Y' ? 'all' : '1-3Y'))}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                activeAge === '1-3Y'
                  ? 'bg-[#962949] text-white border-[#962949] font-medium'
                  : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:border-[#962949]'
              }`}
            >
              Toddler (1-3Y)
            </button>

            {/* Clear Filters Reset */}
            {(activeCollection !== 'all' || activePrice !== 'all' || activeAge !== 'all') && (
              <button
                onClick={() => {
                  setActiveCollection('all');
                  setActivePrice('all');
                  setActiveAge('all');
                }}
                className="text-[#962949] hover:underline text-[12px] font-medium flex items-center gap-1 shrink-0 ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* 2. Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* A. If user has typed a query */}
          {searchTerm.trim() ? (
            <div>
              {/* Query Summary & Sorter */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8DADD]">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#2B2224]">
                    Showing <strong className="text-[#962949]">{searchResults.length}</strong> {searchResults.length === 1 ? 'product' : 'products'} for{' '}
                    <span className="italic font-medium">"{searchTerm}"</span>
                  </span>
                </div>

                {/* Sorter */}
                {searchResults.length > 0 && (
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="text-[#6F6265]">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-[#FFFFFF] border border-[#E8DADD] text-[#2B2224] rounded-[4px] px-2.5 py-1 text-[13px] outline-none cursor-pointer focus:border-[#962949]"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="discount">Highest Discount</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Matching category suggestions if present */}
              {matchingCategories.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-[#6F6265] uppercase font-semibold tracking-wider">
                    Categories:
                  </span>
                  {matchingCategories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleTermClick(c.name)}
                      className="px-2.5 py-1 bg-[#F9D0D6]/25 hover:bg-[#F9D0D6]/50 text-[#962949] border border-[#962949]/30 rounded-full text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{c.name}</span>
                      <span className="bg-[#962949] text-white text-[10px] rounded-full px-1.5 py-0.2">
                        {c.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Results Grid */}
              {searchResults.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResults.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    const selectedSize = selectedSizes[product.id] || product.sizes[0] || '1-2 Y';
                    const isJustAdded = addedItemEffect === product.id;

                    return (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="group bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] rounded-[6px] p-3 flex flex-col justify-between hover:shadow-md transition-all duration-200 cursor-pointer relative"
                      >
                        {/* Image Container with Badges */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-[#FAF7F2] mb-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Collection / Badge Pill */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                            {product.badge && (
                              <span className="bg-[#962949] text-white text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full shadow-xs">
                                {product.badge}
                              </span>
                            )}
                            {product.discountPercent && product.discountPercent > 0 && (
                              <span className="bg-[#2B2224] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-sm">
                                {product.discountPercent}% OFF
                              </span>
                            )}
                          </div>

                          {/* Wishlist Heart Button */}
                          <button
                            onClick={(e) => handleToggleFav(e, product)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#2B2224] hover:text-[#962949] shadow-xs transition-colors cursor-pointer"
                            aria-label="Save to Wishlist"
                            title="Save to Wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-[#6F6265] uppercase tracking-wider mb-1">
                              <span>{product.collection}</span>
                              {product.rating && (
                                <span className="flex items-center text-[#962949] font-medium">
                                  <Star className="w-3 h-3 fill-[#962949] mr-0.5" />
                                  {product.rating}
                                </span>
                              )}
                            </div>

                            <h4 className="text-[14px] font-semibold text-[#2B2224] group-hover:text-[#962949] transition-colors line-clamp-1">
                              {highlightMatch(product.name, searchTerm)}
                            </h4>

                            <p className="text-[12px] text-[#6F6265] line-clamp-1">
                              {product.category} • {product.color}
                            </p>
                          </div>

                          {/* Price Row */}
                          <div className="pt-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[15px] font-bold text-[#962949]">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[12px] text-[#8F8184] line-through">
                                  ₹{product.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>

                            {/* Size selection & Quick Bag */}
                            <div className="mt-2.5 pt-2 border-t border-[#E8DADD]/60 flex items-center justify-between gap-2">
                              {product.sizes && product.sizes.length > 0 ? (
                                <select
                                  value={selectedSize}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedSizes((prev) => ({
                                      ...prev,
                                      [product.id]: e.target.value,
                                    }));
                                  }}
                                  className="text-[11px] bg-[#FAF7F2] border border-[#E8DADD] text-[#2B2224] rounded px-1.5 py-1 outline-none cursor-pointer hover:border-[#962949]"
                                >
                                  {product.sizes.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="text-[11px] text-[#6F6265]">Free Size</span>
                              )}

                              <button
                                onClick={(e) => handleQuickAdd(e, product)}
                                className={`px-2.5 py-1 text-[11.5px] font-medium rounded transition-all cursor-pointer flex items-center gap-1 ${
                                  isJustAdded
                                    ? 'bg-emerald-700 text-white'
                                    : 'bg-[#962949] hover:bg-[#7D223C] text-white active:scale-95'
                                }`}
                                title="Add to Bag"
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" /> Added
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3 h-3" /> Add
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Zero Match Fallback with Recommendations */
                <div className="mt-8 text-center py-8 px-4 bg-[#FFFFFF] border border-[#E8DADD] rounded-[6px]">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#F9D0D6]/30 flex items-center justify-center text-[#962949] mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-[16px] font-serif font-bold text-[#2B2224]">
                    No exact products found for "{searchTerm}"
                  </h3>
                  <p className="text-[13px] text-[#6F6265] mt-1 max-w-md mx-auto">
                    Try checking your spelling, removing active filters, or try searching for{' '}
                    <span className="text-[#962949] font-medium">"silk lehenga"</span>,{' '}
                    <span className="text-[#962949] font-medium">"sharara"</span>, or{' '}
                    <span className="text-[#962949] font-medium">"haldi yellow"</span>.
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => {
                        setActiveCollection('all');
                        setActivePrice('all');
                        setActiveAge('all');
                      }}
                      className="px-3.5 py-1.5 bg-[#F9F7F5] border border-[#E8DADD] hover:border-[#962949] text-[12.5px] text-[#2B2224] rounded-[4px] cursor-pointer"
                    >
                      Clear active filters
                    </button>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-3.5 py-1.5 bg-[#962949] text-white text-[12.5px] rounded-[4px] cursor-pointer"
                    >
                      Explore Trending
                    </button>
                  </div>

                  {/* Curated Bestsellers Fallback */}
                  <div className="mt-8 text-left border-t border-[#E8DADD] pt-6">
                    <div className="flex items-center gap-1.5 mb-3 text-[13px] font-semibold text-[#2B2224] uppercase tracking-wider">
                      <Flame className="w-4 h-4 text-[#962949]" /> Recommended Boota Bestsellers:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {bestsellerProducts.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleProductClick(item)}
                          className="p-2 border border-[#E8DADD] hover:border-[#962949] rounded bg-[#FFFDF9] cursor-pointer group"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="aspect-[3/4] object-cover rounded w-full mb-1.5 group-hover:scale-102 transition-transform"
                          />
                          <p className="text-[12px] font-medium text-[#2B2224] group-hover:text-[#962949] line-clamp-1">
                            {item.name}
                          </p>
                          <span className="text-[12px] font-bold text-[#962949]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* B. When query is empty (Pre-search state) */
            <div className="space-y-6">
              {/* 1. Recent Searches (if any) */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] uppercase tracking-[0.06em] text-[#6F6265] font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#962949]" /> Recent Searches
                    </span>
                    <button
                      onClick={clearAllRecentSearches}
                      className="text-[11.5px] text-[#8F8184] hover:text-[#962949] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Clear History
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        onClick={() => handleTermClick(term)}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] hover:bg-[#F9D0D6]/20 text-[13px] text-[#2B2224] hover:text-[#962949] rounded-full transition-colors cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#8F8184] group-hover:text-[#962949]" />
                        <span>{term}</span>
                        <button
                          onClick={(e) => removeRecentSearch(e, term)}
                          className="text-[#8F8184] hover:text-[#2B2224] p-0.5 rounded-full ml-1"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Trending & Popular Searches */}
              <div>
                <span className="text-[12px] uppercase tracking-[0.06em] text-[#6F6265] font-semibold flex items-center gap-1.5 mb-2.5">
                  <Flame className="w-3.5 h-3.5 text-[#962949]" /> Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TERMS.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTermClick(term)}
                      className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] hover:bg-[#F9D0D6]/30 text-[13px] text-[#2B2224] hover:text-[#962949] rounded-full transition-all cursor-pointer flex items-center gap-1.5 group"
                    >
                      <span>{term}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8F8184] group-hover:text-[#962949] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Browse Boota Collections Shortcuts */}
              <div>
                <span className="text-[12px] uppercase tracking-[0.06em] text-[#6F6265] font-semibold flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#962949]" /> Explore by Category
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CURATED_CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => handleCategoryShortcut(cat.query)}
                      className="p-3 bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] hover:bg-[#FFF9FA] rounded-[6px] text-left transition-all duration-200 cursor-pointer group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-[13.5px] font-medium text-[#2B2224] group-hover:text-[#962949]">
                          {cat.label}
                        </h4>
                        <p className="text-[11px] text-[#8F8184]">{cat.count}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8F8184] group-hover:text-[#962949] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Trending Boota Bestsellers Showcase */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] uppercase tracking-[0.06em] text-[#6F6265] font-semibold flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#962949] fill-[#962949]" /> Customer Favorites
                  </span>
                  <span className="text-[11.5px] text-[#8F8184]">Handcrafted in pure silk & mulmul</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {bestsellerProducts.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleProductClick(item)}
                      className="group bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] rounded-[6px] p-2.5 flex flex-col justify-between hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden rounded bg-[#FAF7F2] mb-2 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.badge && (
                          <span className="absolute top-1.5 left-1.5 bg-[#962949] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6F6265] uppercase tracking-wider">
                          {item.collection}
                        </p>
                        <h4 className="text-[13px] font-semibold text-[#2B2224] group-hover:text-[#962949] line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-[13px] font-bold text-[#962949]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {item.mrp && item.mrp > item.price && (
                            <span className="text-[11px] text-[#8F8184] line-through">
                              ₹{item.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Footer Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2] border-t border-[#E8DADD] flex items-center justify-between text-[12px] text-[#6F6265] shrink-0">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E8DADD] rounded text-[10px] font-mono">↵ Enter</kbd> to search
            </span>
            <span className="hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E8DADD] rounded text-[10px] font-mono">Esc</kbd> to close
            </span>
          </div>
          <span className="text-[#962949] font-medium ml-auto">
            Boota Artisanal Kids Ethnic Wear
          </span>
        </div>
      </div>
    </div>
  );
};
