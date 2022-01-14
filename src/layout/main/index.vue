<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:37:19
 * @LastEditTime: 2022-01-14 11:52:13
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
import LayoutParentView from "@/layout/routerView/index.vue";
</script>

<style scoped lang="scss"></style>

<script lang="ts">
export default { name: "LayoutMain" };
</script>
