/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 10:22:02
 * @LastEditTime: 2021-12-30 14:06:44
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/viteBuild/index.ts
 * @Description:
 */
import dotenv from "dotenv";

// 定义接口类型声明
export interface ViteEnv {
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_AUTO_OPEN: string;
  VITE_PUBLIC_PATH: string;
  VITE_IGNORE_I18N_WARNING: boolean;
}

/**
 * vite 打包相关
 * @link 参考：https://cn.vitejs.dev/guide/env-and-mode.html
 * @returns 返回 `VITE_xxx` 环境变量和模式信息
 */
export function loadEnv(): ViteEnv {
  const env = process.env.NODE_ENV;
  const ret: any = {};
  const envList = [`.env.${env}.local`, `.env.${env}`, ".env.local", ".env"];
  envList.forEach(e => {
    dotenv.config({ path: e });
  });
  for (const envName of Object.keys(process.env)) {
    let realName = (process.env as any)[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_AUTO_OPEN") realName = Boolean(realName);
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
