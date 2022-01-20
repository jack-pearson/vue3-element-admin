<!--
 * @Author: jack-pearson
 * @Date: 2021-12-06 11:09:55
 * @LastEditTime: 2022-01-19 16:52:54
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/svg-icon/index.vue
 * @Description: 
-->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return "svg-icon";
});
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>

<script lang="ts">
export default { name: "SvgIcon" };
</script>
