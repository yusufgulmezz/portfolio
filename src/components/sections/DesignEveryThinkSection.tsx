'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DesignEveryThinkSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen bg-[#edede9] flex flex-col justify-center items-center">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Title */}
        <motion.h1 
          className="text-[120px] font-normal text-[#1A1A1A] leading-none mb-16 text-center"
          style={{ fontFamily: 'var(--font-roboto)' }}
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          DESIGN EVERY THINK
        </motion.h1>

        {/* Horizontal Line */}
        <motion.div 
          className="w-full h-px bg-[#AFAFAF] mb-16"
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Description Text */}
        <motion.p 
          className="text-[24px] font-normal text-[#1A1A1A] leading-relaxed text-left"
          style={{ fontFamily: 'var(--font-roboto)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Where creativity meets technology.<br />
          From pixels to prototypes, from code to canvas - every project tells a story.
        </motion.p>
      </div>

      {/* Animated Scroll Down Button */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="group flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated Arrow */}
          <motion.div
            className="w-6 h-6 border-r-2 border-b-2 border-[#1A1A1A] transform rotate-45 mb-2"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Scroll Text */}
          <motion.span 
            className="text-[#1A1A1A] text-sm font-normal"
            style={{ fontFamily: 'var(--font-roboto)' }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll Down
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default DesignEveryThinkSection;
