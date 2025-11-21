'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const Header = () => {
  const rotatingTexts = [
    'Graphic Designer',
    'Pixel Artist',
    'UI/UX Designer',
    '3D Designer',
    'Developer',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false); // Default: OFF
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('/audio/soundtrack.mp3');
  
  // Detect basePath for GitHub Pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      // If URL starts with /portfolio, we're on GitHub Pages
      if (pathname.startsWith('/portfolio')) {
        setAudioSrc('/portfolio/audio/soundtrack.mp3');
      } else {
        setAudioSrc('/audio/soundtrack.mp3');
      }
    }
  }, []);

  // Reload audio when src changes
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [rotatingTexts.length]);

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleSoundToggle = async () => {
    const newState = !isSoundOn;
    const audio = audioRef.current;
    
    if (!audio) return;
    
    // Update state and localStorage
    setIsSoundOn(newState);
    localStorage.setItem('soundEnabled', String(newState));

    // Handle audio play/pause
    if (newState) {
      // User clicked to turn on - try to play
      try {
        await audio.play();
      } catch (error) {
        console.log('Audio play failed:', error);
        setIsSoundOn(false);
        localStorage.setItem('soundEnabled', 'false');
      }
    } else {
      // User clicked to turn off - pause
      audio.pause();
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        style={{ display: 'none' }}
        aria-label="Background soundtrack"
      >
        <source src={audioSrc} type="audio/mpeg" key={audioSrc} />
        Your browser does not support the audio element.
      </audio>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="relative flex justify-between items-center h-16 sm:h-22">
          {/* Left Side - Logo + rotating subtitle */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick} 
              className="block cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <div className="leading-tight text-left">
                                 <span className="block text-lg sm:text-xl font-bold text-[#1A1A1A]">
                   <span className="font-bold">DET</span>
                 </span>
                 <div className="h-4 sm:h-5 overflow-hidden text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingTexts[currentIndex]}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                                             className="block text-xs sm:text-sm text-[#4E4E4E] font-regular"
                      aria-live="polite"
                    >
                      {rotatingTexts[currentIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
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
              {/* Desktop: SOUND ON/OFF text with background */}
              <div 
                className="hidden sm:flex items-center"
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
                <div className="overflow-hidden relative" style={{ height: '20px', lineHeight: '20px' }}>
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
                        lineHeight: '20px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isSoundOn ? 'ON' : 'OFF'}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile: Play/Pause icon in circle */}
              <div 
                className="flex sm:hidden items-center justify-center" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  backgroundColor: '#4E4E4E',
                  borderRadius: '50%'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSoundOn ? 'pause' : 'play'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {isSoundOn ? (
                      <Pause size={14} color="#EDEDE9" fill="#EDEDE9" strokeWidth={2} />
                    ) : (
                      <Play size={14} color="#EDEDE9" fill="#EDEDE9" strokeWidth={2} style={{ marginLeft: '2px' }} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </motion.div>

          {/* Right Side - Portfolio Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-right"
          >
            <div className="leading-tight">
                             <p className="block text-lg sm:text-xl font-bold text-[#1A1A1A]">Portfolio</p>
               <p className="block text-xs sm:text-sm text-[#4E4E4E] font-regular">Yusuf Gülmez</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
