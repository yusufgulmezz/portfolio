'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  const [showEveryThink, setShowEveryThink] = useState(false);

  const rotatingTexts = useMemo(() => [
    "UI/UX",
    "Poster",
    "Pixel Art",
    "3D", 
    "Coding"
  ], []);

  useEffect(() => {
    // İlk text hemen başlasın
    const timers: NodeJS.Timeout[] = [];
    
    // İlk text hemen başlasın
    const firstTimer = setTimeout(() => {
      setCurrentText(1);
    }, 100); // Çok kısa delay
    
    // Diğer textler için timer'lar
    rotatingTexts.forEach((_, index) => {
      if (index > 0) { // İlk text'i atla
        const timer = setTimeout(() => {
          setCurrentText(index + 1);
        }, index * 900 + 100); // Her text 900ms gösterilsin
        timers.push(timer);
      }
    });

    // Son text'ten sonra EveryThink'i göster
    const everyThinkTimer = setTimeout(() => {
      setShowEveryThink(true);
    }, rotatingTexts.length * 900 + 300); // +300ms extra

    // Ana animasyonu gizle
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, rotatingTexts.length * 900 + 1000); // +1000ms extra

    return () => {
      [firstTimer, ...timers, everyThinkTimer, hideTimer].forEach(clearTimeout);
    };
  }, [rotatingTexts]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >

          {/* Main content */}
          <div className="relative text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
            {/* Rotating texts and final Design Every Think */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <div className="min-w-0 sm:min-w-[300px] h-[1.2em] whitespace-nowrap flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentText > 0 && !showEveryThink && (
                      <motion.span
                        key={currentText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="font-bold text-white leading-none"
                      >
                        {rotatingTexts[currentText - 1]}
                      </motion.span>
                    )}
                    {showEveryThink && (
                      <motion.span
                        key="everythink"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="text-white"
                      >
                        <span className="font-normal">Design</span>
                        <span className="font-bold"> Every </span>
                        <span className="font-bold">Think</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </h1>
            </div>


          </div>

          {/* Corner accents */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;