import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://onedragon-anyone.github.io",
  base: process.env.PUBLIC_BASE_PATH ?? "/plugin-data",
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    })
  ],
  vite: {
    define: {
      "import.meta.env.PUBLIC_GITHUB_OWNER": JSON.stringify(process.env.PUBLIC_GITHUB_OWNER ?? "OneDragon-Anyone"),
      "import.meta.env.PUBLIC_GITHUB_REPO": JSON.stringify(process.env.PUBLIC_GITHUB_REPO ?? "plugin-data"),
      "import.meta.env.PUBLIC_BASE_PATH": JSON.stringify(process.env.PUBLIC_BASE_PATH ?? "/plugin-data")
    }
  }
});
