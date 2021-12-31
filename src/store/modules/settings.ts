/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2021-12-31 18:50:51
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/settings.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { settingsType } from "@/types";

const createState = (): settingsType => {
  return {
    themes: {
      locale: "zh-CN",
      loginTitle: "yh-vue3-admin",
      primary: "#40A9FF",
      success: "#BAE637",
      warning: "#FFC53D",
      danger: "#FF4D4F",
      info: "#ADB5BD",
    },
    isCollapsed: false,
  };
};

export const settingsStore = defineStore("settingsStore", {
  state: createState,
  actions: {
    // 设置布局配置
    setThemeConfig(themes: settingsType["themes"]) {
      this.themes = themes;
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: settingsType["isCollapsed"]) {
      this.isCollapsed = isCollapsed;
    },
  },
});
