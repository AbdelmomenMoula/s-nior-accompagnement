import CategoryCard from '../components/CategoryCard';
import { motion } from 'motion/react';

const categories = [
  {
    title: "Aide Santé",
    description: "Achat et vente de matériel : fauteuils, appareils de tension, etc.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    to: "/besoins"
  },
  {
    title: "Psychique",
    description: "Parlez à notre compagnon IA ou prenez rendez-vous avec un psychologue.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800",
    to: "/psychique"
  },
  {
    title: "Réseau Santé",
    description: "Consultez un médecin à distance, contrôles et rendez-vous simplifiés.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    to: "/telemedicine"
  },
  {
    title: "Rappeler-moi",
    description: "Vos médicaments, rendez-vous, repas et moments de prière.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    to: "/rappels"
  },
  {
    title: "Alerte",
    description: "Sécurité par GPS et alerte automatique pour votre famille.",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=800",
    to: "/alerte"
  },
  {
    title: "Loisirs",
    description: "Livres, jeux, blagues et divertissements pour rester actif.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    to: "/loisirs"
  }
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 space-y-6"
      >
        <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full inline-block font-bold text-sm tracking-wide uppercase">
          Bienvenue sur votre plateforme dévouée
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight title-serif leading-none">
          Comment puis-je vous <br/> <span className="text-blue-600 italic">accompagner</span> aujourd'hui ?
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Un espace bienveillant conçu pour simplifier votre quotidien et prendre soin de vous, à chaque instant.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={cat.title}
            {...cat}
            delay={idx * 0.1}
          />
        ))}
      </div>

      <div className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 title-serif">Besoin d'assistance par téléphone ?</h2>
          <p className="text-slate-400 text-lg">Nos conseillers sont à votre écoute 24h/24 pour répondre à toutes vos questions ou vous aider à naviguer sur la plateforme.</p>
        </div>
        <div className="relative z-10 shrink-0">
          <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl">
            Appeler le 0800 123 456
          </button>
        </div>
        {/* Decor elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-600 rounded-full blur-[80px] opacity-10" />
      </div>
    </div>
  );
}
