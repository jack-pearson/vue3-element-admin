/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:15:14
 * @LastEditTime: 2022-01-19 17:42:20
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/types/store/user/index.d.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */

import { PageInfo } from "@/types";
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

export type UserList = PageInfo & {
  list: User[];
};
