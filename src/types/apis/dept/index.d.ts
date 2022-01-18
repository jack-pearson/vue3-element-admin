/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 17:48:13
 * @LastEditTime: 2022-01-18 17:58:19
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/apis/dept/index.d.ts
 * @Description:
 */

export interface Dept {
  id: string;
  name: string;
  parentId: number;
  children?: Dept[];
  status?: number;
  description?: string;
}
