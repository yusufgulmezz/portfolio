'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  const [showEveryThink, setShowEveryThink] = useState(false);

  const rotatingTexts = [
    "3D Object", 
    "UI/UX Prototype",
    "Poster",
    "Pixel Art",
    "Code Process"
  ];

  useEffect(() => {
    // İlk 0.3 saniye sadece "Design" göster, sonra text'ler başlasın
    const startInterval = setTimeout(() => {
      // Text'leri sırayla göster
      const timers: NodeJS.Timeout[] = [];
      
      // Her text için ayrı timer
      rotatingTexts.forEach((_, index) => {
        const timer = setTimeout(() => {
          setCurrentText(index + 1);
        }, index * 400); // 700ms → 400ms (daha hızlı)
        timers.push(timer);
      });

      // Son text'ten sonra EveryThink'i göster
      const everyThinkTimer = setTimeout(() => {
        setShowEveryThink(true);
      }, rotatingTexts.length * 400);

      // Ana animasyonu gizle
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, (rotatingTexts.length + 1) * 400 + 100); // +100ms extra

      return () => {
        [...timers, everyThinkTimer, hideTimer].forEach(clearTimeout);
      };
    }, 300); // 500ms → 300ms (daha hızlı)

    return () => {
      clearTimeout(startInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full" />
          </div>

          {/* Main content */}
          <div className="relative text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
            {/* Main text with "Design" + rotating text */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                <span className="font-normal">Design</span>
                <span className="inline-block ml-4">
                  {currentText > 0 && !showEveryThink && (
                    <span className="font-bold text-gray-400">
                      a {rotatingTexts[currentText - 1]}
                    </span>
                  )}
                  {showEveryThink && (
                    <>
                      <span className="font-normal text-white">Every</span>
                      <span className="font-bold text-white">Think</span>
                    </>
                  )}
                </span>
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