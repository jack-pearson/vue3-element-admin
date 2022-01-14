/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 13:56:29
 * @LastEditTime: 2022-01-14 18:54:04
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/router/index.ts
 * @Description:
 */
import { Menu } from "@/types";
const modules = import.meta.glob("/src/**/**.vue");
/** 对数组进行 component 转换 */
export const formatRoutes = (data: Menu[]): Menu[] => {
  return data.map(v => {
    if (!v.children) {
      return {
        name: v.name,
        path: v.path,
        children: [],
        redirect: v.redirect,
        isHide: v.isHide,
        component: modules[v.component],
        meta: v.meta,
      };
    }
    return {
      name: v.name,
      path: v.path,
      children: formatRoutes(v.children),
      redirect: v.redirect,
      isHide: v.isHide,
      component: modules[v.component],
      meta: v.meta,
    };
  });
};

export const isHide = (route: Menu) => route && route.isHide;

export const hasChildren = (route: Menu) => route && route.children && route.children.length > 0;

export const routeTreeToArray = (routes: Menu[], result: Menu[] = []) => {
  routes.forEach((node: Menu) => {
    result.push(node);
    if (hasChildren(node)) routeTreeToArray(node.children, result);
  });
  return result;
};
