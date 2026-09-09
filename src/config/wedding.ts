import poster1 from "@/assets/poster-1.jpg.asset.json";
import poster3 from "@/assets/poster-3.jpg.asset.json";
import poster4 from "@/assets/poster-4.jpg.asset.json";
import poster5 from "@/assets/poster-5.jpg.asset.json";
import poster6 from "@/assets/poster-6.jpg.asset.json";

/** ── EDIT EVERYTHING ABOUT THE WEDDING HERE ─────────────────────────── */

export const weddingDate = "2026-07-15T00:00:00";

export type Clip = { src: string; poster: string } | null;

export const weddingData = {
  groom: "Bhunesh",
  bride: "Sonali",
  groomParents: "Son of Mrs. Daksha Ganatra & Mr. Rajesh Ganatra",
  brideParents: "Daughter of Late Reena Mehta & Mr. Snil Mehta",
  weddingDate,
  displayDate: "15 JULY 2026",
  venue: "Dnyan Deva Mangalam",
  location: "Akola Road, Akot, Maharashtra",
  /** Paste the Google Maps link here to activate the "View Location" button. */
  mapUrl: "",
  /** Drop a file at public/wedding-music.mp3 to enable the music toggle. */
  musicUrl: "/wedding-music.mp3",
  events: [
    {
      id: "haldi",
      title: "Haldi Carnival",
      date: "15 July 2026",
      time: "11:00 AM",
      note: "Followed by Lunch",
      tone: "mint" as const,
    },
    {
      id: "sangeet",
      title: "Sangeet Garba Night",
      date: "15 July 2026",
      time: "7:00 PM",
      note: "Followed by Dinner",
      tone: "rani" as const,
    },
    {
      id: "baraat",
      title: "Baraat",
      date: "16 July 2026",
      time: "9:30 AM onwards",
      note: "Bhunesh Ki Baraat",
      tone: "gold" as const,
    },
    {
      id: "hastmelap",
      title: "Hast Melap",
      date: "16 July 2026",
      time: "12:32 PM",
      note: "Followed by Lunch",
      tone: "plum" as const,
    },
  ],
};

/**
 * Wedding films, used in strict sequence.
 * video-2 was not supplied — drop it in and set `two` to enable that section's film.
 */
export const clips: Record<"one" | "two" | "three" | "four" | "five" | "six", Clip> = {
  one: { src: "/1.mp4", poster: "" },
  two: { src: "/2.mp4", poster: "" },
  three: { src: "/3.mp4", poster: "" },
  four: { src: "/4.mp4", poster: "" },
  five: { src: "/5.mp4", poster: "" },
  six: { src: "/6.mp4", poster: "" },
};

export const navSections = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "date", label: "Date" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
];
