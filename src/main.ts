import { createApp } from "vue";
import "virtual:windi.css";
import "virtual:svg-icons-register";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/styles/scss/index.scss";
import svgIcon from "@/components/svgIcon/index.vue";
import pagination from "@/components/pagination/index.vue";
import { pinia } from "@/store";
import { i18n } from "@/i18n";
import router from "@/router";
import App from "@/App.vue";

const app = createApp(App);
app.use(pinia).use(router).use(i18n).component("svg-icon", svgIcon).component("pagination", pagination).use(ElementPlus).mount("#app");
