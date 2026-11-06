import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Optional long-form case study per project.
 * File name must match the project id in src/data/projects.json
 * (e.g. src/content/projects/barpass.md).
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    role: z.string().optional(),
  }),
});

export const collections = { projects };
