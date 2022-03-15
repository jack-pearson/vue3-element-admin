/*
 * @Author: jack-pearson
 * @Date: 2021-12-09 16:16:17
 * @LastEditTime: 2022-03-15 18:11:58
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/theme/index.ts
 * @Description:
 */
import { themeType } from "@/types";
/**
 * @description: 设置主图色
 * @param {color} color
 * @param {theme} 主题
 * @return: null
 */
export const setHtmlCssVar = (color: string, theme: themeType) => document.documentElement.style.setProperty(`--el-color-${theme}`, color);
