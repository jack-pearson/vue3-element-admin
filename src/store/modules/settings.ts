/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2022-01-10 17:44:06
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/settings.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { settingsType } from "@/types";
import { Local } from "@/utils";

const createState = (): settingsType => {
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

const loadState = (): settingsType => {
  const state = Local.get("settingsStore") || ({} as settingsType);
  const newState = Object.assign(createState(), state);
  return newState;
};

export const settingsStore = defineStore("settingsStore", {
  state: loadState,
  actions: {
    // 设置布局配置
    setThemes(themes: settingsType["themesState"]) {
      Object.assign(this.themesState, themes);
    },
    setElementZiTiSize(size: settingsType["ElComponentSize"]) {
      this.ElComponentSize = size;
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: settingsType["isCollapsed"]) {
      this.isCollapsed = isCollapsed;
    },
    // 设置语言
    setLanguage(language: settingsType["language"]) {
      this.language = language;
    },
  },
});
