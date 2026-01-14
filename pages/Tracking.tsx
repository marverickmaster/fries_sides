
import React, { useState } from 'react';
import { Package, ChefHat, Bike, CheckCircle, Search, Clock } from 'lucide-react';

const Tracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [isTracked, setIsTracked] = useState(false);

  const steps = [
    { label: 'Order Received', icon: <Package size={20} />, time: '12:30 PM', completed: true },
    { label: 'Preparing Meal', icon: <ChefHat size={20} />, time: '12:45 PM', completed: true },
    { label: 'Out for Delivery', icon: <Bike size={20} />, time: 'In Progress', completed: false, current: true },
    { label: 'Delivered', icon: <CheckCircle size={20} />, time: '--', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 text-center bg-brand-orange text-white">
            <h1 className="text-3xl font-heading font-bold mb-2">Track Your Order</h1>
            <p className="opacity-90">Enter your order ID to see where your meal is.</p>
          </div>

          <div className="p-8">
            <div className="flex gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Order ID (e.g., FNS-1234)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none"
                />
              </div>
              <button 
                onClick={() => setIsTracked(true)}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Track
              </button>
            </div>

            {isTracked ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-3">
                    <Clock className="text-brand-orange" size={20} />
                    <div>
                      <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Estimated Delivery</p>
                      <p className="font-bold text-gray-900">1:15 PM (In 20 mins)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Order ID</p>
                    <p className="font-mono font-bold text-gray-600">{orderId.toUpperCase()}</p>
                  </div>
                </div>

                <div className="relative pl-10 space-y-12">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                  
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        step.completed ? 'bg-brand-orange text-white' : 
                        step.current ? 'bg-orange-100 text-brand-orange border-2 border-brand-orange animate-pulse' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold ${step.completed || step.current ? 'text-gray-900' : 'text-gray-400'}`}>
                            {step.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {idx === 2 ? 'Your rider is nearby' : idx === 1 ? 'Your meal is being cooked' : ''}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=rider" className="w-12 h-12 rounded-full border-2 border-brand-orange p-0.5" alt="Rider" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Tunde (Rider)</p>
                      <p className="text-xs text-gray-500">4.9 ★ Rating</p>
                    </div>
                  </div>
                  <button className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-orange hover:text-white transition-colors">
                    Call Rider
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={40} className="text-gray-300" />
                </div>
                <p className="text-gray-500">Enter your order ID to view tracking history.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;