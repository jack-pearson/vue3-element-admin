<!--
 * @Author: jack-pearson
 * @Date: 2021-12-07 20:32:15
 * @LastEditTime: 2022-01-12 18:37:51
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/index.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container h-full">
    <Menu />
    <div class="layout-container-main w-full h-full" :class="{ 'is-collapsed': isCollapsed }">
      <Navbar />
      <TagView />
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
const isCollapsed = computed(() => settingsState.isCollapsed);
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
