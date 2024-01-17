<template>
  <div class="page">
    <el-form :model="searchParams" ref="queryFormRef" :inline="true" v-show="showSearch">
      <el-form-item label="角色名称" prop="name">
        <el-input class="!w-60" v-model="searchParams.name" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchParams.status" placeholder="角色状态" clearable class="!w-60">
          <el-option v-for="status in roleStausOptions" :key="status.value" :label="status.label" :value="status.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="dateRange" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
      <table-utils v-model:show-search="showSearch" @queryTable="getList"></table-utils>
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色名称" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" prop="description" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="150">
        <template #default="{ row }">
          <el-link type="primary" class="mr-2" :icon="Edit" @click="handleUpdate(row)">修改</el-link>
          <el-popconfirm title="你确定要删除这个吗?" confirm-button-text="删除" @confirm="handleDelete(row)">
            <template #reference>
              <el-link type="primary" :icon="Delete">删除</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="searchParams.total" :page="searchParams.pageNum" :size="searchParams.pageSize" @pagination="handleChangePagination" />

    <editRole ref="editRoleRef" />
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref, provide } from 'vue'
import { Search, Refresh, Delete, Plus, Edit } from '@element-plus/icons-vue'
import editRole from './editRole.vue'
import { type FormInstance } from 'element-plus'
import { SystemRoleService } from '@/apis/system/role'
import type { IRole } from '@/types'
const editRoleRef = ref<InstanceType<typeof editRole>>() as Ref<InstanceType<typeof editRole>>
const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  name: '',
  status: '',
  beginTime: '',
  endTime: ''
})
const queryFormRef = ref<FormInstance>() as Ref<FormInstance>
const loading = ref(true)
const roleStausOptions = ref([
  { label: '正常', value: 1 },
  { label: '停用', value: 0 }
])
const dateRange = ref('')
const showSearch = ref(true)
const multiple = ref(false)
const roleList = ref<IRole[]>([])
const handleQuery = () => {
  searchParams.value.pageNum = 1
  getList()
}
const resetQuery = () => {
  queryFormRef.value.resetFields()
  searchParams.value.pageNum = 1
  getList()
}
const handleAdd = () => {
  editRoleRef.value.openModel(1)
}
const handleDelete = async (row: IRole) => {
  await SystemRoleService.delete(row.id)
  getList()
}
const handleChangePagination = () => {}
const handleSelectionChange = (selection) => {
  multiple.value = !selection.length
}
const handleStatusChange = (row) => {}
const handleUpdate = (row) => {
  editRoleRef.value.openModel(2, { ...row })
}
const getList = async () => {
  loading.value = true
  if (dateRange.value) {
    const [beginTime, endTime] = dateRange.value
    searchParams.value.beginTime = beginTime
    searchParams.value.endTime = endTime
  }
  const { data } = await SystemRoleService.query(searchParams.value)
  roleList.value = data.list
  searchParams.value.total = data.total
  loading.value = false
}
getList()
provide('getRoleList', getList)
</script>
<script lang="ts">
export default { name: 'SystemRole' }
</script>

<style lang="scss" scoped></style>
