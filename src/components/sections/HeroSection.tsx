'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

const TypewriterRoleText = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = ['DESIGNER', 'DEVELOPER'];
    const currentText = roles[currentRoleIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing effect
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 75); // Her karakter için 100ms
      } else {
        // Yazma tamamlandı, 2 saniye bekle sonra silmeye başla
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting effect
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 25); // Silme daha hızlı
      } else {
        // Silme tamamlandı, sonraki role geç
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <div className="relative h-[44px] sm:h-[56px] md:h-[72px] lg:h-[88px] flex items-center justify-start sm:justify-end">
      <div className="flex items-center">
        <motion.h1
          className="text-[32px] sm:text-[48px] md:text-[60px] lg:text-[80px] font-medium text-[#1A1A1A] leading-[0.95]"
          style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
        >
          {displayedText}
        </motion.h1>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
          className="inline-block w-1 bg-red-500 ml-2 h-12 sm:h-16 md:h-20 lg:h-24"
          style={{ 
            marginLeft: '8px',
          }}
        />
      </div>
    </div>
  );
};

const HeroSection = () => {
  // Hero görsel slider verileri (Unsplash örnekleri)
  const heroImages = useMemo(
    () => [
      {
        src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/Profile-1.jpg`,
        alt: 'ProfileImage_1',
      },
      {
        src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/Profile-1.jpg`,
        alt: 'ProfileImage_2',
      },
      {
        src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/Profile-1.jpg`,
        alt: 'ProfileImage_3',
      },
      {
        src: `${process.env.NODE_ENV === 'production' ? '/portfolio' : ''}/images/Profile-1.jpg`,
        alt: 'ProfileImage_4',
      },
    ],
    []
  );

  const [currentHeroIdx] = useState(0);

  // Basit preloader
  useEffect(() => {
    heroImages.forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
  }, [heroImages]);

  return (
    <section id="hero" className="relative min-h-screen bg-[#edede9]">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-start pt-8 sm:pt-12 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">

            {/* Image Slider: Foreground column (top on mobile, left on desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: false, amount: 0.5 }}
              className="lg:col-span-5 order-1 flex justify-end"
            >
              <div className="relative w-full max-w-[520px] sm:max-w-[420px] md:max-w-[520x] lg:max-w-none overflow-hidden rounded-2xl backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                {/* Büyük görsel alanı */}
                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[380px] lg:h-[560px]">
                  <AnimatePresence mode="wait">
                    {heroImages.map((img, idx) => (
                      idx === currentHeroIdx && (
                        <motion.div
                          key={img.src}
                          className="absolute inset-0 w-full h-full"
                          initial={{ 
                            opacity: 0, 
                            y: 20, 
                            scale: 1.02
                          }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: 1
                          }}
                          exit={{ 
                            opacity: 0, 
                            y: -10, 
                            scale: 0.98
                          }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          <motion.img
                            src={img.src}
                            alt={img.alt}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            initial={{ 
                              filter: 'blur(8px)'
                            }}
                            animate={{ 
                              filter: 'blur(0px)'
                            }}
                            exit={{ 
                              filter: 'blur(4px)'
                            }}
                            transition={{ 
                              filter: { duration: 0.3, delay: 0.1 }
                            }}
                            draggable={false}
                          />
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>

                  {/* Koyu degrade üst overlay */}
                  {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" /> */}

                  {/* Sol üst başlık ve CTA */}
                  {/* <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-3">
                    <h3 className="text-white text-xl sm:text-3xl md:text-4xl font-medium tracking-tight max-w-[18ch]">
                      Searching for something beyond
                    </h3>
                    <button
                      className="self-start px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm hover:bg-white/25 transition"
                      onClick={() => {
                        const el = document.getElementById('tech-logos');
                        if (!el) return;
                        const startY = window.pageYOffset || document.documentElement.scrollTop;
                        const rect = el.getBoundingClientRect();
                        const offsetToCenter = (window.innerHeight - rect.height) / 2;
                        const targetY = startY + rect.top - Math.max(0, offsetToCenter);
                        const startTime = performance.now();
                        const duration = 1000;
                        const animate = (t: number) => {
                          const p = Math.min((t - startTime) / duration, 1);
                          const ease = 1 - Math.pow(1 - p, 3);
                          const y = startY + (targetY - startY) * ease;
                          window.scrollTo(0, y);
                          if (p < 1) requestAnimationFrame(animate);
                        };
                        requestAnimationFrame(animate);
                      }}
                    >
                      Explore
                    </button>
                  </div> */}

                  {/* Alt küçük önizleme görselleri (thumbnails) - İleride kullanılmak üzere yorum satırına alındı */}
                  {/* <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 px-4">
                    {heroImages.map((img, idx) => (
                      <button
                        key={`thumb-${idx}`}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`relative w-16 h-12 sm:w-20 sm:h-14 overflow-hidden rounded-md shadow-md transition-all duration-300 ring-1 ring-white/10 ${idx === currentHeroIdx ? 'ring-2 ring-white/70 scale-[1.03]' : 'opacity-80 hover:opacity-100 hover:scale-[1.02]'}`}
                        onMouseEnter={() => setCurrentHeroIdx(idx)}
                        onClick={() => setCurrentHeroIdx(idx)}
                      >
                        <img
                          src={img.src}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </button>
                    ))}
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Mobile: Text below image, Desktop: Text on right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              className="relative z-10 lg:col-span-7 lg:col-start-6 text-left sm:text-right order-2"
            >
              {/* Main Heading with Name and Designer on same line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false, amount: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-baseline gap-4 mb-2 justify-start sm:justify-end">
                  <span 
                    className="text-[16px] sm:text-[18px] md:text-[30px] lg:text-[36px] font-small text-[#4E4E4E] leading-[0.95] text-left sm:text-right"
                    style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
                  >
                    DIGITAL
                  </span>
                </div>
                <TypewriterRoleText />
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
                className="mb-8"
              >
                <p 
                  className="text-[15px] sm:text-[18px] md:text-[21px] font-normal text-[#1A1A1A] leading-relaxed max-w-2xl text-left sm:text-right sm:ml-auto"
                  style={{ fontFamily: 'var(--font-roboto)' }}
                >
                  I design and develop high-end digital experiences for design-driven companies that value attention to detail.
                </p>
              </motion.div>
              
              {/* CTA Button - Orange like in reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: false, amount: 0.5 }}
                className="flex justify-start sm:justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#4E4E4E] text-[#edede9] font-medium rounded-lg hover:bg-[#1A1A1A] transition-colors duration-300"
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
