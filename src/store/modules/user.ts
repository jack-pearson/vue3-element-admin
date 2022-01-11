/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2022-01-11 14:34:28
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/user.ts
 * @Description:
 */

import { defineStore } from "pinia";
import { User, userStoreTypes } from "@/types";
import { Session } from "@/utils";

const createUser = () => {
  return {
    userInfo: {} as User,
  };
};

const loadUser = (): userStoreTypes => {
  const state = (Session.get("userInfo") || {}) as User;
  const newUser = Object.assign(createUser(), { userInfo: state });
  return newUser;
};

export const userStore = defineStore("userStore", {
  state: loadUser,
  actions: {
    setUserInfo(data: User) {
      this.userInfo = data;
    },
  },
});
