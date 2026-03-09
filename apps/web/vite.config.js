import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
