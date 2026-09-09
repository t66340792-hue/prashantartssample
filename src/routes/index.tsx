import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { MusicToggle } from "@/components/MusicToggle";
import { GlobalPetals } from "@/components/GlobalPetals";

import { SectionOneIntro } from "@/components/sections/SectionOneIntro";
import { SectionTwoStory } from "@/components/sections/SectionTwoStory";
import { SectionFiveEvents } from "@/components/sections/SectionFiveEvents";
import { SectionSixHaldi } from "@/components/sections/SectionSixHaldi";
import { SectionSevenSangeet } from "@/components/sections/SectionSevenSangeet";
import { SectionBaraatTransition } from "@/components/sections/SectionBaraatTransition";
import { SectionEightBaraat } from "@/components/sections/SectionEightBaraat";
import { SectionRSVP } from "@/components/sections/SectionRSVP";
import { SectionNineVenue } from "@/components/sections/SectionNineVenue";
import { SectionTenThankYou } from "@/components/sections/SectionTenThankYou";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative w-full bg-ivory font-body text-ink overflow-x-hidden selection:bg-gold/30 selection:text-plum">
      <Navigation />
      <MusicToggle />
      <GlobalPetals />
      
      <main>
        <SectionOneIntro />
        <SectionTwoStory />
        <SectionFiveEvents />
        <SectionSixHaldi />
        <SectionSevenSangeet />
        <SectionBaraatTransition />
        <SectionEightBaraat />
        <SectionRSVP />
        <SectionNineVenue />
        <SectionTenThankYou />
      </main>
    </div>
  );
}
