import React, { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { bootaLogoWhite } from '../assets/images';

interface FooterProps {
  onOpenSizeGuide?: () => void;
  onOpenAccount: () => void;
  onNavigatePage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenAccount,
  onNavigatePage,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigatePage) {
      onNavigatePage(page);
    } else {
      window.location.hash = page;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#962949] text-[#FFFFFF] pt-14 pb-12">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Brand Header with White Logo */}
        <div className="pb-10 mb-10 border-b border-[#FFFFFF]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Boota Homepage"
          >
            <img
              src={bootaLogoWhite}
              alt="Boota"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>
          <p className="text-[13.5px] text-[#F9D0D6]/90 max-w-sm font-light leading-relaxed">
            Handcrafted festive kidswear rooted in Jaipur&apos;s royal heritage. Tailored with care for celebration and playtime.
          </p>
        </div>

        {/* Main Footer 4 Columns with 24px gutters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pb-14 border-b border-[#FFFFFF]/20">
          {/* Col 1: Contact */}
          <div>
            <h4 className="font-serif font-bold text-[24px] mb-5 text-[#FFFFFF]">
              Contact
            </h4>
            <ul className="space-y-3.5 text-[16px] text-[#F9D0D6] font-normal leading-[1.7]">
              <li>
                <a
                  href="tel:+917291947002"
                  className="hover:text-[#FFFFFF] transition-colors"
                >
                  Phone: +91 7291947002
                </a>
              </li>
              <li>
                <a
                  href="mailto:care@bootakids.com"
                  className="hover:text-[#FFFFFF] transition-colors"
                >
                  Email: care@bootakids.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917291947002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp: +91 7291947002</span>
                </a>
              </li>
              <li className="text-[#F9D0D6]/85">Jaipur Atelier &amp; Studio, Rajasthan</li>
              <li className="text-[#F9D0D6]/85 pt-0.5">Mon-Sat, 10:00 am - 7:00 pm IST</li>
            </ul>
          </div>

          {/* Col 2: Know Us */}
          <div>
            <h4 className="font-serif font-bold text-[24px] mb-5 text-[#FFFFFF]">
              Know Us
            </h4>
            <ul className="space-y-3.5 text-[16px] text-[#F9D0D6] font-normal leading-[1.7]">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'why-boota')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Why Choose Boota?
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'blog')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'gift-card')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Gift Card
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <h4 className="font-serif font-bold text-[24px] mb-5 text-[#FFFFFF]">
              Help
            </h4>
            <ul className="space-y-3.5 text-[16px] text-[#F9D0D6] font-normal leading-[1.7]">
              <li>
                <button
                  onClick={onOpenAccount}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'returns')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Track Order &amp; Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'returns')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Return / Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'size-guide')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, 'wholesale')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Wholesale Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Subscribe & Social */}
          <div>
            <h4 className="font-serif font-bold text-[24px] mb-5 text-[#FFFFFF]">
              Subscribe to our email
            </h4>

            {subscribed ? (
              <div className="bg-[#FFFFFF]/15 text-[#FFFFFF] text-[13px] p-3 rounded-[4px] mb-6">
                Thank you for subscribing to Boota!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center mb-8">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/30 rounded-[4px] text-[#FFFFFF] placeholder-[#F9D0D6]/70 px-3.5 py-2.5 text-[13.5px] focus:outline-none focus:border-[#FFFFFF] transition-colors pr-16"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1.5 text-[13px] font-semibold tracking-[0.06em] uppercase text-[#FFFFFF] hover:text-[#F9D0D6] transition-colors cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            )}

            <div className="mt-6">
              <h5 className="font-serif font-semibold text-[17px] mb-3 text-[#FFFFFF]">
                Join our social community
              </h5>
              <div className="flex items-center space-x-3 text-[#FFFFFF]">
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </div>
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </div>
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center font-serif font-bold text-xs"
                  aria-label="Pinterest"
                >
                  P
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-[13px] text-[#F9D0D6]/80 font-normal gap-4">
          <div>
            <div className="text-[#FFFFFF]/90">
              © 2026 [Registered business name]. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                UPI
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Visa
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Mastercard
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                RuPay
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Net Banking
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                COD
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#terms" className="hover:text-[#FFFFFF] transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#privacy" className="hover:text-[#FFFFFF] transition-colors">
              Privacy Policy
            </a>
            <a href="#cancellation" className="hover:text-[#FFFFFF] transition-colors">
              Cancellation &amp; Refund
            </a>
            <a href="#grievance" className="hover:text-[#FFFFFF] transition-colors">
              Grievance Redressal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
