/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:09:45
 * @LastEditTime: 2021-12-30 14:20:27
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/i18n/index.ts
 * @Description:
 */

import { i18n } from "@/i18n";

export const i18nRouter = (message: string, prefix: string = "messages.router.") => i18n.global.t(`${prefix}${message}`);
