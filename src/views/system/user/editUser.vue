<template>
  <ElDialog :title="modelTitle" v-model="model.visible" append-to-body @close="handleModelClose">
    <ElForm :model="userForm" ref="userFormRef" label-width="120px" :rules="userFormRules">
      <ElRow :gutter="10">
        <ElCol :span="12">
          <ElFormItem label="用户昵称" prop="name">
            <ElInput v-model="userForm.name" placeholder="请输入用户昵称" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="账户" prop="account">
            <ElInput v-model="userForm.account" placeholder="请输入账户" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="密码" prop="password">
            <ElInput v-model="userForm.password" placeholder="请输入密码" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="邮箱" prop="email">
            <ElInput v-model="userForm.email" placeholder="请输入邮箱" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="手机号" prop="phone">
            <ElInput v-model="userForm.phone" placeholder="请输入手机号" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="状态" prop="status">
            <ElSelect v-model="userForm.status" placeholder="用户状态">
              <ElOption v-for="user in userStausOptions" :key="user.value" :label="user.label" :value="user.value" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="角色" prop="roleId">
            <ElSelect v-model="userForm.roleId" placeholder="分配角色">
              <ElOption v-for="role in roleSelectOptins" :key="role.id" :label="role.name" :value="role.id" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="描述" prop="description">
            <ElInput v-model="userForm.description" type="textarea" placeholder="请输入描述" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
    <template #footer>
      <ElButton @click="model.visible = false">取消</ElButton>
      <ElButton type="primary" @click="handleClickAddUser">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { type Ref, ref, computed, reactive, inject } from 'vue'
import { SystemRoleService, SystemUserService } from '@/apis'
import type { User, IRole } from '@/types'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'

const getUserList = inject('getUserList') as () => void
const model = reactive({ visible: false, status: 1 })
const roleSelectOptins = ref<IRole[]>([])
const userForm = ref<User>({ account: '', password: '', name: '', status: '1' })
const userFormRef = ref<FormInstance>() as Ref<FormInstance>
const userFormRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  account: [{ required: true, message: '请输入用户账户', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})
const modelTitle = computed(() => {
  return model.status === 1 ? '新增用户' : '编辑用户'
})
const userStausOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '0' }
]
const handleModelClose = () => {
  userFormRef.value.resetFields()
}
const handleClickAddUser = async () => {
  try {
    await userFormRef.value.validate()
    if (model.status === 1) {
      await SystemUserService.create(userForm.value)
    } else if (model.status === 2) {
      await SystemUserService.update(userForm.value)
    }
    model.visible = false
    getUserList()
    ElMessage.success('操作成功')
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}
const getRoleSelect = async () => {
  const { data } = await SystemRoleService.querySelect()
  roleSelectOptins.value = data
}
getRoleSelect()
const openModel = (status: number, user: User = { name: '', account: '', password: '', status: '1' }) => {
  model.visible = true
  model.status = status
  userForm.value = user
}
defineExpose({
  openModel
})
</script>

<style scoped lang="scss"></style>
<script lang="ts">
export default { name: 'EditUser' }
</script>
