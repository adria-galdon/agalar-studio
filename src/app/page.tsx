import { Hero } from "@/components/Hero";
import { GamesGrid } from "@/components/GamesGrid";
import { NexusDemo } from "@/components/NexusDemo";
import { Roadmap } from "@/components/Roadmap";
import { StudioSection } from "@/components/StudioSection";
import { NotifyBand } from "@/components/NotifyBand";

export default function Home() {
  return (
    <>
      <Hero />
      <GamesGrid />
      <NexusDemo />
      <Roadmap />
      <StudioSection />
      <NotifyBand />
    </>
  );
}
