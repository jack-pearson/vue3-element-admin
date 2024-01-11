<template>
  <ElDialog :title="modelTitle" v-model="model.visible">
    <ElForm :model="roleForm" label-width="80px">
      <ElFormItem label="角色名称" prop="roleName">
        <ElInput v-model="roleForm.name" placeholder="请输入角色名称" />
      </ElFormItem>
      <ElFormItem label="角色状态" prop="status">
        <ElRadioGroup v-model="roleForm.status">
          <ElRadio label="0">正常</ElRadio>
          <ElRadio label="1">停用</ElRadio>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="备注" prop="remark">
        <ElInput v-model="roleForm.remark" type="textarea" placeholder="请输入备注" />
      </ElFormItem>
      <ElFormItem label="菜单权限">
        <el-tree class="tree-border" :data="menuOptions" show-checkbox ref="menuRef" node-key="id" empty-text="加载中，请稍候" :props="{ label: 'label', children: 'children' }"></el-tree>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="model.visible = false">取消</ElButton>
      <ElButton type="primary" @click="model.visible = false">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Mock from '@/apis/user/menu'
import type { Menu } from '@/types'
const model = ref({
  visible: false,
  status: 1
})
const roleForm = ref({
  name: '',
  status: 0,
  remark: ''
})
const menuOptions = ref<Menu[]>([])
const modelTitle = computed(() => {
  return model.value.status === 1 ? '新增角色' : '编辑角色'
})
const getMenuOptions = () => {
  menuOptions.value = Mock.menu.data.list as Menu[]
}
getMenuOptions()
const openModel = (status: number) => {
  model.value.visible = true
  model.value.status = status
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
