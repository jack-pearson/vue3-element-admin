<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:51:06
 * @LastEditTime: 2021-12-31 17:28:59
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/sidebar/sidebarLogo.vue
 * @Description: 
-->

<template>
  <div class="sidebar-logo w-full">
    <img :src="logo" alt="logo" class="logo" />
    <div class="logo-title">titletitletitletitletitletitletitletitletitle</div>
  </div>
</template>
<script setup lang="ts">
import logo from "@/assets/logo.png";
</script>
<style lang="scss" scoped>
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 20px;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
  }
  .logo {
    width: 50px;
    height: 50px;
  }
  .logo-title {
    @include text-no-wrap();
    padding-left: 10px;
    color: var(--menu-default-color);
  }
}
</style>
