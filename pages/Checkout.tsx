
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, saveOrder } from '../services/data';
import { BANK_DETAILS, WHATSAPP_NUMBER, Order } from '../types';
import { MessageCircle, CreditCard, Send, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppLink = (orderId: string) => {
    const itemsList = cart.map(item => `- ${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`).join('%0A');
    
    const message = `*New Order from Fries&Sides* 🍽️%0A%0A` +
      `*Order ID:* ${orderId}%0A` +
      `*Customer:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Address:* ${formData.address}%0A%0A` +
      `*Order Details:*%0A${itemsList}%0A%0A` +
      `*Total:* ${formatCurrency(cartTotal)}%0A` +
      `*Notes:* ${formData.note || 'None'}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `FNS-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create the order object for history
    const newOrder: Order = {
      id: orderId,
      customerName: formData.name,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      timestamp: Date.now()
    };

    // Save to local storage history
    saveOrder(newOrder);

    const link = generateWhatsAppLink(orderId);
    
    // Open WhatsApp
    window.open(link, '_blank');
    
    // Clear cart and redirect
    clearCart();
    navigate('/history');
    alert(`Order ${orderId} placed! Redirecting to your order history. Please send the message on WhatsApp to complete your order.`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <button onClick={() => navigate('/menu')} className="mt-4 text-brand-orange hover:underline">Go to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Smartphone size={20} className="text-brand-orange"/> Contact Info
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    required 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea 
                    required 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3} 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none" 
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <input 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g., Less spicy, extra sauce"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none" 
                  />
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-brand-orange"/> Payment Instructions
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-4">
                <p>Please make a transfer to the account below before confirming your order.</p>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Bank Name</span>
                  <span className="font-bold">{BANK_DETAILS.bankName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Account Number</span>
                  <span className="font-bold font-mono text-lg">{BANK_DETAILS.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Name</span>
                  <span className="font-bold">{BANK_DETAILS.accountName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-500">x{item.quantity}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-xs text-gray-400">(Calculated via WhatsApp)</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-brand-orange pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full mt-6 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle size={24} /> Confirm on WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                You will be redirected to WhatsApp to send your order details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
