import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
  ? '/OpenEO-processes-js'
  : '/',
  plugins: [vue()],
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  build:{
    commonjsOptions: {
      esmExternals: true 
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
