/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 20:19:51
 * @LastEditTime: 2022-01-13 13:16:55
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/apis/user/index.ts
 * @Description:
 */
import { Menu } from "@/types";
import { request } from "@/utils";

export class UserService {
  public static async getUserMenu() {
    return request<{ list: Menu[] }>({
      url: "/menu/findAll",
      method: "get",
    });
  }
}
