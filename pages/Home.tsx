
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ShieldCheck, Heart, Utensils, Award } from 'lucide-react';
import MenuGrid from '../components/MenuGrid';
import HeroSlider from '../components/HeroSlider';
import { INITIAL_MENU, getSiteContent } from '../services/data';
import { SiteContent } from '../types';

const Home: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    setContent(getSiteContent());
  }, []);

  if (!content) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Hero Carousel */}
      <HeroSlider slides={content.heroSlides} />

      {/* Hero Section (Backup/Standard) - You might want to remove this if Slider is enough */}
      <section className="relative bg-brand-light overflow-hidden pt-10 pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                Taste the <span className="text-brand-orange">Magic</span> in <br/>Every Bite.
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Premium meals prepared with passion. From crispy fries to our signature sides, experience culinary excellence delivered to your door.
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
              <img 
                src="https://images.unsplash.com/photo-1573010334382-02942823d52f?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Food" 
                className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <MenuGrid title="Popular Favorites" items={INITIAL_MENU.filter(i => i.popular)} limit={3} />

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <img src={content.about.image1} alt="Kitchen" className="w-full h-64 object-cover rounded-2xl shadow-lg mt-8" />
                <img src={content.about.image2} alt="Ingredients" className="w-full h-64 object-cover rounded-2xl shadow-lg" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">{content.about.happyCustomers}</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Happy Customers</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-brand-orange rounded-full text-sm font-bold uppercase tracking-widest">
                <Award size={16} /> Our Story
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 leading-tight">
                {content.about.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.about.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-brand-orange">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Made with Love</h4>
                    <p className="text-sm text-gray-500">Every plate is prepared with obsessive attention to detail.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-brand-orange">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Premium Quality</h4>
                    <p className="text-sm text-gray-500">We only use top-shelf ingredients and farm-fresh produce.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/support" className="text-brand-orange font-bold hover:underline flex items-center gap-2 group">
                  Learn more about our standards <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Hungry? Don't Wait.</h2>
          <p className="text-gray-400 mb-8 text-lg">Our kitchen is hot and ready. Order now and get your food delivered while it's still steaming.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
              to="/menu" 
              className="inline-flex px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/50"
            >
              Explore Full Menu
            </Link>
            <Link 
              to="/support" 
              className="inline-flex px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg backdrop-blur-sm transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
