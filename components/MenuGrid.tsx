import React, { useState } from 'react';
import { MenuItem, CATEGORIES } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../services/data';
import { Plus } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  title?: string;
  limit?: number;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, title, limit }) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  ).slice(0, limit || items.length);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">{title}</h2>
        )}

        {/* Categories Filter (Only show if not limited view) */}
        {!limit && (
          <div className="flex overflow-x-auto gap-4 mb-8 pb-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-orange text-white shadow-lg shadow-orange-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">Sold Out</span>
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-orange">{formatCurrency(item.price)}</span>
                  <button
                    onClick={() => item.isAvailable && addToCart(item)}
                    disabled={!item.isAvailable}
                    className={`p-2 rounded-full transition-colors ${
                      item.isAvailable 
                        ? 'bg-gray-900 text-white hover:bg-brand-orange' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuGrid;