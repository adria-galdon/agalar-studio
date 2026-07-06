import { Hero } from "@/components/Hero";
import { NexusDemo } from "@/components/NexusDemo";
import { GamesGrid } from "@/components/GamesGrid";
import { Roadmap } from "@/components/Roadmap";
import { StudioSection } from "@/components/StudioSection";
import { NotifyBand } from "@/components/NotifyBand";

export default function Home() {
  return (
    <>
      <Hero />
      <NexusDemo />
      <GamesGrid />
      <StudioSection />
      <Roadmap />
      <NotifyBand />
    </>
  );
}
