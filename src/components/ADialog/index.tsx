/*
 * @Author: jack-pearson
 * @Date: 2022-03-02 17:43:28
 * @LastEditTime: 2022-03-17 15:15:36
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/src/components/ADialog/index.tsx
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */

import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "ADialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: { visible: boolean }) {
    console.log(props);
    onMounted(() => {
      console.log("ADialog mounted");
    });

    return () => (
      <div>
        <div>ADialog</div>
      </div>
    );
  },
});
