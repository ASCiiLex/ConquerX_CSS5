import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/ConquerX_CSS5/",

  root: ".",

  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),

        blog: resolve(__dirname, "pages/blog.html"),
        blog1: resolve(__dirname, "pages/blog/blog1.html"),
        blog2: resolve(__dirname, "pages/blog/blog2.html"),

        cursos: resolve(__dirname, "pages/cursos.html"),
        cursos1: resolve(__dirname, "pages/cursos/cursos1.html"),
        cursos2: resolve(__dirname, "pages/cursos/cursos2.html"),

        contacto: resolve(__dirname, "pages/contacto.html"),
        login: resolve(__dirname, "pages/login.html"),
        registro: resolve(__dirname, "pages/registro.html"),
        quienesSomos: resolve(__dirname, "pages/quienes-somos.html"),
        avisoLegal: resolve(__dirname, "pages/aviso-legal.html"),
      }
    }
  },

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
      "@": resolve(__dirname, "src"),
      "@sass": resolve(__dirname, "src/sass"),
      "@js": resolve(__dirname, "src"),
      "@img": resolve(__dirname, "src/assets/img")
    }
  }
});