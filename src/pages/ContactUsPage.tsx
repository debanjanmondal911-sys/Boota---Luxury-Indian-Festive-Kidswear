import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface ContactUsPageProps {
  onNavigateHome: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderNumber: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    // Success state
    setStatus('success');
    setFormData({
      name: '',
      phone: '',
      email: '',
      orderNumber: '',
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
            <span className="text-[#962949] font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="max-w-[700px] mx-auto text-center mb-12">
            <span className="inline-block text-[12px] uppercase font-semibold tracking-[0.18em] text-[#962949] mb-3">
              We Are Here to Assist
            </span>
            <h1 className="font-serif font-semibold text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] text-[#962949] mb-4">
              Contact Us
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#6F6265] leading-[1.6]">
              Have questions regarding sizing, custom bridal family edits, or your active shipment? Reach our Jaipur concierge directly.
            </p>
          </div>

          {/* Recommended Layout: 2 Columns (Contact Details | Contact Form) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Contact Details */}
            <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#E8DADD] p-6 sm:p-8 rounded-[4px] space-y-8">
              <div>
                <h2 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#962949] mb-2">
                  Atelier Concierge
                </h2>
                <p className="text-[14.5px] text-[#6F6265] leading-[1.6]">
                  Our master stylists and client team respond promptly during atelier operating hours.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] shrink-0 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6F6265] block">
                      Phone
                    </span>
                    <a
                      href="tel:+917291947002"
                      className="text-[15px] font-medium text-[#2B2224] hover:text-[#962949] transition-colors"
                    >
                      +91 7291947002
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] shrink-0 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6F6265] block">
                      Email
                    </span>
                    <a
                      href="mailto:care@bootakids.com"
                      className="text-[15px] font-medium text-[#2B2224] hover:text-[#962949] transition-colors"
                    >
                      care@bootakids.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#25D366] shrink-0 shadow-xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6F6265] block">
                      WhatsApp Concierge
                    </span>
                    <a
                      href="https://wa.me/917291947002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-medium text-[#2B2224] hover:text-[#962949] transition-colors inline-block"
                    >
                      +91 7291947002
                    </a>
                    <p className="text-[12px] text-[#6F6265] mt-0.5">
                      Direct styling &amp; measurement consultation
                    </p>
                  </div>
                </div>

                {/* Business Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] shrink-0 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6F6265] block">
                      Atelier Address
                    </span>
                    <address className="not-italic text-[14.5px] text-[#2B2224] leading-[1.6]">
                      Boota Atelier, 42 Heritage Lane, C-Scheme, Jaipur, Rajasthan — 302001, India
                    </address>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[4px] bg-[#FFFFFF] border border-[#E8DADD] flex items-center justify-center text-[#962949] shrink-0 shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6F6265] block">
                      Working Hours
                    </span>
                    <p className="text-[14.5px] text-[#2B2224]">
                      Monday – Saturday: 10:00 AM – 7:00 PM IST
                    </p>
                    <p className="text-[12px] text-[#6F6265]">
                      Closed on Sundays &amp; National Holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8DADD] p-6 sm:p-8 rounded-[4px] shadow-xs">
              <h2 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#2B2224] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[14.5px] text-[#6F6265] mb-6">
                Fill in the details below and our team will get back to you within 24 hours.
              </p>

              {/* Status messages using required design system colors */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-[4px] bg-[#962949]/10 border border-[#962949] flex items-start gap-3 text-[#962949]">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14.5px] font-semibold">Thank you for reaching out!</p>
                    <p className="text-[13px] text-[#962949]/90 mt-0.5">
                      Your message has been received. Our atelier team will contact you shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-[4px] bg-[#B3261E]/10 border border-[#B3261E] flex items-start gap-3 text-[#B3261E]">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14.5px] font-semibold">Submission Error</p>
                    <p className="text-[13px] text-[#B3261E]/90 mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Phone Number
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      placeholder="e.g. BT-92810"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-[#E8DADD] rounded-[4px] text-[16px] text-[#2B2224] focus:outline-none focus:border-[#962949]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13.5px] font-medium text-[#2B2224] mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="How may our atelier assist you today? Mention specific measurements or occasion dates if applicable..."
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
                    <Send className="w-4 h-4" /> Send Message
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
