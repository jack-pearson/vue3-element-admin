<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:37:19
 * @LastEditTime: 2022-01-12 13:23:40
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/main/index.vue
 * @Description: 
-->
<template>
  <el-container>
    <LayoutParentView />
  </el-container>
</template>

<script setup lang="ts">
import LayoutParentView from "@/layout/router-view/index.vue";
</script>

<style scoped lang="scss"></style>

<script lang="ts">
export default { name: "LayoutMain" };
</script>
