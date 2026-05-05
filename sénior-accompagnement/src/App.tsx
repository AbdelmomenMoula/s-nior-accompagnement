/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Besoins from './pages/Besoins';
import Psychique from './pages/Psychique';
import Telemedicine from './pages/Telemedicine';
import Rappels from './pages/Rappels';
import Alerte from './pages/Alerte';
import Loisirs from './pages/Loisirs';
import Header from './components/Header';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-900 overflow-x-hidden">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/besoins" element={<PageWrapper><Besoins /></PageWrapper>} />
              <Route path="/psychique" element={<PageWrapper><Psychique /></PageWrapper>} />
              <Route path="/telemedicine" element={<PageWrapper><Telemedicine /></PageWrapper>} />
              <Route path="/rappels" element={<PageWrapper><Rappels /></PageWrapper>} />
              <Route path="/alerte" element={<PageWrapper><Alerte /></PageWrapper>} />
              <Route path="/loisirs" element={<PageWrapper><Loisirs /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
