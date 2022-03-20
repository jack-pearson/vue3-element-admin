/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 20:19:51
 * @LastEditTime: 2022-03-17 17:32:44
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/apis/user/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
// import { request } from "@/utils";
import Mock from "./menu";

export class UserService {
  public static async getUserMenu() {
    return new Promise((resolve) => {
      resolve(Mock.menu);
    });
  }

  public static async query() {
    // return request<UserList>({
    //   url: "/user/query",
    //   method: "get",
    //   params,
    // });
    return new Promise((resolve) => {
      resolve(Mock.user);
    });
  }
}
