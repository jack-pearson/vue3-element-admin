/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:23:26
 * @LastEditTime: 2021-12-09 17:03:38
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/themeConfig/index.d.ts
 * @Description:
 */
export type localeType = "zh-CN" | "en-US";
export type themeType = "primary" | "success" | "warning" | "danger" | "info";
export interface ThemeConfigStateTypes {
  themeConfig: {
    locale: localeType;
    loginTitle: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}
