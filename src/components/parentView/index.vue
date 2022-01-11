<!--
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:32:47
 * @LastEditTime: 2022-01-11 18:44:05
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/parentView/index.vue
 * @Description: 
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
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
const tagViewState = tagViewStore();
const cachedViews = computed(() => tagViewState.cachedViews) as any;
const route = useRoute();
watch(
  () => route,
  val => {
    // TODO: 这个地方会打印多次, 需要解决
    console.warn(val);
    tagViewState.addTagView(val);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<style lang="scss" scoped></style>
<script lang="ts">
export default { name: "ParentView" };
</script>
