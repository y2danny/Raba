import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/zerion": {
        target: "https://api.zerion.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zerion/, ""),
        headers: () => {
          const basic = process.env.VITE_ZERION_BASIC_TOKEN;
          const auth = basic ? `Basic ${basic.replace(/^Basic\s+/i, "")}` : undefined;
          return auth ? { authorization: auth, accept: "application/json" } : { accept: "application/json" };
        },
      },
    },
  },
}));
