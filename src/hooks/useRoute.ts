import { Ref, ref } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
const route = ref<RouteLocationNormalizedLoaded>() as Ref<RouteLocationNormalizedLoaded>;
export { route };
