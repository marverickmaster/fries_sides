
import React, { useState, useEffect } from 'react';
import { getOrders, formatCurrency } from '../services/data';
import { Order } from '../types';
import { Calendar, Package, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(timestamp));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'on-way': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900">Order History</h1>
            <p className="text-gray-500 mt-2">View and track your past delicious moments.</p>
          </div>
          <Link 
            to="/menu" 
            className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
          >
            <ShoppingBag size={20} /> Order More
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              You haven't placed any orders yet. Start exploring our menu to find your first favorite meal!
            </p>
            <Link 
              to="/menu" 
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                      <Package size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono font-bold text-gray-900">#{order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{formatDate(order.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-brand-orange">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3">Items Ordered</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                          <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="text-gray-500">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Ordered for {order.customerName}</span>
                  </div>
                  <Link 
                    to="/track" 
                    className="flex items-center gap-2 text-brand-orange font-bold hover:underline"
                  >
                    Track Real-time <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
