<!--
 * @Author: jack-pearson
 * @Date: 2022-01-04 17:48:42
 * @LastEditTime: 2022-01-05 11:22:08
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/search.vue
 * @Description: 
-->
<template>
  <div class="layout-search">
    <svg-icon name="search" @click="openSearch" />
    <el-dialog v-model="openDialog" destroy-on-close :modal="false" fullscreen :show-close="false">
      <el-autocomplete
        v-model="menuQuery"
        :fetch-suggestions="menuSearch"
        :placeholder="$t('messages.layout.searchPlaceholder')"
        :prefix-icon="Search"
        ref="layoutSearchAutocompleteRef"
        @blur="closeSearch"
      >
        <template #default="{ item }">
          <div class="flex items-center">
            <svg-icon :name="item.meta.icon"></svg-icon> <span class="pl-2">{{ i18nRouter(item.meta.title) }}</span>
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import { routerState } from "@/store";
import { Search } from "@element-plus/icons-vue";
import { i18nRouter, routeTreeToArray } from "@/utils";
import { Menu } from "@/types";
const { routerList: menuList } = routerState();
const openDialog = ref(false);
const menuSearch = (queryString: string, callback: Function) => {
  const result = menu.filter(menuQueryChange(queryString));
  callback(result);
};
const layoutSearchAutocompleteRef = ref();
const menuQuery = ref("");
const openSearch = () => {
  openDialog.value = true;
  nextTick(() => {
    menuQuery.value = "";
    layoutSearchAutocompleteRef.value.focus();
  });
};
const filterMenuList = (menuList: Menu[]) => {
  return routeTreeToArray(menuList).map(item => (item.isHide ? null : item));
};
const menu = filterMenuList(menuList);
const menuQueryChange = (queryString: string) => {
  return (restaurant: any) => {
    const result =
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      i18nRouter(restaurant.meta.title).indexOf(queryString.toLowerCase()) > -1;
    return result;
  };
};

const closeSearch = () => {
  menuQuery.value = "";
  openDialog.value = false;
};
</script>
<style lang="scss" scoped>
.layout-search {
  ::v-deep(.el-dialog) {
    box-shadow: unset !important;
    border-radius: 0 !important;
    background: rgba(0, 0, 0, 0.5);
  }
  ::v-deep(.el-autocomplete) {
    width: 560px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
<script lang="ts">
export default { name: "Search" };
</script>
