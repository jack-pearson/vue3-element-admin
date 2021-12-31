/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:13:39
 * @LastEditTime: 2021-12-31 11:41:28
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/index.ts
 * @Description:
 */
import { createPinia } from "pinia";
export * from "./modules/router";
export * from "./modules/user";
export * from "./modules/themeConfig";

export const pinia = createPinia();
