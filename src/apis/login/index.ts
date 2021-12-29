/*
 * @Author: jack-pearson
 * @Date: 2021-11-23 16:41:53
 * @LastEditTime: 2021-12-29 14:31:30
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/apis/login/index.ts
 * @Description:
 */
import request from "request";
import { User } from "@/types/user";

export default class LoginService {
  public static async login(data: any) {
    return request<User>({
      url: "/user/login/web",
      method: "post",
      data,
    });
  }
  logout() {
    return request({
      url: "/v1/logout",
      method: "get",
    });
  }
}
