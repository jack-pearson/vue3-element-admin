/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 17:46:51
 * @LastEditTime: 2022-01-18 18:44:52
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/apis/dept/index.ts
 * @Description:
 */
import { request } from "@/utils";
import { Dept } from "@/types";

export class DeptService {
  public static async findAll() {
    return request<Dept[]>({
      url: "/dept/findAll",
      method: "get",
    });
  }
  public static async update(data: Dept) {
    return request<Dept[]>({
      url: "/dept/update",
      method: "post",
      data,
    });
  }
  public static async delete(deptId: string) {
    return request<Dept[]>({
      url: "/dept/delete/" + deptId,
      method: "delete",
    });
  }
}
