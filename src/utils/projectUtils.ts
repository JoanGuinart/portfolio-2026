/**
 * Utility functions and constants for project display
 */

export interface ProjectImage {
  src: string;
  srcset: string;
}

export const TECH_DISPLAY_LIMIT = 4;

export const buildImageSources = (image: string): ProjectImage => {
  const base = image.replace(".webp", "");
  return {
    src: `/images/projects/${base}-450.webp`,
    srcset: `/images/projects/${base}-450.webp 450w, /images/projects/${base}-900.webp 900w`,
  };
};

export const getTechToDisplay = (technologies: string[]) => {
  return {
    displayed: technologies.slice(0, TECH_DISPLAY_LIMIT),
    remaining: Math.max(0, technologies.length - TECH_DISPLAY_LIMIT),
  };
};

export const CSS_CLASSES = {
  buttons: {
    mobileInfo: "lg:hidden absolute bottom-4 right-4 bg-black text-white px-2 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-gray-800 transition z-20 cursor-pointer",
    mobileBack: "lg:hidden bg-white text-black px-4 py-2 border border-black rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-gray-200 transition",
    mobileLink: "lg:hidden bg-yellow-400 text-black px-4 py-2 border border-yellow-500 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-yellow-500 transition",
  },
  techTags: {
    mobile: "text-xs bg-white/25 backdrop-blur px-2 py-1 rounded-full text-white",
    desktop: "text-xs bg-white/15 backdrop-blur px-2 py-1 rounded-full text-white",
  },
};
