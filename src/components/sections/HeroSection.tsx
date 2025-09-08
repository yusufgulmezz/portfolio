'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page transition'dan sonra animasyonları başlat
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500); // Adjusted to match PageTransition duration (2.5 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen bg-[#edede9]">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-screen flex items-start pt-8 sm:pt-12 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
            
            {/* Mobile: Image at top, Desktop: Background image */}
            <div className="lg:absolute lg:inset-0 lg:pointer-events-none lg:overflow-hidden">
              <img
                src="./images/ProfilePhoto.png"
                alt="Background visual"
                loading="eager"
                decoding="async"
                className="w-full h-64 sm:h-80 md:h-96 object-cover object-top mb-8 grayscale opacity-40 lg:absolute lg:left-0 lg:-right-[10%] lg:top-1/2 lg:-translate-y-6/16 lg:w-[80vw] lg:sm:w-[75vw] lg:md:w-[70vw] lg:w-[65vw] lg:xl:w-[60vw] lg:max-w-none lg:object-contain lg:object-left lg:select-none lg:h-auto lg:mb-0"
                draggable={false}
              />
            </div>

            {/* Mobile: Text below image, Desktop: Text on right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 lg:col-span-8 lg:col-start-6 text-right"
            >
              {/* Main Heading with Name and Designer on same line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-baseline gap-4 mb-2 justify-end">
                  {/* <span className="text-lg sm:text-xl lg:text-2xl font-normal text-orange-500">
                    Yusuf Gülmez
                  </span> */}
                  <span 
                    className="text-[52px] sm:text-[80px] md:text-[104px] lg:text-[128px] font-medium text-[#1A1A1A] leading-[0.95] text-right"
                    style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
                  >
                    DIGITAL
                  </span>
                </div>
                <h1 className="text-[24px] sm:text-[24px] md:text-[24px] lg:text-[39px] font-Regular text-[#4E4E4E] leading-[0.95] text-right">
                DESIGNER & DEVELOPER
                </h1>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-8"
              >
                <p 
                  className="text-[16px] sm:text-[20px] md:text-[24px] font-normal text-[#1A1A1A] leading-relaxed max-w-2xl ml-auto text-right"
                  style={{ fontFamily: 'var(--font-roboto)' }}
                >
                  I design and develop high-end digital experiences for design-driven companies that value attention to detail.
                </p>
              </motion.div>
              
              {/* CTA Button - Orange like in reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-300"
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
