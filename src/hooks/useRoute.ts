import { ref } from 'vue'
import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
const route = ref<RouteLocationNormalizedLoaded>() as Ref<RouteLocationNormalizedLoaded>
export { route }
