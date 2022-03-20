import { Menu } from "../router";

/*
 * @Author: jack-pearson
 * @Date: 2022-01-11 15:12:05
 * @LastEditTime: 2022-01-12 14:05:22
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/store/tagView/index.d.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
export interface TagViewStoreType {
  visitedViews: Array<Menu>;
  cachedViews: Array<Menu["name"]>;
}
