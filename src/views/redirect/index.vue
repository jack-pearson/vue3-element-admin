<template>
  <div></div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { query, params } = route;
const { path } = params;
router.replace({ path: "/" + path, query });
</script>
