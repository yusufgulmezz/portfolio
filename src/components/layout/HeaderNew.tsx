'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socials = [
  { label: 'Bé', href: 'https://www.behance.net/', aria: 'Behance' },
  { label: 'in', href: 'https://www.linkedin.com/', aria: 'LinkedIn' },
  { label: '○', href: '#', aria: 'Contact' },
];

const navItems = ['HOME', 'WORK', 'PERSONAL', 'CONTACT'];

const HeaderNew = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('/audio/soundtrack.mp3');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect basePath for GitHub Pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/portfolio')) {
        setAudioSrc('/portfolio/audio/soundtrack.mp3');
      } else {
        setAudioSrc('/audio/soundtrack.mp3');
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  const handleSoundToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isSoundOn;
    setIsSoundOn(next);
    localStorage.setItem('soundEnabled', String(next));
    if (next) {
      try {
        await audio.play();
      } catch (e) {
        setIsSoundOn(false);
        localStorage.setItem('soundEnabled', 'false');
      }
    } else {
      audio.pause();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: string) => {
    const idMap: Record<string, string> = {
      'HOME': 'design-every-think',
      'WORK': 'categories',
      'PERSONAL': 'personal-creatives',
      'CONTACT': 'contact'
    };
    const id = idMap[item] || item.toLowerCase().replace(' ', '-');
    scrollToSection(id);
  };

  return (
    <>
      {/* Hidden audio */}
      <audio ref={audioRef} loop preload="none" style={{ display: 'none' }} aria-label="Background soundtrack">
        <source src={audioSrc} type="audio/mpeg" key={audioSrc} />
        Your browser does not support the audio element.
      </audio>

      {/* Mobile & Tablet Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl lg:hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => window.location.reload()}
                className="block cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                <div className="leading-tight text-left">
                  <span className="block text-lg font-bold text-[#1A1A1A]">DET</span>
                  <span className="block text-xs text-[#4E4E4E] font-regular">Developer</span>
                </div>
              </button>
            </div>

            {/* Center - Sound Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <button
                onClick={handleSoundToggle}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-roboto)'
                }}
              >
                <div
                  className="flex items-center"
                  style={{
                    gap: '6px',
                    backgroundColor: '#4E4E4E',
                    borderRadius: '24px',
                    padding: '8px 16px'
                  }}
                >
                  <span style={{ color: '#AFAFAF', fontSize: '16px', fontWeight: 500 }}>
                    SOUND
                  </span>
                  <div className="overflow-hidden relative" style={{ height: '18px', lineHeight: '18px' }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isSoundOn ? 'ON' : 'OFF'}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                          color: '#EDEDE9',
                          fontSize: '16px',
                          fontWeight: 500,
                          display: 'block',
                          lineHeight: '18px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {isSoundOn ? 'ON' : 'OFF'}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Right Side - Nav Icon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl border-t border-gray-200/50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <nav className="flex flex-col gap-3" style={{ fontFamily: 'var(--font-roboto)' }}>
                  {navItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick(item)}
                      className="text-left text-lg font-medium text-[#1A1A1A] hover:text-[#4E4E4E] transition-colors py-2"
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Desktop Header - Left rail */}
      <div className="hidden lg:flex fixed left-[72px] top-[72px] bottom-[72px] w-[88px] z-[60] flex-col justify-between items-center">
        <div className="w-full text-left">
          <div className="text-lg font-bold text-[#1A1A1A] leading-tight">DET</div>
          <div className="text-xs text-[#6B6B6B] mt-1">Developer</div>
        </div>

        <div className="flex flex-col items-start gap-5 relative w-full">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.aria}
              className="relative z-10 w-11 h-11 rounded-full bg-[#4A4A4A] text-white text-base font-semibold flex items-center justify-center hover:bg-[#2f2f2f] transition-colors"
              style={{ marginTop: i === 0 ? 0 : 2 }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Header - Right rail */}
      <div className="hidden lg:flex fixed right-[72px] top-[72px] bottom-[72px] w-[88px] z-[60] flex-col justify-between items-center">
        <div className="flex flex-col items-end w-full text-right" style={{ fontFamily: 'var(--font-roboto)' }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-[18px] font-medium text-[#AFAFAF] hover:text-[#1A1A1A] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleSoundToggle}
          className="flex flex-col items-end gap-2 w-full text-right"
          style={{ fontFamily: 'var(--font-roboto)' }}
          aria-label="Sound toggle"
        >
          <span
            className="text-[18px] font-medium"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            <span className="text-[#AFAFAF]">SOUND </span>
            <span className="text-[#1A1A1A]">{isSoundOn ? 'ON' : 'OFF'}</span>
          </span>
        </button>
      </div>
    </>
  );
};

export default HeaderNew;

