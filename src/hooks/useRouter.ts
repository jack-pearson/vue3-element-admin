import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Router } from 'vue-router'
const router = ref<Router>() as Ref<Router>
export { router }
