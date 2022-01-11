/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:23:26
 * @LastEditTime: 2022-01-11 16:44:53
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/settings/index.d.ts
 * @Description:
 */
export type languageType = "zh-cn" | "en";
export type themeType = "primary" | "success" | "warning" | "danger" | "info";
export interface settingsStoreType {
  themesState: {
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  language: languageType;
  ElComponentSize: string;
  isCollapsed: boolean;
  config: {
    loginTitle: string;
    logoTitle: string;
  };
}
