
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, ChefHat } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { getMenu } from '../services/data';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm your Fries&Sides Chef AI. Tell me what you're craving or how you're feeling, and I'll suggest the perfect meal from our menu!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const menu = getMenu();
      const menuContext = menu.map(item => `- ${item.name}: ${item.description} (${item.category}, Price: ${item.price} NGN)`).join('\n');

      // Fixed: Strictly following @google/genai initialization and API key guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Fixed: Using gemini-3-flash-preview with proper configuration and system instruction
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Available menu context:\n${menuContext}\n\nCustomer request: "${userMsg}"`,
        config: {
          systemInstruction: "You are a professional sommelier and chef assistant for 'Fries&Sides'. Suggest 1-2 items from the menu that match the user's request. Be friendly, slightly sophisticated but enthusiastic. Keep it concise.",
        }
      });

      const botText = response.text || "I'm sorry, I'm having trouble thinking of a recommendation right now. Why not try our Spicy Asun Special?";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Oops! My chef brain took a break. Please check out our menu page for all our delicious options!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-orange text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold">Ask Chef AI</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[80vh] overflow-hidden border border-orange-100">
            {/* Header */}
            <div className="bg-brand-orange p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <ChefHat size={20} />
                <h3 className="font-bold">Fries&Sides Chef AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-orange-50/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${
                    m.role === 'user' 
                      ? 'bg-brand-orange text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}>
                    {m.role === 'bot' && <Bot size={18} className="shrink-0 mt-1 text-brand-orange" />}
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    {m.role === 'user' && <User size={18} className="shrink-0 mt-1 text-white/70" />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm flex gap-2 items-center">
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I want something spicy..."
                  className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-brand-orange outline-none text-sm"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-orange text-white p-2 rounded-xl disabled:opacity-50 transition-opacity"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;