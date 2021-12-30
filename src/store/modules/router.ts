/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2021-12-30 14:03:11
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/router.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { Menu, RouterStateTypes } from "@/types";
import { formatRoutes } from "@/utils";
import { UserService } from "@/apis";

const createState = (): RouterStateTypes => {
  return {
    routerList: [],
  };
};

export const routerState = defineStore("routerState", {
  state: createState,
  actions: {
    async getRouterList(): Promise<Menu[]> {
      return new Promise((resolve, reject) => {
        UserService.getUserMenu()
          .then(({ data, code }) => {
            if (code === 200) {
              const newRoute = formatRoutes(data.list);
              this.routerList = newRoute;
              resolve(newRoute);
            } else {
              reject(data);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
});
