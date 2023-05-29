<template>
  <el-container class="layout-main overflow-y-auto p-2.5" :class="{ 'is-tagView': !hasTagsView }">
    <div class="w-full h-auto"><LayoutParentView /></div>
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
