/*
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2021-12-09 18:28:30
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/main.ts
 * @Description:
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import svgIcon from "components/svg-icon/index.vue";
import { store, key } from "./store";
import { i18n } from "./i18n/index";
import router from "./router";
import { ElComponentSize } from "./utils/theme";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import "./styles/scss/index.scss";
import "./styles/icon/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(router).use(ElementPlus, { i18n: i18n.global.t, size: ElComponentSize }).use(i18n).component("svg-icon", svgIcon).use(store, key).mount("#app");
