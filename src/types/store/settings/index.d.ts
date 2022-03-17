/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:23:26
 * @LastEditTime: 2022-03-17 11:30:59
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/store/settings/index.d.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
export type languageType = "zh-cn" | "en";
export type themeType = "primary" | "success" | "warning" | "danger" | "info";
export type ElComponentSizeType = "default" | "small" | "large";
export interface settingsStoreType {
  themesState: {
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  fixed: {
    loginTitle: string;
    logoTitle: string;
  };
  config: {
    hasTagsView: boolean;
    hasGlobalSettings: boolean;
    hasSidebarLogo: boolean;
    language: languageType;
    hasZiTi: boolean;
    hasLanguage: boolean;
    hasSearch: boolean;
    hasBreadcrumb: boolean;
    hasClipboard: boolean;
    ElComponentSize: ElComponentSizeType;
    isCollapsed: boolean;
  };
}
