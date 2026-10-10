import {
  UserProfile,
  Order,
  ReturnExchangeRequest,
} from '../types/account';

export const initialUserProfile: UserProfile = {
  id: 'usr_ananya_01',
  name: 'Ananya Sharma',
  phone: '+91 98765 43210',
  email: 'ananya.sharma@example.com',
  isLoggedIn: true,
  childProfile: {
    name: 'Tara',
    ageRange: '4-5 Y',
    birthMonth: 'November',
    optIn: true,
  },
  addresses: [
    {
      id: 'addr_1',
      name: 'Ananya Sharma',
      phone: '+91 98765 43210',
      line1: 'B-402, Magnolia Apartments',
      line2: 'Greater Kailash Part II',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110048',
      type: 'Home',
      isDefault: true,
    },
  ],
  commPrefs: {
    emailNewsletters: true,
    whatsappAlerts: true,
    smsUpdates: true,
  },
};

// All orders, returns, wishlist, and cart empty as requested
export const initialOrders: Order[] = [];

export const initialReturnRequests: ReturnExchangeRequest[] = [];

const STORAGE_KEYS = {
  USER: 'boota_user_profile_v4',
  ORDERS: 'boota_orders_v4',
  RETURNS: 'boota_returns_v4',
};

export const getStoredUserProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return initialUserProfile;
};

export const saveStoredUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return initialOrders;
};

export const saveStoredOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredReturns = (): ReturnExchangeRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RETURNS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return initialReturnRequests;
};

export const saveStoredReturns = (requests: ReturnExchangeRequest[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(requests));
  } catch (e) {
    console.error(e);
  }
};
