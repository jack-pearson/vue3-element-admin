<!--
 * @Author: jack-pearson
 * @Date: 2022-01-04 11:02:01
 * @LastEditTime: 2022-01-04 13:51:18
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/breadcrumb.vue
 * @Description: 
-->

<template>
  <div class="breadcrumb-wrapper pl-2">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: "Breadcrumb" };
</script>
