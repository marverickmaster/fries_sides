
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'on-way' | 'delivered';
  timestamp: number;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutContent {
  title: string;
  description: string;
  image1: string;
  image2: string;
  happyCustomers: string;
}

export interface SiteContent {
  about: AboutContent;
  heroSlides: HeroSlide[];
}

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: 'transfer' | 'cash';
  notes?: string;
}

export const CATEGORIES = ['All', 'Specials', 'Soups', 'Proteins', 'Sides'];

export const ADMIN_CREDENTIALS = {
  email: 'admin@friesandsides.com',
  password: 'password123'
};

export const BANK_DETAILS = {
  bankName: "F&S Bank",
  accountNumber: "123-456-7890",
  accountName: "Fries&Sides Ltd"
};

export const WHATSAPP_NUMBER = "1234567890";
