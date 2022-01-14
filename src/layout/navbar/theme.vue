<!--
 * @Author: jack-pearson
 * @Date: 2022-01-13 18:19:34
 * @LastEditTime: 2022-01-14 18:28:17
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/theme.vue
 * @Description: 
-->
<template>
  <div class="layout-theme h-full select-none">
    <div class="icon-wrapper pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer" @click="openSettings">
      <svg-icon name="theme" class="w-full pointer-events-none" />
    </div>
    <el-drawer v-model="open" :title="i18nSettings('setting')" direction="rtl" size="300px" :before-close="handleClose">
      <div class="w-full">
        <el-divider content-position="left" class="font-bold">{{ i18nSettings("themeSettings") }}</el-divider>
        <div class="item w-full item flex items-center">
          <span class="label flex-1">primary</span>
          <el-color-picker v-model="settings.primary" @change="e => onChangeTheme(e, 'primary')" />
        </div>

        <el-divider content-position="left" class="font-bold">{{ i18nSettings("themeSettings") }}</el-divider>
        <div class="item w-full item flex items-center">
          <span class="label flex-1">config</span>
          <el-switch v-model="settings.isTagsView" @change="onChangeTagsView" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { i18nSettings, setHtmlCssVar } from "@/utils";
import { settingsStore } from "@/store";
const open = ref(false);
const settingsState = settingsStore();
const themes = computed(() => settingsState.themesState);
const config = computed(() => settingsState.config);
const settings = reactive({
  primary: themes.value.primary,
  isTagsView: config.value.isTagsView,
});
const onChangeTheme = (val: any, type: string) => {
  settingsState.setThemes({ primary: val });
  setHtmlCssVar(val, "primary");
};
const onChangeTagsView = () => {
  settingsState.setConfig({ isTagsView: settings.isTagsView });
};
const openSettings = () => {
  open.value = true;
};
const handleClose = () => {
  open.value = false;
};
</script>
<style lang="scss" scoped>
.layout-theme {
  .icon-wrapper {
    color: var(--color-text-primary);
    transition: background 0.28s;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      .svg-icon {
        animation: iconAnimation 0.28s ease-in-out;
      }
    }
  }
  :deep(.el-drawer__header) {
    padding: 0px 20px;
    margin-bottom: 0px;
    border: 1px solid #e6e6e6;
  }
  :deep(.el-drawer__body) {
    padding: 0px 15px;
    .item {
      .label {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>

<script lang="ts">
export default { name: "LayoutTheme" };
</script>
