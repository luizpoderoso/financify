import { HeroSection } from "./_components/HeroSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { FinalCTASection } from "./_components/FinalCTASection";
import { LandingFooter } from "./_components/LandingFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
