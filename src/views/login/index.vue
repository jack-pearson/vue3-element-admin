<!--
 * @Author: jack-pearson
 * @Date: 2021-11-24 17:42:59
 * @LastEditTime: 2021-12-31 18:45:54
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/views/login/index.vue
 * @Description: 
-->
<template>
  <div class="login-page w-full h-full bg-cover">
    <div class="login-content p-5 absolute top-2/4 left-2/4 bg-white rounded overflow-hidden">
      <div class="login-content-main w-4/5 h-full mx-auto my-0">
        <h4 class="text-dark-300 font-bold pt-10 pb-10 text-3xl tracking-wider text-center whitespace-normal z-10 relative h-auto transition-all">{{ themes.loginTitle }} 后台模板</h4>
        <el-tabs @tab-click="onTabsClick" model-value="account" class="el-tabs">
          <el-tab-pane :label="$t('login.tabs.account')" name="account">
            <transition name="el-zoom-in-center" appear>
              <el-form class="login-content-form w-full pt-5 h-[calc(100%-50px)]" v-if="show" ref="loginForm" :model="form" :rules="loginRules">
                <el-form-item prop="account">
                  <el-input v-model="form.account" clearable :placeholder="$t('login.tabs.account')">
                    <template #prefix>
                      <div class="svg-wrapper">
                        <svg-icon name="user"></svg-icon>
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input :type="config.isShowPassword ? 'text' : 'password'" :placeholder="$t('login.account.passwordPlaceholder')" v-model="form.password" autocomplete="off">
                    <template #prefix>
                      <div class="svg-wrapper">
                        <svg-icon name="lock"></svg-icon>
                      </div>
                    </template>
                    <template #suffix>
                      <div class="svg-wrapper">
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
import { reactive, ref, getCurrentInstance } from "vue";
import { userState, settingsStore } from "@/store";
import { LoginService } from "@/apis";
import { useRouter } from "vue-router";
import { Local } from "@/utils";
const store = userState();
const router = useRouter();
const { themes } = settingsStore();
const { proxy } = getCurrentInstance() as any;
const show = ref(true);
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
        const { code, success, data: userInfo, message } = await LoginService.login(form);
        if (code === 200 && success) {
          Local.set("token", userInfo.token);
          await store.setUserInfo(userInfo);
          router.push({ path: "/system/user" });
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
  background: url("https://gitee.com/lyt-top/vue-next-admin-images/raw/master/login/bg-login.png") no-repeat;
  .login-content {
    width: 500px;
    transform: translate(-50%, -50%) translate3d(0, 0, 0);
    border: 5px solid var(--color-primary-9);
    transition: height 0.2s linear;
    height: auto;
    min-height: 420px;
    .login-content-main {
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
        .svg-wrapper {
          width: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
