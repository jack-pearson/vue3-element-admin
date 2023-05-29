import { createApp } from "vue";
import "virtual:windi.css";
// 如果 是按需导入 需要注释掉下面这一行. css 尽量别注释.不然开发环境太难受
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/scss/index.scss";
import svgIcon from "@/components/svg-icon/index.vue";
import pagination from "@/components/pagination/index.vue";
import { pinia } from "@/store";
import { i18n } from "@/i18n";
import router from "@/router";
import App from "@/App.vue";

const app = createApp(App);
app.use(pinia).use(router).use(i18n).component("svg-icon", svgIcon).component("pagination", pagination).use(ElementPlus).mount("#app");
