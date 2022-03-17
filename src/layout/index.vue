<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:32:15
 * @LastEditTime: 2022-01-14 18:29:14
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container h-full">
    <Menu />
    <div class="layout-container-main w-full h-full" :class="{ 'is-collapsed': isCollapsed }">
      <Navbar />
      <TagView v-if="hasTagsView" />
      <Main />
    </div>
  </el-container>
</template>

<script setup lang="ts">
import Menu from "./sidebar/sidebar.vue";
import Main from "./main/index.vue";
import Navbar from "./navbar/index.vue";
import TagView from "./tagView/index.vue";
import { settingsStore } from "@/store";
import { computed } from "vue";
const settingsState = settingsStore();
const isCollapsed = computed(() => settingsState.config.isCollapsed);
const hasTagsView = computed(() => settingsState.config.hasTagsView);
</script>

<style scoped lang="scss">
.layout-container {
  .layout-container-main {
    width: calc(100% - 220px);
    transition: width 0.28s;
    &.is-collapsed {
      width: calc(100% - 64px);
    }
  }
}
</style>

<script lang="ts">
export default { name: "Layout" };
</script>
