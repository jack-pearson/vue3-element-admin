<template>
  <transition name="el-zoom-in-center">
    <div aria-hidden="true" class="context-menu fixed" :style="style" v-if="open">
      <ul class="context-menu-ul bg-white p-2 rounded text-black">
        <li class="context-menu-ul-li cursor-pointer pl-2 pr-2 pt-1 pb-1" @click="onHandleRefreshTag" v-if="currentRoute.name === route.name">刷新</li>
        <li class="context-menu-ul-li cursor-pointer pl-2 pr-2 pt-1 pb-1" @click="onHandleCloseOther">关闭其他</li>
        <li class="context-menu-ul-li cursor-pointer pl-2 pr-2 pt-1 pb-1" @click="onHandleCloseLeft">关闭左边</li>
        <li class="context-menu-ul-li cursor-pointer pl-2 pr-2 pt-1 pb-1" @click="onHandleCloseRight">关闭右边</li>
        <li class="context-menu-ul-li cursor-pointer pl-2 pr-2 pt-1 pb-1" @click="onHandleCloseAll">关闭全部</li>
      </ul>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, type Ref } from 'vue'
import { route, router } from '@/hooks'
import { tagViewStore } from '@/store'
import type { IRouter } from '@/types'
const open = ref<boolean>(false)
const tagViewState = tagViewStore()
const currentRoute = ref<IRouter>() as Ref<IRouter>
const style = reactive({
  left: '0px',
  top: '0px',
  'z-index': 9999
})

const onHandleRefreshTag = () => {
  router.value.replace({
    path: '/redirect' + route.value.path,
    query: route.value.query
  })
}
const closeContextmenu = () => {
  open.value = false
}

const onHandleCloseOther = () => {
  tagViewState.closeOtherTagView(currentRoute.value)
}
const onHandleCloseRight = () => {
  tagViewState.closeRightTagView(currentRoute.value)
}
const onHandleCloseLeft = () => {
  tagViewState.closeLeftTagView(currentRoute.value)
}
const onHandleCloseAll = () => {
  tagViewState.closeAllTagView()
  router.value.push('/')
}

const openContextmenu = ({ x, y, current }: { x: number; y: number; current: IRouter }) => {
  currentRoute.value = current
  open.value = true
  style.left = `${x}px`
  style.top = `${y}px`
}
defineExpose({
  openContextmenu
})
onMounted(() => {
  document.body.addEventListener('click', closeContextmenu)
})
onUnmounted(() => {
  document.body.removeEventListener('click', closeContextmenu)
})
</script>
<style lang="scss" scoped>
.context-menu-ul {
  font-size: 12px;
  .context-menu-ul-li {
    &:hover {
      background: var(--el-border-color-light);
    }
  }
}
</style>

<script lang="ts">
export default { name: 'ContextMenu' }
</script>
