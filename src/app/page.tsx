'use client';

import PageTransition from "@/components/ui/PageTransition";
import DesignEveryThinkSection from "@/components/sections/DesignEveryThinkSection";
import HeroSection from "@/components/sections/HeroSection";
import TechLogosSection from "@/components/sections/TechLogosSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import PersonalCreativesSection from "@/components/sections/PersonalCreativesSection";
import ContactMeSection from "@/components/sections/ContactMeSection";

export default function Home() {
  return (
    <>
      <PageTransition />
      {/* GH Pages için: lazy kaldırıldı, içerik hemen yükleniyor */}
      <DesignEveryThinkSection />
      <HeroSection />
      <TechLogosSection />
      <CategoriesSection />
      <PersonalCreativesSection />
      <ContactMeSection />
    </>
  );
}
