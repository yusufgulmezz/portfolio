import DesignEveryThinkSection from "@/components/sections/DesignEveryThinkSection";
import HeroSection from "@/components/sections/HeroSection";
import TechLogosSection from "@/components/sections/TechLogosSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
// import CreativeProcessSection from "@/components/sections/CreativeProcessSection";
import PersonalCreativesSection from "@/components/sections/PersonalCreativesSection";
import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <>
      <PageTransition />
      <DesignEveryThinkSection />
      <HeroSection />
      <TechLogosSection />
      <CategoriesSection />
      {/* <CreativeProcessSection /> */}
      <PersonalCreativesSection />
    </>
  );
}
