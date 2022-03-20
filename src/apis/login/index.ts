/*
 * @Author: jack-pearson
 * @Date: 2021-11-23 16:41:53
 * @LastEditTime: 2022-03-17 17:45:24
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/apis/login/index.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
// import { request } from "@/utils";
import Mock from "./user";
export class LoginService {
  public static async login() {
    // TODO: 如果是调用接口 改用下面的方式. <User> 这个就是返回的类型. 请求的时候 就给 Login 函数增加 参数即可.
    // return request<User>({
    //   url: "/user/login/web",
    //   method: "post",
    //   data,
    // });
    return new Promise((resolve) => {
      resolve(Mock);
    });
  }
}
