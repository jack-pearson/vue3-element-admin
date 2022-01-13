/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2022-01-13 13:16:48
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/router.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { Menu, RouterStoreTypes } from "@/types";
import { formatRoutes } from "@/utils";
import { UserService } from "@/apis";

const createState = (): RouterStoreTypes => {
  return {
    routerList: [],
  };
};

export const routerStore = defineStore("routerStore", {
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
