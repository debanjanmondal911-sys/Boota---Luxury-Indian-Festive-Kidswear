import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  Upload,
  AlertCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Calendar,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import {
  Order,
  OrderItem,
  ReturnExchangeRequest,
  ReturnExchangeType,
  ReturnReason,
  BankAccountDetails,
} from '../../types/account';

interface ReturnExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  onSuccess: (request: ReturnExchangeRequest) => void;
  allOrders?: Order[];
}

const reasonsList: ReturnReason[] = [
  'Size too small',
  'Size too large',
  'Damaged in transit',
  'Wrong item received',
  'Fabric or quality not as expected',
  'Color differs from photo',
  'Other',
];

const availableSizes = ['0-6 M', '6-12 M', '1-2 Y', '2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y', '10-11 Y'];

export const ReturnExchangeModal: React.FC<ReturnExchangeModalProps> = ({
  isOpen,
  onClose,
  order: initialOrder,
  onSuccess,
  allOrders = [],
}) => {
  // If no order passed, allow guest lookup
  const [guestOrderNumber, setGuestOrderNumber] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(initialOrder || null);

  // Stepper state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected item
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialOrder?.items[0]?.id || ''
  );
  const [actionType, setActionType] = useState<ReturnExchangeType>('exchange');

  // Reason & photos
  const [reason, setReason] = useState<ReturnReason>('Size too small');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  // Exchange Size
  const [exchangeSize, setExchangeSize] = useState<string>('6-7 Y');

  // Pickup & Refund
  const [pickupDate, setPickupDate] = useState('Tomorrow (Next Day Free Pickup)');
  const [pickupSlot, setPickupSlot] = useState('10:00 AM - 01:00 PM');
  const [refundMethod, setRefundMethod] = useState<'original' | 'store_credit' | 'bank_transfer'>(
    initialOrder?.paymentMethod === 'Cash on Delivery' ? 'bank_transfer' : 'original'
  );

  // Bank details for COD
  const [bankDetails, setBankDetails] = useState<BankAccountDetails>({
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
  });

  // Success view
  const [completedRequest, setCompletedRequest] = useState<ReturnExchangeRequest | null>(null);

  if (!isOpen) return null;

  // Handle guest lookup
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const cleanNum = guestOrderNumber.trim().toUpperCase();
    const cleanPhone = guestPhone.replace(/\D/g, '');

    const found = allOrders.find(
      (o) =>
        o.orderNumber.toUpperCase().includes(cleanNum) ||
        cleanNum.includes(o.orderNumber.toUpperCase())
    );

    if (found) {
      if (found.status !== 'Delivered') {
        setLookupError(
          `Order #${found.orderNumber} is currently "${found.status}". Return or exchange is eligible once delivered.`
        );
        return;
      }
      setActiveOrder(found);
      setSelectedItemId(found.items[0]?.id || '');
    } else {
      setLookupError('Order not found. Please verify your order number and phone number.');
    }
  };

  const currentItem: OrderItem | undefined =
    activeOrder?.items.find((it) => it.id === selectedItemId) || activeOrder?.items[0];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (!activeOrder || !currentItem) return;

    const reqId = `REQ-BT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: ReturnExchangeRequest = {
      id: `req_${Date.now()}`,
      requestNumber: reqId,
      orderId: activeOrder.id,
      orderNumber: activeOrder.orderNumber,
      createdAt: 'Just now',
      type: actionType,
      item: currentItem,
      reason,
      notes: notes.trim(),
      photos,
      exchangeSize: actionType === 'exchange' ? exchangeSize : undefined,
      pickupDate,
      pickupSlot,
      pickupFee: 0,
      refundMethod,
      bankDetails:
        refundMethod === 'bank_transfer' && bankDetails.accountNumber ? bankDetails : undefined,
      status: 'Approved',
      history: [
        {
          stage: 'Requested',
          timestamp: 'Just now',
          note: `${actionType === 'exchange' ? `Exchange for size ${exchangeSize}` : 'Return for refund'} requested online.`,
        },
        {
          stage: 'Approved',
          timestamp: 'Instant Parent Guarantee',
          note: 'Automated reverse pickup scheduled. Our courier partner will arrive with a sealed tamper-proof bag.',
        },
      ],
    };

    setCompletedRequest(newRequest);
    onSuccess(newRequest);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/65 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] shadow-2xl overflow-hidden my-6">
          {/* Header */}
          <div className="bg-[#FFFFFF] border-b border-[#E8DADD] px-6 py-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#962949] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 2-Minute Self-Service
              </span>
              <h3 className="font-serif text-[22px] sm:text-[24px] font-semibold text-[#2B2224]">
                Return or Exchange Request
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6265] hover:text-[#2B2224] rounded-full hover:bg-[#F9F5F6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {completedRequest ? (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EBF7ED] text-[#2E7D32] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                </div>
                <h4 className="font-serif text-[24px] text-[#2B2224] font-semibold">
                  {completedRequest.type === 'exchange' ? 'Exchange Scheduled!' : 'Return Scheduled!'}
                </h4>
                <p className="text-[14px] text-[#6F6265] max-w-md mx-auto">
                  Your request has been approved instantly. We have sent the confirmation &amp; reverse pickup details to your WhatsApp and Email.
                </p>
              </div>

              {/* Request Summary Card */}
              <div className="bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] p-5 space-y-3.5 text-[13.5px]">
                <div className="flex justify-between items-center border-b border-[#E8DADD]/80 pb-3">
                  <span className="text-[#6F6265]">Request Number</span>
                  <span className="font-semibold text-[#962949] text-[15px]">
                    {completedRequest.requestNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8DADD]/80 pb-3">
                  <span className="text-[#6F6265]">Item</span>
                  <span className="font-medium text-[#2B2224]">
                    {completedRequest.item.name} ({completedRequest.item.color})
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8DADD]/80 pb-3">
                  <span className="text-[#6F6265]">Action</span>
                  <span className="font-semibold text-[#2B2224]">
                    {completedRequest.type === 'exchange'
                      ? `Exchange for size ${completedRequest.exchangeSize}`
                      : `Return for ${completedRequest.refundMethod === 'store_credit' ? 'Store Credit' : 'Original Payment'}`}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-[#E8DADD]/80 pb-3">
                  <span className="text-[#6F6265]">Doorstep Pickup</span>
                  <span className="font-medium text-[#2B2224]">
                    {completedRequest.pickupDate} ({completedRequest.pickupSlot})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6F6265]">Reverse Pickup Fee</span>
                  <span className="text-[#2E7D32] font-semibold">FREE (Boota Promise)</span>
                </div>
              </div>

              {/* Live Tracker Stepper */}
              <div className="bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] p-5">
                <h5 className="font-serif font-semibold text-[16px] text-[#2B2224] mb-4">
                  Live Request Status
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] sm:text-[12px]">
                  <div className="p-2 rounded-[4px] bg-[#962949] text-white font-medium">
                    1. Requested ✓
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#962949] text-white font-medium">
                    2. Approved ✓
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#FAF6F4] text-[#6F6265]">
                    3. Picked Up
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#FAF6F4] text-[#6F6265]">
                    4. Received
                  </div>
                  <div className="p-2 rounded-[4px] bg-[#FAF6F4] text-[#6F6265]">
                    5. {completedRequest.type === 'exchange' ? 'New Size Shipped' : 'Refunded'}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.05em] uppercase rounded-[4px] transition-colors cursor-pointer"
                >
                  View In My Account
                </button>
                <a
                  href={`https://wa.me/917291947002?text=${encodeURIComponent(
                    `Hi Boota Concierge, my return request is #${completedRequest.requestNumber}. Please confirm pickup.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] font-medium text-[13px] rounded-[4px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : !activeOrder ? (
            /* Guest Lookup View */
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-[#FAF6F4] border border-[#E8DADD] p-4 rounded-[4px] flex items-start gap-3 text-[13.5px]">
                <ShieldCheck className="w-5 h-5 text-[#962949] shrink-0 mt-0.5" />
                <p className="text-[#6F6265]">
                  <strong className="text-[#2B2224]">Guest Return &amp; Exchange:</strong> You do not need to sign in to exchange or return your child’s outfit. Simply enter your Order Number and Mobile Number below to start immediately.
                </p>
              </div>

              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#2B2224] mb-1.5 uppercase tracking-wide">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BT-2026-9042"
                    value={guestOrderNumber}
                    onChange={(e) => setGuestOrderNumber(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                  />
                  <span className="text-[11.5px] text-[#6F6265] mt-1 block">
                    Tip: Try sample order <strong className="text-[#962949]">BT-2026-9042</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#2B2224] mb-1.5 uppercase tracking-wide">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8DADD] px-3.5 py-2.5 text-[14px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                  />
                </div>

                {lookupError && (
                  <div className="bg-[#FDEDED] border border-[#F8B4B4] text-[#B71C1C] p-3 rounded-[4px] text-[13px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{lookupError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  Locate Order &amp; Continue <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Multi-step Self Service Flow */
            <div className="p-6 sm:p-8 space-y-6">
              {/* Stepper Header */}
              <div className="flex items-center justify-between border-b border-[#E8DADD] pb-4 text-[12px] sm:text-[13px]">
                <span className={`font-semibold ${step >= 1 ? 'text-[#962949]' : 'text-[#A09598]'}`}>
                  1. Action &amp; Item
                </span>
                <span className="text-[#A09598]">→</span>
                <span className={`font-semibold ${step >= 2 ? 'text-[#962949]' : 'text-[#A09598]'}`}>
                  2. Reason
                </span>
                <span className="text-[#A09598]">→</span>
                <span className={`font-semibold ${step >= 3 ? 'text-[#962949]' : 'text-[#A09598]'}`}>
                  3. {actionType === 'exchange' ? 'Choose Size' : 'Details'}
                </span>
                <span className="text-[#A09598]">→</span>
                <span className={`font-semibold ${step >= 4 ? 'text-[#962949]' : 'text-[#A09598]'}`}>
                  4. Pickup &amp; Confirm
                </span>
              </div>

              {/* STEP 1: Select Item & Choose Exchange vs Return */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2">
                      Select Item from Order #{activeOrder.orderNumber}
                    </h4>
                    <div className="space-y-2.5">
                      {activeOrder.items.map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center gap-4 p-3.5 border rounded-[4px] cursor-pointer transition-all ${
                            selectedItemId === item.id
                              ? 'border-[#962949] bg-[#FFF9FA]'
                              : 'border-[#E8DADD] bg-white hover:border-[#D1B8BD]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="return_item"
                            checked={selectedItemId === item.id}
                            onChange={() => setSelectedItemId(item.id)}
                            className="text-[#962949] focus:ring-[#962949]"
                          />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-16 object-cover rounded-[3px] border border-[#E8DADD]"
                          />
                          <div className="flex-1 text-[13px]">
                            <p className="font-medium text-[#2B2224]">{item.name}</p>
                            <p className="text-[#6F6265]">
                              Color: {item.color} · Current Size: <strong className="text-[#2B2224]">{item.size}</strong>
                            </p>
                            <p className="font-semibold text-[#962949] mt-0.5">₹{item.price}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2">
                      What would you like to do?
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div
                        onClick={() => setActionType('exchange')}
                        className={`p-4 border rounded-[4px] cursor-pointer transition-all ${
                          actionType === 'exchange'
                            ? 'border-[#962949] bg-[#FFF9FA] shadow-xs'
                            : 'border-[#E8DADD] bg-white hover:border-[#D1B8BD]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <RotateCcw className="w-4 h-4 text-[#962949]" />
                          <span className="font-semibold text-[14px] text-[#2B2224]">
                            Exchange (Different Size)
                          </span>
                        </div>
                        <p className="text-[12.5px] text-[#6F6265] leading-relaxed">
                          Exchange for a smaller or larger size with doorstep swap. Fast &amp; zero hassle!
                        </p>
                        <span className="inline-block mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#2E7D32] bg-[#EBF7ED] px-2 py-0.5 rounded-[2px]">
                          Most Popular for Growing Kids
                        </span>
                      </div>

                      <div
                        onClick={() => setActionType('return')}
                        className={`p-4 border rounded-[4px] cursor-pointer transition-all ${
                          actionType === 'return'
                            ? 'border-[#962949] bg-[#FFF9FA] shadow-xs'
                            : 'border-[#E8DADD] bg-white hover:border-[#D1B8BD]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Truck className="w-4 h-4 text-[#962949]" />
                          <span className="font-semibold text-[14px] text-[#2B2224]">
                            Return for Refund
                          </span>
                        </div>
                        <p className="text-[12.5px] text-[#6F6265] leading-relaxed">
                          Complimentary doorstep pickup with automatic refund to original source or store credit.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="py-3 px-7 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      Next: Choose Reason <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Pick Reason & Upload Photos */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2">
                      Please select the reason
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {reasonsList.map((r) => (
                        <label
                          key={r}
                          className={`p-3 border rounded-[4px] flex items-center gap-2.5 cursor-pointer text-[13.5px] transition-colors ${
                            reason === r
                              ? 'border-[#962949] bg-[#FFF9FA] font-medium text-[#962949]'
                              : 'border-[#E8DADD] bg-white text-[#2B2224] hover:border-[#D1B8BD]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            checked={reason === r}
                            onChange={() => setReason(r)}
                            className="text-[#962949] focus:ring-[#962949]"
                          />
                          <span>{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Photo Upload for Damage / Wrong Item */}
                  <div>
                    <label className="block text-[13px] font-semibold text-[#2B2224] mb-1.5 uppercase tracking-wide">
                      Upload Photos{' '}
                      {(reason === 'Damaged in transit' || reason === 'Wrong item received') && (
                        <span className="text-[#962949] lowercase font-normal">(required for damage / wrong item)</span>
                      )}
                    </label>
                    <p className="text-[12.5px] text-[#6F6265] mb-2.5">
                      Upload 1-3 photos showing the tags or area of concern to speed up automatic clearance.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      {photos.map((src, idx) => (
                        <div key={idx} className="relative w-20 h-20 rounded-[4px] overflow-hidden border border-[#E8DADD]">
                          <img src={src} alt="Uploaded evidence" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white p-0.5 rounded-full"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {photos.length < 3 && (
                        <label className="w-20 h-20 border-2 border-dashed border-[#E8DADD] hover:border-[#962949] rounded-[4px] flex flex-col items-center justify-center cursor-pointer bg-white text-[#6F6265] hover:text-[#962949] transition-colors">
                          <Upload className="w-5 h-5 mb-1" />
                          <span className="text-[10px] font-medium">Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#2B2224] mb-1.5 uppercase tracking-wide">
                      Additional Notes for Atelier (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need the replacement dress before Diwali festival on Friday."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-[#E8DADD] px-3.5 py-2 text-[13.5px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="py-2.5 px-5 border border-[#E8DADD] hover:border-[#2B2224] text-[#2B2224] font-medium text-[13px] rounded-[4px] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={
                        (reason === 'Damaged in transit' || reason === 'Wrong item received') &&
                        photos.length === 0
                      }
                      className="py-3 px-7 bg-[#962949] hover:bg-[#7D223C] disabled:bg-[#D1B8BD] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      Next: {actionType === 'exchange' ? 'Choose Size' : 'Pickup & Refund'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Exchange Size Selection (or jump to pickup) */}
              {step === 3 && (
                <div className="space-y-6">
                  {actionType === 'exchange' ? (
                    <div>
                      <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-1">
                        Select New Size for Exchange
                      </h4>
                      <p className="text-[13px] text-[#6F6265] mb-4">
                        Current size ordered: <span className="font-semibold text-[#2B2224]">{currentItem?.size}</span>. Only currently in-stock sizes are selectable.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {availableSizes.map((sz) => {
                          const isCurrent = sz === currentItem?.size;
                          const isSelected = exchangeSize === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              disabled={isCurrent}
                              onClick={() => setExchangeSize(sz)}
                              className={`p-3.5 border rounded-[4px] text-center transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#FAF6F4] text-[#A09598] border-[#E8DADD] cursor-not-allowed'
                                  : isSelected
                                    ? 'border-[#962949] bg-[#962949] text-white font-bold shadow-xs'
                                    : 'border-[#E8DADD] bg-white text-[#2B2224] hover:border-[#962949]'
                              }`}
                            >
                              <div className="text-[14px] font-semibold">{sz}</div>
                              <div className="text-[11px] mt-1 opacity-90">
                                {isCurrent ? 'Current Size' : 'In Stock · Ready'}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 p-3.5 bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] text-[12.5px] text-[#6F6265] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#962949] shrink-0" />
                        <span>
                          <strong>Need sizing help?</strong> Size exchanges are 100% free with doorstep courier exchange.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2">
                        Confirm Return Item
                      </h4>
                      <div className="p-4 border border-[#E8DADD] rounded-[4px] bg-[#FAF6F4] flex items-center gap-4">
                        <img
                          src={currentItem?.image}
                          alt={currentItem?.name}
                          className="w-14 h-16 object-cover rounded-[3px] border border-[#E8DADD]"
                        />
                        <div className="text-[13.5px]">
                          <p className="font-semibold text-[#2B2224]">{currentItem?.name}</p>
                          <p className="text-[#6F6265]">
                            Size: {currentItem?.size} · Color: {currentItem?.color}
                          </p>
                          <p className="text-[#962949] font-medium mt-0.5">
                            Refund Amount: ₹{currentItem?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="py-2.5 px-5 border border-[#E8DADD] hover:border-[#2B2224] text-[#2B2224] font-medium text-[13px] rounded-[4px] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="py-3 px-7 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      Next: Pickup &amp; Refund <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Pickup Details, Fee & Refund Method */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Doorstep Pickup Schedule */}
                  <div>
                    <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#962949]" /> Choose Doorstep Pickup Time
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1">
                          Pickup Date
                        </label>
                        <select
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-white border border-[#E8DADD] px-3 py-2 text-[13.5px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                        >
                          <option value="Tomorrow (Next Day Free Pickup)">Tomorrow (Next Day)</option>
                          <option value="Day after tomorrow">Day after tomorrow</option>
                          <option value="Select date in 3 days">In 3 business days</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[12px] uppercase font-semibold text-[#6F6265] mb-1">
                          Time Window
                        </label>
                        <select
                          value={pickupSlot}
                          onChange={(e) => setPickupSlot(e.target.value)}
                          className="w-full bg-white border border-[#E8DADD] px-3 py-2 text-[13.5px] rounded-[4px] focus:outline-none focus:border-[#962949]"
                        >
                          <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                          <option value="02:00 PM - 06:00 PM">Afternoon (02:00 PM - 06:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] text-[12.5px] text-[#6F6265]">
                      <p>
                        <strong>Pickup Address:</strong> {activeOrder.shippingAddress.line1}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>

                  {/* Refund Method (if returning) */}
                  {actionType === 'return' && (
                    <div>
                      <h4 className="font-serif text-[18px] font-semibold text-[#2B2224] mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#962949]" /> Refund Method
                      </h4>

                      <div className="space-y-2.5 mb-4">
                        {activeOrder.paymentMethod !== 'Cash on Delivery' && (
                          <label
                            className={`flex items-start gap-3 p-3.5 border rounded-[4px] cursor-pointer transition-colors ${
                              refundMethod === 'original'
                                ? 'border-[#962949] bg-[#FFF9FA]'
                                : 'border-[#E8DADD] bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="refund"
                              checked={refundMethod === 'original'}
                              onChange={() => setRefundMethod('original')}
                              className="mt-0.5 text-[#962949] focus:ring-[#962949]"
                            />
                            <div className="text-[13px]">
                              <span className="font-semibold text-[#2B2224] block">
                                Original Payment Source ({activeOrder.paymentMethod})
                              </span>
                              <span className="text-[#6F6265]">
                                Refund of ₹{currentItem?.price} will be credited back in 3-5 business days after pickup inspection.
                              </span>
                            </div>
                          </label>
                        )}

                        <label
                          className={`flex items-start gap-3 p-3.5 border rounded-[4px] cursor-pointer transition-colors ${
                            refundMethod === 'store_credit'
                              ? 'border-[#962949] bg-[#FFF9FA]'
                              : 'border-[#E8DADD] bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="refund"
                            checked={refundMethod === 'store_credit'}
                            onChange={() => setRefundMethod('store_credit')}
                            className="mt-0.5 text-[#962949] focus:ring-[#962949]"
                          />
                          <div className="text-[13px]">
                            <span className="font-semibold text-[#2B2224] flex items-center gap-1.5">
                              Boota Store Credit <span className="text-[#2E7D32] bg-[#EBF7ED] text-[11px] font-semibold px-2 py-0.5 rounded-[2px]">+5% Bonus</span>
                            </span>
                            <span className="text-[#6F6265]">
                              Instant credit of ₹{Math.round((currentItem?.price || 0) * 1.05)} on pickup handover. Valid for 1 year with no restrictions.
                            </span>
                          </div>
                        </label>

                        {activeOrder.paymentMethod === 'Cash on Delivery' && (
                          <label
                            className={`flex items-start gap-3 p-3.5 border rounded-[4px] cursor-pointer transition-colors ${
                              refundMethod === 'bank_transfer'
                                ? 'border-[#962949] bg-[#FFF9FA]'
                                : 'border-[#E8DADD] bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="refund"
                              checked={refundMethod === 'bank_transfer'}
                              onChange={() => setRefundMethod('bank_transfer')}
                              className="mt-0.5 text-[#962949] focus:ring-[#962949]"
                            />
                            <div className="text-[13px]">
                              <span className="font-semibold text-[#2B2224] block">
                                Direct Bank Transfer (Required for COD)
                              </span>
                              <span className="text-[#6F6265]">
                                Transferred directly to your savings/current account via IMPS/NEFT within 24 hours of pickup.
                              </span>
                            </div>
                          </label>
                        )}
                      </div>

                      {/* Bank Details Form if Bank Transfer */}
                      {refundMethod === 'bank_transfer' && (
                        <div className="p-4 bg-white border border-[#E8DADD] rounded-[4px] space-y-3">
                          <h5 className="font-serif font-semibold text-[15px] text-[#2B2224]">
                            Beneficiary Bank Account Details
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Account Holder Name"
                              value={bankDetails.accountHolder}
                              onChange={(e) =>
                                setBankDetails({ ...bankDetails, accountHolder: e.target.value })
                              }
                              className="bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 text-[13px] rounded-[4px]"
                            />
                            <input
                              type="text"
                              required
                              placeholder="Account Number"
                              value={bankDetails.accountNumber}
                              onChange={(e) =>
                                setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                              }
                              className="bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 text-[13px] rounded-[4px]"
                            />
                            <input
                              type="text"
                              required
                              placeholder="IFSC Code (e.g. HDFC0001234)"
                              value={bankDetails.ifsc}
                              onChange={(e) =>
                                setBankDetails({ ...bankDetails, ifsc: e.target.value.toUpperCase() })
                              }
                              className="bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 text-[13px] rounded-[4px]"
                            />
                            <input
                              type="text"
                              placeholder="Bank Name"
                              value={bankDetails.bankName}
                              onChange={(e) =>
                                setBankDetails({ ...bankDetails, bankName: e.target.value })
                              }
                              className="bg-[#FAF6F4] border border-[#E8DADD] px-3 py-2 text-[13px] rounded-[4px]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary & Fees */}
                  <div className="bg-[#FAF6F4] border border-[#E8DADD] rounded-[4px] p-4 text-[13px] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#6F6265]">Action</span>
                      <span className="font-semibold text-[#2B2224]">
                        {actionType === 'exchange'
                          ? `Size Exchange to ${exchangeSize}`
                          : `Return for Refund (₹${currentItem?.price})`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6F6265]">Reverse Doorstep Pickup</span>
                      <span className="font-semibold text-[#2E7D32]">₹0 (Free Complimentary)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setStep(3)}
                      className="py-2.5 px-5 border border-[#E8DADD] hover:border-[#2B2224] text-[#2B2224] font-medium text-[13px] rounded-[4px] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="py-3 px-8 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-[0.06em] uppercase rounded-[4px] transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      Confirm Request in 1 Tap ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
