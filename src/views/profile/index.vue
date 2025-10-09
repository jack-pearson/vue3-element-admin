<template>
  <div class="profile-container">
    <!-- 页面头部 -->
    <div class="profile-header">
      <div class="header-content">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <el-avatar :size="80" :src="userForm.avatar || defaultAvatar" class="user-avatar">
              <svg-icon name="user" class="w-12 h-12"></svg-icon>
            </el-avatar>
            <div class="avatar-upload-btn" @click="triggerAvatarUpload">
              <svg-icon name="edit" class="w-4 h-4"></svg-icon>
            </div>
            <input ref="avatarInput" type="file" accept="image/*" @change="handleAvatarChange" style="display: none" />
          </div>
        </div>
        <div class="user-info">
          <h2 class="user-name">{{ userForm.name || '未设置姓名' }}</h2>
          <p class="user-account">@{{ userForm.account }}</p>
          <div class="user-status">
            <el-tag :type="userForm.status === '1' ? 'success' : 'danger'" size="small">
              {{ userForm.status === '1' ? '正常' : '禁用' }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="profile-content">
      <el-row :gutter="24">
        <!-- 左侧个人信息表单 -->
        <el-col :lg="16" :md="24">
          <div class="content-card">
            <div class="card-header">
              <h3 class="card-title">
                <svg-icon name="user" class="w-5 h-5 mr-2"></svg-icon>
                个人信息
              </h3>
            </div>
            <div class="card-body">
              <el-form ref="profileForm" :model="userForm" :rules="formRules" label-width="100px" class="profile-form">
                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="用户名" prop="account">
                      <el-input v-model="userForm.account" placeholder="请输入用户名" disabled class="form-input">
                        <template #prefix>
                          <svg-icon name="user" class="w-4 h-4"></svg-icon>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="userForm.name" placeholder="请输入真实姓名" class="form-input">
                        <template #prefix>
                          <svg-icon name="people" class="w-4 h-4"></svg-icon>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="userForm.email" placeholder="请输入邮箱地址" class="form-input">
                        <template #prefix>
                          <svg-icon name="email" class="w-4 h-4"></svg-icon>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机号" prop="phone">
                      <el-input v-model="userForm.phone" placeholder="请输入手机号码" class="form-input">
                        <template #prefix>
                          <svg-icon name="message" class="w-4 h-4"></svg-icon>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="24">
                  <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                      <el-input-number v-model="userForm.age" :min="1" :max="150" placeholder="请输入年龄" class="form-input w-full" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="性别" prop="sex">
                      <el-select v-model="userForm.sex" placeholder="请选择性别" class="form-input w-full">
                        <el-option label="未知" value="null"></el-option>
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="girl"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="个人描述" prop="description">
                  <el-input v-model="userForm.description" type="textarea" :rows="4" placeholder="请输入个人描述..." class="form-input" />
                </el-form-item>

                <el-form-item class="form-actions">
                  <el-button type="primary" @click="handleSubmit" :loading="submitLoading" class="submit-btn">
                    <svg-icon name="edit" class="w-4 h-4 mr-2"></svg-icon>
                    保存修改
                  </el-button>
                  <el-button @click="handleReset" class="reset-btn">
                    <svg-icon name="refresh" class="w-4 h-4 mr-2"></svg-icon>
                    重置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>

        <!-- 右侧安全设置 -->
        <el-col :lg="8" :md="24">
          <div class="content-card">
            <div class="card-header">
              <h3 class="card-title">
                <svg-icon name="lock" class="w-5 h-5 mr-2"></svg-icon>
                安全设置
              </h3>
            </div>
            <div class="card-body">
              <div class="security-items">
                <div class="security-item">
                  <div class="security-icon">
                    <svg-icon name="password" class="w-6 h-6"></svg-icon>
                  </div>
                  <div class="security-content">
                    <h4>修改密码</h4>
                    <p>定期修改密码保护账户安全</p>
                  </div>
                  <el-button type="text" @click="showPasswordDialog = true"> 修改 </el-button>
                </div>

                <div class="security-item">
                  <div class="security-icon">
                    <svg-icon name="message" class="w-6 h-6"></svg-icon>
                  </div>
                  <div class="security-content">
                    <h4>手机绑定</h4>
                    <p>{{ userForm.phone ? '已绑定' : '未绑定' }}</p>
                  </div>
                  <el-button type="text">
                    {{ userForm.phone ? '更换' : '绑定' }}
                  </el-button>
                </div>

                <div class="security-item">
                  <div class="security-icon">
                    <svg-icon name="email" class="w-6 h-6"></svg-icon>
                  </div>
                  <div class="security-content">
                    <h4>邮箱绑定</h4>
                    <p>{{ userForm.email ? '已绑定' : '未绑定' }}</p>
                  </div>
                  <el-button type="text">
                    {{ userForm.email ? '更换' : '绑定' }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 账户统计 -->
          <div class="content-card mt-4">
            <div class="card-header">
              <h3 class="card-title">
                <svg-icon name="chart" class="w-5 h-5 mr-2"></svg-icon>
                账户统计
              </h3>
            </div>
            <div class="card-body">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-value">{{ stats.loginCount }}</div>
                  <div class="stat-label">登录次数</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ stats.lastLoginDays }}</div>
                  <div class="stat-label">最近登录</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ stats.createDays }}</div>
                  <div class="stat-label">注册天数</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ stats.operationCount }}</div>
                  <div class="stat-label">操作次数</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="showPasswordDialog" title="修改密码" width="400px" class="password-dialog">
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-width="100px">
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input v-model="passwordForm.currentPassword" type="password" placeholder="请输入当前密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPasswordDialog = false">取消</el-button>
          <el-button type="primary" @click="handlePasswordChange">确认修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { userStore } from '@/store'
