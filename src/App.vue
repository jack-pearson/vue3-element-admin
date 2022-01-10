<!--
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2022-01-10 17:07:05
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/App.vue
 * @Description: 
-->

<template>
  <el-config-provider :locale="{ language: 'zh-cn' }" :size="ElComponentSize">
    <!-- <div>{{ $t('message.copyright.one5') }}</div> -->
    <!-- <el-button @click="handleClick">{{ getThemeConfig.test }}</el-button> -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { settingsStore } from "@/store";
const { ElComponentSize } = settingsStore();

// import { getCurrentInstance, computed } from "vue";
// const { proxy } = getCurrentInstance() as any;
// const store = themeConfigState();
// const getThemeConfig = computed(() => store.themeConfig);
// const handleClick = () => {
//   store.setThemeConfig({
//     ...getThemeConfig.value,
//   });
//   proxy.$i18n.locale = "en";
// };
</script>
