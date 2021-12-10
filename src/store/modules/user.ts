/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2021-12-07 20:25:20
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/user.ts
 * @Description:
 */
import { RootStateTypes } from "types/store";
import { UserStateTypes } from "types/store/user";
import { User } from "types/user";
import { Module } from "vuex";

const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo(state, user: User) {
      state.userInfo = user;
    },
  },
  actions: {
    SET_USER_INFO({ commit }, data: User) {
      commit("setUserInfo", data);
    },
  },
};

export default userModule;
