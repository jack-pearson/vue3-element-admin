/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2021-12-20 14:35:12
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory, isNavigationFailure, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { store } from "@/store/index";
import "nprogress/nprogress.css";
import { nextTick } from "vue";
import Login from "views/login/index.vue";
import Layout from "@/layout/index.vue";
import { i18n } from "@/i18n/index";

const NotFoundComponent = { template: "<p>Page not found</p>" };
export const constantRouters: Array<RouteRecordRaw> = [
  { path: "/login", name: "login", component: Login, meta: { title: "messages.router.home" } },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { title: "404" },
  },
];

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
    } else {
      const { routerList } = store.state.router;
      if (routerList.length === 0) {
        try {
          const newRouter = await store.dispatch("router/GET_ROUTER");
          await router.addRoute({
            path: "/",
            name: "/",
            redirect: { name: "system" },
            component: Layout,
            children: newRouter,
          });
          next({ ...to, replace: true });
        } catch (err) {
          console.log(err, "动态添加路由失败");
          NProgress.done();
        }
      } else {
        await next();
      }
    }
  }
});

// 路由加载后
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log("error navigation", failure);
  } else {
    nextTick(() => {
      document.title = i18n.global.t(router.currentRoute.value.meta.title as any);
      NProgress.done();
    });
  }
});
export default router;
