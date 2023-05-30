<template>
  <div class="layout-search h-full select-none">
    <div class="icon-wrapper text-$color-text-primary pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer" @click="openSearch">
      <svg-icon name="search" class="w-full" />
    </div>
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
            <svg-icon :name="item.meta.icon"></svg-icon>
            <span class="pl-2">{{ i18nRouter(item.meta.title) }}</span>
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
// import { useRouter } from "vue-router";
import { routerStore } from "@/store";
import { i18nRouter, routeTreeToArray } from "@/utils";
import { Menu } from "@/types";
const { routerList: menuList } = routerStore();
const openDialog = ref(false);
// const router = useRouter();
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
  return routeTreeToArray(menuList).map((item) => (item.isHide ? null : item));
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
// const selectMenu = (val: Menu) => {
//   router.push(val.path);
//   openDialog.value = false;
// };
const closeSearch = () => {
  menuQuery.value = "";
  openDialog.value = false;
};
</script>
<style lang="scss" scoped>
.layout-search {
  .icon-wrapper {
    transition: background 0.28s;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      .svg-icon {
        animation: iconAnimation 0.28s ease-in-out;
      }
    }
  }
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
export default { name: "LayoutSearch" };
</script>
