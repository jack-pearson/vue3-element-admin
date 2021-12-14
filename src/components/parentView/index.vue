<!--
 * @Author: jack-pearson
 * @Date: 2021-12-14 14:32:47
 * @LastEditTime: 2021-12-14 15:13:40
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/parentView/index.vue
 * @Description: 
-->
<template>
  <router-view />
</template>
<script lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
console.log(router, "router");
</script>
<style lang="scss" scoped></style>
