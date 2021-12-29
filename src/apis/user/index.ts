/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 20:19:51
 * @LastEditTime: 2021-12-29 14:37:03
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/apis/user/index.ts
 * @Description:
 */
import { Menu } from "@/types/user";
import request from "request";

export default class UserService {
  public static async getUserMenu() {
    return request<{ list: Menu[] }>({
      url: "/menu/findAll",
      method: "get",
    });
  }
}
