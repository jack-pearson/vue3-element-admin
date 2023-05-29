<template>
  <el-config-provider :locale="locale" :size="ElComponentSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ElementZhCn from "element-plus/lib/locale/lang/zh-cn";
import ElementEn from "element-plus/lib/locale/lang/en";
import { settingsStore } from "@/store";
const settingsState = settingsStore();
const ElComponentSize = computed(() => settingsState.config.ElComponentSize);
const language = computed(() => settingsState.config.language);
const locale = computed(() => {
  switch (language.value) {
    case "zh-cn":
      return ElementZhCn;
    case "en":
      return ElementEn;
    default:
      return ElementZhCn;
  }
});
</script>
