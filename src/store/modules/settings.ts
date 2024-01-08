import { defineStore } from "pinia";
import { ElComponentSizeType, languageType, settingsStoreType } from "@/types";
import { Local } from "@/utils";

export const createSettings = (): settingsStoreType => {
  return {
    fixed: {
      loginTitle: "vue3-element-admin",
      logoTitle: "vue3-element-admin",
    },
    config: {
      ElComponentSize: "default",
      hasTagsView: true,
      hasGlobalSettings: true,
      hasSidebarLogo: true,
      hasBreadcrumb: true,
      hasZiTi: true,
      hasSearch: true,
      hasClipboard: true,
      hasLanguage: true,
      isCollapsed: false,
      language: "zh-cn",
    },
  };
};

const loadState = (): settingsStoreType => {
  const config = (Local.get("config") || {}) as settingsStoreType["config"];
  const settings = createSettings();
  settings.config = { ...settings.config, ...config };
  return settings;
};

export const settingsStore = defineStore("settingsStore", {
  state: loadState,
  actions: {
    setConfig(config: Partial<settingsStoreType["config"]>) {
      Object.assign(this.config, config);
      Local.set("config", this.config);
    },
    setElementZiTiSize(size: ElComponentSizeType) {
      this.config.ElComponentSize = size;
      Local.set("config", this.config);
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: boolean) {
      this.config.isCollapsed = isCollapsed;
      Local.set("config", this.config);
    },
    // 设置语言
    setLanguage(language: languageType) {
      this.config.language = language;
      Local.set("config", this.config);
    },
  },
});
