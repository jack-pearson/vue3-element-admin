/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:09:45
 * @LastEditTime: 2022-01-18 16:31:43
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/i18n/index.ts
 * @Description:
 */

import { i18n } from "@/i18n";

export const i18nRouter = (message: string, prefix: string = "messages.router.") => i18n.global.t(`${prefix}${message}`);

export const i18nSettings = (message: string, prefix: string = "messages.settings.") => i18n.global.t(`${prefix}${message}`);

export const i18nGlobal = (message: string, prefix: string = "messages.global.") => i18n.global.t(`${prefix}${message}`);

export const i18nSystemDept = (message: string, prefix: string = "systemDept.") => i18n.global.t(`${prefix}${message}`);
