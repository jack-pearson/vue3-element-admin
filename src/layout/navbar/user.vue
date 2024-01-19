<template>
  <div class="layout-user h-full select-none flex items-center">
    <el-dropdown type="primary" :show-timeout="70" :hide-timeout="50" trigger="hover" class="dropdown h-full flex items-center pr-2" @command="onHandleClickCommand">
      <div class="icon-wrapper pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer">
        <img class="avatar mr-3" :src="userInfo.avatar ?? avatarDefault" alt="" />
        {{ userInfo.name }}<el-icon class="ml-3"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/profile">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/store'
import { router } from '@/hooks'
import { Local, Session } from '@/utils'
import { ArrowDown } from '@element-plus/icons-vue'
import avatarDefault from '@/assets/img/profile.jpg'
const onHandleClickCommand = (command: string) => {
  if (command === 'logout') {
    Local.clear()
    Session.clear()
    location.reload()
  } else {
    router.value.push(command)
  }
}
const userState = userStore()
const userInfo = computed(() => userState.userInfo)
</script>
<style lang="scss" scoped>
.layout-user {
  .dropdown {
    min-width: 125px;
  }
  .avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
}
</style>
<script lang="ts">
export default { name: 'LayoutUser' }
</script>
