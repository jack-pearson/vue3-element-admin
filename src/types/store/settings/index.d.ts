/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:23:26
 * @LastEditTime: 2022-03-17 10:44:48
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/settings/index.d.ts
 * @Description:
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
  config: {
    loginTitle: string;
    logoTitle: string;
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
