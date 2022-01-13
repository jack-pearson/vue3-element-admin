/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2022-01-13 13:16:50
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/settings.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { settingsStoreType } from "@/types";
import { Local } from "@/utils";

const createState = (): settingsStoreType => {
  return {
    themesState: {
      primary: "#40A9FF",
      success: "#BAE637",
      warning: "#FFC53D",
      danger: "#FF4D4F",
      info: "#ADB5BD",
    },
    ElComponentSize: "default",
    isCollapsed: false,
    language: "zh-cn",
    config: {
      loginTitle: "yh-vue3-admin",
      logoTitle: "yh-vue3-admin",
    },
  };
};

const loadState = (): settingsStoreType => {
  const state = (Local.get("settingsStore") || {}) as settingsStoreType;
  const newState = Object.assign(createState(), state);
  return newState;
};

export const settingsStore = defineStore("settingsStore", {
  state: loadState,
  actions: {
    // 设置布局配置
    setThemes(themes: settingsStoreType["themesState"]) {
      Object.assign(this.themesState, themes);
    },
    setElementZiTiSize(size: settingsStoreType["ElComponentSize"]) {
      this.ElComponentSize = size;
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: settingsStoreType["isCollapsed"]) {
      this.isCollapsed = isCollapsed;
    },
    // 设置语言
    setLanguage(language: settingsStoreType["language"]) {
      this.language = language;
    },
  },
});
