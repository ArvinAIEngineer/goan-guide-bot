import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Only add componentTagger in development mode if available
  if (mode === 'development') {
    try {
      const { componentTagger } = require('lovable-tagger');
      plugins.push(componentTagger());
    } catch (e) {
      // lovable-tagger not available, continue without it
      console.log('lovable-tagger not found, continuing without component tagging');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
