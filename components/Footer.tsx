import React from 'react';
import { ChefHat, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Generate QR code for the current website URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin)}`;

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-brand-orange p-2 rounded-lg text-white">
                <ChefHat size={20} />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">
                FRIES & <span className="text-brand-orange">SIDES</span>
              </span>
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Premium food delivery service bringing the best flavors of the city directly to your doorstep.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-brand-orange"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand-orange"><Twitter size={20} /></a>
              <a href="#" className="hover:text-brand-orange"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-500">
              <li><Link to="/menu" className="hover:text-brand-orange">Full Menu</Link></li>
              <li><Link to="/track" className="hover:text-brand-orange">Track Order</Link></li>
              <li><Link to="/admin" className="hover:text-brand-orange">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-500">
              <li>support@friesandsides.com</li>
              <li>+234 906 762 3970</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-bold text-gray-900 mb-4">Order via Mobile</h3>
            <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100">
              <img src={qrUrl} alt="Scan to Order" className="w-32 h-32" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Scan to visit website</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} FRIES & SIDES. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;