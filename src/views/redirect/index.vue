<!--
 * @Author: jack-pearson
 * @Date: 2022-06-21 16:47:40
 * @LastEditTime: 2022-06-21 18:09:59
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/views/redirect/index.vue
 * @Description: 
-->
<template>
  <div></div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
console.log(route);
const { query, params } = route;
const { path } = params;
router.replace({ path: "/" + path, query });
</script>
