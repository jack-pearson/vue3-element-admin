<!--
 * @Author: jack-pearson
 * @Date: 2021-12-30 15:18:38
 * @LastEditTime: 2021-12-30 18:34:29
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/menu/SidebarItem.vue
 * @Description: 
-->
<template>
  <div v-if="!isHide(props.route)" class="w-full">
    <template v-if="!hasChildren(props.route)">
      <el-menu-item class="sub-menu" :index="resolvePath(props.route.path)">
        <template #title>
          <svg-icon :name="props.route.meta.icon"></svg-icon>
          <span class="ml-3.5">{{ i18nRouter(props.route.meta.title) }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else class="sub-menu" :index="resolvePath(props.route.path)" popper-append-to-body>
      <template #title>
        <svg-icon :name="props.route.meta.icon"></svg-icon>
        <span class="ml-3.5">{{ i18nRouter(props.route.meta.title) }}</span>
      </template>
      <SidebarItem v-for="child in route.children" :base-path="resolvePath(child.path)" :key="child.id" :route="child" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
export default {
  name: "SidebarItem",
};
</script>

<script setup lang="ts">
import { isHide, hasChildren, i18nRouter } from "@/utils";
import { defineProps } from "vue";
import { Menu } from "@/types";
const props = defineProps<{ route: Menu; basePath: string }>();
// 是否有 / 前缀
const hasPrefix = (str: string) => /\//.test(str[0]);
// 生成Path
const resolvePath = (basePath: string, currentPath?: string) => {
  if (!hasPrefix(basePath[0])) {
    basePath = "/" + basePath;
  }
  if (currentPath && !hasPrefix(currentPath[0]) && basePath !== "/") {
    currentPath = "/" + currentPath;
  }
  return currentPath ? `${basePath}${currentPath}` : `${basePath}`;
};
</script>

<style lang="scss" scoped>
.sub-menu {
  user-select: none;
  color: #eaeaea;
  :deep(.el-sub-menu__title) {
    color: #eaeaea;
    &:hover {
      color: var(--color-primary-5);
    }
  }
  &:hover {
    background-color: transparent;
    color: var(--color-primary-5);
  }
  &.el-menu-item.is-active {
    background-color: transparent;
    color: var(--color-primary-5);
  }
  &:active {
    color: var(--color-primary-8);
  }
}
</style>
