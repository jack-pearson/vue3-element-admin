<template>
  <div class="layout-breadcrumb pl-2">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-if="route.path !== '/home'" :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationMatched } from 'vue-router'
import { route } from '@/hooks'

const getMenuRedirect = (breadcrumb: RouteLocationMatched[]) =>
  breadcrumb.map(({ meta, path }) => ({
    title: meta.title,
    path
  }))

const breadcrumb = computed(() => getMenuRedirect(route.value.matched.filter((item) => item.path !== '/')))
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: 'LayoutBreadcrumb' }
</script>
