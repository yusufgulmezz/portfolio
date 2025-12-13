'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import BlobCursor from './BlobCursor';

// MetaBalls'ı lazy load et
const MetaBalls = lazy(() => import('./MetaBalls'));

const PageTransitionNew = () => {
  const [isVisible, setIsVisible] = useState(true);
  const startEventFired = useRef(false);

  // Transition başladığında event yayınla
  useEffect(() => {
    if (!startEventFired.current) {
      startEventFired.current = true;
      try {
        const evt = new CustomEvent('page-transition:start');
        window.dispatchEvent(evt);
      } catch {}
    }
  }, []);

  // Bir süre sonra sayfayı kapat
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Page transition tamamen bittiğinde global olay yayınla
      try {
        const evt = new CustomEvent('page-transition:done');
        window.dispatchEvent(evt);
      } catch {}
    }, 5000); // 3 saniye sonra sayfa kapanacak

    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <>
      {/* BlobCursor - PageTransitionNew için özel renk */}
      {isVisible && (
        <BlobCursor
          blobType="circle"
          fillColor="#edede9"
          trailCount={3}
          sizes={[36, 8, 20]}
          innerSizes={[10, 18]}
          innerColor="rgba(26, 26, 26, 0.8)"
          opacities={[0.25, 0.25]}
          shadowColor="rgba(0, 0, 0, 0.25)"
          shadowBlur={5}
          shadowOffsetX={0}
          shadowOffsetY={0}
          filterStdDeviation={1}
          useFilter={false}
          fastDuration={0.03}
          slowDuration={0.08}
          borderColor="#1A1A1A"
          borderWidth={1}
          zIndex={10000}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center"
          >
            {/* MetaBalls Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="w-full max-w-4xl h-56 sm:h-68 md:h-80 lg:h-88">
                <Suspense fallback={null}>
                  <MetaBalls
                    color="#1A1A1A"
                    cursorBallColor="#edede9"
                    cursorBallSize={3}
                    ballCount={20}
                    animationSize={35}
                    enableMouseInteraction={true}
                    enableTransparency={true}
                    hoverSmoothness={0.08}
                    clumpFactor={1}
                    speed={0.7}
                    className="opacity"
                  />
                </Suspense>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransitionNew;

