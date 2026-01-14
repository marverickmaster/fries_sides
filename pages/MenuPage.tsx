
import React, { useState, useEffect } from 'react';
import MenuGrid from '../components/MenuGrid';
import { getMenu } from '../services/data';
import { Search } from 'lucide-react';
import { MenuItem } from '../types';

const MenuPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(getMenu());
  }, []);

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading font-bold text-gray-900">Our Menu</h1>
          <p className="text-gray-500 mt-2">Discover our diverse selection of delicacies</p>
        </div>

        <div className="max-w-xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for your favorite meal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-brand-orange shadow-sm outline-none transition-all"
          />
        </div>

        {filteredItems.length > 0 ? (
          <MenuGrid items={filteredItems} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg italic">"No meals found matching your search. Maybe try our Chef AI for suggestions?"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
