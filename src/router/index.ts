/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:48:43
 * @LastEditTime: 2022-02-07 10:34:01
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory, isNavigationFailure, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { routerStore } from "@/store";
import "nprogress/nprogress.css";
import Login from "@/views/login/index.vue";
import Layout from "@/layout/index.vue";
import { i18nRouter, Session } from "@/utils";

const NotFoundComponent = { template: "<p>Page not found</p>" };
export const constantRouters: Array<RouteRecordRaw> = [
  { path: "/login", name: "login", component: Login, meta: { title: "home", isTagView: false } },
  {
    path: "/404",
    name: "notFound",
    component: NotFoundComponent,
    meta: { title: "404" },
  },
  {
    path: "/",
    name: "/",
    redirect: { path: "/home" },
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
        meta: { title: "home", icon: "home" },
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
  NProgress.configure({ showSpinner: false });
  NProgress.start();
  if (to.path === "/login") {
    next();
    NProgress.done();
  } else {
    const token = Session.get("token");
    if (!token) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
    } else {
      const { routerList } = store;
      if (routerList.length === 0) {
        try {
          const newRouter = await store.getRouterList();
          newRouter.forEach(item => {
            router.addRoute(item);
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
    NProgress.done();
    console.log("error navigation", failure);
  } else {
    document.title = i18nRouter(router.currentRoute.value.meta.title as string);
    NProgress.done();
  }
});
export default router;
