<template>
  <div class="page">
    <transition name="fade">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
        <el-form-item label="角色名称" prop="roleName">
          <el-input class="!w-60" v-model="queryParams.roleName" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="角色状态" clearable class="!w-60">
            <el-option v-for="dict in roleStausOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model:string[]="dateRange" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </transition>
    <el-row :gutter="10" class="mb-3">
      <el-col :span="1.5">
        <el-button type="primary" plain :icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain :icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
      <table-utils v-model:show-search="showSearch" :columns="columns" @queryTable="getList"></table-utils>
    </el-row>

    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色编号" prop="roleId" width="120" v-if="columns[0].visible" />
      <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="状态" align="center" width="100">
        <template #default="{ row }">
          <el-switch v-model="row.status" active-value="0" inactive-value="1" @change="handleStatusChange(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-link type="primary" class="mr-2" :icon="Edit" @click="handleUpdate(row)">修改</el-link>
          <el-link type="primary" :icon="Delete" @click="handleDelete(row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="queryParams.total" :page="queryParams.pageNum" :size="queryParams.pageSize" @pagination="handleChangePagination" />

    <editRole ref="editRoleRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, Refresh, Delete, Plus, Edit } from '@element-plus/icons-vue'
import editRole from './editRole.vue'
import type { Ref } from 'vue'
const editRoleRef = ref<InstanceType<typeof editRole>>() as Ref<InstanceType<typeof editRole>>
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  roleName: '',
  roleKey: '',
  status: '',
  beginTime: '',
  endTime: ''
})

interface Role {
  roleId: string
  roleName: string
  roleKey: string
  status: string
  createTime: string
}
const loading = ref(true)
const roleStausOptions = ref([
  { label: '正常', value: '0' },
  { label: '停用', value: '1' }
])
const dateRange = ref([])
const showSearch = ref(true)
const multiple = ref(false)
const roleList = ref<Role[]>([])
const columns = ref([
  { label: '角色编号', key: 'roleId', visible: true },
  { label: '角色名称', key: 'roleName', visible: true },
  { label: '权限字符', key: 'roleKey', visible: true },
  { label: '状态', key: 'status', visible: true },
  { label: '创建时间', key: 'createTime', visible: true }
])
const handleQuery = () => {}
const resetQuery = () => {}
const handleAdd = () => {
  editRoleRef.value.openModel(1)
}
const handleDelete = (row) => {}
const handleChangePagination = () => {}
const handleSelectionChange = (selection) => {
  multiple.value = !selection.length
}
const handleStatusChange = (row) => {}
const handleUpdate = (row) => {}

const getList = () => {
  loading.value = true
  setTimeout(() => {
    roleList.value = [
      {
        roleId: '1',
        roleName: '超级管理员',
        roleKey: 'admin',
        status: '0',
        createTime: '2021-01-01 12:00:00'
      },
      {
        roleId: '2',
        roleName: '普通用户',
        roleKey: 'user',
        status: '0',
        createTime: '2021-01-01 12:00:00'
      }
    ]
    loading.value = false
  }, 1000)
}
getList()
</script>
<script lang="ts">
export default { name: 'systemRole' }
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
