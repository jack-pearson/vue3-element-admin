/*
 * @Author: your name
 * @Date: 2021-11-22 11:13:15
 * @LastEditTime: 2021-12-06 15:08:50
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /yh-vue3-admin/src/i18n/index.ts
 */
import { createI18n } from "vue-i18n";
import zhcnLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";

import nextZhcn from "i18n/lang/zh-cn";
import nextEn from "i18n/lang/en";

import LoginZhcn from "i18n/pages/login/zh-cn";
import LoginEn from "i18n/pages/login/en";

// 定义语言国际化内容
/**
 * 说明：
 * /src/i18n/lang 下的 ts 为框架的国际化内容
 * /src/i18n/pages 下的 ts 为各界面的国际化内容
 */
const messages = {
  [zhcnLocale.name]: {
    ...zhcnLocale,
    login: LoginZhcn,
  },
  [enLocale.name]: {
    ...enLocale,
    login: LoginEn,
  },
};

// 导出语言国际化
export const i18n = createI18n({
  locale: "zh-cn",
  fallbackLocale: zhcnLocale.name,
  messages,
});
