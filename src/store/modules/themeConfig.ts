/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 16:14:10
 * @LastEditTime: 2021-12-09 17:04:59
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/themeConfig.ts
 * @Description:
 */
import { RootStateTypes } from "types/store";
import { ThemeConfigStateTypes } from "types/store/themeConfig";
import { Module } from "vuex";

const themeConfigModule: Module<ThemeConfigStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    themeConfig: {
      locale: "zh-CN",
      loginTitle: "yh-vue3-admin",
      primary: "#40A9FF",
      success: "#BAE637",
      warning: "#FFC53D",
      danger: "#FF4D4F",
      info: "#ADB5BD",
    },
  },
  mutations: {
    // 设置布局配置
    getThemeConfig(state: ThemeConfigStateTypes, data: ThemeConfigStateTypes["themeConfig"]) {
      state.themeConfig = data;
    },
  },
  actions: {
    // 设置布局配置
    setThemeConfig({ commit }, data: ThemeConfigStateTypes["themeConfig"]) {
      commit("getThemeConfig", data);
    },
  },
};

export default themeConfigModule;
