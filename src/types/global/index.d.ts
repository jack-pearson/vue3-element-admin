/*
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:15:44
 * @LastEditTime: 2022-01-19 17:43:36
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/global/index.d.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
export interface HttpGlobalResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  total: number;
}
