<template>
  <div class="user-page page w-full h-full">
    <el-form class="mb-3" :model="searchParams" ref="queryFormRef" :inline="true" v-show="showSearch">
      <el-form-item label="用户昵称" prop="name">
        <el-input class="!w-60" v-model="searchParams.name" placeholder="请输入用户名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <ElSelect v-model="searchParams.status" placeholder="用户状态" clearable class="!w-60">
          <el-option v-for="user in userStausOptions" :key="user.value" :label="user.label" :value="user.value" />
        </ElSelect>
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
      <table-utils v-model:show-search="showSearch" @queryTable="getUserList"></table-utils>
    </el-row>

    <el-table v-loading="loading" :data="userList" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户昵称" prop="name" width="120" />
      <el-table-column label="用户账户" prop="account" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="状态" align="center" prop="status" width="100"> </el-table-column>
      <el-table-column label="email" prop="email" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="phone" align="center" prop="手机号" width="100"> </el-table-column>
      <el-table-column label="age" align="center" prop="age" width="100"> </el-table-column>
      <el-table-column label="sex" align="center" prop="sex" width="100"> </el-table-column>
      <el-table-column label="avatar" align="center" prop="avatar" width="100"> </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-link type="primary" class="mr-2" :icon="Edit" @click="handleUpdate(row)">修改</el-link>
          <el-popconfirm title="你确定要删除这个吗?" confirm-button-text="删除" @confirm="handleDelete(row)">
            <template #reference>
              <el-link type="primary" class="mr-2" :icon="Delete">删除</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="searchParams.total" :page="searchParams.pageNum" :size="searchParams.pageSize" @pagination="handleChangePagination" />

    <editUser ref="editUserRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import type { Ref } from 'vue'
import type { User } from '@/types'
import { Search, Refresh, Plus, Delete, Edit } from '@element-plus/icons-vue'
import { SystemUserService } from '@/apis'
import type { FormInstance } from 'element-plus'
import editUser from './editUser.vue'

const editUserRef = ref<InstanceType<typeof editUser>>() as Ref<InstanceType<typeof editUser>>
const queryFormRef = ref<FormInstance>() as Ref<FormInstance>
const showSearch = ref(true)
const userStausOptions = [
  { label: '启用', value: '1' },
  { label: '禁用', value: '0' }
]
const loading = ref(false)
// 搜索的表单
const searchParams = ref({
  name: '',
  pageNum: 1,
  pageSize: 10,
  total: 0,
  status: ''
})
const userList = ref<User[]>([])

const handleQuery = () => {
  searchParams.value.pageNum = 1
  getUserList()
}
const resetQuery = () => {
  queryFormRef.value.resetFields()
  searchParams.value.pageNum = 1
  getUserList()
}
const handleAdd = () => {
  editUserRef.value.openModel(1)
}
const getUserList = async () => {
  loading.value = true
  const { data } = await SystemUserService.query(searchParams.value)
  userList.value = data.list
  searchParams.value.total = data.total
  loading.value = false
}
getUserList()
const handleDelete = async (row: User) => {
  await SystemUserService.delete(row.id)
  getUserList()
}
const handleUpdate = (row: User) => {
  editUserRef.value.openModel(2, { ...row })
}
const handleChangePagination = ({ page, limit }) => {
  console.log(page, limit, 'page, limit')
  searchParams.value.pageNum = page
  searchParams.value.pageSize = limit
  getUserList()
}

provide('getUserList', getUserList)
</script>
<style lang="scss" scoped>
.user-page {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
  :deep(.el-tree-node) {
    .el-tree-node__content:hover {
      background-color: var(--el-color-primary-light-5);
      color: #000;
      .el-tree-node__expand-icon {
        color: #000;
        &.is-leaf {
          color: transparent;
        }
      }
    }
    &.is-current {
      & > .el-tree-node__content {
        background-color: var(--el-color-primary-light-5);
        color: #000;
        .el-tree-node__expand-icon {
          &.is-leaf {
            color: transparent;
          }
          color: #000;
        }
      }
      & > .el-tree-node__children {
        background: #fff;
      }
    }
  }
}
</style>
<script lang="ts">
export default { name: 'SystemUser' }
</script>
