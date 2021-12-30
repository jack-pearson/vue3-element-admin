<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:32:15
 * @LastEditTime: 2021-12-30 17:32:06
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container w-full h-full">
    <Menu />
    <Main />
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./menu/sidebar.vue";
import Main from "./main/index.vue";
</script>

<style scoped lang="scss"></style>
