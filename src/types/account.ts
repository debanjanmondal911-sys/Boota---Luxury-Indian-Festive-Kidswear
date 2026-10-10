export interface ChildProfile {
  name: string;
  ageRange: string;
  birthMonth?: string;
  optIn: boolean;
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export interface CommunicationPreferences {
  emailNewsletters: boolean;
  whatsappAlerts: boolean;
  smsUpdates: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  childProfile?: ChildProfile;
  addresses: UserAddress[];
  commPrefs: CommunicationPreferences;
}

export interface OrderItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export type OrderStatus =
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface TrackingEvent {
  status: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Cash on Delivery';
  isPrepaid: boolean;
  shippingAddress: UserAddress;
  trackingNumber: string;
  carrier: string;
  trackingTimeline: TrackingEvent[];
  cancellable: boolean;
  returnEligible: boolean;
}

export type ReturnExchangeType = 'return' | 'exchange';

export type ReturnReason =
  | 'Size too small'
  | 'Size too large'
  | 'Damaged in transit'
  | 'Wrong item received'
  | 'Fabric or quality not as expected'
  | 'Color differs from photo'
  | 'Other';

export type RequestStatus =
  | 'Requested'
  | 'Approved'
  | 'Picked up'
  | 'Received'
  | 'Refunded'
  | 'Exchange shipped';

export interface BankAccountDetails {
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
}

export interface ReturnExchangeRequest {
  id: string;
  requestNumber: string;
  orderId: string;
  orderNumber: string;
  createdAt: string;
  type: ReturnExchangeType;
  item: OrderItem;
  reason: ReturnReason;
  notes?: string;
  photos: string[];
  exchangeSize?: string;
  pickupDate: string;
  pickupSlot: string;
  pickupFee: number;
  refundMethod: 'original' | 'store_credit' | 'bank_transfer';
  bankDetails?: BankAccountDetails;
  status: RequestStatus;
  history: {
    stage: RequestStatus;
    timestamp: string;
    note: string;
  }[];
}
