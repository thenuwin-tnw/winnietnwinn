import type { VideoInput } from "@/lib/videos";

// Your YouTube videos. Add one entry per video, in any order (the page sorts by date).
// `youtube` takes the video link or ID.
// `categories` can use: life, journaling, tech, gear, productivity (VS Code autocompletes them).
// If a blog post has the same youtubeId, the video card links to it automatically.

export const videos: VideoInput[] = [
  {
    youtube: "https://youtu.be/Y8tBVgJ7VTY",
    title: "How I Reduced My Social Media Use by 95% in 2 Months (Without Deleting Any Apps)",
    description: "The small changes that cut my social media time without deleting a single app.",
    date: "2026-01-09",
    categories: ["productivity", "life"],
  },
  {
    youtube: "https://youtu.be/M2dTqmNA7D4",
    title: "My A6 Pocket Notebook Journal System - Life Tracker",
    description: "How I use a pocket-sized A6 notebook to journal and keep track of my life.",
    date: "2025-12-26",
    categories: ["journaling", "productivity"],
    featured: true,
  },
  {
    youtube: "https://youtu.be/gnoLRKpCQiI",
    title: "Journaling didn't work for years until I switched to a pocket notebook",
    description: "Why journaling never stuck for me, and what changed when I went small.",
    date: "2025-12-09",
    categories: ["journaling"],
    featured: true,
  },
  {
    youtube: "https://youtu.be/Y5wYRET6VPc",
    title: "The Productivity Tool for Mac I Didn’t Know I Needed — FIFINE D6 Stream Controller",
    description: "Using a stream controller as a shortcut deck to speed up everyday work on my Mac.",
    date: "2025-11-30",
    categories: ["gear", "productivity"],
  },
  {
    youtube: "https://youtu.be/AUuz8qHMkl4",
    title: "Upgrading My Office Silent Keyboard After 2 Years | AKKO Fairy Switch",
    description: "Swapping in quieter AKKO Fairy switches on the keyboard I use at the office.",
    date: "2025-11-09",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/mf9fic5My_A",
    title: "I Finally Replaced My Desk Lamp with a Quntis Monitor Light Bar | Quntis RGB Pro+ Monitor Light bar",
    description: "Trading my desk lamp for a monitor light bar, and how it changed my setup.",
    date: "2025-10-13",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/mRpxF2ip5BI",
    title: "dbrand Dark Circuit MacBook Skin | 6-Months Review",
    description: "How the dbrand Dark Circuit skin on my MacBook held up after six months.",
    date: "2025-09-21",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/u1lhkT9mIGw",
    title: "Desk Setup Tour in a Tiny Rented Room in Singapore | Frontend Developer Edition",
    description: "A tour of my frontend developer desk setup in a small rented room.",
    date: "2025-09-05",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/5WTDw9HL2Sg",
    title: "Desk Setup Makeover | Dual Monitor to Ultra Wide Monitor Setup | Cable Management",
    description: "Going from two monitors to one ultrawide, plus tidying up the cables.",
    date: "2025-07-05",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/n_Y_uq2iKcs",
    title: "Keychron K2 Sound Test | AKKO V3 Cream Blue Pro Switch | What Grey Keycap",
    description: "A sound test of my Keychron K2 with AKKO Cream Blue Pro switches.",
    date: "2025-03-28",
    categories: ["gear"],
  },
  {
    youtube: "https://youtu.be/sZSVOzGMFiw",
    title: "dbrand MacBook Pro 16\" Skin - Dark Circuit | Installation and First Impression",
    description: "Installing the dbrand Dark Circuit skin on my 16-inch MacBook Pro.",
    date: "2025-03-27",
    categories: ["gear"],
  },
];
