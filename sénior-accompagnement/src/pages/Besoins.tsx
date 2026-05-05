import { ShoppingCart, Heart, Search, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const products = [
  {
    id: 1,
    name: "Fauteuil Roulant Confort+",
    category: "Mobilité",
    price: "249.99 €",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400",
    description: "Léger, pliable et conçu pour un confort optimal longue durée.",
    type: "buy"
  },
  {
    id: 2,
    name: "Tensiomètre Bras Automatique",
    category: "Santé",
    price: "45.00 €",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=400",
    description: "Mesure précise et rapide avec grand écran facile à lire.",
    type: "buy"
  },
  {
    id: 3,
    name: "Déambulateur Tout-Terrain",
    category: "Mobilité",
    price: "89.00 €",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=400",
    description: "Stabilité maximale pour vos promenades en extérieur.",
    type: "buy"
  },
  {
    id: 4,
    name: "Pilulier Électronique",
    category: "Organisation",
    price: "34.50 €",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
    description: "Ne manquez plus jamais une dose avec nos alertes sonores.",
    type: "buy"
  }
];

export default function Besoins() {
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [view, setView] = useState<'buy' | 'sell'>('buy');
  const [filter, setFilter] = useState('tous');

  const addToCart = (id: number) => {
    setCartCount(prev => prev + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
            Boutique & Entraide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight title-serif">Aide Santé</h1>
          <p className="text-lg text-slate-500 max-w-xl">Trouvez l'équipement nécessaire ou donnez une seconde vie à votre matériel.</p>
        </div>
        
        <div className="flex gap-4 p-2 bg-white rounded-3xl premium-shadow border border-slate-100">
          <button 
            onClick={() => setView('buy')}
            className={`px-8 py-3 rounded-2xl font-bold transition-all ${view === 'buy' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Acheter
          </button>
          <button 
            onClick={() => setView('sell')}
            className={`px-8 py-3 rounded-2xl font-bold transition-all ${view === 'sell' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Vendre / Donner
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'buy' ? (
          <motion.div 
            key="buy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap gap-3">
              {['tous', 'Mobilité', 'Santé', 'Organisation'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold border transition-all ${filter === f ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.filter(p => filter === 'tous' || p.category === filter).map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-slate-50 flex flex-col group"
                >
                  <div className="relative aspect-[5/4]">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-blue-600 shadow-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col space-y-4">
                    <h3 className="font-bold text-xl text-slate-800 leading-tight">{p.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">{p.description}</p>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-3xl font-black text-slate-900">{p.price}</span>
                      <button
                        onClick={() => addToCart(p.id)}
                        className={`p-4 rounded-2xl transition-all shadow-xl ${
                          addedId === p.id 
                          ? 'bg-green-500 text-white animate-pulse' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100 hover:scale-110'
                        }`}
                      >
                        {addedId === p.id ? <Check size={28} /> : <ShoppingCart size={28} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="sell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] premium-shadow border border-slate-100 space-y-10"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto">
                <Heart size={40} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-bold title-serif">Publier une annonce</h2>
              <p className="text-slate-500">Vous avez du matériel dont vous n'avez plus l'utilité ? Donnez-lui une seconde vie pour aider un autre membre de la communauté.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Quel est l'objet ?</label>
                <input type="text" placeholder="Ex: Déambulateur en bon état" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Prix (ou 0 pour Don)</label>
                  <input type="text" placeholder="€" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Catégorie</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:outline-none transition-all appearance-none">
                    <option>Mobilité</option>
                    <option>Santé</option>
                    <option>Hygiène</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Photo</label>
                <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Search size={32} className="mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">Cliquez pour ajouter une photo</span>
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl shadow-slate-200 mt-4 active:scale-95">
                Publier mon annonce
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-white text-slate-900 p-6 rounded-[2rem] premium-shadow border border-slate-100 flex items-center gap-4 hover:scale-105 transition-transform group">
          <div className="relative">
            <ShoppingCart size={32} className="text-blue-600" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-bold text-xl pr-2">Mon Panier</span>
        </button>
      </div>
    </div>
  );
}
