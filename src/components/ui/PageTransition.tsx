'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    "Pixel Art",
    "Graphic Designe",
    "UI/UX",
    "3D",
    "Coding",
  ];

  useEffect(() => {
    // Text değişimi animasyonu
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 500);

    // Ana animasyonu gizle
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
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
          <div className="relative text-center">
            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                <span className="font-normal">DesignEvery</span>
                <span className="font-bold">Think</span>
              </h1>
            </motion.div>

            {/* Rotating text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-8 mb-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-2xl text-gray-300 font-light"
                >
                  {texts[currentText]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Loading animation */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex justify-center items-center space-x-3"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 1.4 + index * 0.1,
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              ))}
            </motion.div> */}

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
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
