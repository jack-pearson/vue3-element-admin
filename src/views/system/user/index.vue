<template>
  <div class="user-page w-full flex h-full">
    <el-scrollbar class="dept-tree w-60 bg-white">
      <el-tree :data="deptTree" class="h-full" :props="{ children: 'children', label: 'name' }" default-expand-all @node-click="handleNodeClick" />
    </el-scrollbar>
    <div class="user-table w-[calc(100%-15rem)] ml-5" v-loading="searchForm.loading">
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="120px" class="bg-white mb-4 flex items-center pt-4 pb-4">
        <el-form-item :label="i18nSystemUser('table.account')" prop="account">
          <el-input v-model="searchForm.account" clearable :placeholder="i18nSystemUser('search.accountPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemUser('table.nickname')">
          <el-input v-model="searchForm.name" clearable :placeholder="i18nSystemUser('search.nicknamePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="ml-4" @click="getUserList">{{ i18nGlobal("search") }}</el-button>
          <el-button @click="resetForm">{{ i18nGlobal("reset") }}</el-button>
        </el-form-item>
      </el-form>
      <div class="p-2 bg-white">
        <div class="table-header flex">
          <div class="table-header-title w-40 text-left">用户列表</div>
          <div class="table-header-actives flex-1 flex justify-end">
            <el-button type="primary">新增</el-button>
          </div>
        </div>

        <el-table :data="userTable" border>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.nickname')" prop="name"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.account')" prop="account"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.avatar')" prop="avatar"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.email')" prop="email"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.mobile')" prop="mobile"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.phone')" prop="phone"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.age')" prop="age"> </el-table-column>
          <el-table-column show-overflow-tooltip :label="i18nSystemUser('table.sex')">
            <template #default="{ row }">{{ sexFilter(row.sex) }}</template>
          </el-table-column>
        </el-table>
        <pagination :total="searchForm.total" :page="searchForm.pageNum" :size="searchForm.pageSize" @pagination="onChangePagination" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserService } from "@/apis";
import { reactive, ref } from "vue";
import { User } from "@/types";
import type { ElForm } from "element-plus";
import { i18nSystemUser, i18nGlobal } from "@/utils";
import { sexFilter } from "@/filter";
import { Dept } from "@/types";

// searchForm 的 ref 引用 用来校验和重置表单
const searchFormRef = ref<InstanceType<typeof ElForm>>();

// 搜索的表单
const searchForm = reactive({
  name: "",
  account: "",
  deptId: 1,
  pageNum: 1,
  pageSize: 10,
  total: 0,
  loading: true,
});
const deptTree = ref<Dept[]>([]);
const userTable = ref<User[]>([]);
const resetForm = () => {
  if (!searchFormRef.value) return;
  searchFormRef.value.resetFields();
  searchForm.pageNum = 1;
  getUserList();
};
const handleNodeClick = () => {};
const getUserList = async () => {
  searchForm.loading = true;
  const res = (await UserService.query()) as any;
  userTable.value = res.data.list;
  searchForm.total = res.data.total;
  searchForm.pageNum = res.data.pageNum;
  searchForm.pageSize = res.data.pageSize;
  searchForm.loading = false;
};
const onChangePagination = (val: any) => {
  searchForm.pageNum = val.page;
  getUserList();
};
getUserList();
</script>
<style lang="scss" scoped>
.user-page {
  border-radius: 5px;
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
export default { name: "systemUser" };
</script>
