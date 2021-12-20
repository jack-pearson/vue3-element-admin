/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2021-12-20 13:47:09
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/router.ts
 * @Description:
 */
import { Menu } from "@/types/user";
import { RootStateTypes } from "types/store";
import { RouterStateTypes } from "types/store/router";
import { Module } from "vuex";
import { formatRoutes } from "@/utils";
import UserService from "@/apis/user";

const userModule: Module<RouterStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    routerList: [],
  },
  mutations: {
    setRouter(state, user: Menu[]) {
      state.routerList = user;
    },
  },
  actions: {
    async GET_ROUTER({ commit }) {
      return new Promise((resolve, reject) => {
        UserService.getUserMenu()
          .then(result => {
            if (result.code === 200) {
              const newRoute = formatRoutes(result.data);
              commit("setRouter", newRoute);
              resolve(newRoute);
            } else {
              reject(result);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
};

export default userModule;
