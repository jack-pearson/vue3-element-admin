<!--
 * @Author: jack-pearson
 * @Date: 2022-01-04 11:02:01
 * @LastEditTime: 2022-01-10 17:27:27
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/breadcrumb.vue
 * @Description: 
-->

<template>
  <div class="layout-breadcrumb pl-2">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="item in breadcrumb" :to="{ path: item.to }" :key="item.to">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import { i18nRouter } from "@/utils";
const route = useRoute();
const getMenuRedirect = (breadcrumb: RouteLocationMatched[]) => {
  return breadcrumb.map(item => {
    return {
      ...item,
      meta: {
        ...item.meta,
        title: i18nRouter(item.meta.title as string),
      },
      to: item.children && item.children.length ? item.redirect : item.path,
    };
  });
};
const breadcrumb = computed(() => {
  const { matched } = route;
  return getMenuRedirect(matched.filter(item => item.path !== "/"));
});
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: "LayoutBreadcrumb" };
</script>
