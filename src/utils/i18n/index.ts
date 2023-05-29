import { i18n } from "@/i18n";

// 路由
export const i18nRouter = (message: string, prefix: string = "messages.router.") => i18n.global.t(`${prefix}${message}`);

// 全局设置
export const i18nSettings = (message: string, prefix: string = "messages.settings.") => i18n.global.t(`${prefix}${message}`);

// 全局字段
export const i18nGlobal = (message: string, prefix: string = "messages.global.") => i18n.global.t(`${prefix}${message}`);

// 系统设置 - 部门管理
export const i18nSystemDept = (message: string, prefix: string = "systemDept.") => i18n.global.t(`${prefix}${message}`);

// 系统设置 - 用户管理
export const i18nSystemUser = (message: string, prefix: string = "systemUser.") => i18n.global.t(`${prefix}${message}`);
