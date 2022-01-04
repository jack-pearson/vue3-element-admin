<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:51:06
 * @LastEditTime: 2022-01-04 15:26:53
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/sidebar/sidebarLogo.vue
 * @Description: 
-->

<template>
  <div class="sidebar-logo w-full flex items-center justify-center h-auto p-1.5">
    <img :src="logo" alt="logo" class="logo w-12 h-12" />
    <div class="logo-title" :class="{ 'opacity-0': settingsConfig.isCollapsed }">titletitletitletitletitletitletitletitletitle</div>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/logo.png";
import { settingsStore } from "@/store";
const settingsConfig = settingsStore();
</script>
<style lang="scss" scoped>
.sidebar-logo {
  transition: width 0.28s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
  }
  .logo-title {
    @include text-no-wrap();
    padding-left: 10px;
    color: var(--menu-default-color);
    transition: opacity 0.28s;
  }
}
</style>
<script lang="ts">
export default { name: "SidebarLogo" };
</script>
