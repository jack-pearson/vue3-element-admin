/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:09:45
 * @LastEditTime: 2022-01-19 16:17:21
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/utils/i18n/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */

import { i18n } from "@/i18n";

// 路由
export const i18nRouter = (
  message: string,
  prefix: string = "messages.router."
) => i18n.global.t(`${prefix}${message}`);

// 全局设置
export const i18nSettings = (
  message: string,
  prefix: string = "messages.settings."
) => i18n.global.t(`${prefix}${message}`);

// 全局字段
export const i18nGlobal = (
  message: string,
  prefix: string = "messages.global."
) => i18n.global.t(`${prefix}${message}`);

// 系统设置 - 部门管理
export const i18nSystemDept = (
  message: string,
  prefix: string = "systemDept."
) => i18n.global.t(`${prefix}${message}`);

// 系统设置 - 用户管理
export const i18nSystemUser = (
  message: string,
  prefix: string = "systemUser."
) => i18n.global.t(`${prefix}${message}`);
