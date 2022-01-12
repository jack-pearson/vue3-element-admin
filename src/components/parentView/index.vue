<!--
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:32:47
 * @LastEditTime: 2022-01-12 18:01:07
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/parentView/index.vue
 * @Description: 
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-right" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
<script lang="ts">
export default { name: "ParentView" };
</script>
