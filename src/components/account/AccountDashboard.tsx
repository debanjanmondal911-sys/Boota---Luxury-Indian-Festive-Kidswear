import React, { useState } from 'react';
import {
  X,
  Package,
  RotateCcw,
  User,
  MapPin,
  Heart,
  Bell,
  Trash2,
  LogOut,
  ChevronRight,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  UserProfile,
  Order,
  ReturnExchangeRequest,
  UserAddress,
} from '../../types/account';
import { Product } from '../../types';

interface AccountDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  orders: Order[];
  returns: ReturnExchangeRequest[];
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onViewOrder: (order: Order) => void;
  onStartReturn: (order?: Order) => void;
  onCancelOrder: (orderId: string) => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  initialTab?: 'orders' | 'returns' | 'profile' | 'addresses' | 'wishlist' | 'comms' | 'delete';
  onSelectProduct?: (product: Product) => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  returns,
  onUpdateUser,
  onLogout,
  onViewOrder,
  onStartReturn,
  onCancelOrder,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  initialTab,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<
    'orders' | 'returns' | 'profile' | 'addresses' | 'wishlist' | 'comms' | 'delete'
  >(initialTab || 'orders');

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    childName: user.childProfile?.name || '',
    childAge: user.childProfile?.ageRange || '4-5 Y',
    childOptIn: user.childProfile?.optIn || false,
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<UserAddress, 'id'>>({
    name: user.name,
    phone: user.phone,
    line1: '',
    line2: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '',
    type: 'Home',
    isDefault: false,
  });

  // Delete Request State
  const [deleteReason, setDeleteReason] = useState('No longer shopping for kidswear');
  const [deleteSubmitted, setDeleteSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: profileForm.name,
      phone: profileForm.phone,
      email: profileForm.email,
      childProfile: profileForm.childOptIn
        ? {
            name: profileForm.childName,
            ageRange: profileForm.childAge,
            optIn: true,
          }
        : undefined,
    };
    onUpdateUser(updated);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const created: UserAddress = {
      ...newAddress,
      id: `addr_${Date.now()}`,
    };
    const updatedAddresses = newAddress.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(created)
      : [...user.addresses, created];

    onUpdateUser({
      ...user,
      addresses: updatedAddresses,
    });
    setShowAddressModal(false);
    setNewAddress({
      name: user.name,
      phone: user.phone,
      line1: '',
      line2: '',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '',
      type: 'Home',
      isDefault: false,
    });
  };

  const handleDeleteAddress = (id: string) => {
    onUpdateUser({
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    });
  };

  const handleToggleComm = (key: keyof typeof user.commPrefs) => {
    const updated = {
      ...user,
      commPrefs: {
        ...user.commPrefs,
        [key]: !user.commPrefs[key],
      },
    };
    onUpdateUser(updated);
  };

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'Delivered':
        return 'bg-[#EBF7ED] text-[#2E7D32] border-[#C8E6C9]';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
      case 'Packed':
      case 'Confirmed':
        return 'bg-[#FFF8E1] text-[#B78103] border-[#FFE082]';
      case 'Cancelled':
        return 'bg-[#FDEDED] text-[#B71C1C] border-[#F8B4B4]';
      default:
        return 'bg-[#FAF6F4] text-[#6F6265] border-[#E8DADD]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/65 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="relative w-full max-w-5xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] shadow-2xl overflow-hidden my-6 flex flex-col md:flex-row min-h-[640px]">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E8DADD]">
            <div>
              <h3 className="font-serif font-semibold text-[20px] text-[#2B2224]">{user.name}</h3>
              <p className="text-[12px] text-[#6F6265]">{user.phone}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6265] hover:text-[#2B2224] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 bg-[#FAF6F4] border-b md:border-b-0 md:border-r border-[#E8DADD] p-4 sm:p-5 flex flex-col justify-between shrink-0">
            <div>
              {/* Parent Profile Card */}
              <div className="hidden md:flex items-center gap-3 pb-5 border-b border-[#E8DADD] mb-4">
                <div className="w-12 h-12 rounded-full bg-[#962949] text-white flex items-center justify-center font-serif text-[20px] font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-serif font-semibold text-[17px] text-[#2B2224] truncate">
                    {user.name}
                  </h4>
                  <p className="text-[12px] text-[#6F6265] truncate">{user.phone}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Package className="w-4 h-4" /> My Orders
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-[3px] font-semibold ${
                      activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#E8DADD] text-[#2B2224]'
                    }`}
                  >
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('returns')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'returns'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4" /> Returns &amp; Exchanges
                  </span>
                  {returns.length > 0 && (
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-[3px] font-semibold ${
                        activeTab === 'returns' ? 'bg-white/20 text-white' : 'bg-[#E8DADD] text-[#2B2224]'
                      }`}
                    >
                      {returns.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <User className="w-4 h-4" /> Profile &amp; Little One
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'addresses'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <MapPin className="w-4 h-4" /> Saved Addresses
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'wishlist'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4" /> Wishlist
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-[3px] font-semibold ${
                      activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-[#E8DADD] text-[#2B2224]'
                    }`}
                  >
                    {wishlistProducts.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('comms')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer ${
                    activeTab === 'comms'
                      ? 'bg-[#962949] text-white font-semibold'
                      : 'text-[#2B2224] hover:bg-[#F2ECE8]'
                  }`}
                >
                  <Bell className="w-4 h-4" /> Communication Preferences
                </button>

                <button
                  onClick={() => setActiveTab('delete')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[4px] text-[13.5px] font-medium transition-colors cursor-pointer text-[#B71C1C] hover:bg-[#FDEDED] ${
                    activeTab === 'delete' ? 'bg-[#FDEDED] font-semibold' : ''
                  }`}
                >
                  <Trash2 className="w-4 h-4" /> Delete Account
                </button>
              </nav>
            </div>

            {/* Logout & Concierge */}
            <div className="pt-4 border-t border-[#E8DADD] mt-4 space-y-2">
              <a
                href="https://wa.me/917291947002?text=Hi%20Boota%20Concierge,%20I%20have%20an%20account%20query."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] text-[#25D366] hover:bg-white rounded-[4px] font-medium"
              >
                <MessageCircle className="w-4 h-4" /> Concierge WhatsApp
              </a>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] text-[#6F6265] hover:text-[#962949] hover:bg-white rounded-[4px] font-medium cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="flex-1 p-5 sm:p-7 md:p-8 overflow-y-auto max-h-[85vh] bg-white">
            {/* Top Close Bar for Desktop */}
            <div className="hidden md:flex justify-end pb-3">
              <button
                onClick={onClose}
                className="p-1.5 text-[#6F6265] hover:text-[#2B2224] rounded-full hover:bg-[#FAF6F4] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DADD]">
                  <div>
                    <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                      My Orders
                    </h3>
                    <p className="text-[13px] text-[#6F6265]">
                      Track delivery, download invoices, or exchange/return items in under 2 minutes.
                    </p>
                  </div>
                  <button
                    onClick={() => onStartReturn()}
                    className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#962949] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Fast Return / Exchange
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD] p-6 space-y-3">
                    <Package className="w-10 h-10 text-[#A09598] mx-auto stroke-[1.5]" />
                    <h4 className="font-serif text-[18px] text-[#2B2224] font-semibold">
                      No Orders Placed Yet
                    </h4>
                    <p className="text-[13px] text-[#6F6265] max-w-sm mx-auto">
                      Your placed orders, tracking milestones, and invoices will appear here once you make a purchase.
                    </p>
                    <button
                      onClick={onClose}
                      className="py-2.5 px-6 bg-[#962949] hover:bg-[#7D223C] text-white text-[13px] font-semibold uppercase tracking-wide rounded-[4px] cursor-pointer transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="border border-[#E8DADD] rounded-[6px] p-5 bg-[#FFFDF9] hover:border-[#D1B8BD] transition-all space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DADD]/70 pb-3 text-[13px]">
                          <div>
                            <span className="font-semibold text-[#2B2224] text-[15px]">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[#6F6265] ml-2">Placed on {ord.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-[3px] text-[11px] font-semibold tracking-wide border uppercase ${getStatusColor(
                                ord.status
                              )}`}
                            >
                              {ord.status}
                            </span>
                            <span className="font-semibold text-[#962949] text-[14px]">
                              ₹{ord.total}
                            </span>
                          </div>
                        </div>

                        {/* Item Preview */}
                        <div className="flex flex-wrap items-center gap-4">
                          {ord.items.map((it) => (
                            <div key={it.id} className="flex items-center gap-3">
                              <img
                                src={it.image}
                                alt={it.name}
                                className="w-14 h-16 object-cover rounded-[3px] border border-[#E8DADD]"
                              />
                              <div className="text-[13px]">
                                <p className="font-medium text-[#2B2224]">{it.name}</p>
                                <p className="text-[#6F6265] text-[12px]">
                                  Size: {it.size} · Color: {it.color}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8DADD]/60">
                          <span className="text-[12px] text-[#6F6265]">
                            Delivery to: <strong>{ord.shippingAddress.city}</strong>
                          </span>

                          <div className="flex items-center gap-2">
                            {ord.status === 'Delivered' && ord.returnEligible && (
                              <button
                                onClick={() => onStartReturn(ord)}
                                className="py-1.5 px-3.5 bg-white border border-[#962949] text-[#962949] hover:bg-[#FFF9FA] text-[12px] font-semibold rounded-[4px] transition-colors cursor-pointer"
                              >
                                Return / Exchange
                              </button>
                            )}

                            {ord.cancellable && ord.status === 'Confirmed' && (
                              <button
                                onClick={() => onViewOrder(ord)}
                                className="py-1.5 px-3 bg-white border border-[#B71C1C] text-[#B71C1C] hover:bg-[#FDEDED] text-[12px] font-medium rounded-[4px] cursor-pointer"
                              >
                                Cancel Order
                              </button>
                            )}

                            <button
                              onClick={() => onViewOrder(ord)}
                              className="py-1.5 px-4 bg-[#962949] hover:bg-[#7D223C] text-white text-[12.5px] font-medium rounded-[4px] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              Order Details &amp; Tracking <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RETURNS & EXCHANGES */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DADD]">
                  <div>
                    <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                      Return &amp; Exchange Requests
                    </h3>
                    <p className="text-[13px] text-[#6F6265]">
                      100% automated parent concierge. Track reverse pickups and replacements live.
                    </p>
                  </div>
                  <button
                    onClick={() => onStartReturn()}
                    className="py-2 px-4 bg-[#962949] hover:bg-[#7D223C] text-white text-[12.5px] font-semibold uppercase tracking-wide rounded-[4px] transition-colors cursor-pointer"
                  >
                    + New Request
                  </button>
                </div>

                {returns.length === 0 ? (
                  <div className="text-center py-12 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD] p-6 space-y-3">
                    <RotateCcw className="w-10 h-10 text-[#A09598] mx-auto stroke-[1.5]" />
                    <h4 className="font-serif text-[18px] text-[#2B2224] font-semibold">
                      No Active Return or Exchange Requests
                    </h4>
                    <p className="text-[13px] text-[#6F6265] max-w-md mx-auto">
                      All your festive purchases are delivered in pristine order. Need a size change for an upcoming event?
                    </p>
                    <button
                      onClick={() => onStartReturn()}
                      className="py-2.5 px-6 bg-[#962949] text-white text-[13px] font-semibold rounded-[4px] cursor-pointer"
                    >
                      Start Return or Exchange
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {returns.map((req) => (
                      <div
                        key={req.id}
                        className="border border-[#E8DADD] rounded-[6px] p-5 bg-[#FFFDF9] space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DADD]/70 pb-3">
                          <div>
                            <span className="font-semibold text-[#962949] text-[15px]">
                              {req.requestNumber}
                            </span>
                            <span className="text-[#6F6265] text-[13px] ml-2">
                              for Order #{req.orderNumber}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 bg-[#EBF7ED] text-[#2E7D32] border border-[#C8E6C9] rounded-[3px] text-[11px] font-semibold uppercase">
                            {req.status}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <img
                            src={req.item.image}
                            alt={req.item.name}
                            className="w-14 h-16 object-cover rounded-[3px] border border-[#E8DADD]"
                          />
                          <div className="flex-1 text-[13.5px]">
                            <p className="font-semibold text-[#2B2224]">{req.item.name}</p>
                            <p className="text-[#6F6265] text-[12.5px]">
                              Action:{' '}
                              <strong className="text-[#2B2224]">
                                {req.type === 'exchange'
                                  ? `Exchange to Size ${req.exchangeSize}`
                                  : `Return for ${req.refundMethod === 'store_credit' ? 'Store Credit' : 'Original Payment'}`}
                              </strong>
                            </p>
                            <p className="text-[#6F6265] text-[12px]">
                              Reason: {req.reason} {req.notes && `("${req.notes}")`}
                            </p>
                          </div>
                          <div className="text-[12.5px] text-right">
                            <span className="text-[#6F6265] block">Doorstep Pickup:</span>
                            <strong className="text-[#2B2224]">{req.pickupDate}</strong>
                            <span className="text-[#6F6265] block text-[11.5px]">
                              {req.pickupSlot}
                            </span>
                          </div>
                        </div>

                        {/* Status Stepper */}
                        <div className="bg-[#FAF6F4] p-3.5 rounded-[4px] border border-[#E8DADD]">
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px]">
                            <div className="p-1.5 rounded-[3px] bg-[#962949] text-white font-medium">
                              1. Requested ✓
                            </div>
                            <div className="p-1.5 rounded-[3px] bg-[#962949] text-white font-medium">
                              2. Approved ✓
                            </div>
                            <div className="p-1.5 rounded-[3px] bg-white text-[#6F6265] border border-[#E8DADD]">
                              3. Picked Up
                            </div>
                            <div className="p-1.5 rounded-[3px] bg-white text-[#6F6265] border border-[#E8DADD]">
                              4. Received
                            </div>
                            <div className="p-1.5 rounded-[3px] bg-white text-[#6F6265] border border-[#E8DADD]">
                              5. {req.type === 'exchange' ? 'New Size Shipped' : 'Refund Completed'}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 text-[12.5px]">
                          <a
                            href={`https://wa.me/917291947002?text=${encodeURIComponent(
                              `Hi Boota Concierge, checking on Return #${req.requestNumber}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-medium"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PROFILE & LITTLE ONE */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8DADD]">
                  <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                    Parent &amp; Child Profile
                  </h3>
                  <p className="text-[13px] text-[#6F6265]">
                    Manage contact details and optional child sizing profile.
                  </p>
                </div>

                {profileSaved && (
                  <div className="bg-[#EBF7ED] border border-[#C8E6C9] text-[#2E7D32] p-3 rounded-[4px] text-[13px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your profile preferences have been updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Parent Info */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-semibold text-[17px] text-[#2B2224]">
                      Parent Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12.5px] uppercase font-semibold text-[#6F6265] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                          className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3.5 py-2 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12.5px] uppercase font-semibold text-[#6F6265] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, phone: e.target.value })
                          }
                          className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3.5 py-2 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[12.5px] uppercase font-semibold text-[#6F6265] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, email: e.target.value })
                          }
                          className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3.5 py-2 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional "My Little One" Profile */}
                  <div className="border border-[#E8DADD] bg-[#FFFDF9] rounded-[6px] p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#962949] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Optional Parent Perk
                        </span>
                        <h4 className="font-serif font-semibold text-[18px] text-[#2B2224] mt-0.5">
                          "My Little One" Profile
                        </h4>
                        <p className="text-[12.5px] text-[#6F6265] mt-1 leading-relaxed">
                          Enter your child’s first name and age range only. Used exclusively for smart size suggestions and personalized festive birthday gifts.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={profileForm.childOptIn}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, childOptIn: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#E8DADD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#962949]"></div>
                      </label>
                    </div>

                    {profileForm.childOptIn && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#E8DADD]/60">
                        <div>
                          <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1">
                            Child’s First Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Tara"
                            value={profileForm.childName}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, childName: e.target.value })
                            }
                            className="w-full bg-white border border-[#E8DADD] px-3.5 py-2 text-[13.5px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1">
                            Age Range
                          </label>
                          <select
                            value={profileForm.childAge}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, childAge: e.target.value })
                            }
                            className="w-full bg-white border border-[#E8DADD] px-3.5 py-2 text-[13.5px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                          >
                            <option value="0-6 M">0-6 Months</option>
                            <option value="6-12 M">6-12 Months</option>
                            <option value="1-2 Y">1-2 Years</option>
                            <option value="2-3 Y">2-3 Years</option>
                            <option value="4-5 Y">4-5 Years</option>
                            <option value="6-7 Y">6-7 Years</option>
                            <option value="8-9 Y">8-9 Years</option>
                            <option value="10-11 Y">10-11 Years</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 text-[12px] text-[#6F6265] bg-[#FAF6F4] p-3 rounded-[4px] border border-[#E8DADD]">
                          <strong>Notice of Use:</strong> This profile is strictly opt-in and is never required to browse or complete a purchase. We do not collect surnames, identification, or photographs of minors.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="py-3 px-8 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 4: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DADD]">
                  <div>
                    <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-[13px] text-[#6F6265]">
                      Manage shipping addresses for speedy 1-tap festive checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="py-2 px-4 bg-[#962949] hover:bg-[#7D223C] text-white text-[12.5px] font-semibold uppercase tracking-wide rounded-[4px] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[#E8DADD] rounded-[6px] p-5 bg-[#FFFDF9] space-y-3 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#FAF6F4] px-2 py-0.5 rounded-[2px] border border-[#E8DADD]">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[11px] font-semibold text-[#2E7D32] bg-[#EBF7ED] px-2 py-0.5 rounded-[2px]">
                            Default Shipping
                          </span>
                        )}
                      </div>

                      <div className="text-[13.5px] text-[#6F6265]">
                        <p className="font-semibold text-[#2B2224]">{addr.name}</p>
                        <p>{addr.line1}</p>
                        {addr.line2 && <p>{addr.line2}</p>}
                        <p>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="pt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="pt-2 border-t border-[#E8DADD]/60 flex items-center justify-between text-[12px]">
                        {!addr.isDefault && (
                          <button
                            onClick={() => {
                              onUpdateUser({
                                ...user,
                                addresses: user.addresses.map((a) => ({
                                  ...a,
                                  isDefault: a.id === addr.id,
                                })),
                              });
                            }}
                            className="text-[#962949] hover:underline font-medium cursor-pointer"
                          >
                            Set as default
                          </button>
                        )}
                        {user.addresses.length > 1 && (
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[#B71C1C] hover:underline cursor-pointer ml-auto"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Modal */}
                {showAddressModal && (
                  <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="relative w-full max-w-md bg-white border border-[#E8DADD] rounded-[6px] p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#E8DADD] pb-3">
                        <h4 className="font-serif font-semibold text-[18px] text-[#2B2224]">
                          Add New Delivery Address
                        </h4>
                        <button
                          onClick={() => setShowAddressModal(false)}
                          className="p-1 text-[#6F6265] hover:text-[#2B2224]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleAddAddress} className="space-y-3 text-[13px]">
                        <div>
                          <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                            Contact Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                            House / Flat / Building *
                          </label>
                          <input
                            type="text"
                            required
                            value={newAddress.line1}
                            onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                            className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                            Area / Landmark / Street
                          </label>
                          <input
                            type="text"
                            value={newAddress.line2 || ''}
                            onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                            className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                              className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11.5px] uppercase font-semibold text-[#6F6265] mb-1">
                              Pincode *
                            </label>
                            <input
                              type="text"
                              required
                              value={newAddress.pincode}
                              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                              className="w-full bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 rounded-[4px]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="defAddr"
                            checked={newAddress.isDefault}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, isDefault: e.target.checked })
                            }
                            className="text-[#962949] focus:ring-[#962949]"
                          />
                          <label htmlFor="defAddr" className="text-[12.5px] text-[#2B2224]">
                            Set as primary shipping address
                          </label>
                        </div>

                        <div className="pt-3 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(false)}
                            className="py-2 px-4 border border-[#E8DADD] text-[#6F6265] rounded-[4px]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="py-2 px-6 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold rounded-[4px]"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8DADD] flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                      Saved Wishlist ({wishlistProducts.length})
                    </h3>
                    <p className="text-[13px] text-[#6F6265]">
                      Handpicked celebratory pieces saved for upcoming milestones.
                    </p>
                  </div>
                  {wishlistProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        wishlistProducts.forEach((p) => {
                          const size = p.sizes?.[0] || '1-2 Y';
                          const color = p.color || 'Pink';
                          onAddToCart(p, size, color);
                        });
                      }}
                      className="px-3.5 py-1.5 bg-[#962949] hover:bg-[#7D223C] text-white text-[12px] font-semibold uppercase tracking-wider rounded-[4px] shadow-2xs transition-colors cursor-pointer"
                    >
                      Move All to Bag
                    </button>
                  )}
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12 bg-[#FAF6F4] rounded-[6px] border border-[#E8DADD] p-6 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-white border border-[#E8DADD] flex items-center justify-center mx-auto text-[#962949] shadow-2xs">
                      <Heart className="w-7 h-7 text-[#962949] stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-[19px] text-[#2B2224] font-semibold">
                        Your Wishlist is Empty
                      </h4>
                      <p className="text-[13px] text-[#6F6265] max-w-sm mx-auto">
                        Explore our handcrafted collections and click the heart icon on any outfit to save it here.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#962949] hover:bg-[#7D223C] text-white text-[12px] font-semibold uppercase tracking-wider rounded-[4px] transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Explore Festive Collections</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map((prod) => {
                      const defaultSize = prod.sizes?.[0] || '1-2 Y';
                      const defaultColor = prod.color || 'Pink';

                      return (
                        <div
                          key={prod.id}
                          className="border border-[#E8DADD] rounded-[6px] overflow-hidden bg-[#FFFDF9] flex flex-col justify-between hover:border-[#962949]/40 transition-colors shadow-2xs group"
                        >
                          <div
                            onClick={() => {
                              if (onSelectProduct) {
                                onSelectProduct(prod);
                                onClose();
                              }
                            }}
                            className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {prod.badge && (
                              <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#962949] text-white text-[9.5px] font-bold rounded-[2px] leading-none uppercase">
                                {prod.badge}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveWishlist(prod.id);
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-[#B71C1C] rounded-full shadow-xs cursor-pointer transition-colors"
                              aria-label="Remove item"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5">
                            <div>
                              <span className="text-[11px] text-[#6F6265] block uppercase tracking-wider font-semibold">
                                {prod.collection || 'Festive Edit'}
                              </span>
                              <h5
                                onClick={() => {
                                  if (onSelectProduct) {
                                    onSelectProduct(prod);
                                    onClose();
                                  }
                                }}
                                className="font-semibold text-[#2B2224] hover:text-[#962949] text-[13.5px] leading-snug cursor-pointer line-clamp-1 transition-colors mt-0.5"
                                title={prod.name}
                              >
                                {prod.name}
                              </h5>
                              <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-[#962949] font-serif font-bold text-[16px]">
                                  ₹{prod.price.toLocaleString('en-IN')}
                                </span>
                                {prod.mrp && prod.mrp > prod.price && (
                                  <span className="text-[12px] text-[#A09598] line-through">
                                    ₹{prod.mrp.toLocaleString('en-IN')}
                                  </span>
                                )}
                                {prod.discountPercent ? (
                                  <span className="text-[10px] font-bold text-[#962949] bg-[#962949]/10 px-1 py-0.5 rounded-[2px]">
                                    {prod.discountPercent}% OFF
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-[#E8DADD]/50 flex items-center gap-2">
                              {onSelectProduct && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onSelectProduct(prod);
                                    onClose();
                                  }}
                                  className="py-2 px-2.5 border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] text-[11.5px] font-semibold rounded-[4px] transition-colors cursor-pointer"
                                  title="View product details"
                                >
                                  View
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => onAddToCart(prod, defaultSize, defaultColor)}
                                className="flex-1 py-2 bg-[#962949] hover:bg-[#7D223C] text-white text-[12px] font-semibold tracking-wider uppercase rounded-[4px] transition-colors cursor-pointer text-center"
                              >
                                Move to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: COMMUNICATION PREFERENCES */}
            {activeTab === 'comms' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8DADD]">
                  <h3 className="font-serif text-[24px] font-semibold text-[#2B2224]">
                    Communication Preferences
                  </h3>
                  <p className="text-[13px] text-[#6F6265]">
                    Choose how and where you wish to receive festive updates and delivery milestones.
                  </p>
                </div>

                <div className="divide-y divide-[#E8DADD] border border-[#E8DADD] rounded-[6px] bg-[#FFFDF9]">
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#2B2224]">
                        WhatsApp Order Dispatch &amp; Tracking Alerts
                      </h4>
                      <p className="text-[13px] text-[#6F6265] mt-0.5">
                        Receive live tracking notifications and return status updates directly on WhatsApp ({user.phone}).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={user.commPrefs.whatsappAlerts}
                        onChange={() => handleToggleComm('whatsappAlerts')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E8DADD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#962949]"></div>
                    </label>
                  </div>

                  <div className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#2B2224]">
                        Email Newsletters &amp; Private Festive Edits
                      </h4>
                      <p className="text-[13px] text-[#6F6265] mt-0.5">
                        Early access to new occasion edits, festive style guides, and atelier previews ({user.email}).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={user.commPrefs.emailNewsletters}
                        onChange={() => handleToggleComm('emailNewsletters')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E8DADD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#962949]"></div>
                    </label>
                  </div>

                  <div className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-[14.5px] text-[#2B2224]">
                        SMS Delivery Alerts
                      </h4>
                      <p className="text-[13px] text-[#6F6265] mt-0.5">
                        Critical SMS alerts for courier arrival and OTP authorization.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={user.commPrefs.smsUpdates}
                        onChange={() => handleToggleComm('smsUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E8DADD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#962949]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: DELETE ACCOUNT */}
            {activeTab === 'delete' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8DADD]">
                  <h3 className="font-serif text-[24px] font-semibold text-[#B71C1C]">
                    Delete My Account
                  </h3>
                  <p className="text-[13px] text-[#6F6265]">
                    Submit an official request to permanently delete your Boota customer account and associated profiles.
                  </p>
                </div>

                {deleteSubmitted ? (
                  <div className="p-6 bg-[#EBF7ED] border border-[#C8E6C9] rounded-[6px] text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto" />
                    <h4 className="font-serif text-[20px] font-semibold text-[#2B2224]">
                      Deletion Request Received
                    </h4>
                    <p className="text-[13.5px] text-[#6F6265] max-w-md mx-auto">
                      We have received your account removal request for <strong>{user.email}</strong>. Our data privacy officer will verify all outstanding orders and permanently wipe your records within 48 hours. A final confirmation will be sent to your email.
                    </p>
                  </div>
                ) : (
                  <div className="border border-[#F8B4B4] bg-[#FFF5F5] rounded-[6px] p-6 space-y-4 text-[13.5px]">
                    <div className="flex items-start gap-3 text-[#B71C1C]">
                      <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[15px]">
                          Important Information About Account Deletion
                        </h4>
                        <p className="text-[#6F6265] mt-1 leading-relaxed">
                          Deleting your account will permanently remove your saved addresses, order history, active return tickets, and the optional "My Little One" sizing profile. This action cannot be reversed once processed.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[12.5px] uppercase font-semibold text-[#6F6265] mb-1.5">
                        Please share the primary reason for deletion:
                      </label>
                      <select
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        className="w-full bg-white border border-[#E8DADD] px-3.5 py-2 rounded-[4px] text-[13.5px] focus:outline-none focus:border-[#B71C1C]"
                      >
                        <option value="No longer shopping for kidswear">No longer shopping for kidswear</option>
                        <option value="Child has outgrown size ranges">Child has outgrown size ranges</option>
                        <option value="Duplicate account created">Duplicate account created</option>
                        <option value="Privacy preference">Privacy preference</option>
                        <option value="Other">Other reason</option>
                      </select>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#F8B4B4]/60">
                      <span className="text-[12px] text-[#6F6265]">
                        Logged in as: <strong>{user.email}</strong>
                      </span>
                      <button
                        onClick={() => setDeleteSubmitted(true)}
                        className="py-2.5 px-6 bg-[#B71C1C] hover:bg-[#911414] text-white font-semibold text-[12.5px] uppercase tracking-wide rounded-[4px] transition-colors cursor-pointer"
                      >
                        Confirm Deletion Request
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
