<!--
 * @Author: jack-pearson
 * @Date: 2022-01-13 13:26:08
 * @LastEditTime: 2022-01-19 11:15:57
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/tagView/contextmenu.vue
 * @Description: 
-->

<template>
  <transition name="el-zoom-in-center">
    <div aria-hidden="true" class="context-menu fixed" :style="style" v-if="open">
      <ul class="context-menu-ul bg-white pt-2 rounded pb-2 text-black">
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1">刷新</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" v-if="hasMenu.close" @click="onHandleClose">关闭</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" v-if="hasMenu.closeOther" @click="onHandleCloseOther">关闭其他</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" v-if="hasMenu.closeLeft" @click="onHandleCloseLeft">关闭左边</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" v-if="hasMenu.closeRight" @click="onHandleCloseRight">关闭右边</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleCloseAll">关闭所有</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1">当前页全屏</li>
      </ul>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tagViewStore } from "@/store";
import { Menu } from "@/types";

const route = useRoute();
const router = useRouter();
const path = computed(() => route.path);
const open = ref<boolean>(false);
const tagViewState = tagViewStore();
const visitedViews = computed(() => tagViewState.visitedViews);
const style = reactive({
  left: "0px",
  top: "0px",
  "z-index": 9999,
});
let hasMenu = reactive({
  close: true,
  closeOther: true,
  closeAll: true,
  closeLeft: true,
  closeRight: true,
});

let currentData: Menu;
const closeContextmenu = () => {
  open.value = false;
};
// eslint-disable-next-line no-unused-vars
const onEmitClose = (route: Menu) => {
  close(route);
};
const onHandleClose = () => {
  close(currentData);
};
const close = (currentData: Menu) => {
  const findIndex = visitedViews.value.findIndex((v: Menu) => v.path === currentData.path);
  const len = visitedViews.value.length;
  if (len === 1) return;
  if (path.value === currentData.path) {
    if (findIndex === len - 1) {
      router.push(visitedViews.value[findIndex - 1].path);
    } else {
      router.push(visitedViews.value[findIndex + 1].path);
    }
  }
  tagViewState.removeVisitedViews(currentData);
};
const onHandleCloseOther = () => {
  tagViewState.closeOtherTagView(currentData);
  router.push(currentData.path);
};
const onHandleCloseRight = () => {
  tagViewState.closeRightTagView(currentData);
  if (path.value === currentData.path) return;
  router.push(currentData.path);
};
const onHandleCloseLeft = () => {
  tagViewState.closeLeftTagView(currentData);
  if (path.value === currentData.path) return;
  router.push(currentData.path);
};
const onHandleCloseAll = () => {
  tagViewState.closeAllTagView();
  router.push("/");
};

// eslint-disable-next-line no-unused-vars
const openContextmenu = ({ x, y, current }: { x: number; y: number; current: Menu }) => {
  hasMenu.closeLeft = true;
  hasMenu.closeRight = true;
  hasMenu.close = true;
  hasMenu.closeAll = true;
  hasMenu.closeOther = true;
  open.value = true;
  style.left = `${x}px`;
  style.top = `${y}px`;
  currentData = current;
  hasChecked(current);
};

const hasChecked = (current: Menu) => {
  const len = visitedViews.value.length;
  if (len <= 1) {
    hasMenu.close = false;
    hasMenu.closeOther = false;
    hasMenu.closeLeft = false;
    hasMenu.closeRight = false;
    hasMenu.closeAll = false;
  }
  const findIndex = visitedViews.value.findIndex(item => item.path === current.path);
  if (findIndex === len - 1) {
    hasMenu.closeRight = false;
  }
  if (findIndex === 0) {
    hasMenu.closeLeft = false;
  }
};

onMounted(() => {
  document.body.addEventListener("click", closeContextmenu);
});
onUnmounted(() => {
  document.body.removeEventListener("click", closeContextmenu);
});
</script>
<style lang="scss" scoped>
.context-menu-ul {
  font-size: 12px;
  .context-menu-ul-li {
    &:hover {
      background: linear-gradient(45deg, var(--color-primary), var(--color-primary-9));
    }
  }
}
</style>

<script lang="ts">
export default { name: "ContextMenu" };
</script>
