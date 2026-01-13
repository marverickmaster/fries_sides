import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import MenuGrid from '../components/MenuGrid';
import { MOCK_MENU } from '../services/data';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-light overflow-hidden pt-10 pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                Taste the <span className="text-brand-orange">Crunch</span> in <br/>Every Bite.
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Premium meals prepared with passion. From crispy Fries to juicy Grilled Chicken, experience the best sides in Lagos delivered to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/menu" 
                  className="px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  Order Now <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/menu" 
                  className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  View Menu
                </Link>
              </div>
              
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full text-brand-orange"><Clock size={16}/></div>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full text-brand-orange"><ShieldCheck size={16}/></div>
                  <span>100% Hygienic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full text-brand-orange"><Star size={16}/></div>
                  <span>Top Rated</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-brand-orange/10 rounded-full filter blur-3xl transform translate-y-10"></div>
              {/* You can replace this link with your own specific 'Fries' photo later */}
              <img 
                src="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Fries and Sides" 
                className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items - We filter to show items marked 'popular' in your data */}
      <MenuGrid title="Customer Favorites" items={MOCK_MENU.filter(i => i.popular)} limit={3} />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Hungry? Don't Wait.</h2>
          <p className="text-gray-400 mb-8 text-lg">Our kitchen is hot and ready. Order now and get your food delivered while it's still steaming.</p>
          <Link 
            to="/menu" 
            className="inline-flex px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/50"
          >
            Explore Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;