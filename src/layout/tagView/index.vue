<!--
 * @Author: jack-pearson
 * @Date: 2022-01-11 14:03:56
 * @LastEditTime: 2022-01-18 14:40:09
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/tagView/index.vue
 * @Description: 
-->
<template>
  <div class="layout-tagView w-full bg-white">
    <el-scrollbar class="w-full" ref="scrollbarRef" @wheel.prevent="onHandleScroll">
      <ul class="flex">
        <li
          :class="[
            'pr-8 h-10 text-sm select-none flex items-center transition',
            'after:content(`hellow`)',
            path === item.path ?
            'pl-4 bg-$page-bg-color text-$color-primary font-bold cursor-default' :
            'pl-10 text-$color-info hover:(bg-sky-50 text-$text-color-primary) cursor-pointer',
          ]"
          v-for="item in visitedViews"
          :key="item.name"
          @click="onHandleClickSwitchRouter(item)"
          @contextmenu="onHandleContextMenu($event, item)"
        >
          <!-- <svg-icon name="tagview-round" class="text-$color-primary mr-1" v-if="path === item.path"></svg-icon> -->
          <svg-icon
            name="refresh"
            v-if="path === item.path"
            class="h-3 w-3 mr-3 hover:animate-spin"
            @click.stop="onHandleRefreshTag(item)"
          ></svg-icon>
          <span>{{ i18nRouter(item.meta.title) }}</span>
          <svg-icon
            name="close"
            class="ml-6 h-2.5 w-2.5 text-$color-info hover:text-$color-danger-4"
            v-if="visitedViews.length > 1 && !item.meta.isAffix"
            @click.stop="onHandleCloseTag(item)"
          ></svg-icon>
        </li>
      </ul>
    </el-scrollbar>
    <ContextMenu ref="contextmenuRef" />
  </div>
</template>

<script lang="ts">
  export default { name: "LayoutTagView" };
</script>
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
// .layout-tagView {
//   height: 34px;
//   border-bottom: 1px solid #f1f2f3;
//   background: var(--color-white);
//   :deep(.el-scrollbar__view) {
//     height: 100%;
//   }
//   .layout-tagView-ul {
//     white-space: nowrap;
//     .layout-tagView-ul-li {
//       border: 1px solid #e6e6e6;
//       border-radius: 2px;
//       font-size: 12px;
//       height: 26px;
//       .close-wrapper,
//       .refresh-wrapper {
//         color: var(--color-text-primary);
//         transition: background 0.28s;
//         .svg-icon {
//           font-size: 8px;
//           animation: iconAnimation 0.28s ease-in-out;
//         }
//         &:hover {
//           background: rgba(0, 0, 0, 0.4);
//           .svg-icon {
//             color: var(--color-white);
//             animation: iconAnimation 0.28s ease-in-out;
//           }
//         }
//       }
//       &.is-active {
//         background: var(--color-primary);
//         color: var(--color-white);
//         border-color: var(--color-primary-3);
//       }
//       &:hover:not(.is-active) {
//         background: var(--color-primary-9);
//         color: var(--color-primary-1);
//         border-color: var(--color-primary);
//       }
//     }
//   }
// }
</style>
