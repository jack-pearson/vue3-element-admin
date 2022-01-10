/*
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2022-01-10 17:12:51
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/main.ts
 * @Description:
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import svgIcon from "@/components/svg-icon/index.vue";
import { pinia } from "@/store";
import { i18n } from "@/i18n";
import router from "@/router";
import App from "@/App.vue";

const app = createApp(App);
app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).component("svg-icon", svgIcon).mount("#app");
