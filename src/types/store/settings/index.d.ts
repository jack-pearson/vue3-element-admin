export type languageType = "zh-cn" | "en";
export type ElComponentSizeType = "default" | "small" | "large";
export interface settingsStoreType {
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
