<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:29:18
 * @LastEditTime: 2022-01-18 15:47:52
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/hamburger.vue
 * @Description: 
-->

<template>
  <div class="layout-hamburger pl-2 pr-2 h-full flex items-center justify-center select-none select-none" :class="{ 'is-collapsed': !settingsConfig.config.isCollapsed }" @click="toggleClick">
    <svg-icon name="hamburger"></svg-icon>
  </div>
</template>
<script setup lang="ts">
import { settingsStore } from "@/store";
const settingsConfig = settingsStore();
const toggleClick = () => {
  settingsConfig.setIsCollapsed(!settingsConfig.config.isCollapsed);
};
</script>
<style lang="scss" scoped>
.layout-hamburger {
  &.is-collapsed {
    transform: rotate(180deg);
  }
}
</style>

<script lang="ts">
export default { name: "LayoutHamburger" };
</script>
