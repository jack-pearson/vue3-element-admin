/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:53:28
 * @LastEditTime: 2022-01-10 17:18:06
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/global/index.ts
 * @Description:
 */
export const hasLength = (target: Array<any>) => target && target.length > 0;

/** 因为这个是全局的,故写在于此 */
export const componentSize = ["large", "default", "small"] as const;
