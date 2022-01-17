<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:37:19
 * @LastEditTime: 2022-01-14 18:39:28
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/main/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-main overflow-y-auto" :class="{ 'is-tagView': !hasTagsView }">
    <LayoutParentView />
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
  height: calc(100% - 84px);
  background: #666;
  &.is-tagView {
    height: calc(100% - 48px);
  }
}
</style>

<script lang="ts">
export default { name: "LayoutMain" };
</script>
