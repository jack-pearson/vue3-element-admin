/*
 * @Author: jack-pearson
 * @Date: 2021-11-23 16:41:53
 * @LastEditTime: 2021-12-30 14:02:45
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/apis/login/index.ts
 * @Description:
 */
import { request } from "@/utils";
import { User } from "@/types";

export class LoginService {
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
