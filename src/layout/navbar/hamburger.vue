<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:29:18
 * @LastEditTime: 2021-12-31 18:52:52
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/hamburger.vue
 * @Description: 
-->

<template>
  <div :class="{ 'hamburger-wrapper': true, 'is-collapsed': settingsConfig.isCollapsed }" @click="toggleClick">
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
  display: inline-block;
  &.is-collapsed {
    transform: rotate(180deg);
  }
}
</style>

<script lang="ts">
export default { name: "Hamburger" };
</script>
