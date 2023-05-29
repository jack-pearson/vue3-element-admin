import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
// 这两个是 element-plus 按需导入(自动导入)的插件
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";
import { svgBuilder } from "./src/plugins/svgBuilder";

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  const { VITE_IGNORE_I18N_WARNING, VITE_PORT, VITE_AUTO_OPEN } = config;
  // 解决警告You are running the esm-bundler build of vue-i18n.
  const extraAlias: { "vue-i18n"?: string } = {};
  if (mode === "development" && !!VITE_IGNORE_I18N_WARNING) extraAlias["vue-i18n"] = "vue-i18n/dist/vue-i18n.cjs.js";
  return {
    base: "/vue3-element-admin/",
    plugins: [
      vue(),
      WindiCSS(),
      svgBuilder("./src/components/svg-icon/svg/"),
      // Components({ resolvers: [ElementPlusResolver()] })
    ],
    server: {
      host: "0.0.0.0",
      port: VITE_PORT as unknown as number,
      open: VITE_AUTO_OPEN,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
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
        ...extraAlias,
      },
    },
  };
});
