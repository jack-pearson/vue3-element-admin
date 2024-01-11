<template>
  <div class="page">
    <transition name="fade">
      <el-form :model="searchParams" ref="queryForm" :inline="true" v-show="showSearch">
        <el-form-item label="角色名称" prop="roleName">
          <el-input class="!w-60" v-model="searchParams.roleName" placeholder="请输入角色名称" clearable />
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
        <el-button type="danger" plain :icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
      </el-col>
      <table-utils v-model:show-search="showSearch" @queryTable="getList"></table-utils>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus, Delete, Refresh, Search } from '@element-plus/icons-vue'
const showSearch = ref(true)
const searchParams = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  roleName: '',
  status: '',
  createTime: ''
})
const roleStausOptions = ref([
  { label: '正常', value: '0' },
  { label: '停用', value: '1' }
])
const multiple = ref(false)
const getList = () => {}
const handleQuery = () => {}
const resetQuery = () => {}
const handleAdd = () => {}
const handleDelete = () => {}
</script>

<style scoped lang="scss"></style>
<script lang="ts">
export default { name: 'SystemDept' }
</script>
