/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:21:35
 * @LastEditTime: 2021-12-14 14:16:22
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/index.ts
 * @Description:
 */
import { ThemeConfigStateTypes } from "./themeConfig";
import { UserStateTypes } from "./user";
import { RouterStateTypes } from "./router";

export class RootStateTypes {
  themeConfig!: ThemeConfigStateTypes;
  user!: UserStateTypes;
  router!: RouterStateTypes;
}
