<template>
  <ElDialog :title="modelTitle" v-model="model.visible" append-to-body @close="handleModelClose">
    <ElForm :model="menuForm" label-width="120px" ref="menuFormRef" :rules="menuForm.type === 'menu' ? menuFormMenuRules : menuFormButtonRules">
      <ElRow>
        <ElCol :span="24">
          <ElFormItem label="上级菜单" prop="parentId">
            <ElTreeSelect :data="menuOptions" v-model="menuForm.parentId" :props="{ value: 'id', label: 'title', children: 'children' }" value-key="id" placeholder="选择上级菜单" check-strictly>
            </ElTreeSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="类型" prop="type">
            <ElRadioGroup v-model="menuForm.type" @change="handleChangeMenuType">
              <el-radio label="menu">菜单</el-radio>
              <el-radio label="button">按钮</el-radio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="状态" prop="status">
            <ElRadioGroup v-model="menuForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="24">
          <ElFormItem label="菜单名称" prop="title">
            <ElInput v-model="menuForm.title" placeholder="请输入菜单名称" />
          </ElFormItem>
        </ElCol>
        <template v-if="menuForm.type === 'menu'">
          <ElCol :span="12">
            <ElFormItem label="菜单key" prop="name">
              <ElInput v-model="menuForm.name" placeholder="请输入菜单Key(唯一)" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="菜单路径" prop="path">
              <ElInput v-model="menuForm.path" placeholder="请输入菜单路径" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="组件地址" prop="path">
              <ElInput v-model="menuForm.component" placeholder="请输入组件地址" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="重定向路径" prop="redirect">
              <ElInput v-model="menuForm.redirect" placeholder="请输入重定向路径" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="菜单排序" prop="sort">
              <ElInput v-model="menuForm.sort" placeholder="请输入菜单排序" />
            </ElFormItem>
          </ElCol>

          <ElCol :span="12">
            <ElFormItem label="菜单图标" prop="icon">
              <ElInput v-model="menuForm.icon" placeholder="请输入菜单图标" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="是否缓存" prop="cache">
              <ElRadioGroup v-model="menuForm.cache">
                <el-radio :label="1">缓存</el-radio>
                <el-radio :label="0">不缓存</el-radio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="是否隐藏" prop="hidden">
              <ElRadioGroup v-model="menuForm.hidden">
                <el-radio :label="1">隐藏</el-radio>
                <el-radio :label="0">不隐藏</el-radio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="isAffix">
              <template #label>
                <span>
                  <el-tooltip content="选择固定则固定再顶部导航栏,不可关闭" placement="top">
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                  固定tagView
                </span>
              </template>
              <ElRadioGroup v-model="menuForm.isAffix">
                <el-radio :label="1">固定</el-radio>
                <el-radio :label="0">不固定</el-radio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="isTagView">
              <template #label>
                <span>
                  <el-tooltip content="选择隐藏则路由将不会出现在顶部导航栏，但仍然可以访问" placement="top">
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                  显示tagView
                </span>
              </template>
              <ElRadioGroup v-model="menuForm.isTagView">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">隐藏</el-radio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </template>
        <template v-else>
          <ElCol :span="12">
            <ElFormItem label="权限标识" prop="permission">
              <ElInput v-model="menuForm.permission" placeholder="请输入权限标识(唯一)" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElCol :span="12">
              <ElFormItem label="菜单排序" prop="sort">
                <ElInput v-model="menuForm.sort" placeholder="请输入菜单排序" />
              </ElFormItem>
            </ElCol>
          </ElCol>
        </template>
      </ElRow>
    </ElForm>
    <template #footer>
      <ElButton @click="model.visible = false">取消</ElButton>
      <ElButton type="primary" @click="handleClickAddMenu">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { QuestionFilled } from '@element-plus/icons-vue'
import { computed, ref, reactive, type Ref, nextTick, inject } from 'vue'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import { SystemMenuService } from '@/apis'
import type { IMenuItem } from '@/types'

const getMenuList = inject('getMenuList') as () => void
const menuFormRef = ref<FormInstance>() as Ref<FormInstance>
const menuFormMenuRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择菜单状态', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单key', trigger: 'blur' }],
  path: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件地址', trigger: 'blur' }]
})
const menuFormButtonRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择菜单状态', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  permission: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
})
const model = reactive({ visible: false, status: 1 })
const menuOptions = ref<IMenuItem[]>([])
const menuForm = ref<IMenuItem>({ parentId: 0, type: 'menu', status: 1, children: [] })
const modelTitle = computed(() => (model.status === 1 ? '新增菜单' : '编辑菜单'))

const getTreeselect = async () => {
  menuOptions.value = []
  const { data } = await SystemMenuService.findTreeList()
  const menu = { id: 0, title: '主类目', children: [...data] } as IMenuItem
  menuOptions.value.push(menu)
}
getTreeselect()
const openModel = (status: number, item: IMenuItem = { parentId: 0, type: 'menu', status: 1, children: [] }) => {
  model.visible = true
  model.status = status
  menuForm.value = item
}
const handleModelClose = () => menuFormRef.value.resetFields()
const handleClickAddMenu = async () => {
  try {
    await menuFormRef.value.validate()
    if (model.status === 1) {
      await SystemMenuService.create(menuForm.value)
    } else if (model.status === 2) {
      await SystemMenuService.update(menuForm.value)
    }
    model.visible = false
    getMenuList()
    ElMessage.success('操作成功')
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}
const handleChangeMenuType = (e) => {
  menuForm.value.type = e
  nextTick(() => {
    setTimeout(() => {
      menuFormRef.value.clearValidate()
    }, 200)
  })
}
defineExpose({
  openModel
})
</script>

<style scoped lang="scss"></style>
<script lang="ts">
export default { name: 'EditMenu' }
</script>
