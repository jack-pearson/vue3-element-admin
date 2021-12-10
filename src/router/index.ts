/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2021-12-10 17:57:13
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// const NotFoundComponent = { template: "<p>Page not found</p>" };
import Login from "views/login/index.vue";
import Home from "views/home/index.vue";
import Layout from "@/layout/index.vue";
import Menu from "views/system/menu/index.vue";
import User from "views/system/user/index.vue";
const routers: Array<RouteRecordRaw> = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/",
    name: "/",
    redirect: "/home",
    component: Layout,
    children: [
      { path: "/home", name: "home", component: Home, meta: { title: "message.router.home", icon: "home" } },
      { path: "/menu", name: "menu", component: Menu, meta: { title: "message.router.menu", icon: "menu" } },
      { path: "/user", name: "user", component: Menu, meta: { title: "message.router.user", icon: "user" } },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});
export default router;
