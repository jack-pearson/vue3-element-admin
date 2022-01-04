<!--
 * @Author: jack-pearson
 * @Date: 2022-01-04 11:02:01
 * @LastEditTime: 2022-01-04 16:49:07
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/breadcrumb.vue
 * @Description: 
-->

<template>
  <div class="breadcrumb-wrapper pl-2">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="item in breadcrumb" :to="{ path: item.to }" :key="item.to">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouteLocationMatched } from "vue-router";
import { i18nRouter } from "@/utils";
const route = useRoute();
const { matched } = route;
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
const breadcrumb = getMenuRedirect(matched.filter(item => item.path !== "/"));
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: "Breadcrumb" };
</script>
