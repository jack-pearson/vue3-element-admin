<template>
  <div class="menu-page">menu</div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const from = route.query.from;
console.log(from, "from");
</script>
<style lang="scss" scoped>
.menu-page {
}
</style>

<script lang="ts">
export default { name: "systemMenu" };
</script>
