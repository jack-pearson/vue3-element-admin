/*
 * @Author: jack-pearson
 * @Date: 2021-11-22 11:13:15
 * @LastEditTime: 2022-03-17 16:38:26
 * @LastEditors: jack-pearson
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 * @FilePath: /vue3-element-admin/src/i18n/index.ts
 */
import { createI18n } from "vue-i18n";
// import ElementZhCn from "element-plus/lib/locale/lang/zh-cn";
// import ElementEn from "element-plus/lib/locale/lang/en";

import LocalZhCn from "@/i18n/lang/zh-cn";
import LocalEn from "@/i18n/lang/en";
import {
  systemDeptEn,
  systemDeptZhCn,
  loginZhCn,
  loginEn,
  systemUserEn,
  systemUserZhCn,
} from "./pages";

import { Local } from "@/utils";
import { settingsStoreType } from "@/types";

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
  ["zh-cn"]: {
    login: loginZhCn.default,
    messages: LocalZhCn,
    systemDept: systemDeptZhCn.default,
    systemUser: systemUserZhCn.default,
  },
  ["en"]: {
    login: loginEn.default,
    messages: LocalEn,
    systemDept: systemDeptEn.default,
    systemUser: systemUserEn.default,
  },
};
const getLocale = () => {
  const settingsStore = (Local.get("settingsStore") || {}) as settingsStoreType;
  return settingsStore?.config?.language || "zh-cn";
};
// 导出语言国际化
export const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: "zh-cn",
  messages,
});
