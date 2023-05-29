<template>
  <div class="layout-language h-full select-none">
    <el-dropdown type="primary" :show-timeout="70" :hide-timeout="50" trigger="hover" class="h-full flex items-center" @command="onChangeSize">
      <div class="icon-wrapper text-$color-text-primary pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer">
        <svg-icon :name="language" class="w-full pointer-events-none" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in i18nOption" :key="item.value" :disabled="item.value === language" :command="item.value">{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";
import { Local, i18n as i18nOption } from "@/utils";
import { i18n } from "@/i18n";
import { settingsStore } from "@/store";
import { useRoute } from "vue-router";
import { languageType, settingsStoreType } from "@/types";
const settingsState = settingsStore();
const { proxy } = getCurrentInstance() as any;
const onChangeSize = (command: languageType) => {
  const config = (Local.get("config") || {}) as settingsStoreType["config"];
  config.language = command;
  Local.set("config", config);
  settingsState.setLanguage(command);
  proxy.$i18n.locale = command;
  document.title = i18n.global.t("messages.router." + title.value);
};
const route = useRoute();
const title = computed(() => route.meta.title);
const language = computed(() => settingsState.config.language);
</script>
<style lang="scss" scoped>
.layout-language {
  .icon-wrapper {
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
