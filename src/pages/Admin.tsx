import React, { useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS, MenuItem, CATEGORIES } from '../types';
import { db } from '../firebase'; // We will create this file next!
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, LogOut, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { formatCurrency } from '../services/data';

const Admin: React.FC = () => {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Data State
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Specials',
    imageUrl: ''
  });

  // 1. Fetch Items from Firebase
  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const menuList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      setItems(menuList);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  // 2. Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  // 3. Add New Item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use placeholder if no link provided
      const finalImage = newItem.imageUrl.trim() || "https://placehold.co/400x300?text=No+Image";

      await addDoc(collection(db, "menu"), {
        name: newItem.name,
        price: Number(newItem.price),
        description: newItem.description,
        category: newItem.category,
        imageUrl: finalImage,
        isAvailable: true,
        popular: false,
        createdAt: new Date()
      });

      alert("Item added successfully!");
      setNewItem({ name: '', price: '', description: '', category: 'Specials', imageUrl: '' });
      setIsModalOpen(false);
      fetchItems(); // Refresh list
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Delete Item
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "menu", id));
        fetchItems();
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500">FRIES & SIDES</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-brand-orange"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-brand-orange"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-3">
             <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-orange text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 shadow-md shadow-orange-200"
            >
              <Plus size={18} /> Add Item
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Statistics or Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Items</p>
            <h3 className="text-3xl font-bold">{items.length}</h3>
          </div>
          {/* Add more stats here later */}
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Loading database...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-600">Item</th>
                    <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                    <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100"/>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">{item.category}</span>
                      </td>
                      <td className="px-6 py-4">{formatCurrency(item.price)}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {items.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  No items found. Click "Add Item" to start!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Item</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><Plus className="rotate-45" size={24}/></button>
            </div>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Image Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="url" 
                    placeholder="Paste Image Link (https://...)" 
                    className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none"
                    value={newItem.imageUrl}
                    onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Tip: Copy image address from Unsplash or Postimages.org</p>
              </div>

              <input 
                required
                type="text" 
                placeholder="Item Name (e.g. Jollof Rice)" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none" 
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">
                <input 
                  required
                  type="number" 
                  placeholder="Price (₦)" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none" 
                  value={newItem.price}
                  onChange={e => setNewItem({...newItem, price: e.target.value})}
                />
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none"
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <textarea 
                required
                placeholder="Description" 
                rows={3} 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none"
                value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
              ></textarea>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700 flex justify-center items-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;