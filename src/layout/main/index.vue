<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:37:19
 * @LastEditTime: 2022-01-17 13:59:01
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/main/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-main overflow-y-auto" :class="{ 'is-tagView': !hasTagsView }">
    <el-scrollbar class="layout-main-scrollbar p-4 w-full h-full">
      <LayoutParentView />
    </el-scrollbar>
  </el-container>
</template>

<script setup lang="ts">
import LayoutParentView from "@/layout/routerView/index.vue";
import { computed } from "vue";
import { settingsStore } from "@/store";
const settingsState = settingsStore();
const hasTagsView = computed(() => settingsState.config.hasTagsView);
</script>

<style scoped lang="scss">
.layout-main {
  height: calc(100% - 82px);
  background: #f8f8f8;
  &.is-tagView {
    height: calc(100% - 48px);
  }
  :deep(.el-scrollbar__wrap) {
    max-height: 100%;
  }
}
</style>

<script lang="ts">
export default { name: "LayoutMain" };
</script>
