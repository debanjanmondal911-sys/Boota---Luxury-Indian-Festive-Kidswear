import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, RotateCcw } from 'lucide-react';
import { MegaMenu, NavTab } from './MegaMenu';
import { bootaLogo } from '../assets/images';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentView?: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateHome?: () => void;
  onNavigatePage?: (page: string) => void;
  onSelectCategory?: (category: string) => void;
}

const navTabs: NavTab[] = ['GIRL', 'COLLECTION', 'OCCASIONS', 'ACCESSORIES', 'SALE'];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  currentView = 'home',
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onNavigateHome,
  onNavigatePage,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<NavTab | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileAccordion = (tab: NavTab) => {
    setOpenMobileAccordion((prev) => (prev === tab ? null : tab));
  };

  const handleMobileNavigate = (page: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    } else if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(null);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <header
      onMouseLeave={() => setActiveTab(null)}
      className={`relative bg-[#FFFFFF] border-b border-[#E8DADD] sticky top-0 z-30 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-xs' : ''
      }`}
    >
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between transition-all duration-300 relative ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-[#2B2224] hover:text-[#962949] cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>

          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-90 transition-opacity pr-2 py-1 shrink-0 cursor-pointer"
            aria-label="Boota Homepage"
          >
            <img
              src={bootaLogo}
              alt="Boota"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-11 w-auto max-h-11' : 'h-12 sm:h-13 w-auto max-h-13'
              }`}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation in Title Case matching reference */}
        <nav className="hidden md:flex items-center justify-center space-x-7 lg:space-x-8 xl:space-x-10 absolute left-1/2 -translate-x-1/2">
          {navTabs.map((tab) => {
            const isActive =
              activeTab === tab ||
              (tab === 'GIRL' && currentView === 'girl') ||
              (tab === 'ACCESSORIES' && currentView === 'accessories') ||
              (tab === 'COLLECTION' && currentView === 'collection') ||
              (tab === 'OCCASIONS' && (currentView === 'occasions' || currentView as string === 'occasion')) ||
              (tab === 'SALE' && currentView === 'sale');
            const label = tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
            return (
              <div
                key={tab}
                className="relative py-7 shrink-0"
                onMouseEnter={() => setActiveTab(tab)}
              >
                <button
                  onClick={() => {
                    if (tab === 'GIRL') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('girl');
                    } else if (tab === 'ACCESSORIES') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('accessories');
                    } else if (tab === 'COLLECTION') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('collection');
                    } else if (tab === 'OCCASIONS') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('occasions');
                    } else if (tab === 'SALE') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('sale');
                    } else {
                      setActiveTab(activeTab === tab ? null : tab);
                    }
                  }}
                  className={`text-[15px] lg:text-[15.5px] font-medium tracking-normal transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#962949]' : 'text-[#2B2224] hover:text-[#962949]'
                  }`}
                >
                  {label}
                </button>
                {isActive && (
                  <span className="absolute bottom-5 left-0 right-0 h-[2px] bg-[#962949] rounded-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions - 4 icons pushed all the way to the right */}
        <div className="ml-auto flex items-center space-x-5 lg:space-x-6 text-[#2B2224] shrink-0 justify-end z-10">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:text-[#962949] hover:bg-[#F9D0D6]/35 active:scale-95 transition-all duration-200 cursor-pointer rounded-full flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#962949]/30"
            aria-label="Search collection"
            title="Search Boota Collection"
          >
            <Search className="w-5 h-5 stroke-[1.8] group-hover:scale-110 transition-transform duration-200" />
          </button>

          {/* User / My Account Icon */}
          <button
            onClick={onOpenAccount}
            className="p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full"
            aria-label="My Account"
            title="My Account"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#962949] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full flex items-center justify-center"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
            {cartCount !== undefined && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#962949] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu
        activeTab={activeTab}
        onClose={() => setActiveTab(null)}
        onSelectCategory={onSelectCategory}
      />

      {/* Mobile Drawer (matching "new navbar.jpg" exactly) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col md:hidden overflow-y-auto">
          {/* Header Row */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E8DADD] shrink-0 bg-[#FFFFFF]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="flex items-center py-1"
              aria-label="Boota Homepage"
            >
              <img
                src={bootaLogo}
                alt="Boota"
                className="h-10 w-auto object-contain max-h-10"
                referrerPolicy="no-referrer"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#2B2224] hover:text-[#962949] cursor-pointer rounded-[4px]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>

          {/* Accordion Categories */}
          <div className="divide-y divide-[#E8DADD] border-b border-[#E8DADD]">
            {/* Home Item */}
            <div className="w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateHome) {
                    onNavigateHome();
                  }
                }}
                className={`w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer transition-colors ${
                  currentView === 'home'
                    ? 'text-[#962949] font-semibold bg-[#FFF9FA]'
                    : 'text-[#000000] hover:text-[#962949]'
                }`}
              >
                <span className="text-[14.5px] font-medium tracking-[0.05em] uppercase">
                  Home
                </span>
                {currentView === 'home' && (
                  <span className="w-2 h-2 rounded-full bg-[#962949]" />
                )}
              </button>
            </div>

            {navTabs.map((tab) => {
              const isOpen = openMobileAccordion === tab;
              const isTabActive =
                (tab === 'GIRL' && currentView === 'girl') ||
                (tab === 'ACCESSORIES' && currentView === 'accessories') ||
                (tab === 'COLLECTION' && currentView === 'collection') ||
                (tab === 'OCCASIONS' && (currentView === 'occasions' || (currentView as string) === 'occasion')) ||
                (tab === 'SALE' && currentView === 'sale');

              return (
                <div key={tab} className="w-full">
                  <button
                    onClick={() => toggleMobileAccordion(tab)}
                    className={`w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer transition-colors ${
                      isTabActive
                        ? 'text-[#962949] font-semibold bg-[#FFF9FA]'
                        : 'text-[#2B2224] hover:text-[#962949]'
                    }`}
                  >
                    <span className="text-[14.5px] font-medium tracking-[0.05em] uppercase">
                      {tab}
                    </span>
                    <div className="flex items-center gap-2">
                      {isTabActive && (
                        <span className="w-2 h-2 rounded-full bg-[#962949]" />
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#962949]' : 'text-[#6F6265]'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Content with details filled from Desktop Screenshots */}
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 space-y-4 bg-[#FFFDF9] border-t border-[#E8DADD]/60 text-[13.5px]">
                      {tab === 'GIRL' && (
                        <div className="space-y-4 pt-2">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate('girl')}
                            className="w-full text-left font-bold text-[#962949] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Girls Collection</span>
                            <span>→</span>
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('girl')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Boota Desi
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', 'Suit Sets')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Suit Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', 'Lehenga Sets')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Lehenga Sets
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('girl')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Boota Play
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', 'Dresses')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Dresses
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', 'Top Sets')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Top Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', 'Tops')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Tops
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('girl')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Shop by Age
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', '0-12M')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Baby (0-12 months)
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', '1-3Y')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Toddler (1-3 years)
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('girl', '3Y+')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Kids (3+ years)
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('accessories')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Accessories
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Hair Accessories
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Bangles
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Jewellery
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Bags
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('sale', 'all sale')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer text-[#962949] font-medium transition-colors"
                                >
                                  Sale
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'COLLECTION' && (
                        <div className="space-y-4 pt-2">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate('collection', 'collection')}
                            className="w-full text-left font-bold text-[#962949] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Boota Collections</span>
                            <span>→</span>
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('collection', 'boota desi')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Boota Desi
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota desi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Suit Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota desi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Lehenga Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota desi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Sharara Sets
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('collection', 'boota play')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Boota Play
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota play')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Dresses
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota play')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Top Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota play')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Co-ords
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('collection', 'boota luxe')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Boota Luxe
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota luxe')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Festive Lehengas
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota luxe')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Occasion Sets
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('collection', 'boota luxe')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer font-medium text-[#962949] transition-colors"
                                >
                                  Silk Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'OCCASIONS' && (
                        <div className="space-y-4 pt-2">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate('occasions', 'occasions')}
                            className="w-full text-left font-bold text-[#962949] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Upcoming Occasions</span>
                            <span>→</span>
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('occasions', 'baby ceremonies')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Baby Ceremonies
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'baby welcome')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Baby Welcome &amp; Naming
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'mundan')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Head Shave: Mundan
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'annaprashan')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  First Food: Annaprashan
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('occasions', 'occasions')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Upcoming Occasions
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'ganesh chaturthi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Ganesh Chaturthi
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'navratri')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Navratri &amp; Durga Puja
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'diwali')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer font-medium text-[#962949] transition-colors"
                                >
                                  Diwali
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('occasions', 'wedding')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Wedding
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'mehendi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Mehendi
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'haldi')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Haldi
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'sangeet')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Sangeet
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('occasions', 'wedding')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer font-medium text-[#962949] transition-colors"
                                >
                                  Wedding
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'ACCESSORIES' && (
                        <div className="space-y-4 pt-2">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate('accessories')}
                            className="w-full text-left font-bold text-[#962949] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Accessories Collection</span>
                            <span>→</span>
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('accessories')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Baby
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Swaddles
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Mustard Seed Pillows
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Toys
                                </button>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('accessories')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Girl
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Hair Accessories
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Bags
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Bangles
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('accessories')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Jewellery
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'SALE' && (
                        <div className="space-y-4 pt-2">
                          <button
                            type="button"
                            onClick={() => handleMobileNavigate('sale', 'all sale')}
                            className="w-full text-left font-bold text-[#962949] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Sale Collections</span>
                            <span>→</span>
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleMobileNavigate('sale', 'all sale')}
                              className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5 text-left w-full cursor-pointer hover:underline"
                            >
                              Sale
                            </button>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('sale', 'all sale')}
                                  className="hover:text-[#962949] block py-0.5 font-medium text-[#962949] text-left w-full cursor-pointer transition-colors"
                                >
                                  All Sale
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('sale', 'first time on sale')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  First Time on Sale
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleMobileNavigate('sale', 'special prices')}
                                  className="hover:text-[#962949] block py-0.5 text-left w-full cursor-pointer transition-colors"
                                >
                                  Special Prices
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Utility Items matching 'new navbar.jpg' */}
          <div className="pt-5 pb-8 px-6 space-y-3.5 text-[15px] text-[#2B2224] shrink-0 bg-[#FFFFFF]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="block w-full text-left hover:text-[#962949] transition-colors cursor-pointer py-1"
            >
              <span className="font-medium whitespace-nowrap text-[15px] inline-block">My Account</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigatePage) onNavigatePage('returns');
              }}
              className="flex items-center gap-3 w-full text-left text-[#962949] font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-[19px] h-[19px] stroke-[1.8] text-[#962949]" />
              <span>Track, Return or Exchange</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWishlist();
              }}
              className="flex items-center gap-3 w-full text-left hover:text-[#962949] transition-colors cursor-pointer"
            >
              <Heart className="w-[19px] h-[19px] stroke-[1.8] text-[#2B2224]" />
              <span className="font-medium">Wishlist</span>
            </button>

            <div className="pt-2 border-t border-[#E8DADD]/60 space-y-2 text-[14px]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('about');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                About Boota
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('why-boota');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Why Choose Boota?
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('blog');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Blog &amp; Festive Guides
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('gift-card');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Gift Cards
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('size-guide');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Size Guide
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('faq');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                FAQ &amp; Help
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('contact');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer text-[#962949]"
              >
                Contact Concierge · +91 7291947002
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

