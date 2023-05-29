<template>
  <header class="layout-navbar bg-$color-white w-full h-12 flex justify-between items-center">
    <div class="navbar-left flex items-center h-full">
      <LayoutHamburger v-if="settingsState.config.hasClipboard" />
      <LayoutBreadcrumb v-if="settingsState.config.hasBreadcrumb" />
    </div>
    <div class="navbar-action flex justify-end items-center h-full">
      <LayoutSearch v-if="settingsState.config.hasSearch" />
      <LayoutZiTiSize v-if="settingsState.config.hasZiTi" />
      <LayoutLanguage v-if="settingsState.config.hasLanguage" />
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
  border-bottom: 1px solid #f1f2f3;
  .navbar-action {
    min-width: 200px;
  }
}
</style>
