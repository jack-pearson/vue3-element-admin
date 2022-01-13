<!--
 * @Author: jack-pearson
 * @Date: 2022-01-11 14:03:56
 * @LastEditTime: 2022-01-13 18:02:21
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/tagView/index.vue
 * @Description: 
-->
<template>
  <div class="layout-tagView w-full">
    <el-scrollbar class="h-full w-full pl-4 pr-4" ref="scrollbarRef" @wheel.prevent="onHandleScroll">
      <ul class="layout-tagView-ul h-full flex items-center">
        <li
          v-for="item in visitedViews"
          :key="item.name"
          :class="{ 'is-active': path === item.path }"
          @click="onHandleClickSwitchRouter(item)"
          @contextmenu="onHandleContextMenu($event, item)"
          class="layout-tagView-ul-li pl-4 pr-4 h-full relative cursor-pointer select-none flex items-center mr-2.5"
        >
          <svg-icon name="tagview-round" class="text-white mr-1" v-if="path === item.path"></svg-icon>
          <span>{{ i18nRouter(item.meta.title) }}</span>
          <div v-if="path === item.path" class="refresh-wrapper rounded-full ml-1 w-4 h-4 flex items-center justify-center" @click.stop="onHandleRefreshTag(item)">
            <svg-icon name="refresh"></svg-icon>
          </div>
          <div :class="{ 'ml-1': path !== item.path }" class="close-wrapper rounded-full w-4 h-4 flex items-center justify-center" @click.stop="onHandleCloseTag(item)" v-if="visitedViews.length > 1">
            <svg-icon name="close"></svg-icon>
          </div>
        </li>
      </ul>
    </el-scrollbar>
    <ContextMenu ref="contextmenuRef" />
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ContextMenu from "./contextmenu.vue";
import { i18nRouter } from "@/utils";
import { tagViewStore } from "@/store";
import { Menu } from "@/types";

const route = useRoute();
const router = useRouter();
const contextmenuRef = ref<any>(null);
const tagViewState = tagViewStore();
const { proxy } = getCurrentInstance() as any;
const visitedViews = computed(() => tagViewState.visitedViews);
const path = computed(() => route.path);
const onHandleClickSwitchRouter = (item: Menu) => {
  if (item.path === path.value) return;
  router.push(item.path);
};
const onHandleScroll = (e: any) => {
  proxy.$refs.scrollbarRef.$refs.wrap$.scrollLeft += e.wheelDelta / 2;
};

const onHandleRefreshTag = (item: Menu) => {
  // TODO 待完成
  console.log(item);
};
const onHandleCloseTag = (v: Menu) => {
  contextmenuRef.value.onEmitClose(v);
};
const onHandleContextMenu = (e: MouseEvent, item: Menu) => {
  const { x, y } = e;
  e.preventDefault();
  contextmenuRef.value.openContextmenu({ x, y, current: item });
};
</script>
<style lang="scss" scoped>
.layout-tagView {
  height: 34px;
  border-bottom: 1px solid #f1f2f3;
  background: var(--color-white);
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  .layout-tagView-ul {
    white-space: nowrap;
    .layout-tagView-ul-li {
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      font-size: 12px;
      height: 26px;
      .close-wrapper,
      .refresh-wrapper {
        color: var(--color-text-primary);
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
        background: var(--color-primary-1);
        color: var(--color-white);
        border-color: var(--color-primary-1);
      }
      &:hover:not(.is-active) {
        background: var(--color-primary-9);
        color: var(--color-primary-1);
        border-color: var(--color-primary);
      }
    }
  }
}
</style>

<script lang="ts">
export default { name: "LayoutTagView" };
</script>