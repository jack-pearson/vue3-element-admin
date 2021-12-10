/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:15:44
 * @LastEditTime: 2021-12-07 15:59:25
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/global/index.d.ts
 * @Description:
 */
export interface HttpGlobalResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}
