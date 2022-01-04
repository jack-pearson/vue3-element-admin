<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:29:18
 * @LastEditTime: 2022-01-04 15:21:51
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/hamburger.vue
 * @Description: 
-->

<template>
  <div class="hamburger-wrapper pl-2 pr-2 h-full flex items-center justify-center" :class="{ 'is-collapsed': !settingsConfig.isCollapsed }" @click="toggleClick">
    <svg-icon name="hamburger"></svg-icon>
  </div>
</template>
<script setup lang="ts">
import { settingsStore } from "@/store";
const settingsConfig = settingsStore();
const toggleClick = () => {
  settingsConfig.setIsCollapsed(!settingsConfig.isCollapsed);
};
</script>
<style lang="scss" scoped>
.hamburger-wrapper {
  user-select: none;
  &.is-collapsed {
    transform: rotate(180deg);
  }
}
</style>

<script lang="ts">
export default { name: "Hamburger" };
</script>
