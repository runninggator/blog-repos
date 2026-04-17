import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(() => {
  return {
    plugins: [vue()],
    root: "src",
    build: {
      outDir: "../built/public",
    },
  };
});
