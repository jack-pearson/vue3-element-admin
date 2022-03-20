<!--
 * @Author: jack-pearson
 * @Date: 2021-12-06 11:09:55
 * @LastEditTime: 2022-01-25 14:55:32
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/components/svg-icon/index.vue
 * @Description:  https://github.com/jack-pearson/vue3-element-admin 
-->
<template>
  <svg :class="svgClass" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  pointer: {
    type: Boolean,
    default: true
  }
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => ([
  'svg-icon h-4 w-4',
  {
    ['icon-' + props.name]: !!props.name,
    'cursor-pointer': props.pointer
  }
]));
</script>

<style lang="scss">
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>

<script lang="ts">
export default { name: "SvgIcon" };
</script>
