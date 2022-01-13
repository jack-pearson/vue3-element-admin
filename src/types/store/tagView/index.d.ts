import { Menu } from "../router";

/*
 * @Author: jack-pearson
 * @Date: 2022-01-11 15:12:05
 * @LastEditTime: 2022-01-12 14:05:22
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/tagView/index.d.ts
 * @Description:
 */
export interface TagViewStoreType {
  visitedViews: Array<Menu>;
  cachedViews: Array<Menu["name"]>;
}