/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:15:14
 * @LastEditTime: 2022-01-11 13:49:56
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/types/store/user/index.d.ts
 * @Description:
 */
type sexType = "null" | "man" | "girl";
export interface User {
  account?: string;
  token?: string;
  password?: string;
  name?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  age?: number;
  sex?: sexType;
  [key: string]: any;
}

export interface userStoreTypes {
  userInfo: User;
}
