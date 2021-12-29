/*
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:12:40
 * @LastEditTime: 2021-12-29 18:31:00
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/user.ts
 * @Description:
 */

import { defineStore } from "pinia";
import { User } from "@/types";

export const userState = defineStore("userState", {
  state: () => {
    return {
      userInfo: {} as User,
    };
  },
  actions: {
    setUserInfo(data: User) {
      this.userInfo = data;
    },
  },
});
