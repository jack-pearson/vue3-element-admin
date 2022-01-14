/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2022-01-14 18:34:06
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/settings.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { ElComponentSizeType, languageType, settingsStoreType } from "@/types";
import { Local, setHtmlCssVarBySettings } from "@/utils";

const createState = (): settingsStoreType => {
  return {
    themesState: {
      primary: "#40A9FF",
      success: "#BAE637",
      warning: "#FFC53D",
      danger: "#FF4D4F",
      info: "#ADB5BD",
    },
    config: {
      loginTitle: "yh-vue3-admin",
      logoTitle: "yh-vue3-admin",
      ElComponentSize: "default",
      isTagsView: true,
      isCollapsed: false,
      language: "zh-cn",
    },
  };
};

const loadState = (): settingsStoreType => {
  const state = (Local.get("settingsStore") || {}) as settingsStoreType;
  const newState = Object.assign(createState(), state);
  setHtmlCssVarBySettings(newState.themesState);
  return newState;
};

export const settingsStore = defineStore("settingsStore", {
  state: loadState,
  actions: {
    // 设置布局配置
    setThemes(themes: Partial<settingsStoreType["themesState"]>) {
      Object.assign(this.themesState, themes);
      Local.set("settingsStore", this);
    },
    setConfig(config: Partial<settingsStoreType["config"]>) {
      Object.assign(this.config, config);
      Local.set("settingsStore", this);
    },
    setElementZiTiSize(size: ElComponentSizeType) {
      this.config.ElComponentSize = size;
      Local.set("settingsStore", this);
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: boolean) {
      this.config.isCollapsed = isCollapsed;
      Local.set("settingsStore", this);
    },
    // 设置语言
    setLanguage(language: languageType) {
      this.config.language = language;
      Local.set("settingsStore", this);
    },
  },
});
