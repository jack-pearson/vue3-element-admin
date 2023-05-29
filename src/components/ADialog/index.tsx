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
