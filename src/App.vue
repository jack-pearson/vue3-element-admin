<template>
  <el-config-provider :locale="locale" :size="ElComponentSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import ElementZhCn from "element-plus/es/locale/lang/zh-cn";
import ElementEn from "element-plus/es/locale/lang/en";
import { settingsStore } from "@/store";
import { router } from "@/hooks";
const settingsState = settingsStore();
const ElComponentSize = computed(() => settingsState.config.ElComponentSize);
const language = computed(() => settingsState.config.language);
const locale = computed(() => {
  console.log(language.value, "language.value");
  switch (language.value) {
    case "zh-cn":
      return ElementZhCn;
    case "en":
      return ElementEn;
    default:
      return ElementZhCn;
  }
});
router.value = useRouter();
</script>
