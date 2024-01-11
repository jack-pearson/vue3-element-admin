<template>
  <div class="page">
    <transition name="fade">
      <el-form :model="searchParams" ref="queryFormRef" :inline="true" v-show="showSearch">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input class="!w-60" v-model="searchParams.menuName" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchParams.status" placeholder="角色状态" clearable class="!w-60">
            <el-option v-for="dict in roleStausOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
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
        <el-button type="info" plain :icon="Sort" @click="toggleExpandAll">展开/折叠</el-button>
      </el-col>
      <table-utils v-model:show-search="showSearch" @queryTable="getList"></table-utils>
    </el-row>

    <el-table v-if="expandTable" v-loading="loading" :data="menuList" row-key="menuId" :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }: { row: MenuItem }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="160" prop="createTime">
        <template #default="{ row }: { row: MenuItem }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
        <template #default="{ row }: { row: MenuItem }">
          <el-button link type="primary" icon="Edit" @click="handleEdit(row)">修改</el-button>
          <el-button link type="primary" icon="Plus" @click="handleAdd(row)">新增</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { Plus, Refresh, Search, Sort } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import Mock from '@/apis/user/menu'

const showSearch = ref(true)
const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  menuName: '',
  status: ''
})
const queryFormRef = ref<FormInstance>()
const roleStausOptions = ref([
  { label: '正常', value: '0' },
  { label: '停用', value: '1' }
])
const handleEdit = () => {}
const menuList = ref<MenuItem[]>([])
const expandTable = ref(true)
const isExpandAll = ref(false)
const loading = ref(false)
const getList = () => {
  menuList.value = Mock.menu.data.list as MenuItem[]
}
getList()
const handleQuery = () => {}
const resetQuery = () => {
  queryFormRef.value!.resetFields()
  getList()
}
const handleAdd = () => {}
const handleDelete = () => {}
/** 展开/折叠操作 */
const toggleExpandAll = () => {
  expandTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    expandTable.value = true
  })
}
</script>
<style lang="scss" scoped></style>

<script lang="ts">
export default { name: 'SystemMenu' }
</script>
