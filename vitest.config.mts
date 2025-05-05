import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts', 'vitest.cleanup-after-each.ts'],
    exclude: [...configDefaults.exclude, '**/integration/**', '**/*.spec.ts'], // add your playwright folder/patterns here
  },
});
