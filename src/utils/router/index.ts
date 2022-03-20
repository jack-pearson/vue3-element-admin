/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 13:56:29
 * @LastEditTime: 2022-02-07 11:18:46
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/utils/router/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
import { Menu } from "@/types";
const modules = import.meta.glob("/src/**/**.vue");
/** 对数组进行 component 转换 */
export const formatRoutes = (data: Menu[]): Menu[] => {
  return data.map((v) => {
    const children = v.children ? formatRoutes(v.children) : [];
    const component = (() => {
      if (v.component === "Layout") return () => import(`@/layout/index.vue`);
      else if (v.component === "ParentView")
        return () => import(`@/components/parentView/index.vue`);
      else return modules[v.component];
    })();

    return {
      ...v,
      children,
      component,
    };
  });
};

export const isHide = (route: Menu) => route && route.isHide;

export const hasChildren = (route: Menu) =>
  route && route.children && route.children.length > 0;

export const routeTreeToArray = (routes: Menu[], result: Menu[] = []) => {
  routes.forEach((node: Menu) => {
    result.push(node);
    if (hasChildren(node)) routeTreeToArray(node.children, result);
  });
  return result;
};
