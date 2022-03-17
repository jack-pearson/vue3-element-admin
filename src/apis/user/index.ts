/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 20:19:51
 * @LastEditTime: 2022-01-19 17:42:42
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/apis/user/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
import { Menu, UserList } from "@/types";
import { request } from "@/utils";

export class UserService {
  public static async getUserMenu() {
    return request<{ list: Menu[] }>({
      url: "/menu/findAll",
      method: "get",
    });
  }

  public static async query(params?: any) {
    return request<UserList>({
      url: "/user/query",
      method: "get",
      params,
    });
  }
}
