/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:09:45
 * @LastEditTime: 2022-01-13 18:27:58
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/i18n/index.ts
 * @Description:
 */

import { i18n } from "@/i18n";

export const i18nRouter = (message: string, prefix: string = "messages.router.") => i18n.global.t(`${prefix}${message}`);

export const i18nSettings = (message: string, prefix: string = "messages.settings.") => i18n.global.t(`${prefix}${message}`);
