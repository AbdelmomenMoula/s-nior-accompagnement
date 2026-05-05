import { Heart, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-800">
            Sénior Accompagnement
          </span>
        </Link>

        {!isHome && (
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
        )}
      </div>
    </header>
  );
}
