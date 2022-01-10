<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:10:15
 * @LastEditTime: 2022-01-10 17:46:58
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/index.vue
 * @Description: 
-->

<template>
  <header class="navbar w-full h-12 flex justify-between">
    <div class="navbar-left flex items-center">
      <LayoutHamburger />
      <LayoutBreadcrumb />
    </div>
    <div class="navbar-action flex justify-end items-center">
      <LayoutSearch />
      <LayoutZiTiSize />
      <LayoutLanguage />
    </div>
  </header>
</template>
<script lang="ts">
export default { name: "Navbar" };
</script>

<script setup lang="ts">
import LayoutHamburger from "./hamburger.vue";
import LayoutBreadcrumb from "./breadcrumb.vue";
import LayoutSearch from "./search.vue";
import LayoutZiTiSize from "./zitiSize.vue";
import LayoutLanguage from "./language.vue";
</script>
<style lang="scss" scoped>
.navbar {
  line-height: 48px;
  .navbar-action {
    min-width: 200px;
  }
}
</style>
