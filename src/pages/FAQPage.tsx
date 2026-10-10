import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, PhoneCall } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  name: string;
  items: FAQItem[];
}

interface FAQPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateSizeGuide: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateSizeGuide,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    'Orders-0': true,
    'Sizing-0': true,
  });

  const faqData: FAQCategory[] = [
    {
      id: 'orders',
      name: 'Orders',
      items: [
        {
          q: 'How do I place an order for custom sizing or bridal sibling edits?',
          a: 'You can select the standard age-size closest to your child and mention specific custom measurements (chest, waist, shoulder-to-toe length) in the "Order Notes" during checkout. Alternatively, message our Jaipur atelier directly on WhatsApp (+91 7291947002) right after placing your order with your Order ID.',
        },
        {
          q: 'Can I modify or cancel my order after placement?',
          a: 'Because our master craftspeople hand-cut garments in small mindful batches, modifications or cancellations can be accommodated within 12 hours of order placement. Please contact us via phone (+91 7291947002) or email care@bootakids.com immediately.',
        },
        {
          q: 'How can I track the status of my order?',
          a: 'Once your order is hand-finished and dispatched from our Jaipur atelier, you will receive an automated WhatsApp and email notification containing your direct BlueDart, Delhivery, or DHL tracking link.',
        },
      ],
    },
    {
      id: 'sizing',
      name: 'Sizing',
      items: [
        {
          q: 'How do Boota children sizes work compared to standard high-street brands?',
          a: 'Boota sizing is calibrated with comfort-first roominess. We understand that children dislike tight fits, and family festivals span several hours. Every garment has an extra 2 to 2.5 inches of internal margin so you can let out seams as your child grows.',
        },
        {
          q: 'What if my child is between two age sizes?',
          a: 'If your child is tall for their age or between sizes, we always advise sizing up. All our lehenga skirts and dhotis feature adjustable drawstring waists, and choli blouses have generous inner seam margins.',
        },
      ],
    },
    {
      id: 'delivery',
      name: 'Delivery',
      items: [
        {
          q: 'What are the delivery timelines across India?',
          a: 'Ready-to-ship pieces are dispatched within 24–48 hours. Hand-embroidered bridal and festive pieces are tailored fresh in 3–5 working days. Express domestic shipping typically takes 2–4 business days via BlueDart air express.',
        },
        {
          q: 'Do you deliver internationally?',
          a: 'Yes, we deliver worldwide across the USA, UK, UAE, Singapore, Canada, and Australia via DHL Express (5–7 business days). International shipping fees are calculated at checkout based on delivery destination.',
        },
      ],
    },
    {
      id: 'cod',
      name: 'COD (Cash on Delivery)',
      items: [
        {
          q: 'Is Cash on Delivery available across India?',
          a: 'Yes, Cash on Delivery (COD) is available on orders up to ₹10,000 for serviceable pin codes across India. A nominal ₹99 COD handling fee is charged by logistics partners at checkout.',
        },
        {
          q: 'Can I open the parcel before paying for COD?',
          a: 'Courier regulations require the payment to be collected prior to handover of the sealed parcel. However, our seamless 7-day return and exchange policy guarantees complete peace of mind if sizing adjustments are needed.',
        },
      ],
    },
    {
      id: 'returns',
      name: 'Returns & Exchange',
      items: [
        {
          q: 'What is your return and size exchange policy?',
          a: 'We offer hassle-free 7-day doorstep size exchanges. If an outfit requires a different size, we schedule a reverse pickup from your address and dispatch the replacement with zero additional courier fees.',
        },
        {
          q: 'What items are non-returnable?',
          a: 'Custom bespoke-stitched pieces made to non-standard specific measurements and hair accessories (for hygiene reasons) are non-returnable. All standard catalog sizes are fully eligible for return or exchange.',
        },
      ],
    },
    {
      id: 'payments',
      name: 'Payments',
      items: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major Credit/Debit Cards (Visa, Mastercard, Amex, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ Indian banks, and secure digital wallets via Razorpay. International cards are supported.',
        },
        {
          q: 'Is my online transaction secure?',
          a: 'Yes, 100%. All transactions are processed through RBI-approved 256-bit bank-grade encrypted gateways. Boota never stores sensitive card details on our servers.',
        },
      ],
    },
    {
      id: 'gift-cards',
      name: 'Gift Cards',
      items: [
        {
          q: 'How do Boota Digital Gift Cards work?',
          a: 'Digital Gift Cards are emailed directly to the recipient on your specified delivery date. The email contains a unique 16-character code that can be entered during checkout in the gift card field.',
        },
        {
          q: 'Do gift cards have an expiry date?',
          a: 'Boota Gift Cards are valid for a full 12 months from the date of issuance and can be redeemed across multiple orders until the balance is exhausted.',
        },
      ],
    },
  ];

  const toggleAccordion = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#2B2224]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E8DADD] bg-[#FFFDF9]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-3.5">
          <nav className="flex items-center text-[13px] text-[#6F6265] space-x-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#962949] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#962949] font-medium">Frequently Asked Questions</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
              Help &amp; Customer Care
            </span>
            <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[50px] leading-[1.15] text-[#962949] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#6F6265] max-w-xl mx-auto leading-[1.6]">
              Clear answers regarding ordering, handloom care, children's sizing, shipping, and returns.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12 max-w-lg mx-auto">
            <Search className="w-5 h-5 text-[#6F6265] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic (e.g. sizing, delivery, COD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] text-[15px] focus:outline-none focus:border-[#962949] text-[#2B2224]"
            />
          </div>

          {/* Quick jump anchor tags */}
          {!searchQuery && (
            <div className="flex items-center justify-center flex-wrap gap-2 mb-12 text-[12.5px]">
              {faqData.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1.5 bg-[#FFFDF9] border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] rounded-[4px] uppercase tracking-wider font-medium transition-colors"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}

          {/* Category Sections */}
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#962949]/20">
                  <h2 className="font-serif font-semibold text-[22px] sm:text-[26px] text-[#962949] uppercase tracking-[0.04em]">
                    {category.name}
                  </h2>
                </div>

                {/* Accordion (4px radius, #E8DADD divider, #962949 active accent) */}
                <div className="divide-y divide-[#E8DADD] border border-[#E8DADD] rounded-[4px] bg-[#FFFFFF] shadow-2xs">
                  {category.items.map((item, idx) => {
                    const key = `${category.name}-${idx}`;
                    const isOpen = !!openItems[key];

                    return (
                      <div key={key} className="transition-colors">
                        <button
                          onClick={() => toggleAccordion(key)}
                          className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FFFDF9] transition-colors"
                        >
                          <span
                            className={`font-sans font-medium text-[15px] sm:text-[16px] leading-[1.4] pr-4 ${
                              isOpen ? 'text-[#962949] font-semibold' : 'text-[#2B2224]'
                            }`}
                          >
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 text-[#962949] ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-[14.5px] sm:text-[15px] text-[#2B2224] leading-[1.7] border-t border-[#E8DADD]/60 bg-[#FFFDF9]/60">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 p-8 bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] text-center">
            <HelpCircle className="w-8 h-8 text-[#962949] mx-auto mb-3" />
            <h3 className="font-serif font-semibold text-[24px] text-[#2B2224] mb-2">
              Still Have Questions?
            </h3>
            <p className="text-[14.5px] text-[#6F6265] max-w-md mx-auto mb-6">
              Our Jaipur atelier team is always pleased to assist with custom styling, measurement confirmations, and urgent wedding dates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onNavigateContact}
                className="w-full sm:w-auto px-6 py-3 bg-[#962949] text-[#FFFFFF] hover:bg-[#7D223C] text-[13px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
              >
                Contact Atelier Concierge
              </button>
              <button
                onClick={onNavigateSizeGuide}
                className="w-full sm:w-auto px-6 py-3 bg-[#FFFFFF] border border-[#962949] text-[#962949] hover:bg-[#F9D0D6]/20 text-[13px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
              >
                View Children’s Size Guide
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
