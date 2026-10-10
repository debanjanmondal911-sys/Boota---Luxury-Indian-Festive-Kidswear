import React, { useState } from 'react';
import { Building2, CheckCircle2, AlertCircle, Send, PackageCheck, Sparkles, ShieldCheck } from 'lucide-react';

interface WholesalePageProps {
  onNavigateHome: () => void;
}

export const WholesalePage: React.FC<WholesalePageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    gstin: '',
    quantity: '25-50 pieces',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.businessName.trim() ||
      !formData.city.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus('error');
      setErrorText('Please fill in the required business details.');
      return;
    }

    setStatus('success');
    setFormData({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: '',
      gstin: '',
      quantity: '25-50 pieces',
      message: '',
    });
  };

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
            <span className="text-[#962949] font-medium">Wholesale &amp; Bulk Enquiry</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="max-w-[760px] mx-auto text-center mb-12">
            <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
              Boutiques &amp; Curators
            </span>
            <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-4">
              Wholesale &amp; Bulk Enquiry
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#6F6265] leading-[1.6]">
              Partner with Boota to stock authentic handcrafted luxury Indian children’s occasion wear in your multi-designer boutique or retail destination.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Wholesale Info Cards */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFFDF9] border border-[#E8DADD] p-6 rounded-[4px] space-y-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] mb-3">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-[19px] text-[#2B2224]">
                  Small-Batch Production
                </h3>
                <p className="text-[13.5px] text-[#6F6265] leading-[1.6]">
                  Mindful production runs with low minimum order quantities (MOQ starting at 20 pieces across mixed sizes).
                </p>
              </div>

              <div className="bg-[#FFFDF9] border border-[#E8DADD] p-6 rounded-[4px] space-y-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-[19px] text-[#2B2224]">
                  Pure Silk &amp; Handlooms
                </h3>
                <p className="text-[13.5px] text-[#6F6265] leading-[1.6]">
                  Full certification of pure mulberry silk, pure cotton mulmul lining, and genuine heritage gota patti.
                </p>
              </div>

              <div className="bg-[#FFFDF9] border border-[#E8DADD] p-6 rounded-[4px] space-y-3">
                <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-semibold text-[19px] text-[#2B2224]">
                  Worldwide Boutique Logistics
                </h3>
                <p className="text-[13.5px] text-[#6F6265] leading-[1.6]">
                  Reliable door-to-door express shipping across India, USA, UK, UAE, and Singapore with comprehensive GST invoicing.
                </p>
              </div>
            </div>

            {/* Wholesale Form */}
            <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E8DADD] p-6 sm:p-8 rounded-[4px] shadow-xs">
              <h2 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#2B2224] mb-2">
                Boutique Partnership Application
              </h2>
              <p className="text-[14px] text-[#6F6265] mb-6">
                Tell us about your retail venture and assortment requirements.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-[4px] bg-[#962949]/10 border border-[#962949] flex items-start gap-3 text-[#962949]">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14.5px] font-semibold">Enquiry Submitted Successfully</p>
                    <p className="text-[13px] text-[#962949]/90 mt-0.5">
                      Our wholesale team will review your boutique details and share our line-sheet and catalog within 24–48 hours.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-[4px] bg-[#B3261E]/10 border border-[#B3261E] flex items-start gap-3 text-[#B3261E]">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14.5px] font-semibold">Incomplete Application</p>
                    <p className="text-[13px] text-[#B3261E]/90 mt-0.5">{errorText}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      placeholder="e.g. Ananya Kids Couture"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai / London / Dubai"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Contact Person &amp; Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="buyer@boutique.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      GSTIN (Optional for India)
                    </label>
                    <input
                      type="text"
                      name="gstin"
                      placeholder="08AAAAA0000A1Z5"
                      value={formData.gstin}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Estimated Order Quantity *
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949] bg-[#FFFDF9]"
                    >
                      <option value="20-50 pieces">20 – 50 pieces (Trial Assortment)</option>
                      <option value="50-100 pieces">50 – 100 pieces</option>
                      <option value="100-250 pieces">100 – 250 pieces</option>
                      <option value="250+ pieces">250+ pieces (Multi-Store)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                    Assortment Notes &amp; Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your boutique, current brands carried, preferred categories (Lehengas, Shararas, Angrakhas), and expected delivery timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[15px] sm:text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#962949] hover:bg-[#7D223C] text-[#FFFFFF] text-[14px] font-semibold uppercase tracking-[0.06em] rounded-[4px] transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Wholesale Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
