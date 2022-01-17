<!--
 * @Author: jack-pearson
 * @Date: 2021-12-10 17:55:40
 * @LastEditTime: 2022-01-17 13:57:26
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/views/system/user/index.vue
 * @Description: 
-->
<template>
  <div class="user-page bg-white w-full h-full">
    <el-button>user</el-button>
    <el-input v-model="value"></el-input>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const value = ref("");
</script>
<style lang="scss" scoped>
.user-page {
  border-radius: 5px;
}
</style>
<script lang="ts">
export default { name: "user" };
</script>
