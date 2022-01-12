/*
 * @Author: jack-pearson
 * @Date: 2022-01-11 15:10:49
 * @LastEditTime: 2022-01-12 18:08:16
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/store/modules/tagView.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { Menu, TagViewStoreType } from "@/types";
import { Local } from "@/utils";

const createUser = (): TagViewStoreType => {
  return {
    visitedViews: [],
    cachedViews: [],
  };
};

const loadUser = (): TagViewStoreType => {
  const visitedViews = (Local.get("visitedViews") || []) as TagViewStoreType["visitedViews"];
  const cachedViews = (Local.get("cachedViews") || []) as TagViewStoreType["cachedViews"];
  const newUser = Object.assign(createUser(), { visitedViews, cachedViews });
  return newUser;
};

export const tagViewStore = defineStore("tagViewStore", {
  state: loadUser,
  actions: {
    addVisitedViews(route: Menu) {
      if (this.visitedViews.find(item => item.name === route.name)) return;
      this.visitedViews.push(route);
      this.addLocalVisitedViews();
    },
    addCachedViews(route: Menu) {
      if (this.cachedViews.includes(route.name)) {
        if (route.meta.isKeepAlive) return;
        this.removeCachedViews(route.name);
      } else {
        this.cachedViews.push(route.name);
      }
      this.addLocalCachedViews();
    },
    removeVisitedViews(name: string) {
      this.visitedViews = this.visitedViews.filter(v => v.name !== name);
    },
    removeCachedViews(name: string) {
      this.cachedViews = this.cachedViews.filter(v => v !== name);
    },
    addTagView(route: Menu) {
      this.addCachedViews(route);
      this.addVisitedViews(route);
    },
    addLocalVisitedViews() {
      Local.set("visitedViews", this.visitedViews);
    },
    addLocalCachedViews() {
      Local.set("cachedViews", this.cachedViews);
    },
  },
});
