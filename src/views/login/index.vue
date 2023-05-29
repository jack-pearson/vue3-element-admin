<template>
  <div class="login-page w-full h-full bg-cover select-none">
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
                    {{ $t("login.account.accountBtnText") }}
                  </el-button>
                </el-form-item>
              </el-form>
            </transition>
          </el-tab-pane>
          <el-tab-pane :label="$t('login.tabs.more')" name="more"> {{ $t("login.more.text") }}</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from "vue";
import { userStore, settingsStore } from "@/store";
import { LoginService } from "@/apis";
import { useRouter } from "vue-router";
import { Session } from "@/utils";
const store = userStore();
const router = useRouter();
const { fixed: fixedStore } = settingsStore();
const { proxy } = getCurrentInstance() as any;
const form = reactive({
  account: "admin",
  password: "123456",
});
const loginRules = reactive({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 3,
      max: 5,
      message: "长度在 3 到 5 个字符",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const config = reactive({
  isShowPassword: false,
  isCurrentTab: true,
  loading: false,
});
const onTabsClick = () => {
  config.isCurrentTab = !config.isCurrentTab;
};
const onChangeVisibleEye = () => {
  config.isShowPassword = !config.isShowPassword;
};
const onSubmit = () => {
  proxy.$refs.loginForm.validate(async (valid: boolean) => {
    if (valid) {
      config.loading = true;
      try {
        const { code, success, data: userInfo, message } = (await LoginService.login()) as any;
        if (code === 200 && success) {
          Session.set("token", userInfo.token);
          Session.set("userInfo", userInfo);
          await store.setUserInfo(userInfo);
          router.replace({ path: "/" });
        } else {
          proxy.$message.error(message);
        }
      } catch (error) {
        console.log(error, "登录请求失败");
      }
      config.loading = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.login-page {
  background: #00b09b; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #96c93d, #00b09b); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #96c93d, #00b09b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .login-content {
    width: 500px;
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
    border: 5px solid var(--el-color-primary-light-5);
    transition: height 0.2s linear;
    height: auto;
    .login-content-main {
      h4 {
        font-size: 22px;
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
    }
  }
}
</style>
