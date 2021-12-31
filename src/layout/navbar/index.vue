<!--
 * @Author: jack-pearson
 * @Date: 2021-12-31 18:10:15
 * @LastEditTime: 2021-12-31 18:32:14
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/index.vue
 * @Description: 
-->

<template>
  <header class="navbar w-full">
    <Hamburger />
  </header>
</template>
<script lang="ts">
export default { name: "Navbar" };
</script>

<script setup lang="ts">
import Hamburger from "./hamburger.vue";
</script>
<style lang="scss" scoped></style>
