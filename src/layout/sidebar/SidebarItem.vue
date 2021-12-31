<!--
 * @Author: jack-pearson
 * @Date: 2021-12-30 15:18:38
 * @LastEditTime: 2021-12-31 17:28:51
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/sidebar/SidebarItem.vue
 * @Description: 
-->
<template>
  <div v-if="!isHide(route)" class="w-full">
    <template v-if="!hasChildren(route)">
      <el-menu-item class="sub-menu" :index="route.path">
        <template #title>
          <svg-icon :name="route.meta.icon"></svg-icon>
          <span class="ml-3.5">{{ i18nRouter(route.meta.title) }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else class="sub-menu" :index="route.path" popper-append-to-body>
      <template #title>
        <svg-icon :name="route.meta.icon"></svg-icon>
        <span class="ml-3.5">{{ i18nRouter(route.meta.title) }}</span>
      </template>
      <SidebarItem v-for="child in route.children" :key="child.id" :route="child" />
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
import { defineProps, toRefs } from "vue";
import { Menu } from "@/types";
const props = defineProps<{ route: Menu }>();
const { route } = toRefs(props);
</script>

<style lang="scss" scoped>
.sub-menu {
  user-select: none;
  color: var(--menu-default-color);
  :deep(.el-sub-menu__title) {
    color: var(--menu-default-color);
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
