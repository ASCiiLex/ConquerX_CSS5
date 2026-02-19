import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  root: ".",
  server: {
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ""
      }
    }
  },
  resolve: {
    alias: {
      "@": "/",
      "@sass": "/sass",
      "@js": "/js",
      "@img": "/img"
    }
  }
});