import { defineStore } from "pinia";
import { Menu, TagViewStoreType } from "@/types";
import { route } from "@/hooks";
export const createTagView = (): TagViewStoreType => {
  return {
    visitedViews: [],
    cachedViews: [],
  };
};

export const tagViewStore = defineStore("tagViewStore", {
  state: createTagView,
  actions: {
    addVisitedViews(route: Menu) {
      if (this.visitedViews.find((item) => item.name === route.name)) return;
      this.visitedViews.push(route);
    },
    addCachedViews(route: Menu) {
      if (this.cachedViews.includes(route.name)) {
        if (route.meta.isKeepAlive) return;
        this.removeCachedViews(route.name);
      } else {
        this.cachedViews.push(route.name);
      }
    },
    removeVisitedViews(route: Menu) {
      this.visitedViews = this.visitedViews.filter((v) => v.name !== route.name);
    },
    removeCachedViews(name: string) {
      this.cachedViews = this.cachedViews.filter((v) => v !== name);
    },
    addTagView(route: Menu) {
      this.addCachedViews(route);
      this.addVisitedViews(route);
    },
    closeLeftTagView() {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.value.name);
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item;
        if (index >= findIndex) {
          return item;
        }
      });
    },
    closeRightTagView() {
      const findIndex = this.visitedViews.findIndex((item) => item.name === route.value.name);
      this.visitedViews = this.visitedViews.filter((item, index) => {
        if (item.meta.isAffix) return item;
        if (findIndex >= index) {
          return item;
        }
      });
    },
    closeOtherTagView() {
      const emitAffixList = this.visitedViews.filter((item) => item.meta.isAffix);
      this.visitedViews = emitAffixList.concat(this.visitedViews.filter((item) => item.name === route.value.name));
    },
    closeAllTagView() {
      this.visitedViews = this.visitedViews.filter((item) => item.meta.isAffix);
    },
  },
});
