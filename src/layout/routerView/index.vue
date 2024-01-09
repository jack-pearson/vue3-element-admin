<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-right" appear mode="out-in">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import { watch, computed } from "vue";
import { route } from "@/hooks";
import { tagViewStore } from "@/store";
import { Menu } from "@/types";
const tagViewState = tagViewStore();
const cachedViews = computed(() => tagViewState.cachedViews) as any;
const cloneRoute = computed(() => {
  return {
    name: route.value.name,
    path: route.value.path,
    meta: route.value.meta,
  };
}) as any;
watch(
  cloneRoute,
  (newRoute: Menu) => {
    if (newRoute.meta.isTagView) {
      tagViewState.addTagView(newRoute);
    }
  },
  { immediate: true },
);
</script>
<style lang="scss" scoped></style>
<script lang="ts">
export default { name: "LayoutParentView" };
</script>
