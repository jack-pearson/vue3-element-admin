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
