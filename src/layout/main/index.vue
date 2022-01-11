<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:37:19
 * @LastEditTime: 2022-01-11 16:38:04
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/main/index.vue
 * @Description: 
-->
<template>
  <el-container>
    <ParentView />
  </el-container>
</template>

<script setup lang="ts">
import ParentView from "@/components/parentView/index.vue";
</script>

<style scoped lang="scss"></style>

<script lang="ts">
export default { name: "LayoutMain" };
</script>
