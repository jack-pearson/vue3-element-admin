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
