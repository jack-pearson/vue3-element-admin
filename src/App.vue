<!--
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2022-01-10 18:00:14
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/App.vue
 * @Description: 
-->

<template>
  <el-config-provider :locale="{ language: language }" :size="ElComponentSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { settingsStore } from "@/store";
const settingsState = settingsStore();
const ElComponentSize = computed(() => settingsState.ElComponentSize);
const language = computed(() => settingsState.language);
</script>
