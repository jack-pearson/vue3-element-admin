import { defineStore } from "pinia";
import { User, userStoreTypes } from "@/types";
import { Session } from "@/utils";

export const createUser = () => {
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
