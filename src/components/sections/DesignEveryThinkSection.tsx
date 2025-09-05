'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const DesignEveryThinkSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSplineError = () => {
    console.log('Spline failed to load, using fallback');
    setSplineError(true);
  };

  return (
    <section className="relative mt-5 min-h-screen bg-[#edede9] overflow-hidden">
      {/* 3D Background */}
     

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl sm:text-8xl lg:text-9xl font-bold text-gray-900 mb-8"
              initial={{ scale: 0.8 }}
              animate={isLoaded ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 1.2, delay: 0.7 }}
            >
              Design
              <motion.span 
                className="block text-4xl sm:text-6xl lg:text-7xl font-normal text-gray-600 mt-4"
                initial={{ opacity: 0, x: -50 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                EveryThink
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Where creativity meets technology. From pixels to prototypes, 
              from code to canvas - every project tells a story.
            </motion.p>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Explore My Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignEveryThinkSection;
