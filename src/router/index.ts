/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2022-03-17 18:19:52
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/router/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
import { createRouter, createWebHistory, isNavigationFailure, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { routerStore } from "@/store";
import "nprogress/nprogress.css";
import { i18nRouter, Session } from "@/utils";

const DEFAULT_PATH = "/home";
import Login from "@/views/login/index.vue";
import Layout from "@/layout/index.vue";
import { Menu } from "@/types";

export const constantRouters: Array<RouteRecordRaw | Menu> = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "login", isTagView: false },
  },
  {
    path: "/404",
    name: "notFound",
    component: { template: "<p>Page not found</p>" },
    meta: { title: "404" },
  },
  {
    path: "/",
    name: "/",
    redirect: { path: DEFAULT_PATH },
    component: Layout,
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index.vue"),
        meta: { title: "profile", icon: "profile" },
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "home", icon: "home", isAffix: true, isTagView: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouters,
});

router.beforeEach(async (to, from, next) => {
  const store = routerStore();
  const { routerList, getRouterList } = store;
  const token = Session.get("token");
  NProgress.configure({ showSpinner: false });
  NProgress.start();

  if (to.path === "/login") {
    NProgress.done();
    return next();
  }

  if (!token) {
    const params = JSON.stringify(to.query ? to.query : to.params);
    const url = `/login?redirect=${to.path}&params=${params}`;
    return next(url);
  }

  if (routerList.length > 0) return next();

  try {
    const newRouter = await getRouterList();
    newRouter.forEach((item) => router.addRoute(item));
    next({ ...to, replace: true });
  } catch (err) {
    console.log(err, "动态添加路由失败");
    NProgress.done();
  }
});

// 路由加载后
router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    NProgress.done();
    console.log("error navigation", failure);
  } else {
    document.title = i18nRouter(router.currentRoute.value.meta.title as string);
    NProgress.done();
  }
});
export default router;
