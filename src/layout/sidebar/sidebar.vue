<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:43:53
 * @LastEditTime: 2022-01-17 10:17:25
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/sidebar/sidebar.vue
 * @Description: 
-->
<template>
  <div class="layout-aside-container !h-full" :class="{ 'is-collapsed': settingsConfig.config.isCollapsed }">
    <el-aside class="layout-aside w-full h-full flex">
      <el-scrollbar class="flex-1">
        <SidebarLogo v-if="settingsConfig.config.hasSidebarLogo" />
        <el-menu
          class="flex-auto overflow-y-auto overflow-x-hidden border-r-0"
          :class="!settingsConfig.config.hasSidebarLogo ? '!h-full' : ''"
          router
          :default-active="activeMenu"
          background-color="transparent"
          mode="vertical"
          :collapse="settingsConfig.config.isCollapsed"
          :collapse-transition="false"
          :uniqueOpened="true"
        >
          <SidebarItem v-for="item in menuList" :key="item.id" :route="item" />
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
import SidebarLogo from "./sidebarLogo.vue";
import { computed } from "vue";
import { routerStore, settingsStore } from "@/store";
import { useRoute } from "vue-router";
const routerConfig = routerStore();
const settingsConfig = settingsStore();
const { routerList: menuList } = routerConfig.$state;
const currentRoute = useRoute();
const activeMenu = computed(() => currentRoute.path);
</script>

<style scoped lang="scss">
.layout-aside-container {
  width: 220px;
  transition: width 0.28s;
  &.is-collapsed {
    width: 64px;
  }
  .layout-aside {
    background-color: var(--menu-default-bg-color);
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
