/*
 * @Author: jack-pearson
 * @Date: 2022-01-19 17:37:30
 * @LastEditTime: 2022-01-20 17:30:48
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/apis/dept.d.ts
 * @Description:
 */
export interface Dept {
  id: number;
  name: string;
  parentId: number;
  children?: Dept[];
  status?: number;
  description?: string;
}
