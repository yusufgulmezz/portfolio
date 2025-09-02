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
            
            {/* Background Image - Large background element behind everything */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <img
                src="./images/ProfilePhoto.png"
                alt="Background visual"
                loading="eager"
                decoding="async"
                className="absolute left-0 lg:-right-[10%] top-1/2 -translate-y-1/2 w-[80vw] sm:w-[75vw] md:w-[70vw] lg:w-[65vw] xl:w-[60vw] max-w-none grayscale opacity-40 object-contain object-left select-none"
                draggable={false}
              />
            </div>

            {/* Right Side - Text Content (8 columns on large screens) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 lg:col-span-8 lg:col-start-5"
            >
              {/* Main Heading with Name and Designer on same line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-lg sm:text-xl lg:text-2xl font-normal text-orange-500">
                    Yusuf Gülmez
                  </span>
                  <span className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900">
                    DESIGNER
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900">
                  & DEVELOPER.
                </h1>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  I design and develop high-end digital experiences for design-driven companies that value attention to detail.
                </p>
              </motion.div>
              
              {/* CTA Button - Orange like in reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-300"
                >
                  Contact me
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Left spacer to keep text on the right */}
            <div className="hidden lg:block lg:col-span-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
