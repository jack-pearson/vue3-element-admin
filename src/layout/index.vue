<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:32:15
 * @LastEditTime: 2022-01-11 16:51:10
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container w-full h-full">
    <Menu />
    <div class="w-full h-full">
      <Navbar />
      <TagView />
      <Main />
    </div>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./sidebar/sidebar.vue";
import Main from "./main/index.vue";
import Navbar from "./navbar/index.vue";
import TagView from "./tagView/index.vue";
</script>

<style scoped lang="scss"></style>

<script lang="ts">
export default { name: "Layout" };
</script>
