/*
 * @Author: jack-pearson
 * @Date: 2021-12-09 16:16:17
 * @LastEditTime: 2022-01-14 18:21:52
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/theme/index.ts
 * @Description:
 */
import { settingsStoreType, themeType } from "@/types";
import Color from "color";
/**
 * @description: 设置主图色
 * @param {color} color
 * @param {theme} 主题
 * @return: null
 */
export const setHtmlCssVar = (color: string, theme: themeType) => {
  const colorFn = Color(color);
  const hue = colorFn.hue();
  const step = 5;
  const saturation = colorFn.saturationl();
  const lightness = colorFn.lightness();
  document.documentElement.style.setProperty(`--color-${theme}`, color);
  for (let index = 1; index < 10; index++) {
    if (index > 5) {
      const level = index - 5;
      const currentLightness = lightness + level * step;
      const hex = colorFn.hsl(hue, saturation, Math.round(currentLightness * 10000) / 10000).hex();
      document.documentElement.style.setProperty(`--color-${theme}-${index}`, hex);
    } else if (index < 5) {
      const level = 5 - index;
      const currentLightness = lightness - level * step;
      const hex = colorFn.hsl(hue, saturation, Math.round(currentLightness * 10000) / 10000).hex();
      document.documentElement.style.setProperty(`--color-${theme}-${index}`, hex);
    } else {
      document.documentElement.style.setProperty(`--color-${theme}-${index}`, color);
    }
  }
};

/**
 * @description: 页面刷新的时候 设置主题
 * @param {theme} 主题 store 中的主题配置
 * @return: null
 */
export const setHtmlCssVarBySettings = (theme: settingsStoreType["themesState"]) => {
  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      setHtmlCssVar(theme[key as keyof settingsStoreType["themesState"]], key as themeType);
    }
  }
};
