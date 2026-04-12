import { defineConfig } from "vite";
import { resolve } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        parks: resolve(__dirname, "src/pages/parks/index.html"),
        near_me: resolve(__dirname, "src/pages/near_me/index.html"),
        favorites: resolve(__dirname, "src/pages/favorites/index.html"),
      },
    },
  },
});
