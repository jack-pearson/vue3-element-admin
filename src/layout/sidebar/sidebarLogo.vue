<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:51:06
 * @LastEditTime: 2022-01-11 10:37:24
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/sidebar/sidebarLogo.vue
 * @Description: 
-->

<template>
  <div class="sidebar-logo w-full flex items-center justify-center h-auto p-1.5">
    <img :src="logo" alt="logo" class="logo w-12 h-12 cursor-pointer select-none" />
    <div class="logo-title pl-2.5" :class="{ 'opacity-0': settingsConfig.isCollapsed }">{{ config.logoTitle }}</div>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/img/logo.png";
import { settingsStore } from "@/store";
const settingsConfig = settingsStore();
const { config } = settingsConfig;
</script>
<style lang="scss" scoped>
.sidebar-logo {
  transition: width 0.28s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .logo-title {
    @include text-no-wrap();
    color: var(--menu-default-color);
    transition: opacity 0.28s;
  }
}
</style>
<script lang="ts">
export default { name: "SidebarLogo" };
</script>
