import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { FeaturedDishes } from "@/components/landing/FeaturedDishes";
import { CraftSection } from "@/components/landing/CraftSection";
import { CategoryTiles } from "@/components/landing/CategoryTiles";
import { BannerCTA } from "@/components/landing/BannerCTA";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <PhilosophySection />
      <FeaturedDishes />
      <CraftSection />
      <CategoryTiles />
      <BannerCTA />
    </>
  );
}
