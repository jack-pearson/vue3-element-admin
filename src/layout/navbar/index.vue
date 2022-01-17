<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:10:15
 * @LastEditTime: 2022-01-17 10:33:59
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/index.vue
 * @Description: 
-->

<template>
  <header class="layout-navbar w-full h-12 flex justify-between">
    <div class="navbar-left flex items-center">
      <LayoutHamburger />
      <LayoutBreadcrumb />
    </div>
    <div class="navbar-action flex justify-end items-center">
      <LayoutSearch />
      <LayoutZiTiSize />
      <LayoutLanguage />
      <LayoutSettings v-if="settingsState.config.hasGlobalSettings" />
      <LayoutUser />
    </div>
  </header>
</template>
<script lang="ts">
export default { name: "LayoutNavbar" };
</script>

<script setup lang="ts">
import LayoutHamburger from "./hamburger.vue";
import LayoutBreadcrumb from "./breadcrumb.vue";
import LayoutSearch from "./search.vue";
import LayoutZiTiSize from "./zitiSize.vue";
import LayoutLanguage from "./language.vue";
import LayoutSettings from "./settings.vue";
import LayoutUser from "./user.vue";
import { settingsStore } from "@/store";

const settingsState = settingsStore();
</script>
<style lang="scss" scoped>
.layout-navbar {
  line-height: 48px;
  border-bottom: 1px solid #f1f2f3;
  background: var(--color-white);
  .navbar-action {
    min-width: 200px;
  }
}
</style>
