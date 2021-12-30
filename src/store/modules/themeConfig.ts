/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2021-12-30 13:59:04
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/themeConfig.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { ThemeConfigStateTypes } from "@/types";

const createState = (): ThemeConfigStateTypes => {
  return {
    themeConfig: {
      locale: "zh-CN",
      loginTitle: "yh-vue3-admin",
      primary: "#40A9FF",
      success: "#BAE637",
      warning: "#FFC53D",
      danger: "#FF4D4F",
      info: "#ADB5BD",
    },
  };
};

export const themeConfigState = defineStore("themeConfigState", {
  state: createState,
  actions: {
    // 设置布局配置
    setThemeConfig(data: ThemeConfigStateTypes["themeConfig"]) {
      this.themeConfig = data;
    },
  },
});
