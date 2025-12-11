'use client';

import { lazy, Suspense } from 'react';
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
  return (
    <>
      <PageTransition />
      {/* PageTransition overlay üstteyken içerik arkaplanda yüklenir, hazır bekler */}
      <Suspense fallback={<SectionLoader />}>
        <DesignEveryThinkSection />
        <HeroSection />
        <TechLogosSection />
        <CategoriesSection />
        <PersonalCreativesSection />
        <ContactMeSection />
      </Suspense>
    </>
  );
}
