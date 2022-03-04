/*
 * @Author: jack-pearson
 * @Date: 2022-03-02 17:43:28
 * @LastEditTime: 2022-03-02 18:41:37
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/components/ADialog/index.tsx
 * @Description:
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
    props.visible = false;
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
