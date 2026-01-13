import React from 'react';
import MenuGrid from '../components/MenuGrid';
import { MOCK_MENU } from '../services/data';

const MenuPage: React.FC = () => {
  return (
    <div className="pt-8 min-h-screen bg-gray-50">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-heading font-bold text-gray-900">Our Menu</h1>
        <p className="text-gray-500 mt-2">Discover our diverse selection of delicacies</p>
      </div>
      <MenuGrid items={MOCK_MENU} />
    </div>
  );
};

export default MenuPage;