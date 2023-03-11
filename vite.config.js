import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    assetsDir: "assets",
    outDir: "dist",
    publicPath: "/",
  },
  plugins: [vue()],
})
