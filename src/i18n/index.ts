/*
 * @Author: your name
 * @Date: 2021-11-22 11:13:15
 * @LastEditTime: 2022-01-19 16:19:21
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-element-admin/src/i18n/index.ts
 */
import { createI18n } from "vue-i18n";
// import ElementZhCn from "element-plus/lib/locale/lang/zh-cn";
// import ElementEn from "element-plus/lib/locale/lang/en";

import LocalZhCn from "@/i18n/lang/zh-cn";
import LocalEn from "@/i18n/lang/en";
import { systemDeptEn, systemDeptZhCn, loginZhCn, loginEn, systemUserEn, systemUserZhCn } from "./pages";

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
