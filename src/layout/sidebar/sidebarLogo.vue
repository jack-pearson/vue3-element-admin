<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:51:06
 * @LastEditTime: 2022-03-17 11:35:29
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/layout/sidebar/sidebarLogo.vue
 * @Description:  https://github.com/jack-pearson/vue3-element-admin 
-->

<template>
  <div
    class="sidebar-logo w-full flex items-center justify-center h-auto p-1.5"
  >
    <img
      :src="logo"
      alt="logo"
      class="logo w-12 h-12 cursor-pointer select-none"
    />
    <div
      class="logo-title text-$menu-default-color truncate pl-2.5"
      :class="{ 'opacity-0': settingsConfig.isCollapsed }"
    >
      {{ fixedStore.logoTitle }}
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/img/logo.png";
import { settingsStore } from "@/store";
import { computed } from "vue";
const settings = settingsStore();
const settingsConfig = computed(() => settings.config);
const { fixed: fixedStore } = settings;
</script>
<style lang="scss" scoped>
.sidebar-logo {
  transition: width 0.28s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .logo-title {
    transition: opacity 0.28s;
  }
}
</style>
<script lang="ts">
export default { name: "SidebarLogo" };
</script>
