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
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0">
        {/* Floating Circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-red-400/20"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/5 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20"
          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
          animate={{
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
        />

        {/* Floating Lines */}
        <motion.div
          className="absolute top-1/6 left-1/6 w-40 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          animate={{
            x: [0, 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/6 right-1/6 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
          animate={{
            x: [0, -80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Pulsing Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gray-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-left"
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
              className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-3xl leading-relaxed relative z-10"
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
