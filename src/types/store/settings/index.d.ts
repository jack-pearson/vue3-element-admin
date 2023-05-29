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
