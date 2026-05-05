import { Bell, Clock, Calendar, Utensils, Heart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const initialReminders = [
  { id: 1, type: "medicine", title: "Doliprane 500mg", time: "08:00", description: "Après le petit déjeuner", active: true },
  { id: 2, type: "meal", title: "Petit Déjeuner", time: "08:30", description: "Penser aux fibres", active: true },
  { id: 3, type: "appointment", title: "Dr Mansouri", time: "15:30", description: "Visioconférence", active: true },
  { id: 4, type: "prayer", title: "Prière Asr", time: "16:45", description: "Moment calme", active: true }
];

export default function Rappels() {
  const [reminders, setReminders] = useState(initialReminders);
  const [showAdd, setShowAdd] = useState(false);

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'medicine': return <Heart className="text-red-500" />;
      case 'meal': return <Utensils className="text-orange-500" />;
      case 'appointment': return <Calendar className="text-blue-500" />;
      case 'prayer': return <Bell className="text-amber-500" />;
      default: return <Clock className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
            Organisation Quotidienne
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight title-serif">Rappeler-moi</h1>
          <p className="text-lg text-slate-500">Votre compagnon pour ne jamais oublier l'essentiel du quotidien.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 group active:scale-95"
        >
          <span className="group-hover:rotate-90 transition-transform">+</span>
          Nouveau rappel
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white p-8 rounded-[2.5rem] premium-shadow border border-slate-100 space-y-6"
          >
            <h2 className="text-2xl font-bold title-serif">Ajouter un rappel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input type="text" placeholder="Titre (ex: Médicament)" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" />
              <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" />
              <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all appearance-none">
                <option>Médicament</option>
                <option>Repas</option>
                <option>Rendez-vous</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowAdd(false)} className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Annuler</button>
              <button onClick={() => setShowAdd(false)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-100">Enregistrer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-6">
        {reminders.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-8 p-8 rounded-[3rem] border transition-all ${
              r.active ? 'bg-white border-slate-100 shadow-xl' : 'bg-slate-50/50 border-slate-200 grayscale opacity-50'
            }`}
          >
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 text-2xl font-black shadow-inner ${
              r.active ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'
            }`}>
              {r.time}
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center justify-center shrink-0">
              {getIcon(r.type)}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-2xl text-slate-800">{r.title}</h3>
              <p className="text-slate-500 font-medium">{r.description}</p>
            </div>

            <button 
              onClick={() => toggleReminder(r.id)}
              className={`w-16 h-9 rounded-full relative transition-colors shadow-inner ${r.active ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <motion.div 
                animate={{ x: r.active ? 28 : 4 }}
                className="absolute top-1 w-7 h-7 bg-white rounded-full shadow-md"
              />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-4 title-serif">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <Calendar size={28} />
              </div>
              Bientôt
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/30 rounded-r-3xl">
                <div>
                  <p className="font-black text-xl text-slate-800">Anniversaire de Lucas</p>
                  <p className="text-slate-500">Dans 3 jours • Samedi 1 Mai</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-l-4 border-slate-200 pl-6 py-2">
                <div>
                  <p className="font-bold text-xl text-slate-500">Contrôle Ophtalmo</p>
                  <p className="text-slate-400">Dans 12 jours • 10 Mai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-4 text-amber-900 title-serif">
              <div className="p-3 bg-white rounded-2xl text-amber-600 shadow-sm font-bold">
                <Bell size={28} />
              </div>
              Prières
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((p, i) => (
                <div key={p} className="bg-white/60 p-4 rounded-2xl flex justify-between items-center group hover:bg-white transition-all shadow-sm">
                  <p className="text-sm font-black text-amber-800 uppercase tracking-wider">{p}</p>
                  <p className="font-black text-lg text-slate-900 group-hover:scale-110 transition-transform">0{5+i}:15</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200 rounded-full blur-[80px] opacity-20" />
        </div>
      </div>
    </div>
  );
}
