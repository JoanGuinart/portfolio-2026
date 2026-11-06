/**
 * Utility functions and constants for project display
 */

export interface ProjectImage {
  src: string;
  srcset: string;
}

export const TECH_DISPLAY_LIMIT = 4;

export const projectPath = (id: string) => `/projects/${id}`;

/**
 * Shared copy for groups of projects that don't have their own
 * case study in src/content/projects/{id}.md
 */
interface ProjectCategory {
  label: string;
  role: string;
  paragraphs: string[];
}

const CATEGORIES: Record<string, ProjectCategory> = {
  ara: {
    label: "Branded content · Diari ARA",
    role: "Frontend developer · built from scratch",
    paragraphs: [
      "Interactive branded content published by Diari ARA. Each piece is a website built from scratch for a specific brand or institution, tailored to what the client asked for.",
      "I turned a custom Figma design into a fully responsive site with a strong focus on animation and scroll-driven storytelling, so the content feels like an experience rather than a static article.",
    ],
  },
  "ai-lab": {
    label: "Personal project · AI",
    role: "Personal project",
    paragraphs: [
      "A personal project to practise integrating AI into a real product. Instead of being a simple chatbot wrapper, the AI is part of the logic and makes decisions inside the app.",
    ],
  },
  "practice-saas": {
    label: "Personal project · SaaS",
    role: "Personal project",
    paragraphs: [
      "A full-stack SaaS built to practise the complete product cycle: authentication, database design, team workspaces and a clean task-management experience inspired by tools like Jira and Linear.",
    ],
  },
};

export const getProjectCategory = (project: {
  id: string;
  demoUrl?: string;
}): ProjectCategory | undefined => {
  if (["chef-assist-ai", "rps-pattern-ai-game"].includes(project.id))
    return CATEGORIES["ai-lab"];
  if (project.id === "task-flow") return CATEGORIES["practice-saas"];
  const host = project.demoUrl ? new URL(project.demoUrl).hostname : "";
  if (host === "ara.cat" || host.endsWith(".ara.cat")) return CATEGORIES.ara;
  // ARA projects hosted on the client's own domain
  if (["memoria-interactiva-2023", "presentacio-cccb"].includes(project.id))
    return CATEGORIES.ara;
  return undefined;
};

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
