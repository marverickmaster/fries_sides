
import { MenuItem, Order, AboutContent, HeroSlide, SiteContent } from '../types';

const MENU_STORAGE_KEY = 'fns_menu_v1';
const ORDERS_STORAGE_KEY = 'fns_orders_v1';
const SITE_CONTENT_STORAGE_KEY = 'fns_site_content_v1';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Spicy Asun Special',
    description: 'Tender roasted goat meat tossed in spicy scotch bonnet pepper sauce.',
    price: 3500,
    category: 'Specials',
    imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
    popular: true
  },
  {
    id: '2',
    name: 'Seafood Okra',
    description: 'Fresh okra soup loaded with prawns, crab, and fresh fish.',
    price: 5000,
    category: 'Soups',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
    popular: true
  },
  {
    id: '3',
    name: 'Jollof Rice & Chicken',
    description: 'Smokey party jollof rice served with grilled chicken thigh.',
    price: 2800,
    category: 'Specials',
    imageUrl: 'https://images.unsplash.com/photo-1621215682498-89c0a6b74704?auto=format&fit=crop&q=80&w=400',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Pepper Soup (Catfish)',
    description: 'Hot and spicy broth with fresh catfish and traditional spices.',
    price: 4500,
    category: 'Soups',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c39bb801b11?auto=format&fit=crop&q=80&w=400',
    isAvailable: true
  },
  {
    id: '5',
    name: 'Fried Plantain (Dodo)',
    description: 'Sweet ripe plantain fried to golden perfection.',
    price: 1000,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1622325367332-90141977b5a8?auto=format&fit=crop&q=80&w=400',
    isAvailable: true
  },
  {
    id: '6',
    name: 'Grilled Turkey Wings',
    description: 'Succulent turkey wings marinated in special BBQ sauce.',
    price: 4000,
    category: 'Proteins',
    imageUrl: 'https://images.unsplash.com/photo-1606728035253-49dfa92719c2?auto=format&fit=crop&q=80&w=400',
    isAvailable: false
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  about: {
    title: "We're on a Mission to Redefine Your Cravings",
    description: "Fries&Sides started with a simple idea: that fast food shouldn't mean a compromise on quality. Our chefs source the freshest local ingredients to create bold flavors that hit the spot every single time.",
    image1: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400",
    image2: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=400",
    happyCustomers: "10k+"
  },
  heroSlides: [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
      title: 'Weekend Special: Buy 1 Get 1 Free!',
      subtitle: 'Order any Spicy Asun and get a side of Dodo for free all through the weekend.',
      ctaText: 'Order Now',
      ctaLink: '/menu'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1200',
      title: 'New Arrival: Seafood Okra Supreme',
      subtitle: 'Taste the ocean with our richest okra soup yet. Limited daily portions available.',
      ctaText: 'View Menu',
      ctaLink: '/menu'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=1200',
      title: 'Corporate Catering Services',
      subtitle: 'Feeding a team? We provide custom meal plans for offices and events.',
      ctaText: 'Contact Us',
      ctaLink: '/support'
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200',
      title: 'Join Our Loyalty Program',
      subtitle: 'Earn points on every order and redeem them for exclusive discounts.',
      ctaText: 'Learn More',
      ctaLink: '/support'
    }
  ]
};

export const getMenu = (): MenuItem[] => {
  const saved = localStorage.getItem(MENU_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(INITIAL_MENU));
    return INITIAL_MENU;
  }
  return JSON.parse(saved);
};

export const saveMenu = (items: MenuItem[]) => {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
};

export const getSiteContent = (): SiteContent => {
  const saved = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(INITIAL_SITE_CONTENT));
    return INITIAL_SITE_CONTENT;
  }
  return JSON.parse(saved);
};

export const saveSiteContent = (content: SiteContent) => {
  localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
};

// Deprecated: getAboutContent/saveAboutContent for backward compatibility or refactor
export const getAboutContent = (): AboutContent => getSiteContent().about;
export const saveAboutContent = (about: AboutContent) => {
  const content = getSiteContent();
  saveSiteContent({ ...content, about });
};

export const getOrders = (): Order[] => {
  const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...orders]));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};
