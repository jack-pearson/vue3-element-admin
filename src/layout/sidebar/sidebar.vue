<template>
  <div class="layout-aside-container !h-full" :class="{ 'is-collapsed': settingsConfig.config.isCollapsed }">
    <el-aside class="layout-aside bg-menu-default-bg-color !w-full h-full flex">
      <el-scrollbar class="flex-1">
        <SidebarLogo v-if="settingsConfig.config.hasSidebarLogo" />
        <el-menu
          class="flex-auto overflow-y-auto overflow-x-hidden !border-r-0"
          :class="{ '!h-full': !settingsConfig.config.hasSidebarLogo }"
          :default-active="activeMenu"
          background-color="transparent"
          mode="vertical"
          :collapse="settingsConfig.config.isCollapsed"
          :collapse-transition="false"
          :uniqueOpened="true"
          @select="handleSelect"
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
import { route, router } from "@/hooks";
import { routerStore, settingsStore } from "@/store";
const routerConfig = routerStore();
const settingsConfig = settingsStore();
const { routerList: menuList } = routerConfig.$state;
const activeMenu = computed(() => route.value.path);
const handleSelect = (key: string) => {
  if (key !== activeMenu.value) router.value.push(key);
};
</script>

<style scoped lang="scss">
.layout-aside-container {
  width: 220px;
  transition: width 0.28s;
  &.is-collapsed {
    width: 64px;
  }
}
</style>
