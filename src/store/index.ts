/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:13:39
 * @LastEditTime: 2022-01-11 15:11:05
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/index.ts
 * @Description:
 */
import { createPinia } from "pinia";
export * from "./modules/router";
export * from "./modules/settings";
export * from "./modules/tagView";
export * from "./modules/user";

export const pinia = createPinia();
