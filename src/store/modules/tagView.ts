/*
 * @Author: jack-pearson
 * @Date: 2022-01-11 15:10:49
 * @LastEditTime: 2022-01-11 15:42:23
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/tagView.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { TagViewStoreType } from "@/types";
import { Session } from "@/utils";

const createUser = (): TagViewStoreType => {
  return {
    visitedViews: [],
    cachedViews: [],
  };
};

const loadUser = (): TagViewStoreType => {
  const visitedViews = (Session.get("visitedViews") || []) as TagViewStoreType["visitedViews"];
  const cachedViews = (Session.get("cachedViews") || []) as TagViewStoreType["cachedViews"];
  const newUser = Object.assign(createUser(), { visitedViews, cachedViews });
  return newUser;
};

export const tagViewStore = defineStore("tagViewStore", {
  state: loadUser,
  actions: {
    addVisitedViews(data: any) {
      if (this.visitedViews.includes(data.name)) return;
      this.visitedViews.push(data.name);
    },
    addCachedViews(data: any) {
      if (this.cachedViews.includes(data.name)) return;
      if (data.meta.isKeepAlive) this.cachedViews.push(data.name);
    },
    removeVisitedViews(name: string) {
      this.visitedViews = this.visitedViews.filter(v => v.name !== name);
    },
    removeCachedViews(name: string) {
      this.cachedViews = this.cachedViews.filter(v => v.name !== name);
    },
    removeTagView(name: string) {
      this.removeVisitedViews(name);
      this.removeCachedViews(name);
    },
    addTagView(data: any) {
      this.addCachedViews(data);
      this.addVisitedViews(data);
    },
  },
});
