<template>
  <div v-if="!isHide(route)" class="w-full sidebar-item" :class="{ 'is-collapsed': settingsConfig.config.isCollapsed }">
    <template v-if="!hasChildren(route)">
      <el-menu-item class="sub-menu select-none" :index="route.path">
        <template #title>
          <svg-icon :name="route.meta.icon"></svg-icon>
          <span class="ml-3.5">{{ route.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else class="sub-menu select-none" :index="route.path" teleported>
      <template #title>
        <svg-icon :name="route.meta.icon"></svg-icon>
        <span v-show="!settingsConfig.config.isCollapsed" class="ml-3.5">{{ route.meta.title }}</span>
      </template>
      <SidebarItem v-for="child in route.children" :key="child.id" :route="child" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<script setup lang="ts">
import { isHide, hasChildren } from '@/utils'
import { toRefs } from 'vue'
import { settingsStore } from '@/store'
import type { IRouter } from '@/types'
const props = defineProps<{ route: IRouter }>()
const { route } = toRefs(props)
const settingsConfig = settingsStore()
</script>

<style lang="scss" scoped>
.sidebar-item {
  .sub-menu {
    color: var(--menu-default-color);
    :deep(.el-sub-menu__title) {
      color: var(--menu-default-color);
      padding-right: 0px;
      &:hover {
        color: var(--el-menu-active-color);
      }
    }
    &.el-menu-item:hover {
      color: var(--el-menu-active-color);
    }
    &.el-menu-item.is-active {
      background-color: transparent;
      color: var(--el-menu-active-color);
    }
  }
  &.is-collapsed {
    :deep(.el-sub-menu__icon-arrow) {
      display: none;
    }
  }
  .svg-icon {
    font-size: 16px;
  }
}
</style>
