/*
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2021-12-15 13:31:08
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/vite.config.ts
 * @Description:
 */
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import { svgBuilder } from "./src/plugins/svgBuilder";
import { loadEnv } from "./src/utils/viteBuild";

const { VITE_PORT, VITE_AUTO_OPEN } = loadEnv();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS(), svgBuilder("./src/components/svg-icon/svg/")],
  server: {
    host: "0.0.0.0",
    port: VITE_PORT,
    open: VITE_AUTO_OPEN,
    // proxy: {
    // "/api": {
    //   target: VITE_API_BASE_URL,
    //   changeOrigin: true,
    //   rewrite: path => {
    //     console.log(path, "path");
    //     return path.replace(/^\/api/, "");
    //   },
    // },
    // },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      api: path.resolve(__dirname, "src/apis"),
      request: path.resolve(__dirname, "src/utils/request"),
      i18n: path.resolve(__dirname, "src/i18n"),
      store: path.resolve(__dirname, "src/store"),
      types: path.resolve(__dirname, "src/types"),
      views: path.resolve(__dirname, "src/views"),
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      interface: path.resolve(__dirname, "src/interface"),
    },
  },
});
