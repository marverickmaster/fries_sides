import { MenuItem } from '../types';

// In a real app, this would come from Firestore
export const MOCK_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Spicy Asun Special',
    description: 'Tender roasted goat meat tossed in spicy scotch bonnet pepper sauce.',
    price: 3500,
    category: 'Specials',
    imageUrl: 'https://picsum.photos/seed/asun/500/500',
    isAvailable: true,
    popular: true
  },
  {
    id: '2',
    name: 'Seafood Okra',
    description: 'Fresh okra soup loaded with prawns, crab, and fresh fish.',
    price: 5000,
    category: 'Soups',
    imageUrl: 'https://picsum.photos/seed/okra/500/500',
    isAvailable: true,
    popular: true
  },
  {
    id: '3',
    name: 'Jollof Rice & Chicken',
    description: 'Smokey party jollof rice served with grilled chicken thigh.',
    price: 2800,
    category: 'Specials',
    imageUrl: 'https://picsum.photos/seed/jollof/500/500',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Pepper Soup (Catfish)',
    description: 'Hot and spicy broth with fresh catfish and traditional spices.',
    price: 4500,
    category: 'Soups',
    imageUrl: 'https://picsum.photos/seed/peppersoup/500/500',
    isAvailable: true
  },
  {
    id: '5',
    name: 'Fried Plantain (Dodo)',
    description: 'Sweet ripe plantain fried to golden perfection.',
    price: 1000,
    category: 'Sides',
    imageUrl: 'https://picsum.photos/seed/dodo/500/500',
    isAvailable: true
  },
  {
    id: '6',
    name: 'Grilled Turkey Wings',
    description: 'Succulent turkey wings marinated in special BBQ sauce.',
    price: 4000,
    category: 'Proteins',
    imageUrl: 'https://picsum.photos/seed/turkey/500/500',
    isAvailable: false
  }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};