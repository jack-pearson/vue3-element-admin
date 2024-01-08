import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from  'tailwindcss';

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  const { VITE_IGNORE_I18N_WARNING, VITE_PORT, VITE_AUTO_OPEN } = config;
  // 解决警告You are running the esm-bundler build of vue-i18n.
  const extraAlias: { "vue-i18n"?: string } = {};
  if (mode === "development" && !!VITE_IGNORE_I18N_WARNING) extraAlias["vue-i18n"] = "vue-i18n/dist/vue-i18n.cjs.js";
  return {
    plugins: [
      vue(),
      
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")], // 与本地储存地址一致
        // 指定symbolId格式
        symbolId: "icon-[name]",
      }),
    ],
    optimizeDeps: {
      include: ['element-plus']
    },
    server: {
      host: "0.0.0.0",
      port: VITE_PORT as unknown as number,
      open: VITE_AUTO_OPEN,
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss, 
        ]
      },
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
