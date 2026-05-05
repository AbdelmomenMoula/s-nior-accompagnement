import { GoogleGenAI } from "@google/genai";
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Phone, Video, Heart } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "motion/react";

const psychologists = [
  {
    name: "Dr. Marie Laurent",
    specialty: "Gérontopsychologue",
    phone: "01 23 45 67 89",
    price: "60€ / séance",
    availability: "Disponible demain",
    image: "https://images.unsplash.com/photo-1559839734-2b71f15367ef?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Jean Dupont",
    specialty: "Thérapie Cognitive",
    phone: "01 98 76 54 32",
    price: "55€ / séance",
    availability: "Disponible cette semaine",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Psychique() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Bonjour ! Je suis votre compagnon IA. Je suis ici pour vous écouter et discuter avec vous. Comment vous sentez-vous aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Corrected format for chat history
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user' as any,
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "Tu es un compagnon bienveillant, patient et amical nommé 'Lumi'. Ton rôle est de parler à une personne âgée sur la plateforme 'Sénior Accompagnement'. Ton ton est chaleureux, rassurant et respectueux (utilise le 'vous'). Si l'utilisateur exprime une grande tristesse ou une douleur, suggère-lui doucement de contacter un psychologue listé sur le côté ou sa famille. Fais des phrases courtes et faciles à lire."
        }
      });

      const text = response.text || "Pardon, j'avais la tête ailleurs. Que disiez-vous ?";
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Je suis désolé, je n'arrive pas à me connecter. Vérifiez votre connexion ou réessayez dans un moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* AI Chat Section */}
      <div className="lg:col-span-2 flex flex-col bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 h-[700px]">
        <div className="bg-blue-600 p-6 text-white flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Votre Compagnon IA</h2>
            <p className="text-blue-100 text-sm">Toujours disponible pour discuter</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}>
                  {m.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                </div>
                <div className={`p-6 rounded-[2rem] shadow-sm relative ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                  <div className={`prose prose-sm max-w-none prose-p:leading-relaxed ${m.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                    <ReactMarkdown>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                  <span className={`absolute top-2 ${m.role === 'user' ? '-right-2 text-blue-600' : '-left-2 text-white'}`}>
                    {/* Speech bubble tail arrow logic could go here, but kept simple for cleaner UI */}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-2">
                <span className="w-2.5 h-2.5 bg-blue-200 rounded-full animate-bounce" />
                <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez un message à Lumi..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-medium"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95"
          >
            <Send size={28} />
          </button>
        </div>
      </div>

      {/* Psychologists Section */}
      <div className="space-y-8">
        <div className="px-4">
          <h3 className="text-3xl font-bold text-slate-900 title-serif">Soutien Pro</h3>
          <p className="text-slate-500 mt-2">Parlez à un spécialiste pour un accompagnement personnalisé.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {psychologists.map((ps, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white p-8 rounded-[2.5rem] premium-shadow border border-slate-50 group hover:border-blue-100 transition-all"
            >
              <div className="flex items-center gap-5 mb-6">
                <img src={ps.image} alt={ps.name} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                <div>
                  <h4 className="font-bold text-xl text-slate-800">{ps.name}</h4>
                  <p className="text-blue-600 font-bold text-sm tracking-wide uppercase">{ps.specialty}</p>
                </div>
              </div>
              <div className="space-y-4 text-slate-600 mb-8 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Phone size={18} />
                  </div>
                  {ps.phone}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 text-sm font-black">
                    €
                  </div>
                  {ps.price}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  {ps.availability}
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 font-bold shadow-xl shadow-slate-100">
                <Video size={22} />
                Téléconsultation
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <Heart size={20} fill="white" />
              Pourquoi la télépsychologie ?
            </h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Elle permet d'alléger les hôpitaux tout en offrant un suivi bienveillant et de qualité, sans le stress du déplacement.
            </p>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
  );
}
