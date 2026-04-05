import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        parks: resolve(__dirname, 'src/pages/parks/index.html'),
        activities: resolve(__dirname, 'src/pages/activities/index.html'),
        trips: resolve(__dirname, 'src/pages/trips/index.html'),
      },
    },
  },
});
