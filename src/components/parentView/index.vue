<!--
 * @Author: jack-pearson
 * @Date: 2022-01-12 13:21:59
 * @LastEditTime: 2022-01-14 11:50:44
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/parentView/index.vue
 * @Description: 
-->
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
import { useRoute } from "vue-router";
import { tagViewStore } from "@/store";
import { Menu } from "@/types";
const tagViewState = tagViewStore();
const cachedViews = computed(() => tagViewState.cachedViews) as any;
const route = useRoute();
const cloneRoute = computed(() => {
  return {
    name: route.name,
    path: route.path,
    meta: route.meta,
  };
});
watch(
  cloneRoute,
  newRoute => {
    tagViewState.addTagView(newRoute as Menu);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
<script lang="ts">
export default { name: "ParentView" };
</script>
