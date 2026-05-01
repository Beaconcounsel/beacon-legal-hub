// Auto-generated responsive image source sets for partner photos.
// Each entry exposes srcSet strings per format + a fallback `src`.

// --- Daniel Mutiganda (1:1) ---
import danielAvif320 from "./daniel-mutiganda-320.avif";
import danielAvif480 from "./daniel-mutiganda-480.avif";
import danielAvif640 from "./daniel-mutiganda-640.avif";
import danielAvif960 from "./daniel-mutiganda-960.avif";
import danielAvif1024 from "./daniel-mutiganda-1024.avif";
import danielWebp320 from "./daniel-mutiganda-320.webp";
import danielWebp480 from "./daniel-mutiganda-480.webp";
import danielWebp640 from "./daniel-mutiganda-640.webp";
import danielWebp960 from "./daniel-mutiganda-960.webp";
import danielWebp1024 from "./daniel-mutiganda-1024.webp";
import danielJpg320 from "./daniel-mutiganda-320.jpg";
import danielJpg480 from "./daniel-mutiganda-480.jpg";
import danielJpg640 from "./daniel-mutiganda-640.jpg";
import danielJpg960 from "./daniel-mutiganda-960.jpg";
import danielJpg1024 from "./daniel-mutiganda-1024.jpg";

// --- Moses Katusime ---
import mosesAvif320 from "./moses-katusime-320.avif";
import mosesAvif480 from "./moses-katusime-480.avif";
import mosesAvif640 from "./moses-katusime-640.avif";
import mosesAvif960 from "./moses-katusime-960.avif";
import mosesAvif1280 from "./moses-katusime-1280.avif";
import mosesWebp320 from "./moses-katusime-320.webp";
import mosesWebp480 from "./moses-katusime-480.webp";
import mosesWebp640 from "./moses-katusime-640.webp";
import mosesWebp960 from "./moses-katusime-960.webp";
import mosesWebp1280 from "./moses-katusime-1280.webp";
import mosesJpg320 from "./moses-katusime-320.jpg";
import mosesJpg480 from "./moses-katusime-480.jpg";
import mosesJpg640 from "./moses-katusime-640.jpg";
import mosesJpg960 from "./moses-katusime-960.jpg";
import mosesJpg1280 from "./moses-katusime-1280.jpg";

// --- Team hero (Daniel + Moses combined) ---
import teamAvif480 from "./team-hero-480.avif";
import teamAvif768 from "./team-hero-768.avif";
import teamAvif1024 from "./team-hero-1024.avif";
import teamAvif1280 from "./team-hero-1280.avif";
import teamAvif1600 from "./team-hero-1600.avif";
import teamWebp480 from "./team-hero-480.webp";
import teamWebp768 from "./team-hero-768.webp";
import teamWebp1024 from "./team-hero-1024.webp";
import teamWebp1280 from "./team-hero-1280.webp";
import teamWebp1600 from "./team-hero-1600.webp";
import teamJpg480 from "./team-hero-480.jpg";
import teamJpg768 from "./team-hero-768.jpg";
import teamJpg1024 from "./team-hero-1024.jpg";
import teamJpg1280 from "./team-hero-1280.jpg";
import teamJpg1600 from "./team-hero-1600.jpg";

const set = (entries: [string, number][]) =>
  entries.map(([url, w]) => `${url} ${w}w`).join(", ");

export const danielImage = {
  avif: set([[danielAvif320, 320], [danielAvif480, 480], [danielAvif640, 640], [danielAvif960, 960], [danielAvif1024, 1024]]),
  webp: set([[danielWebp320, 320], [danielWebp480, 480], [danielWebp640, 640], [danielWebp960, 960], [danielWebp1024, 1024]]),
  jpg:  set([[danielJpg320, 320],  [danielJpg480, 480],  [danielJpg640, 640],  [danielJpg960, 960],  [danielJpg1024, 1024]]),
  src: danielJpg1024,
  width: 1024,
  height: 1024,
};

export const mosesImage = {
  avif: set([[mosesAvif320, 320], [mosesAvif480, 480], [mosesAvif640, 640], [mosesAvif960, 960], [mosesAvif1280, 1280]]),
  webp: set([[mosesWebp320, 320], [mosesWebp480, 480], [mosesWebp640, 640], [mosesWebp960, 960], [mosesWebp1280, 1280]]),
  jpg:  set([[mosesJpg320, 320],  [mosesJpg480, 480],  [mosesJpg640, 640],  [mosesJpg960, 960],  [mosesJpg1280, 1280]]),
  src: mosesJpg1280,
  width: 1578,
  height: 1973,
};

export const teamHeroImage = {
  avif: set([[teamAvif480, 480], [teamAvif768, 768], [teamAvif1024, 1024], [teamAvif1280, 1280], [teamAvif1600, 1600]]),
  webp: set([[teamWebp480, 480], [teamWebp768, 768], [teamWebp1024, 1024], [teamWebp1280, 1280], [teamWebp1600, 1600]]),
  jpg:  set([[teamJpg480, 480],  [teamJpg768, 768],  [teamJpg1024, 1024],  [teamJpg1280, 1280],  [teamJpg1600, 1600]]),
  src: teamJpg1280,
  width: 1920,
  height: 1080,
};

export type ResponsiveImageSource = typeof danielImage;