import { Session } from '@/utils'
import type { User } from '@/types'

// 获取用户状态管理
const store = userStore()

// 模板引用
const avatarInput = ref<HTMLInputElement>()
const profileForm = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()

// 响应式数据
const submitLoading = ref(false)
const showPasswordDialog = ref(false)

// 默认头像
const defaultAvatar = computed(() => new URL('@/assets/img/profile.jpg', import.meta.url).href)

// 用户表单数据
const userForm = reactive<User>({
  account: 'admin',
  password: '123456',
  name: '管理员',
  status: '1',
  avatar: '',
  email: 'admin@example.com',
  phone: '18888888888',
  age: 25,
  sex: 'man',
  description: '这是一个系统管理员账户，拥有所有权限。'
})

// 密码修改表单
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 账户统计数据
const stats = reactive({
  loginCount: 156,
  lastLoginDays: '2天前',
  createDays: 365,
  operationCount: 1234
})

// 表单验证规则
const formRules: FormRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
  age: [{ type: 'number', min: 1, max: 150, message: '年龄必须在 1-150 之间', trigger: 'blur' }]
}

// 密码验证规则
const passwordRules: FormRules = {
  currentPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 头像上传相关方法
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      ElMessage.error('请选择图片文件')
      return
    }

    // 验证文件大小 (2MB)
    if (file.size > 2 * 1024 * 1024) {
      ElMessage.error('图片大小不能超过 2MB')
      return
    }

    // 预览图片
    const reader = new FileReader()
    reader.onload = (e) => {
      userForm.avatar = e.target?.result as string
      ElMessage.success('头像上传成功')
    }
    reader.readAsDataURL(file)
  }
}

// 表单提交
const handleSubmit = async () => {
  if (!profileForm.value) return

  try {
    await profileForm.value.validate()
    submitLoading.value = true

    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 更新用户信息到store
    store.setUserInfo({ ...userForm })
    Session.set('userInfo', { ...userForm })

    ElMessage.success('用户信息修改成功！')
  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    submitLoading.value = false
  }
}

// 重置表单
const handleReset = () => {
  ElMessageBox.confirm('确定要重置所有修改吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      loadUserInfo()
      ElMessage.success('已重置为原始数据')
    })
    .catch(() => {
      // 用户取消
    })
}

// 密码修改
const handlePasswordChange = async () => {
  if (!passwordFormRef.value) return

  try {
    await passwordFormRef.value.validate()

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 800))

    ElMessage.success('密码修改成功！')
    showPasswordDialog.value = false

    // 重置密码表单
    Object.assign(passwordForm, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  } catch (error) {
    console.error('密码修改失败:', error)
  }
}

// 加载用户信息
const loadUserInfo = () => {
  const userData = Session.get('userInfo') || store.userInfo
  if (userData && Object.keys(userData).length > 0) {
    Object.assign(userForm, userData)
  }
}

// 组件挂载时加载用户信息
onMounted(() => {
  loadUserInfo()
})
</script>

