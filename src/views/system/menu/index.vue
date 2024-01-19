<template>
  <div class="page">
    <el-form :model="searchParams" ref="queryFormRef" :inline="true" v-show="showSearch">
      <el-form-item label="菜单名称" prop="title">
        <el-input class="!w-60" v-model="searchParams.title" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchParams.status" placeholder="状态" clearable class="!w-60">
          <el-option v-for="dict in roleStausOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain :icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <table-utils v-model:show-search="showSearch" @queryTable="getList"></table-utils>
    </el-row>

    <el-table v-if="expandTable" v-loading="loading" :data="menuList" row-key="id" border :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="title" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="permission" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" :show-overflow-tooltip="true" prop="createTime">
        <template #default="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-link type="primary" class="mr-2" :icon="Edit" @click="handleUpdate(row)">修改</el-link>
          <el-link v-if="row.type === 'menu'" type="primary" class="mr-2" :icon="Plus" @click="handleAdd(row)">新增</el-link>
          <el-link type="primary" :icon="Delete" @click="handleDelete(row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <editMenu ref="editMenuRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, type Ref, provide } from 'vue'
import { Delete, Edit, Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import { SystemMenuService } from '@/apis'
import { ElMessage, type FormInstance } from 'element-plus'
import editMenu from './editMenu.vue'
import type { IMenuItem } from '@/types'

const editMenuRef = ref<InstanceType<typeof editMenu>>() as Ref<InstanceType<typeof editMenu>>
const showSearch = ref(true)
const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  title: '',
  status: ''
})
const queryFormRef = ref<FormInstance>()
const roleStausOptions = ref([
  { label: '正常', value: '0' },
  { label: '停用', value: '1' }
])
const handleUpdate = (row: IMenuItem) => {
  editMenuRef.value.openModel(2, { ...row })
}
const menuList = ref<IMenuItem[]>([])
const expandTable = ref(true)
const isExpandAll = ref(false)
const loading = ref(false)
const getList = async () => {
  const { data } = await SystemMenuService.findTreeList(searchParams.value)
  menuList.value = data
}
getList()
const handleQuery = () => {
  searchParams.value.pageNum = 1
  getList()
}
const resetQuery = () => {
  queryFormRef.value!.resetFields()
  getList()
}
const handleAdd = (row) => {
  editMenuRef.value.openModel(1, { parentId: row?.id || 0, type: 'menu', status: 1, children: [] })
}
const handleStatusChange = (row) => {
  console.log('handleStatusChange')
}
const handleDelete = async (row) => {
  try {
    console.log(row, 'row')
    await SystemMenuService.delete(row.id)
    getList()
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}
/** 展开/折叠操作 */
const toggleExpandAll = () => {
  expandTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    expandTable.value = true
  })
}

provide('getMenuList', getList)
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: 'SystemMenu' }
</script>
