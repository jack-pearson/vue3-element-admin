<!--
 * @Author: jack-pearson
 * @Date: 2022-01-05 11:42:35
 * @LastEditTime: 2022-01-05 12:22:06
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/zitiSize.vue
 * @Description: 
-->
<template>
  <div class="layout-ziti h-full select-none">
    <el-dropdown type="primary" :show-timeout="70" :hide-timeout="50" trigger="click" class="h-full flex items-center">
      <div class="icon-wrapper pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer">
        <svg-icon name="ziti" class="w-full pointer-events-none" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item>Action 4</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
</script>
<style lang="scss" scoped>
.layout-ziti {
  .icon-wrapper {
    color: var(--color-text-primary);
    transition: background 0.28s;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      .svg-icon {
        animation: iconAnimation 0.28s ease-in-out;
      }
    }
  }
  :deep(.el-dropdown--default) {
    height: 100%;
  }
}
</style>

<script lang="ts">
export default { name: "zitiSize" };
</script>
