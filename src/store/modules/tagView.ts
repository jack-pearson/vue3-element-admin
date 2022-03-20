/*
 * @Author: jack-pearson
 * @Date: 2022-01-11 15:10:49
 * @LastEditTime: 2022-01-18 15:39:57
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/store/modules/tagView.ts
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
import { defineStore } from "pinia";
import { Menu, TagViewStoreType } from "@/types";
import { Local } from "@/utils";

export const createTagView = (): TagViewStoreType => {
  return {
    visitedViews: [],
    cachedViews: [],
  };
};

const loadUser = (): TagViewStoreType => {
  const visitedViews = (Local.get("visitedViews") ||
    []) as TagViewStoreType["visitedViews"];
  const cachedViews = (Local.get("cachedViews") ||
    []) as TagViewStoreType["cachedViews"];
  const newUser = Object.assign(createTagView(), { visitedViews, cachedViews });
  return newUser;
};

export const tagViewStore = defineStore("tagViewStore", {
  state: loadUser,
  actions: {
    addVisitedViews(route: Menu) {
      if (this.visitedViews.find((item) => item.name === route.name)) return;
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
    removeVisitedViews(route: Menu) {
      this.visitedViews = this.visitedViews.filter(
        (v) => v.name !== route.name
      );
    },
    removeCachedViews(name: string) {
      this.cachedViews = this.cachedViews.filter((v) => v !== name);
    },
    addTagView(route: Menu) {
      this.addCachedViews(route);
      this.addVisitedViews(route);
    },
    closeLeftTagView(route: Menu) {
      const findIndex = this.visitedViews.findIndex(
        (item) => item.name === route.name
      );
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (index >= findIndex) {
          return item;
        }
      });
    },
    closeRightTagView(route: Menu) {
      const findIndex = this.visitedViews.findIndex(
        (item) => item.name === route.name
      );
      this.visitedViews.splice(findIndex + 1);
    },
    closeOtherTagView(route: Menu) {
      this.visitedViews = this.visitedViews.filter(
        (item) => item.name === route.name
      );
    },
    closeAllTagView() {
      this.visitedViews = [];
    },
    addLocalVisitedViews() {
      Local.set("visitedViews", this.visitedViews);
    },
    addLocalCachedViews() {
      Local.set("cachedViews", this.cachedViews);
    },
  },
});
