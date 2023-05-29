<template>
  <div class="layout-ziti h-full select-none">
    <el-dropdown type="primary" :show-timeout="70" :hide-timeout="50" trigger="hover" class="h-full flex items-center" @command="onChangeSize">
      <div class="icon-wrapper text-$color-text-primary pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer">
        <svg-icon name="ziti" class="w-full pointer-events-none" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in componentSize" :key="item" :disabled="item === ElComponentSize" :command="item">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { componentSize } from "@/utils";
import { settingsStore } from "@/store";
import { ElComponentSizeType } from "@/types";
const settingsState = settingsStore();
const onChangeSize = (command: ElComponentSizeType) => {
  settingsState.setElementZiTiSize(command);
};
const ElComponentSize = computed(() => settingsState.config.ElComponentSize);
</script>
<style lang="scss" scoped>
.layout-ziti {
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
export default { name: "LayoutZitiSize" };
</script>
