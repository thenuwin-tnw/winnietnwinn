// Site-wide details in one place: change them here and the header, home page, and tab titles follow.
export const SITE = {
  name: "Winnie TN Winn",
  url: "https://winnietnwinn.vercel.app", // change this if you get your own domain
  greeting: "Hi, I'm Winnie 👋",
  headline: "Just a place where I document my life.",
  intro: "Journaling, tech and gear, and everything in between. Pull up a chair ☕",
  youtubeUrl: "https://www.youtube.com/@winnietnwinn",
  email: "winnietnwinn.contact@gmail.com",
  photo: "/me-desk.jpg", // in public/; shown on the home and About heroes
  // Which part of the (landscape) photo shows in the square frame: 65% from the left keeps the face in view.
  photoPosition: "object-[65%_center]",
};

// Shared by the header and footer: add a page here and it shows up in both.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

// Used for Google results and link previews.
export const SITE_DESCRIPTION = `${SITE.headline} ${SITE.intro}`;

// Adding ?sub_confirmation=1 opens YouTube's "Subscribe?" prompt right away.
export const SUBSCRIBE_URL = `${SITE.youtubeUrl}?sub_confirmation=1`;
