'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page transition'dan sonra animasyonları başlat
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#edede9]">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
            
            {/* Left Side - Text Content (8 columns on large screens) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8"
            >
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-900 mb-8 leading-tight"
              >
                Designer &{' '}
                <span className="text-gray-900">Developer.</span>
              </motion.h1>
              
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700 mb-4">
                  Yusuf Gülmez
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  I design and develop high-end digital experiences for design-driven companies that value attention to detail.
                </p>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Contact me
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  View Projects
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Image/Visual (4 columns on large screens) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-4 flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Profile Image Placeholder */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl lg:text-4xl">👨‍💻</span>
                    </div>
                    <p className="text-sm lg:text-base font-medium text-gray-600">Designer Portrait</p>
                  </div>
                </motion.div>
                
                {/* Subtle background elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-100 rounded-full opacity-60" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
