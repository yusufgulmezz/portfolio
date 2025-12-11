'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBehance, FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: FaBehance, href: 'https://behance.net/designeverythink', aria: 'Behance' },
  { icon: FaGithub, href: 'https://github.com/yusufgulmezz', aria: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yusufglmz/', aria: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/design.everythink/', aria: 'Instagram' },
  { icon: FaEnvelope, href: 'mailto:designeverythink.co@gmail.com', aria: 'Email' },
];

const navItems = ['HOME', 'WORK', 'PERSONAL', 'CONTACT'];

const textRevealTop = {
  rest: { y: '0%' },
  hover: { y: '-100%' },
};

const textRevealBottom = {
  rest: { y: '100%' },
  hover: { y: '0%' },
};

const HeaderNew = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [activeNav, setActiveNav] = useState<'HOME' | 'WORK' | 'PERSONAL' | 'CONTACT'>('HOME');
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

  // Scroll-based nav highlight
  useEffect(() => {
    const getTopY = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return window.scrollY + rect.top;
    };

    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const workTop = getTopY('categories');
      const personalTop = getTopY('personal-anchor');
      const contactTop = getTopY('contact');

      if (contactTop !== null && viewportCenter >= contactTop) {
        setActiveNav('CONTACT');
      } else if (personalTop !== null && viewportCenter >= personalTop) {
        setActiveNav('PERSONAL');
      } else if (workTop !== null && viewportCenter >= workTop) {
        setActiveNav('WORK');
      } else {
        setActiveNav('HOME');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleSoundToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isSoundOn;
    setIsSoundOn(next);
    localStorage.setItem('soundEnabled', String(next));
    if (next) {
      try {
        await audio.play();
      } catch {
        setIsSoundOn(false);
        localStorage.setItem('soundEnabled', 'false');
      }
    } else {
      audio.pause();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      setIsMobileMenuOpen(false);
      return;
    }

    const rect = element.getBoundingClientRect();
    const currentY = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 0;

    // Özel offset/pivot ayarları
    if (id === 'categories') {
      // WORK: biraz aşağı, daha az offset
      const targetY = currentY + rect.top - headerOffset + 120;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else if (id === 'personal-creatives') {
      // PERSONAL: bölümün üstünü viewport üstüne hizala; sticky başlık ortalanacak
      const targetY = currentY + rect.top - headerOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      // Varsayılan
      const targetY = currentY + rect.top - headerOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
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

  const renderNavItem = (item: (typeof navItems)[number], opts?: { size?: 'md' | 'lg' }) => {
    const isActive = activeNav === item;
    const sizeClass = opts?.size === 'md' ? 'text-lg' : 'text-[18px]';
    return (
      <button
        key={item}
        onClick={() => handleNavClick(item)}
        className={`text-left ${sizeClass} font-medium transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-[#AFAFAF] hover:text-[#1A1A1A]'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <motion.span
          initial="rest"
          animate="rest"
          whileHover="hover"
          className="relative inline-block overflow-hidden align-middle"
          style={{ height: '22px', lineHeight: '22px' }}
        >
          <motion.span
            variants={textRevealTop}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="block"
          >
            {item}
          </motion.span>
          <motion.span
            variants={textRevealBottom}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="block absolute left-0 top-0"
          >
            {item}
          </motion.span>
        </motion.span>
      </button>
    );
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
                    <div key={item} className="py-2">
                      {renderNavItem(item, { size: 'md' })}
                    </div>
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

        <div className="flex flex-col items-start gap-6 relative w-full">
          {socials.map((s, i) => {
            const IconComponent = s.icon;
            return (
              <a
                key={s.aria}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.aria}
                className="relative z-10 text-[#1A1A1A] flex items-center justify-center transition-all duration-200 bg-[#4e4e4e] hover:bg-[#1a1a1a] hover:scale-110 rounded-full w-12 h-12"
                style={{ marginTop: i === 0 ? 0 : 2 }}
              >
                <IconComponent size={20} className="text-[#edede9]" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Desktop Header - Right rail */}
      <div className="hidden lg:flex fixed right-[72px] top-[72px] bottom-[72px] w-[88px] z-[60] flex-col justify-between items-center">
        <div className="flex flex-col items-end w-full text-right" style={{ fontFamily: 'var(--font-roboto)' }}>
          {navItems.map((item) => (
            <div key={item} className="py-1">
              {renderNavItem(item, { size: 'lg' })}
            </div>
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

