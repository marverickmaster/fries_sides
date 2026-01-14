
import React, { useState } from 'react';
import { Send, MessageSquare, Info, AlertCircle, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

const Support: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'enquiry',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email or save to a database
    console.log('Support Form Submitted:', formState);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', type: 'enquiry', subject: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-heading font-bold text-gray-900">How Can We Help?</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Have a question about our menu or want to share feedback about your recent order? We're all ears.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-gray-900 font-medium">hello@friesandsides.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-gray-900 font-medium">+234 812 345 6789</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-brand-orange">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Headquarters</p>
                    <p className="text-gray-900 font-medium">123 Foodie Avenue, Victoria Island, Lagos</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic">
                  "Our customer service team is available daily from 9 AM to 10 PM."
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-brand-orange p-8 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <MessageSquare size={28} /> Complaint & Enquiry Form
                </h2>
                <p className="opacity-80 mt-2">Submit your details below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="p-16 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500 mb-8">Thank you for reaching out. A member of our team will contact you soon.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-orange font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message Type</label>
                      <div className="relative">
                        <select 
                          name="type"
                          value={formState.type}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none appearance-none"
                        >
                          <option value="enquiry">General Enquiry</option>
                          <option value="complaint">Complaint</option>
                          <option value="feedback">Feedback</option>
                          <option value="order">Order Issue</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          {formState.type === 'complaint' ? <AlertCircle size={18} /> : <Info size={18} />}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                      <input 
                        required
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Message</label>
                    <textarea 
                      required
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please provide as much detail as possible..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-3"
                  >
                    <Send size={20} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
