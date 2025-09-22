'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

            {/* Image: Foreground column (top on mobile, left on desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 order-1"
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/ProfilePhoto.png`}
                  alt="Profile photo"
                  className="w-full h-[340px] sm:h-[420px] md:h-[500px] lg:h-[560px] object-cover object-center grayscale-[40%]"
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Mobile: Text below image, Desktop: Text on right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 lg:col-span-7 lg:col-start-6 text-right order-2"
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
                  onClick={() => {
                    const el = document.getElementById('tech-logos');
                    if (!el) return;

                    const startY = window.pageYOffset || document.documentElement.scrollTop;
                    const rect = el.getBoundingClientRect();
                    const elementTopRelative = rect.top; // relative to viewport
                    // Center the element in viewport similar to block: 'center'
                    const offsetToCenter = (window.innerHeight - rect.height) / 2;
                    const targetY = startY + elementTopRelative - Math.max(0, offsetToCenter);

                    const startTime = performance.now();
                    const duration = 1000; // match DesignEveryThink smoothness

                    const animate = (currentTime: number) => {
                      const elapsed = currentTime - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      const easeOut = 1 - Math.pow(1 - progress, 3);
                      const currentPos = startY + (targetY - startY) * easeOut;
                      window.scrollTo(0, currentPos);
                      if (progress < 1) requestAnimationFrame(animate);
                    };

                    requestAnimationFrame(animate);
                  }}
                >
                  Keep Scrolling
                </motion.button>
              </motion.div>
            </motion.div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
