/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:10:29
 * @LastEditTime: 2021-12-07 20:19:29
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/user.d.ts
 * @Description:
 */
type sexType = "null" | "man" | "girl";
export interface User {
  account?: string;
  token?: string;
  password?: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  age?: number;
  sex?: sexType;
  [key: string]: any;
}
