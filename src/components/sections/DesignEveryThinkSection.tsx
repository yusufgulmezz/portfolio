'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const DesignEveryThinkSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionMinHeight, setSectionMinHeight] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');

  // Component mount olduğunda animasyonları başlat
  useEffect(() => {
    // Kısa bir gecikme ile animasyonları başlat
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter animation for description (inspired by text-type patterns)
  const descriptionFullText = useMemo(
    () =>
      'Where creativity meets technology.\nFrom pixels to prototypes, from code to canvas - every project tells a story.',
    []
  );

  useEffect(() => {
    if (!isLoaded) return;

    let currentIndex = 0;
    const typingSpeedMs = 28; // smooth & fast

    // Ensure we always start from the very beginning when visible
    setTypedText('');
    const interval = setInterval(() => {
      currentIndex += 1;
      setTypedText(descriptionFullText.slice(0, currentIndex));
      if (currentIndex >= descriptionFullText.length) {
        clearInterval(interval);
      }
    }, typingSpeedMs);

    return () => clearInterval(interval);
  }, [isLoaded, descriptionFullText]);

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
    const targetEl = document.getElementById('hero');
    if (!targetEl) return;

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const rect = targetEl.getBoundingClientRect();
    const headerEl = document.querySelector('header') as HTMLElement | null;
    const headerHeight = headerEl?.offsetHeight ?? 0;
    const targetY = startY + rect.top - headerHeight; // section başlangıcına hizala

    const startTime = performance.now();
    const duration = 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentPos = startY + (targetY - startY) * easeOut;
      window.scrollTo(0, currentPos);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <section
      id="design-every-think"
      className="relative bg-[#edede9] flex flex-col justify-center items-center overflow-hidden"
      style={{ minHeight: sectionMinHeight ? `${sectionMinHeight}px` : '100vh' }}
    >

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <motion.h1 
          className="text-[36px] sm:text-[60px] md:text-[88px] lg:text-[96px] xl:text-[120px] 2xl:text-[128px] font-medium text-[#1A1A1A] leading-[0.95] mb-8 sm:mb-10 md:mb-12 text-center max-w-[95vw] mx-auto"
          style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          DESIGN EVERY THINK<span className="text-[#E43A0F]">.</span>
        </motion.h1>

        {/* Horizontal Line */}
        <motion.div 
          className="w-full h-px bg-[#AFAFAF] mb-14"
          initial={{ scaleX: 0 }}
          animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Description Text with typewriter animation */}
        <motion.div 
          className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] font-normal text-[#1A1A1A] leading-relaxed text-left mx-auto"
          style={{ fontFamily: 'var(--font-roboto)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0 }}
        >
          {typedText.split('\n').map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Down Button with Text */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="group flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Left Text - Click To */}
          <motion.span 
            className="text-[#4E4E4E] text-sm font-medium tracking-wide"
            style={{ fontFamily: 'var(--font-roboto)' }}
            initial={{ opacity: 0, x: -10 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            Click To
          </motion.span>

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

          {/* Right Text - Scroll */}
          <motion.span 
            className="text-[#4E4E4E] text-sm font-medium tracking-wide"
            style={{ fontFamily: 'var(--font-roboto)' }}
            initial={{ opacity: 0, x: 10 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            Scroll
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default DesignEveryThinkSection;
