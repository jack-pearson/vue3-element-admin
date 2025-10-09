<template>
  <div class="login-page w-full h-full bg-cover select-none" :class="backgroundClass">
    <!-- 背景切换按钮 -->
    <div class="bg-switch-btn">
      <el-button type="text" @click="config.backgroundType = config.backgroundType === 'bg1' ? 'bg2' : 'bg1'" class="switch-btn">
        <svg-icon name="theme" class="w-5 h-5"></svg-icon>
      </el-button>
    </div>

    <div class="login-content p-5 absolute top-2/4 left-2/4 bg-white rounded overflow-hidden">
      <div class="login-content-main w-4/5 h-full mx-auto my-0">
        <h4 class="text-dark-300 font-bold pt-10 pb-10 tracking-wider text-center whitespace-normal z-10 relative h-auto transition-all">{{ fixedStore.loginTitle }} 后台模板</h4>
        <el-tabs @tab-click="onTabsClick" model-value="account" class="el-tabs">
          <el-tab-pane :label="$t('login.tabs.account')" name="account">
            <transition name="el-zoom-in-center" appear>
              <el-form class="login-content-form w-full pt-5 h-[calc(100%-50px)]" ref="loginForm" :model="form" :rules="loginRules">
                <el-form-item prop="account">
                  <el-input v-model="form.account" clearable :placeholder="$t('login.tabs.account')">
                    <template #prefix>
                      <div class="svg-wrapper flex items-center w-5">
                        <svg-icon name="user"></svg-icon>
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input :type="config.isShowPassword ? 'text' : 'password'" :placeholder="$t('login.account.passwordPlaceholder')" v-model="form.password" autocomplete="off">
                    <template #prefix>
                      <div class="svg-wrapper flex items-center w-5">
                        <svg-icon name="lock"></svg-icon>
                      </div>
                    </template>
                    <template #suffix>
                      <div class="svg-wrapper flex items-center w-5 cursor-pointer">
                        <svg-icon :name="config.isShowPassword ? 'invisible_eye' : 'visible_eye'" @click="onChangeVisibleEye"></svg-icon>
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="w-full" :loading="config.loading" @click="onSubmit">
                    {{ $t('login.account.accountBtnText') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </transition>
          </el-tab-pane>
          <el-tab-pane :label="$t('login.tabs.more')" name="more"> {{ $t('login.more.text') }}</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, computed } from 'vue'
import { userStore, settingsStore } from '@/store'
import { LoginService } from '@/apis'
import { router } from '@/hooks'
import { Session } from '@/utils'
const store = userStore()
const { fixed: fixedStore } = settingsStore()
const { proxy } = getCurrentInstance() as any
const form = reactive({
  account: 'admin',
  password: '123456'
})
const loginRules = reactive({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const config = reactive({
  isShowPassword: false,
  isCurrentTab: true,
  loading: false,
  backgroundType: 'bg1' // bg1 或 bg2
})
const backgroundClass = computed(() => {
  return config.backgroundType === 'bg1' ? 'bg-style-1' : 'bg-style-2'
})
const onTabsClick = () => {
  config.isCurrentTab = !config.isCurrentTab
}
const onChangeVisibleEye = () => {
  config.isShowPassword = !config.isShowPassword
}
const onSubmit = () => {
  proxy.$refs.loginForm.validate(async (valid: boolean) => {
    if (valid) {
      config.loading = true
      try {
        const { code, success, data: userInfo, message } = await LoginService.login(form)
        if (code === 200 && success) {
          Session.set('token', userInfo.token)
          Session.set('userInfo', userInfo)
          await store.setUserInfo(userInfo)
          router.value.replace({ path: '/', query: { keyword: 'vue' } })
        } else {
          proxy.$message.error(message)
        }
      } catch (error) {
        console.log(error, '登录请求失败')
      }
      config.loading = false
    }
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;

  &.bg-style-1 {
    background:
      url('@/assets/img/admin-bg.jpg') center center / cover no-repeat,
      linear-gradient(135deg, rgba(0, 176, 155, 0.8) 0%, rgba(150, 201, 61, 0.8) 100%);
    background-blend-mode: multiply;
  }

  &.bg-style-2 {
    background:
      url('@/assets/img/admin-bg-2.jpg') center center / cover no-repeat,
      linear-gradient(135deg, rgba(74, 144, 226, 0.7) 0%, rgba(80, 201, 195, 0.7) 100%);
    background-blend-mode: multiply;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(80, 201, 195, 0.1) 25%, rgba(0, 176, 155, 0.2) 50%, rgba(150, 201, 61, 0.1) 100%);
    backdrop-filter: blur(1px);
    z-index: 1;
  }
  .login-content {
    width: 500px;
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
    border: 5px solid var(--el-color-primary-light-5);
    transition: height 0.2s linear;
    height: auto;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow:
      0 25px 45px rgba(0, 0, 0, 0.15),
      0 16px 28px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    .login-content-main {
      h4 {
        font-size: 24px;
        background: linear-gradient(135deg, #4a90e2, #50c9c3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 600;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .el-tabs {
        :deep(.el-tabs__active-bar) {
          background-color: var(--el-text-color-primary);
        }
        :deep(.el-tabs__item) {
          &.is-active,
          &:hover,
          &:focus,
          &:active {
            color: var(--el-text-color-primary);
          }
        }
      }
      .login-content-form {
        .el-form-item {
          margin-bottom: 24px;
        }
        .el-input {
          height: 48px;
          .el-input__inner {
            height: 48px;
            border-radius: 8px;
            border: 2px solid #e8f4f8;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
            &:focus {
              border-color: #4a90e2;
              box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
            }
          }
          .el-input__prefix,
          .el-input__suffix {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .el-button {
          height: 48px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          background: linear-gradient(135deg, #4a90e2, #50c9c3);
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
          }
          &:active {
            transform: translateY(0);
          }
        }
      }
    }
  }

  // 背景切换按钮
  .bg-switch-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 10;

    .switch-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4a90e2;

      &:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .login-content {
      width: 90% !important;
      margin: 0 5%;
      border-width: 3px;
    }

    .bg-switch-btn {
      top: 20px;
      right: 20px;
      .switch-btn {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>

<script lang="ts">
export default { name: 'LoginPage' }
</script>
