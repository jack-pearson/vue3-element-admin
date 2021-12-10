/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2021-12-07 20:37:00
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
// const NotFoundComponent = { template: "<p>Page not found</p>" };
import Login from "views/login/index.vue";
import Home from "views/home/index.vue";
import Layout from "@/layout/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: Login },
    {
      path: "/",
      redirect: "/home",
      component: Layout,
      children: [{ path: "/home", name: "home", component: Home }],
    },
  ],
});
export default router;
