<template>
  <div class="layout-settings h-full select-none">
    <div class="icon-wrapper text-color-text-primary pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer" @click="openSettings">
      <svg-icon name="theme" class="w-full pointer-events-none" />
    </div>
    <el-drawer v-model="open" :title="i18nSettings('setting')" direction="rtl" size="300px" :before-close="handleClose">
      <div class="w-full">
        <el-divider content-position="left" class="font-bold">{{ i18nSettings("globalSettings") }}</el-divider>
        <div class="item w-full item flex items-center">
          <span class="label flex-1">{{ i18nSettings("switchTagsView") }}</span>
          <el-switch v-model="settings.hasTagsView" @change="(e) => onChangeGlobalConfig(e, 'tagsView')" />
        </div>
        <div class="item w-full item flex items-center">
          <span class="label flex-1">{{ i18nSettings("switchSidebarLogo") }}</span>
          <el-switch v-model="settings.hasSidebarLogo" @change="(e) => onChangeGlobalConfig(e, 'sidebarLogo')" />
        </div>
        <div class="item w-full item flex items-center">
          <span class="label flex-1">{{ i18nSettings("switchGlobalSettings") }}</span>
          <el-switch v-model="settings.hasGlobalSettings" @change="(e) => onChangeGlobalConfig(e, 'globalSettings')" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { i18nSettings } from "@/utils";
import { settingsStore } from "@/store";
const open = ref(false);
const settingsState = settingsStore();
const config = computed(() => settingsState.config);
const settings = reactive({
  hasTagsView: config.value.hasTagsView,
  hasSidebarLogo: config.value.hasSidebarLogo,
  hasGlobalSettings: config.value.hasGlobalSettings,
});

const onChangeGlobalConfig = (val: any, tag: string) => {
  switch (tag) {
    case "tagsView":
      settingsState.setConfig({ hasTagsView: val });
      break;
    case "sidebarLogo":
      settingsState.setConfig({ hasSidebarLogo: val });
      break;
    case "globalSettings":
      settingsState.setConfig({ hasGlobalSettings: val });
      break;
    default:
      break;
  }
};
const openSettings = () => {
  open.value = true;
};
const handleClose = () => {
  open.value = false;
};
</script>
<style lang="scss" scoped>
.layout-settings {
  .icon-wrapper {
    transition: background 0.28s;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      .svg-icon {
        animation: iconAnimation 0.28s ease-in-out;
      }
    }
  }
  :deep(.el-drawer__header) {
    padding: 10px 20px;
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
export default { name: "LayoutSettings" };
</script>
