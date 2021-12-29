<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:43:53
 * @LastEditTime: 2021-12-29 18:36:02
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/menu/index.vue
 * @Description: 
-->
<template>
  <div class="layout-aside-container !h-full">
    <el-aside class="layout-aside h-full flex">
      <el-scrollbar class="flex-1">
        <!-- <div v-for="item in routerList" :key="item.id" class="test p-5">{{ $t }}</div> -->
        <div class="test p-5">123</div>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.layout-aside-container {
  .layout-aside {
    width: 220px;
    background-color: #545c64;
    .test {
      background-color: var(--color-primary);
      &:hover {
        background-color: var(--color-primary-6);
      }
      &:active {
        background-color: var(--color-primary-4);
      }
    }
  }
}
</style>
