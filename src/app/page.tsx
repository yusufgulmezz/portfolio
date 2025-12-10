'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import PageTransition from "@/components/ui/PageTransition";

// Lazy load tüm section'lar - PageTransition bitene kadar yüklenmesin
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
  const [shouldLoadSections, setShouldLoadSections] = useState(false);

  useEffect(() => {
    const onTransitionDone = () => {
      // PageTransition bittiğinde section'ları yükle
      setShouldLoadSections(true);
    };

    window.addEventListener('page-transition:done', onTransitionDone as EventListener);
    
    // Eğer event zaten tetiklenmişse (sayfa yeniden yüklendiğinde)
    // Hemen yükle
    if (document.readyState === 'complete') {
      // Biraz bekle, transition'ın başlaması için
      const timer = setTimeout(() => {
        setShouldLoadSections(true);
      }, 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('page-transition:done', onTransitionDone as EventListener);
      };
    }

    return () => {
      window.removeEventListener('page-transition:done', onTransitionDone as EventListener);
    };
  }, []);

  return (
    <>
      <PageTransition />
      {shouldLoadSections && (
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
