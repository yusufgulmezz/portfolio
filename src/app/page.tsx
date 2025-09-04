import DesignEveryThinkSection from "@/components/sections/DesignEveryThinkSection";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <>
      <PageTransition />
      <DesignEveryThinkSection />
      <HeroSection />
      <CategoriesSection />
    </>
  );
}
