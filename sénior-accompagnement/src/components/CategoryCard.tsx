import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface CategoryCardProps {
  title: string;
  image: string;
  to: string;
  description: string;
  delay?: number;
}

export default function CategoryCard({ title, image, to, description, delay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={to} className="block bg-white rounded-[3rem] p-6 lg:p-10 premium-shadow border border-slate-100 hover:border-blue-200 transition-all h-full flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight title-serif">
            {title}
          </h2>
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <ChevronRight size={28} strokeWidth={2.5} />
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] mb-8 overflow-hidden rounded-[2.5rem] bg-slate-50 flex items-center justify-center border border-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="text-slate-500 text-center text-lg leading-relaxed px-2 font-medium">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
