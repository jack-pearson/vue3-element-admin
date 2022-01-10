/*
 * @Author: jack-pearson
 * @Date: 2021-12-30 14:53:28
 * @LastEditTime: 2022-01-10 17:40:36
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/utils/global/index.ts
 * @Description:
 */
export const hasLength = (target: Array<any>) => target && target.length > 0;

/** element 组件的全局配置size  因为这个是全局的,故写在于此 */
export const componentSize = ["large", "default", "small"] as const;

/** 国际化 因为这个是全局的,故写在于此 */
export const i18n = [
  {
    label: "简体中文",
    value: "zh-cn",
  },
  {
    label: "English",
    value: "en",
  },
] as const;
