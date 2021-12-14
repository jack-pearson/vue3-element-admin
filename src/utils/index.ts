/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 20:26:12
 * @LastEditTime: 2021-12-14 18:04:35
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/index.ts
 * @Description:
 */
import { Menu } from "@/types/user";
import Layout from "@/layout/index.vue";
import ParentView from "@/components/ParentView/index.vue";
/** 对数组进行 component 转换 */
export const formatRoutes = (data: Menu[]): Menu[] => {
  return data.map(v => {
    if (v.component === "layout") {
      return {
        name: v.name,
        path: v.path,
        children: formatRoutes(v.children),
        redirect: v.redirect,
        isHide: v.isHide,
        // component: () => import(`@/${v.component}`),
        component: Layout,
        meta: {
          title: v.meta.title,
          icon: v.meta.icon,
          isKeepAlive: v.meta.isKeepAlive,
        },
      };
    } else if (v.component === "parentView") {
      return {
        name: v.name,
        path: v.path,
        children: formatRoutes(v.children),
        redirect: v.redirect,
        isHide: v.isHide,
        // component: () => import(`@/${v.component}`),
        component: ParentView,
        meta: {
          title: v.meta.title,
          icon: v.meta.icon,
          isKeepAlive: v.meta.isKeepAlive,
        },
      };
    } else {
      if (!v.children) {
        return {
          name: v.name,
          path: v.path,
          children: [],
          redirect: v.redirect,
          isHide: v.isHide,
          component: () => import(`../${v.component}/index.vue`),
          meta: {
            title: v.meta.title,
            icon: v.meta.icon,
            isKeepAlive: v.meta.isKeepAlive,
          },
        };
      }
      return {
        name: v.name,
        path: v.path,
        children: formatRoutes(v.children),
        redirect: v.redirect,
        isHide: v.isHide,
        component: () => import(`../${v.component}/index.vue`),
        meta: {
          title: v.meta.title,
          icon: v.meta.icon,
          isKeepAlive: v.meta.isKeepAlive,
        },
      };
    }
  });
};
