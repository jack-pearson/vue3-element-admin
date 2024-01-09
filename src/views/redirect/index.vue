<template>
  <div></div>
</template>
<script lang="ts" setup>
import { router, route } from "@/hooks";
const { query, params } = route.value;
const { path } = params;
router.value.replace({ path: "/" + path, query });
</script>
