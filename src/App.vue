<!--
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2021-12-30 17:40:04
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/App.vue
 * @Description: 
-->

<template>
  <el-config-provider :locale="{ language: 'zh-cn' }">
    <!-- <div>{{ $t('message.copyright.one5') }}</div> -->
    <!-- <el-button @click="handleClick">{{ getThemeConfig.test }}</el-button> -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// import { themeConfigState } from "@/store";
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
