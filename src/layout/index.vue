<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:32:15
 * @LastEditTime: 2021-12-31 18:31:38
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container w-full h-full">
    <Menu />
    <div class="w-full h-full">
      <Navbar />
      <Main />
    </div>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./sidebar/sidebar.vue";
import Main from "./main/index.vue";
import Navbar from "./navbar/index.vue";
</script>

<style scoped lang="scss"></style>
