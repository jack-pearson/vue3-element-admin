<template>
  <ElDialog :title="modelTitle" v-model="model.visible">
    <ElForm :model="roleForm" label-width="80px" :rules="roleFormRules" ref="roleFormRef" @close="handleModelClose">
      <ElFormItem label="角色名称" prop="name">
        <ElInput v-model="roleForm.name" placeholder="请输入角色名称" />
      </ElFormItem>
      <ElFormItem label="角色状态" prop="status">
        <ElRadioGroup v-model="roleForm.status">
          <ElRadio :label="1">正常</ElRadio>
          <ElRadio :label="0">停用</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="描述" prop="description">
        <ElInput v-model="roleForm.description" type="textarea" placeholder="请输入描述" />
      </ElFormItem>
      <ElFormItem label="角色权限">
        <el-tree class="tree-border" :data="menuOptions" show-checkbox ref="menuRef" node-key="id" empty-text="加载中，请稍候" :props="{ label: 'title', children: 'children' }"></el-tree>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="model.visible = false">取消</ElButton>
      <ElButton type="primary" @click="handleClickEditRole">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { type Ref, computed, ref, reactive, inject } from 'vue'
import type { IMenuItem, IRole } from '@/types'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import { SystemMenuService, SystemRoleService } from '@/apis'
import { nextTick } from 'vue'

const getRoleList = inject('getRoleList') as () => void
const menuRef = ref()
const model = reactive({ visible: false, status: 1 })
const roleForm = ref<IRole>({ name: '', status: 1, description: '', permissionIds: [] })
const menuOptions = ref<IMenuItem[]>([])
const modelTitle = computed(() => (model.status === 1 ? '新增角色' : '编辑角色'))
const roleFormRef = ref<FormInstance>() as Ref<FormInstance>
const roleFormRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择角色状态', trigger: 'blur' }]
})

const getMenuOptions = async () => {
  const { data } = await SystemMenuService.findTreeList()
  menuOptions.value = data
}
getMenuOptions()
const openModel = (status: number, row: IRole = { name: '', status: 1, description: '', permissionIds: [] }) => {
  model.visible = true
  roleForm.value = row
  model.status = status
  nextTick(() => {
    row.permissionIds.forEach((v) => {
      menuRef.value.setChecked(v, true, false)
    })
  })
}
const handleModelClose = () => roleFormRef.value.resetFields()
const getTreeChecked = () => {
  // 目前被选中的部门节点
  let checkedKeys = menuRef.value.getCheckedKeys()
  // 半选中的部门节点
  let halfCheckedKeys = menuRef.value.getHalfCheckedKeys()
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
  return checkedKeys
}
const handleClickEditRole = async () => {
  try {
    await roleFormRef.value.validate()
    const permissionIds = getTreeChecked()
    if (model.status === 1) {
      await SystemRoleService.create({ ...roleForm.value, permissionIds })
    } else if (model.status === 2) {
      await SystemRoleService.update({ ...roleForm.value, permissionIds })
    }
    await getRoleList()
    model.visible = false
    ElMessage.success('操作成功')
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}
defineExpose({
  openModel
})
</script>

<style lang="scss" scoped></style>
<script lang="ts">
export default {
  name: 'EditRole'
}
</script>
