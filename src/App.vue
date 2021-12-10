<!--
 * @Author: jack-pearson
 * @Date: 2021-11-22 17:31:39
 * @LastEditTime: 2021-12-09 17:05:07
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/App.vue
 * @Description: 
-->

<template>
  <el-config-provider :locale="{ language: 'zh' }">
    <!-- <div>{{ $t('message.copyright.one5') }}</div> -->
    <!-- <el-button @click="handleClick">{{ getThemeConfig.test }}</el-button> -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useStore } from "store/index";
import { getCurrentInstance, computed } from "vue";
const { proxy } = getCurrentInstance() as any;
const store = useStore();
const getThemeConfig = computed(() => store.state.themeConfig.themeConfig);
const handleClick = () => {
  store.dispatch("themeConfig/setThemeConfig", {
    ...getThemeConfig.value,
    test: 321,
  });
  proxy.$i18n.locale = "en";
};
</script>
