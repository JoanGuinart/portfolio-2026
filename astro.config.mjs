// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // astro preferences disable devToolbar:
  devToolbar: {
    enabled: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "ca"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
