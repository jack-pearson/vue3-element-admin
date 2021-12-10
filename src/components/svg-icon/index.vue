<!--
 * @Author: jack-pearson
 * @Date: 2021-12-06 11:09:55
 * @LastEditTime: 2021-12-06 14:36:27
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/svg-icon/index.vue
 * @Description: 
-->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
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
  console.log(props.name, "props.name");
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
