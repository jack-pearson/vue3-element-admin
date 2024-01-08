<template>
  <div>首页</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.path, "route");
</script>

<style lang="scss" scoped></style>