<style lang="scss" scoped>
.profile-container {
  height: calc(100vh - 120px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow-y: auto;

  .profile-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 0;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')
        bottom center / cover no-repeat;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      z-index: 2;

      .avatar-section {
        .avatar-wrapper {
          position: relative;
          display: inline-block;

          .user-avatar {
            border: 3px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;

            &:hover {
              transform: scale(1.05);
              box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
            }
          }

          .avatar-upload-btn {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(79, 172, 254, 0.4);
            color: white;

            &:hover {
              transform: scale(1.1);
              box-shadow: 0 6px 24px rgba(79, 172, 254, 0.6);
            }
          }
        }
      }

      .user-info {
        flex: 1;

        .user-name {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 4px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .user-account {
          font-size: 16px;
          opacity: 0.9;
          margin: 0 0 8px 0;
          font-weight: 300;
        }

        .user-status {
          .el-tag {
            font-size: 14px;
            padding: 4px 12px;
            border-radius: 20px;
          }
        }
      }
    }
  }

  .profile-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

    .content-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid #f0f0f0;

      &:hover {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
      }

      .card-header {
        padding: 16px 24px;
        border-bottom: 1px solid #f0f0f0;
        background: linear-gradient(135deg, #ffefd5 0%, #ffedcc 100%);

        .card-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #333;
          display: flex;
          align-items: center;

          svg {
            color: #667eea;
          }
        }
      }

      .card-body {
        padding: 20px;
      }
    }

    .profile-form {
      .form-input {
        .el-input__inner,
        .el-textarea__inner,
        .el-select .el-input__inner,
        .el-input-number .el-input__inner {
          border-radius: 8px;
          border: 2px solid #e8f4f8;
          background: #fafbfc;
          transition: all 0.3s ease;
          height: 44px;

          &:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            background: white;
          }
        }

        .el-textarea__inner {
          height: auto !important;
          min-height: 60px;
        }

        .el-input__prefix,
        .el-input__suffix {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
        }
      }

      .form-actions {
        margin-top: 20px;
        text-align: center;

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 25px;
          padding: 12px 32px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
          }
        }

        .reset-btn {
          border-radius: 25px;
          padding: 12px 32px;
          margin-left: 16px;
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          color: #6c757d;
          transition: all 0.3s ease;

          &:hover {
            background: #e9ecef;
            border-color: #dee2e6;
            transform: translateY(-1px);
          }
        }
      }
    }

    .security-items {
      .security-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
        transition: all 0.3s ease;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: #f8f9fa;
          margin: 0 -20px;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 8px;
        }

        .security-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: white;
          box-shadow: 0 2px 8px rgba(132, 250, 176, 0.3);
        }

        .security-content {
          flex: 1;

          h4 {
            margin: 0 0 4px 0;
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }

          p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
        }

        .el-button {
          border-radius: 20px;
          padding: 8px 16px;
          font-weight: 500;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-1px);
          }
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;

      .stat-item {
        text-align: center;
        padding: 16px 12px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        border-radius: 10px;
        color: white;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3);
        }

        &:nth-child(2) {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

          &:hover {
            box-shadow: 0 8px 32px rgba(79, 172, 254, 0.3);
          }
        }

        &:nth-child(3) {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

          &:hover {
            box-shadow: 0 8px 32px rgba(67, 233, 123, 0.3);
          }
        }

        &:nth-child(4) {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);

          &:hover {
            box-shadow: 0 8px 32px rgba(250, 112, 154, 0.3);
          }
        }

        .stat-value {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.9;
          font-weight: 500;
        }
      }
    }
  }

  :deep(.password-dialog) {
    .el-dialog {
      border-radius: 16px;
      overflow: hidden;
    }

    .el-dialog__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 24px;

      .el-dialog__title {
        color: white;
        font-weight: 600;
      }

      .el-dialog__headerbtn {
        .el-dialog__close {
          color: white;
          font-size: 20px;

          &:hover {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }

    .el-dialog__body {
      padding: 32px 24px;
    }

    .el-dialog__footer {
      padding: 0 24px 24px;
      text-align: center;

      .el-button {
        border-radius: 20px;
        padding: 10px 24px;
        font-weight: 500;

        &--primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
      }
    }
  }

  // 响应式设计
  @media (max-width: 1024px) {
    .profile-content {
      padding: 0 16px;

      .content-card .card-body {
        padding: 24px;
      }
    }
  }

  @media (max-width: 768px) {
    .profile-header {
      .header-content {
        flex-direction: column;
        text-align: center;
        gap: 24px;
        padding: 0 16px;

        .user-info .user-name {
          font-size: 24px;
        }
      }
    }

    .profile-content {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .security-items .security-item {
        flex-direction: column;
        text-align: center;
        gap: 12px;

        .security-icon {
          margin-right: 0;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .profile-form {
      .el-row .el-col {
        span: 24 !important;
      }

      .form-actions {
        .reset-btn {
          margin-left: 0;
          margin-top: 12px;
        }
      }
    }
  }
}

// 动画效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-card {
  animation: fadeInUp 0.6s ease-out;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
}
</style>

<script lang="ts">
export default { name: 'ProfilePage' }
</script>
