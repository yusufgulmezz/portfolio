'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const TypewriterTransitionText = ({ onComplete }: { onComplete: () => void }) => {
  const roles = ['UI/UX', 'Poster', 'Pixel Art', '3D', 'Coding'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Eğer tüm roller tamamlandıysa, başka bir şey yapma
    if (isCompleted) return;

    const currentText = roles[currentRoleIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing effect
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 60);
      } else {
        // Yazma tamamlandı, 1 saniye bekle sonra silmeye başla
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 750);
      }
    } else {
      // Deleting effect
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
      } else {
        // Silme tamamlandı, sonraki role geç
        setIsDeleting(false);
        if (currentRoleIndex < roles.length - 1) {
          setCurrentRoleIndex((prevIndex) => prevIndex + 1);
        } else {
          // Son role (Coding) tamamen silindi, işlemi tamamla
          setIsCompleted(true);
          setTimeout(() => {
            onComplete();
          }, 100);
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, currentRoleIndex, roles, onComplete, isCompleted]);

  return (
    <div className="flex items-center justify-center">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-none"
        style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}
      >
        {displayedText}
      </motion.h1>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
        className="inline-block w-1 bg-red-500 ml-2 h-8 sm:h-10 md:h-12 lg:h-14"
        style={{ 
          marginLeft: '8px',
        }}
      />
    </div>
  );
};

const TypewriterDesignEveryThink = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const finalText = "Design Every Think";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (displayedText.length < finalText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(finalText.slice(0, displayedText.length + 1));
      }, 60);
    } else {
      setIsComplete(true);
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, finalText]);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-none">
        <span style={{ fontFamily: 'var(--font-roboto)', letterSpacing: '-0.0226em' }}>
          {displayedText}
        </span>
      </h1>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
          className="inline-block w-1 bg-red-500 ml-2 h-8 sm:h-10 md:h-12 lg:h-14"
          style={{ 
            marginLeft: '8px',
          }}
        />
      )}
    </div>
  );
};

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showEveryThink, setShowEveryThink] = useState(false);

  const handleTypewriterComplete = () => {
    setShowEveryThink(true);
  };

  useEffect(() => {
    if (showEveryThink) {
      // DesignEveryThink yazıldıktan sonra sayfayı kapat
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        // Page transition tamamen bittiğinde global olay yayınla
        try {
          const evt = new CustomEvent('page-transition:done');
          window.dispatchEvent(evt);
        } catch {}
      }, 2000); // DesignEveryThink yazıldıktan 3 saniye sonra

      return () => clearTimeout(hideTimer);
    }
  }, [showEveryThink]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >

          {/* Main content */}
          <div className="relative text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
            {/* Typewriter texts and final Design Every Think */}
            <div className="mb-6 sm:mb-8">
              <div className="h-[1.2em] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!showEveryThink && (
                    <motion.div
                      key="typewriter"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <TypewriterTransitionText onComplete={handleTypewriterComplete} />
                    </motion.div>
                  )}
                  {showEveryThink && (
                    <motion.div
                      key="everythink"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center justify-center"
                    >
                      <TypewriterDesignEveryThink />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Corner accents */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/30"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/30"
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;