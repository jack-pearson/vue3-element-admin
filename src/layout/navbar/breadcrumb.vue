<template>
  <div class="layout-breadcrumb pl-2">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-if="route.path !== '/home'" :to="{ path: '/' }">{{ i18nRouter("home") }}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import { i18nRouter } from "@/utils";
const route = useRoute();

const getMenuRedirect = (breadcrumb: RouteLocationMatched[]) =>
  breadcrumb.map(({ meta, path }) => ({
    title: i18nRouter(meta.title as string),
    path,
  }));

const breadcrumb = computed(() => getMenuRedirect(route.matched.filter((item) => item.path !== "/")));
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: "LayoutBreadcrumb" };
</script>
