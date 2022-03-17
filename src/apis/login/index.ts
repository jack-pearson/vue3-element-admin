/*
 * @Author: jack-pearson
 * @Date: 2021-11-23 16:41:53
 * @LastEditTime: 2022-01-13 13:16:47
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/apis/login/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
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
