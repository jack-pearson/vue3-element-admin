<!--
 * @Author: jack-pearson
 * @Date: 2022-01-11 14:03:56
 * @LastEditTime: 2022-01-12 18:33:19
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/tagView/index.vue
 * @Description: 
-->
<template>
  <div class="layout-tagView w-full">
    <el-scrollbar class="h-full w-full pl-4 pr-4" ref="scrollbarRef" @wheel.native.prevent="onHandleScroll">
      <ul class="layout-tagView-ul h-full flex items-center">
        <li
          v-for="item in visitedViews"
          :key="item.name"
          :class="{ 'is-active': path === item.path }"
          @click="onHandleClickSwitchRouter(item)"
          class="layout-tagView-ul-li pl-4 pr-4 h-full relative cursor-pointer select-none flex items-center mr-2.5"
        >
          <svg-icon name="tagview-round" class="text-white" v-if="path === item.path"></svg-icon>
          <span>{{ i18nRouter(item.meta.title) }}</span>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance } from "vue";
import { i18nRouter } from "@/utils";
import { tagViewStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { Menu } from "@/types";
const route = useRoute();
const router = useRouter();
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
