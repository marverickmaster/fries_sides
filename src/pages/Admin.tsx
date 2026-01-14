import { uploadToCloudinary } from '../services/imageService';
import React, { useState, useEffect } from 'react';
import { getMenu, saveMenu, formatCurrency, getSiteContent, saveSiteContent } from '../services/data';
import { ADMIN_CREDENTIALS, MenuItem, HeroSlide, SiteContent } from '../types';
import { Plus, Edit, Trash, X, LogOut, Save, AlertTriangle, Settings, Layout, Image as ImageIcon } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'content'>('menu');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [siteContent, setSiteContentState] = useState<SiteContent | null>(null);
  
  // New Uploading State
  const [uploading, setUploading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Form State for Menu Items
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Specials',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    isAvailable: true
  });

  useEffect(() => {
    setItems(getMenu());
    setSiteContentState(getSiteContent());
    const auth = localStorage.getItem('maverick_admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('maverick_admin_auth', 'true');
    } else {
      alert('Invalid Credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('maverick_admin_auth');
  };

  // --- NEW: Image Upload Function ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please choose an image under 5MB.");
      return;
    }

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      
      // Update the form data with the new URL
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };
  // ----------------------------------

  const handleSaveMenu = () => {
    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl,
      isAvailable: formData.isAvailable
    };

    let updatedItems;
    if (editingItem) {
      updatedItems = items.map(i => i.id === editingItem.id ? newItem : i);
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    saveMenu(updatedItems);
    setIsModalOpen(false);
    setEditingItem(null);
    resetMenuForm();
  };

  const handleSaveContent = () => {
    if (siteContent) {
      saveSiteContent(siteContent);
      alert('Website content updated successfully!');
    }
  };

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    if (!siteContent) return;
    const updatedSlides = [...siteContent.heroSlides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setSiteContentState({ ...siteContent, heroSlides: updatedSlides });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updated = items.filter(i => i.id !== itemToDelete.id);
      setItems(updated);
      saveMenu(updated);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const resetMenuForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Specials',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      isAvailable: true
    });
  };

  const openEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable
    });
    setIsModalOpen(true);
  };

  const openDelete = (item: MenuItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900">HQ Access</h1>
            <p className="text-gray-500 mt-2">Authentication required.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all">
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">HQ Portal</h1>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'menu' ? 'bg-white text-brand-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Layout size={16} /> Menu
              </button>
              <button 
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'content' ? 'bg-white text-brand-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings size={16} /> Content
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {activeTab === 'menu' && (
              <button 
                onClick={() => { resetMenuForm(); setEditingItem(null); setIsModalOpen(true); }}
                className="bg-brand-orange text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
              >
                <Plus size={18} /> New Item
              </button>
            )}
            <button onClick={handleLogout} className="p-2.5 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {activeTab === 'menu' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Item</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Category</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Price</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Availability</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 shadow-sm"/>
                          <div>
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">{item.category}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-brand-orange">{formatCurrency(item.price)}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => {
                            const updated = items.map(i => i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i);
                            setItems(updated);
                            saveMenu(updated);
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            item.isAvailable 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {item.isAvailable ? 'Available' : 'Sold Out'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => openEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                          <button onClick={() => openDelete(item)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-12 pb-20">
            {/* Hero Slider Management */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 max-w-5xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <ImageIcon className="text-brand-orange" /> Hero Slider Management
              </h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {siteContent?.heroSlides.map((slide, index) => (
                  <div key={slide.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">Slide {index + 1}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Slide Title</label>
                      <input 
                        type="text" 
                        value={slide.title}
                        onChange={e => handleSlideChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Subtitle / Description</label>
                      <textarea 
                        rows={2}
                        value={slide.subtitle}
                        onChange={e => handleSlideChange(index, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none text-sm resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">CTA Text</label>
                        <input 
                          type="text" 
                          value={slide.ctaText}
                          onChange={e => handleSlideChange(index, 'ctaText', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">CTA Link</label>
                        <input 
                          type="text" 
                          value={slide.ctaLink}
                          onChange={e => handleSlideChange(index, 'ctaLink', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Image URL</label>
                      <input 
                        type="text" 
                        value={slide.imageUrl}
                        onChange={e => handleSlideChange(index, 'imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-orange outline-none text-sm"
                      />
                      <img src={slide.imageUrl} className="mt-3 w-full h-24 object-cover rounded-lg border border-gray-200" alt="Preview" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Us Content Management */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="text-brand-orange" /> About Us Content Management
              </h2>
              {siteContent && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Section Headline</label>
                    <input 
                      type="text" 
                      value={siteContent.about.title}
                      onChange={e => setSiteContentState({ ...siteContent, about: { ...siteContent.about, title: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                      placeholder="e.g., We're on a Mission to Redefine Your Cravings"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description Text</label>
                    <textarea 
                      rows={5} 
                      value={siteContent.about.description}
                      onChange={e => setSiteContentState({ ...siteContent, about: { ...siteContent.about, description: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none resize-none"
                      placeholder="Describe your story and passion..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Image 1 URL (Left)</label>
                      <input 
                        type="text" 
                        value={siteContent.about.image1}
                        onChange={e => setSiteContentState({ ...siteContent, about: { ...siteContent.about, image1: e.target.value } })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                      />
                      <img src={siteContent.about.image1} className="mt-4 w-full h-32 object-cover rounded-xl bg-gray-50 border border-gray-100" alt="Preview 1" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Image 2 URL (Right)</label>
                      <input 
                        type="text" 
                        value={siteContent.about.image2}
                        onChange={e => setSiteContentState({ ...siteContent, about: { ...siteContent.about, image2: e.target.value } })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                      />
                      <img src={siteContent.about.image2} className="mt-4 w-full h-32 object-cover rounded-xl bg-gray-50 border border-gray-100" alt="Preview 2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Happy Customers Counter</label>
                    <input 
                      type="text" 
                      value={siteContent.about.happyCustomers}
                      onChange={e => setSiteContentState({ ...siteContent, about: { ...siteContent.about, happyCustomers: e.target.value } })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                      placeholder="e.g., 10k+"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-gray-100 mt-10">
                <button 
                  onClick={handleSaveContent}
                  className="bg-brand-orange text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
                >
                  <Save size={20} /> Update Website Content
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Item Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-400 transition-colors"><X /></button>
            </div>
            
            <div className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Item Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Price (₦)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none"
                  >
                    <option>Specials</option>
                    <option>Soups</option>
                    <option>Proteins</option>
                    <option>Sides</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none"
                ></textarea>
              </div>

              {/* --- MODIFIED SECTION: UPLOAD BUTTON --- */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Product Image</label>
                
                <div className="flex gap-2 mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-xs file:font-semibold
                      file:bg-orange-50 file:text-brand-orange
                      hover:file:bg-orange-100"
                  />
                </div>

                {uploading && <p className="text-xs text-brand-orange animate-pulse mb-2">Uploading image...</p>}

                <input 
                  type="text" 
                  value={formData.imageUrl}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 text-gray-400 border border-gray-200 rounded-xl text-xs mb-2" 
                />
                
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                )}
              </div>
              {/* -------------------------------------- */}

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="avail"
                  checked={formData.isAvailable}
                  onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5 accent-brand-orange"
                />
                <label htmlFor="avail" className="text-sm font-medium text-gray-700">Currently Available for Order</label>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={handleSaveMenu} 
                className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
              >
                <Save size={20} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-gray-500 mb-8">
                You are about to delete <span className="font-bold text-gray-900">"{itemToDelete?.name}"</span>. This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={confirmDelete}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                >
                  Yes, Delete Item
                </button>
                <button 
                  onClick={() => { setIsDeleteModalOpen(false); setItemToDelete(null); }}
                  className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;