<!--
 * @Author: jack-pearson
 * @Date: 2022-01-17 14:49:06
 * @LastEditTime: 2022-02-07 13:20:56
 * @LastEditors: jack-pearson
 * @FilePath: /yh-vue3-admin/src/views/system/dept/index.vue
 * @Description: 
-->
<template>
  <div class="dept-page w-full bg-white p-2.5">
    <el-row class="mb-4">
      <el-input placeholder="请输入部门名称" style="max-width: 180px" v-model="searchForm.name" clearable></el-input>
      <el-button type="primary" class="ml-4" @click="getList">查询</el-button>
      <el-button @click="handleAdd({ id: 1 })">新增部门</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%" row-key="id" border default-expand-all>
      <el-table-column prop="name" :label="i18nSystemDept('table.deptName')" />
      <el-table-column :label="i18nGlobal('status')">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" effect="light">
            {{ row.status === 1 ? i18nGlobal("enable") : i18nGlobal("disable") }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" :label="i18nGlobal('description')" />
      <el-table-column prop="createTime" :label="i18nGlobal('createTime')" />
      <el-table-column :label="i18nGlobal('operation')">
        <template #default="{ row }">
          <el-button type="text" @click="handleAdd(row)">{{ i18nGlobal("add") }}</el-button>
          <el-button type="text" @click="handleEdit(row)">{{ i18nGlobal("edit") }}</el-button>
          <el-popconfirm :title="i18nGlobal('deleteThis')" @confirm="handleDelete(row)">
            <template #reference>
              <el-button type="text">{{ i18nGlobal("delete") }}</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="i18nSystemDept(dialogTitle)" :modelValue="dialogOpen" width="30%" :before-close="onBeforeClose">
      <div class="mb-2">根节点为 0, 二级节点为 1 或者 2,等, 三级几点为 10 或者 20, 21,等, 更多节点 以此类推</div>
      <el-form ref="form" :model="deptForm" label-width="100px">
        <el-form-item :label="i18nSystemDept('dialog.parentDeptId')">
          <el-input v-model="deptForm.parentId" disabled></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemDept('dialog.parentDeptName')">
          <el-input v-model="parentName" disabled></el-input>
        </el-form-item>
        <el-form-item :label="i18nGlobal('id')">
          <el-input v-model="deptForm.id" :placeholder="i18nGlobal('idPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemDept('dialog.deptName')">
          <el-input v-model="deptForm.name" :placeholder="i18nSystemDept('dialog.deptNamePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemDept('dialog.deptDesc')">
          <el-input v-model="deptForm.description" :placeholder="i18nSystemDept('dialog.deptDescPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item :label="i18nSystemDept('dialog.deptStatus')">
          <el-switch v-model="deptForm.status" :active-value="1" :inactive-value="0" inline-prompt active-text="启" inactive-text="禁"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onBeforeClose">{{ i18nGlobal("cancel") }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ i18nGlobal("submit") }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { DeptService } from "@/apis/dept";
import { i18nGlobal, i18nSystemDept, treeToArray } from "@/utils";
import { Dept } from "@/types";

// 初始化数据 dialog
const deptForm = ref({
  name: "",
  description: "",
  status: 1,
  parentId: 0,
  id: "",
});

// 重置表单
const resetDialogForm = () => {
  deptForm.value.name = "";
  deptForm.value.description = "";
  deptForm.value.status = 1;
  deptForm.value.parentId = 0;
  deptForm.value.id = "";
};

// 搜索条件数据
const searchForm = ref({
  name: "",
});

// 是否打开 dialog
const dialogOpen = ref(false);
// dialog 的 title
const dialogTitle = ref("dialog.addDept");
// 表格数据
const tableData = ref<Dept[]>([]);

// 获取数据
const getList = async () => {
  const res = await DeptService.query(searchForm.value);
  tableData.value = res.data;
};
getList();

// 监听到父级部门名称
const parentName = computed(() => {
  return deptForm.value.parentId === 0 ? "根节点" : isOpenSetParentName(deptForm.value.parentId);
});

// 新增部门
const handleAdd = (row: { id: number }) => {
  deptForm.value.parentId = row.id;
  deptForm.value.id = "";
  dialogTitle.value = "dialog.addDept";
  dialogOpen.value = true;
};

// 编辑部门
const handleEdit = (row: any) => {
  dialogOpen.value = true;
  Object.assign(deptForm.value, row);
  dialogTitle.value = "dialog.editDept";
};

// 获取父级部门名称
const isOpenSetParentName = (parentDeptId: string | number) => {
  const array = treeToArray(tableData.value);
  const current = array.find(item => item.id === parentDeptId);
  return current?.name;
};

// 关闭弹窗
const onBeforeClose = () => {
  dialogOpen.value = false;
  resetDialogForm();
};

// 提交
const onSubmit = () => {
  DeptService.update(deptForm as unknown as Dept).then(res => {
    if (res.code === 200) {
      dialogOpen.value = false;
      getList();
      resetDialogForm();
    }
  });
};
const handleDelete = (row: Dept) => {
  DeptService.delete(row.id).then(res => {
    if (res.code === 200) {
      getList();
    }
  });
};
</script>
<style lang="scss" scoped>
.dept-page {
}
</style>

<script lang="ts">
export default { name: "Dept" };
</script>
