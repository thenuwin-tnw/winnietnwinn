// Site-wide details in one place: change them here and the header, home page, and tab titles follow.
export const SITE = {
  name: "Winnie TN Winn",
  greeting: "Hi, I'm Winnie 👋",
  headline: "Just a place where I document my life.",
  intro: "Journaling, tech and gear, and everything in between. Pull up a chair ☕",
  youtubeUrl: "https://www.youtube.com/@winnietnwinn",
};

// Used for Google results and link previews.
export const SITE_DESCRIPTION = `${SITE.headline} ${SITE.intro}`;

// Adding ?sub_confirmation=1 opens YouTube's "Subscribe?" prompt right away.
export const SUBSCRIBE_URL = `${SITE.youtubeUrl}?sub_confirmation=1`;
