/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:23:26
 * @LastEditTime: 2022-01-10 16:49:16
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/themeConfig/index.d.ts
 * @Description:
 */
export type localeType = "zh-CN" | "en-US";
export type themeType = "primary" | "success" | "warning" | "danger" | "info";
export interface settingsType {
  themesState: {
    locale: localeType;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  ElComponentSize: string;
  isCollapsed: boolean;
  config: {
    loginTitle: string;
    logoTitle: string;
  };
}
