import { settingsStoreType, themeType } from "@/types";
import Color from "color";
/**
 * @description: 设置主图色
 * @param {color} color
 * @param {theme} 主题
 * @return: null
 */
export const setHtmlCssVar = (color: string, theme: themeType) => {
  const c = Color(color);
  document.documentElement.style.setProperty(`--el-color-${theme}`, c.hex());
  setThemeDark(c, theme);
  setThemeLight(c, theme);
};

export const setThemeDark = (color: Color<string>, theme: themeType) => {
  const hex = color.mix(Color("#000000"), 0.2).hex();
  document.documentElement.style.setProperty(`--el-color-${theme}-dark-2`, hex);
};

export const setThemeLight = (color: Color<string>, theme: themeType) => {
  for (let index = 1; index < 10; index++) {
    const t = index / 10;
    const hex = color.mix(Color("#ffffff"), t).hex();
    document.documentElement.style.setProperty(`--el-color-${theme}-light-${index}`, hex);
  }
};

export const setHtmlCssVarBySettings = (theme: settingsStoreType["themesState"]) => {
  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      setHtmlCssVar(theme[key as keyof settingsStoreType["themesState"]], key as themeType);
    }
  }
};
