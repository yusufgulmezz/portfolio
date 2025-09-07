'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DesignEveryThinkSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Set section height to viewport minus header height so the whole block is visible
  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector('header') as HTMLElement | null;
      const headerHeight = header?.offsetHeight ?? 0;
      const viewportHeight = window.innerHeight;
      setSectionMinHeight(viewportHeight - headerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section
      className="relative bg-[#edede9] flex flex-col justify-center items-center"
      style={{ minHeight: sectionMinHeight ? `${sectionMinHeight}px` : '100vh' }}
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Title */}
        <motion.h1 
          className="text-[52px] sm:text-[80px] md:text-[104px] lg:text-[128px] font-medium text-[#1A1A1A] leading-[0.95] mb-12 text-center"
          style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
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
          className="text-[24px] font-normal text-[#1A1A1A] leading-relaxed text-left mx-auto"
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
        className="absolute left-1/2 transform -translate-x-1/2 bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12"
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
          {/* Modern Scroll Down Icon */}
          <motion.div
            className="w-8 h-12 border-2 border-[#1A1A1A] rounded-full flex justify-center items-start pt-2"
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-1 h-3 bg-[#1A1A1A] rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default DesignEveryThinkSection;
