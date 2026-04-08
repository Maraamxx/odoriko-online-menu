import { MarketingShell } from "@/components/landing/MarketingShell";
import { StoryHero } from "@/components/story/StoryHero";
import { OriginSection } from "@/components/story/OriginSection";
import { FullBleedImage } from "@/components/story/FullBleedImage";
import { TimelineSection } from "@/components/story/TimelineSection";
import { GallerySection } from "@/components/story/GallerySection";
import { NumbersStrip } from "@/components/story/NumbersStrip";
import { ValuesSection } from "@/components/story/ValuesSection";
import { StoryCTA } from "@/components/story/StoryCTA";

export default function OurStoryPage() {
  return (
    <MarketingShell>
      <StoryHero />
      <OriginSection />
      <FullBleedImage />
      <TimelineSection />
      <GallerySection />
      <NumbersStrip />
      <ValuesSection />
      <StoryCTA />
    </MarketingShell>
  );
}
