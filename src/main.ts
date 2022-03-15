/*
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2022-03-15 18:10:19
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/main.ts
 * @Description:
 */
import { createApp } from "vue";
import "virtual:windi.css";
import svgIcon from "@/components/svg-icon/index.vue";
import pagination from "@/components/pagination/index.vue";
import { pinia } from "@/store";
import { i18n } from "@/i18n";
import router from "@/router";
import App from "@/App.vue";

const app = createApp(App);
app.use(pinia).use(router).use(i18n).component("svg-icon", svgIcon).component("pagination", pagination).mount("#app");
