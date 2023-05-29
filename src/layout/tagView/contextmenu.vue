<template>
  <transition name="el-zoom-in-center">
    <div aria-hidden="true" class="context-menu fixed" :style="style" v-if="open">
      <ul class="context-menu-ul bg-white pt-2 rounded pb-2 text-black">
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleRefreshTag">刷新</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleCloseOther">关闭其他</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleCloseLeft">关闭左边</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleCloseRight">关闭右边</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1" @click="onHandleCloseAll">关闭全部</li>
        <li class="context-menu-ul-li pl-4 pr-4 pt-1 pb-1">当前页全屏</li>
      </ul>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { tagViewStore } from "@/store";
import { Menu } from "@/types";

const route = useRoute();
const router = useRouter();
const open = ref<boolean>(false);
const tagViewState = tagViewStore();
const style = reactive({
  left: "0px",
  top: "0px",
  "z-index": 9999,
});

const onHandleRefreshTag = () => {
  router.push({
    path: "/redirect" + route.path,
    query: route.query,
  });
};
const closeContextmenu = () => {
  open.value = false;
};

const onHandleCloseOther = () => {
  tagViewState.closeOtherTagView();
};
const onHandleCloseRight = () => {
  tagViewState.closeRightTagView();
};
const onHandleCloseLeft = () => {
  tagViewState.closeLeftTagView();
};
const onHandleCloseAll = () => {
  tagViewState.closeAllTagView();
  router.push("/");
};

// eslint-disable-next-line no-unused-vars
const openContextmenu = ({ x, y }: { x: number; y: number; current: Menu }) => {
  open.value = true;
  style.left = `${x}px`;
  style.top = `${y}px`;
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
      background: linear-gradient(45deg, var(--el-color-primary), var(--el-color-primary-light-7));
    }
  }
}
</style>

<script lang="ts">
export default { name: "ContextMenu" };
</script>
