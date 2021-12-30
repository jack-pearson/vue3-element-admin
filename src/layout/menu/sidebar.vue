<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:43:53
 * @LastEditTime: 2021-12-30 17:39:41
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/menu/sidebar.vue
 * @Description: 
-->
<template>
  <div class="layout-aside-container !h-full">
    <el-aside class="layout-aside h-full flex">
      <el-scrollbar class="flex-1">
        <el-menu class="flex-auto overflow-y-auto" router :default-active="activeMenu" background-color="transparent" mode="vertical" :collapse-transition="false" :uniqueOpened="true">
          <SidebarItem v-for="item in menuList" :key="item.id" :route="item" :base-path="item.path" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script lang="ts">
export default { name: "Sidebar" };
</script>

<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { computed } from "vue";
import { routerState } from "@/store";
import { useRoute } from "vue-router";
const state = routerState();
const { routerList: menuList } = state.$state;
const currentRoute = useRoute();
const activeMenu = computed(() => currentRoute.path);
</script>

<style scoped lang="scss">
.layout-aside-container {
  .layout-aside {
    width: 220px;
    background-color: #545c64;
    .test {
      background-color: var(--color-primary);
      &:hover {
        background-color: var(--color-primary-6);
      }
      &:active {
        background-color: var(--color-primary-4);
      }
    }
  }
}
</style>
