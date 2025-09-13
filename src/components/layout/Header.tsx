'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const rotatingTexts = [
    'Graphic Designer',
    'Pixel Artist',
    'UI/UX Designer',
    '3D Designer',
    'Developer',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [rotatingTexts.length]);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
    >
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16 sm:h-24">
          {/* Left Side - Logo + rotating subtitle */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick} 
              className="block cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <div className="leading-tight text-left">
                                 <span className="block text-lg sm:text-xl font-bold text-gray-900">
                   <span className="font-bold">DET</span>
                 </span>
                 <div className="h-4 sm:h-5 overflow-hidden text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingTexts[currentIndex]}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                                             className="block text-xs sm:text-sm text-gray-500 font-regular"
                      aria-live="polite"
                    >
                      {rotatingTexts[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </div>

          {/* Center - Name */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <h1 className="text-2xl font-bold text-gray-900">
              Yusuf Gülmez
            </h1>
          </motion.div> */}

          {/* Right Side - Portfolio Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-right"
          >
            <div className="leading-tight">
                             <p className="block text-lg sm:text-xl font-bold text-gray-900">Portfolio</p>
               <p className="block text-xs sm:text-sm text-gray-500 font-regular">Yusuf Gülmez</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
