import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'track'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setOrderStatus(
        `Order #${orderNumber} is confirmed and packed with love. Estimated delivery: 3-5 days.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#6F6265] hover:text-[#2B2224] rounded-[4px] p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#E8DADD] mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-3 text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'border-b-2 border-[#962949] text-[#962949]'
                  : 'text-[#6F6265] hover:text-[#2B2224]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 pb-3 text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors cursor-pointer ${
                activeTab === 'track'
                  ? 'border-b-2 border-[#962949] text-[#962949]'
                  : 'text-[#6F6265] hover:text-[#2B2224]'
              }`}
            >
              Track Order
            </button>
          </div>

          {activeTab === 'login' ? (
            <div>
              <h3 className="font-serif font-semibold text-[24px] text-[#962949] mb-1">Welcome to Boota</h3>
              <p className="text-[13.5px] text-[#6F6265] mb-5 leading-[1.6]">
                Sign in to view orders, saved sizes and your wishlist.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`OTP sent to ${emailOrPhone || 'your phone number'}!`);
                  onClose();
                }}
                className="space-y-4 text-[13.5px]"
              >
                <div>
                  <label className="block text-[#2B2224] font-medium mb-1">
                    Mobile Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210 or name@example.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] px-3.5 py-2.5 outline-none focus:border-[#962949] text-[#2B2224]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] py-3 text-[13px] uppercase font-semibold tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
                >
                  REQUEST OTP
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h3 className="font-serif font-semibold text-[24px] text-[#962949] mb-1">Track Your Shipment</h3>
              <p className="text-[13.5px] text-[#6F6265] mb-5 leading-[1.6]">
                Enter your order ID or tracking number from your SMS/email.
              </p>

              <form onSubmit={handleTrack} className="space-y-4 text-[13.5px]">
                <div>
                  <label className="block text-[#2B2224] font-medium mb-1">Order ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BOOTA-9824"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] px-3.5 py-2.5 outline-none focus:border-[#962949] text-[#2B2224]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] py-3 text-[13px] uppercase font-semibold tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
                >
                  CHECK STATUS
                </button>

                {orderStatus && (
                  <div className="p-3.5 bg-[#F9D0D6]/40 border border-[#E8DADD] rounded-[4px] text-[#962949] text-[13px]">
                    {orderStatus}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
