<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:10:15
 * @LastEditTime: 2022-01-04 11:18:23
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/index.vue
 * @Description: 
-->

<template>
  <header class="navbar w-full h-12 flex justify-between">
    <div class="navbar-left flex items-center">
      <Hamburger />
      <Breadcrumb />
    </div>
    <div class="navbar-action"></div>
  </header>
</template>
<script lang="ts">
export default { name: "Navbar" };
</script>

<script setup lang="ts">
import Hamburger from "./hamburger.vue";
import Breadcrumb from "./breadcrumb.vue";
</script>
<style lang="scss" scoped>
.navbar {
  line-height: 48px;
  .navbar-left {
  }
  .navbar-action {
    min-width: 200px;
  }
}
</style>
