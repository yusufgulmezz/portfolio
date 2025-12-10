'use client';

import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import PageTransition from "@/components/ui/PageTransition";

// Lazy load tüm section'lar
const DesignEveryThinkSection = lazy(() => import("@/components/sections/DesignEveryThinkSection"));
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const TechLogosSection = lazy(() => import("@/components/sections/TechLogosSection"));
const CategoriesSection = lazy(() => import("@/components/sections/CategoriesSection"));
const PersonalCreativesSection = lazy(() => import("@/components/sections/PersonalCreativesSection"));
const ContactMeSection = lazy(() => import("@/components/sections/ContactMeSection"));

// Loading fallback
const SectionLoader = () => (
  <div className="min-h-screen bg-[#edede9]" />
);

export default function Home() {
  const [shouldRenderSections, setShouldRenderSections] = useState(false);
  const [shouldPreloadSections, setShouldPreloadSections] = useState(false);
  const transitionDoneRef = useRef(false);

  useEffect(() => {
    const onTransitionDone = () => {
      transitionDoneRef.current = true;
      // Transition bittiğinde section'ları render et
      setShouldRenderSections(true);
    };

    // Transition başladığında section'ları preload et (yükle ama render etme)
    const onTransitionStart = () => {
      setShouldPreloadSections(true);
    };

    window.addEventListener('page-transition:done', onTransitionDone as EventListener);
    window.addEventListener('page-transition:start', onTransitionStart as EventListener);
    
    // Sayfa yüklendiğinde hemen preload başlat
    if (document.readyState === 'complete') {
      setShouldPreloadSections(true);
      // Eğer transition event'i gelmezse, 4 saniye sonra render et (fallback)
      const fallbackTimer = setTimeout(() => {
        if (!transitionDoneRef.current) {
          setShouldRenderSections(true);
        }
      }, 4000);
      
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener('page-transition:done', onTransitionDone as EventListener);
        window.removeEventListener('page-transition:start', onTransitionStart as EventListener);
      };
    }

    return () => {
      window.removeEventListener('page-transition:done', onTransitionDone as EventListener);
      window.removeEventListener('page-transition:start', onTransitionStart as EventListener);
    };
  }, []);

  return (
    <>
      <PageTransition />
      {/* Preload: Transition başladığında yükle ama render etme - görünmez */}
      {shouldPreloadSections && !shouldRenderSections && (
        <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden' }}>
          <Suspense fallback={null}>
            <DesignEveryThinkSection />
            <HeroSection />
            <TechLogosSection />
            <CategoriesSection />
            <PersonalCreativesSection />
            <ContactMeSection />
          </Suspense>
        </div>
      )}
      {/* Render: Transition bittiğinde göster */}
      {shouldRenderSections && (
        <Suspense fallback={<SectionLoader />}>
          <DesignEveryThinkSection />
          <HeroSection />
          <TechLogosSection />
          <CategoriesSection />
          <PersonalCreativesSection />
          <ContactMeSection />
        </Suspense>
      )}
    </>
  );
}
