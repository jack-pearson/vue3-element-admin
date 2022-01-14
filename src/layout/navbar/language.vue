<!--
 * @Author: jack-pearson
 * @Date: 2022-01-10 17:24:36
 * @LastEditTime: 2022-01-14 18:36:30
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/layout/navbar/language.vue
 * @Description: 
-->
<template>
  <div class="layout-language h-full select-none">
    <el-dropdown type="primary" :show-timeout="70" :hide-timeout="50" trigger="hover" class="h-full flex items-center" @command="onChangeSize">
      <div class="icon-wrapper pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer">
        <svg-icon :name="language" class="w-full pointer-events-none" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in i18n" :key="item.value" :disabled="item.value === language" :command="item.value">{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";
import { Local, i18n } from "@/utils";
import { settingsStore } from "@/store";
import { languageType, settingsStoreType } from "@/types";
const settingsState = settingsStore();
const { proxy } = getCurrentInstance() as any;
const onChangeSize = (command: languageType) => {
  const settingsStore = (Local.get("settingsStore") || {}) as settingsStoreType;
  settingsStore.config.language = command;
  Local.set("settingsStore", settingsStore);
  settingsState.setLanguage(command);
  proxy.$i18n.locale = command;
};
const language = computed(() => settingsState.config.language);
</script>
<style lang="scss" scoped>
.layout-language {
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
  :deep(div[class*="el-dropdown"]) {
    height: 100%;
  }
}
</style>

<script lang="ts">
export default { name: "LayoutLanguage" };
</script>
