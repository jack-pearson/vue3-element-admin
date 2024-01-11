import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import '@/styles/scss/index.scss'
import '@/styles/tailwind/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import svgIcon from '@/components/svgIcon/index.vue'
import pagination from '@/components/pagination/index.vue'
import tableUtils from '@/components/tableUtils/index.vue'
import { pinia } from '@/store'
import { i18n } from '@/i18n'
import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)
app.use(pinia).use(router).use(i18n).component('svg-icon', svgIcon).component('table-utils', tableUtils).component('pagination', pagination).use(ElementPlus).mount('#app')
