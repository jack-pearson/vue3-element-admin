<template>
  <div class="layout-tagView w-full bg-color-white">
    <el-scrollbar class="h-full w-full pl-4 pr-4" ref="scrollbarRef" @wheel.prevent="onHandleScroll">
      <ul class="layout-tagView-ul h-full flex items-center">
        <li
          v-for="item in visitedViews"
          :key="item.name"
          :class="{
            'is-active text-color-white bg-el-color-primary': path === item.path
          }"
          @click="onHandleClickSwitchRouter(item)"
          @contextmenu="onHandleContextMenu($event, item)"
          class="layout-tagView-ul-li pl-2 pr-2 h-full mr-2.5 relative cursor-pointer select-none flex items-center"
        >
          <svg-icon name="tagview-round" class="text-white mr-1" v-if="path === item.path"></svg-icon>
          <span>{{ item.meta.title }}</span>
          <div
            v-if="visitedViews.length > 1 && !item.meta.isAffix"
            :class="{ 'ml-1': path !== item.path }"
            class="close-wrapper rounded-full w-4 h-4 flex items-center justify-center"
            @click.stop="onHandleCloseTag(item)"
          >
            <svg-icon name="close"></svg-icon>
          </div>
        </li>
      </ul>
    </el-scrollbar>
    <ContextMenu ref="contextmenuRef" />
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { route, router } from '@/hooks'
import ContextMenu from './contextmenu.vue'
import { tagViewStore } from '@/store'
import type { IRouter } from '@/types'

const contextmenuRef = ref<any>(null)
const tagViewState = tagViewStore()
const { proxy } = getCurrentInstance() as any
const visitedViews = computed(() => tagViewState.visitedViews)
console.log(visitedViews, 'visitedViews')
const path = computed(() => route.value.path)
const onHandleClickSwitchRouter = (item: IRouter) => {
  if (item.path === path.value) return
  router.value.push(item.path)
}
const onHandleScroll = (e: any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  proxy.$refs.scrollbarRef.$refs.wrapRef.scrollLeft = eventDelta
}

const onHandleCloseTag = (v: IRouter) => {
  const findIndex = visitedViews.value.findIndex((t: IRouter) => t.path === v.path)
  const len = visitedViews.value.length
  if (len === 0) return
  if (path.value === v.path) {
    if (findIndex === len - 1) {
      router.value.push(visitedViews.value[findIndex - 1].path)
    } else {
      router.value.push(visitedViews.value[findIndex + 1].path)
    }
  }
  tagViewState.removeCachedViews(v)
  tagViewState.removeVisitedViews(v)
}
const onHandleContextMenu = (e: MouseEvent, item: IRouter) => {
  const { x, y } = e
  e.preventDefault()
  contextmenuRef.value.openContextmenu({ x, y, current: item })
}
</script>
<style lang="scss" scoped>
.layout-tagView {
  height: 40px;
  border-bottom: 1px solid #f1f2f3;
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  .layout-tagView-ul {
    .layout-tagView-ul-li {
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      font-size: 12px;
      height: 26px;
      flex-shrink: 0;
      .close-wrapper,
      .refresh-wrapper {
        transition: background 0.28s;
        .svg-icon {
          font-size: 8px;
          animation: iconAnimation 0.28s ease-in-out;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.4);
          .svg-icon {
            color: var(--color-white);
            animation: iconAnimation 0.28s ease-in-out;
          }
        }
      }
      &.is-active {
        border-color: var(--el-color-primary-dark-2);
      }
      &:hover:not(.is-active) {
        background: var(--el-color-primary-light-7);
        color: var(--el-color-primary-dark-2);
        border-color: var(--el-color-primary);
      }
    }
  }
}
</style>

<script lang="ts">
export default { name: 'LayoutTagView' }
</script>
