import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "prioritize-entry-assets",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          let updatedHtml = html.replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            '<link rel="preload" as="style" href="$1" crossorigin><link rel="stylesheet" crossorigin href="$1" fetchpriority="high">'
          );

          updatedHtml = updatedHtml.replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/,
            '<link rel="preload" as="script" href="$1" crossorigin><script type="module" crossorigin src="$1"></script>'
          );

          updatedHtml = updatedHtml.replace(
            /\n\s*<link rel="modulepreload" crossorigin href="\/assets\/(?:antd|motion|editor)-[^"]+">/g,
            ""
          );

          return updatedHtml;
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-quill")) return "editor";
          if (id.includes("node_modules/antd") || id.includes("node_modules/@ant-design")) return "antd";
          if (id.includes("node_modules/motion")) return "motion";
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/@tanstack")
          ) {
            return "react-vendor";
          }
        }
      }
    }
  }
});
