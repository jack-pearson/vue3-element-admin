/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2021-12-14 17:56:58
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { store } from "@/store/index";
import "nprogress/nprogress.css";
// const NotFoundComponent = { template: "<p>Page not found</p>" };
import Login from "views/login/index.vue";
import Layout from "@/layout/index.vue";
import Home from "@/views/home/index.vue";
export const constantRouters: Array<RouteRecordRaw> = [{ path: "/login", name: "login", component: Login }];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouters,
});
router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  if (to.path === "/login") {
    next();
    NProgress.done();
  } else {
    const token = localStorage.getItem("token");
    if (!token) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
      NProgress.done();
    } else {
      const { routerList } = store.state.router;
      console.log(Array.isArray(routerList), routerList, "routerList");
      if (routerList.length === 0) {
        const newRouter = await store.dispatch("router/GET_ROUTER");
        console.log(321);
        await router.addRoute({
          path: "/",
          name: "/",
          redirect: { name: "system" },
          component: Layout,
          children: newRouter,
        });
        console.log(router.getRoutes(), router.options, "router.getRoutes()");
        next({ ...to, replace: true });
      } else {
        console.log(router.getRoutes(), router.options, "router.getRoutes()");
        await next();
      }
    }
  }
});

// 路由加载后
router.afterEach(() => {
  NProgress.done();
});
export default router;
