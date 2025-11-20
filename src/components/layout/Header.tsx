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
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [rotatingTexts.length]);

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
    >
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="relative flex justify-between items-center h-16 sm:h-24">
          {/* Left Side - Logo + rotating subtitle */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick} 
              className="block cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <div className="leading-tight text-left">
                                 <span className="block text-lg sm:text-xl font-bold text-[#1A1A1A]">
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
                                             className="block text-xs sm:text-sm text-[#4E4E4E] font-regular"
                      aria-live="polite"
                    >
                      {rotatingTexts[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </div>

          {/* Center - Sound Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={handleSoundToggle}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
              style={{ fontFamily: 'var(--font-roboto)', gap: '10px' }}
            >
              <span style={{ color: '#AFAFAF', fontSize: '20px', fontWeight: 500 }}>
                SOUND
              </span>
              <div className="overflow-hidden relative" style={{ height: '24px', lineHeight: '24px' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isSoundOn ? 'ON' : 'OFF'}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ 
                      color: '#4E4E4E', 
                      fontSize: '20px', 
                      fontWeight: 500,
                      display: 'block',
                      lineHeight: '24px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {isSoundOn ? 'ON' : 'OFF'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </button>
          </motion.div>

          {/* Right Side - Portfolio Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-right"
          >
            <div className="leading-tight">
                             <p className="block text-lg sm:text-xl font-bold text-[#1A1A1A]">Portfolio</p>
               <p className="block text-xs sm:text-sm text-[#4E4E4E] font-regular">Yusuf Gülmez</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
