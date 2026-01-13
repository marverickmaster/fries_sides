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

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: 'transfer' | 'cash';
  notes?: string;
}

export const CATEGORIES = ['All', 'Specials', 'Soups', 'Proteins', 'Sides'];

// Mock Admin Credentials (In production, use Firebase Auth)
export const ADMIN_CREDENTIALS = {
  email: 'admin@maverickmeals.com',
  password: 'password123'
};

export const BANK_DETAILS = {
  bankName: "Maverick Bank",
  accountNumber: "123-456-7890",
  accountName: "Maverick Meals Ltd"
};

export const WHATSAPP_NUMBER = "1234567890"; // Replace with actual business number