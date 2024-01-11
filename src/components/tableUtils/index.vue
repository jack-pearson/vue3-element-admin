<template>
  <div class="mr-2 ml-auto">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button circle :icon="Search" @click="toggleSearch" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle :icon="Refresh" @click="refresh" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns.length">
        <el-button circle :icon="Menu" @click="showColumn" v-if="showColumnsType == 'transfer'" />
        <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 12px" v-if="showColumnsType == 'checkbox'">
          <el-button circle :icon="Menu" />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in columns" :key="item.key">
                <el-dropdown-item>
                  <el-checkbox :checked="item.visible" @change="checkboxChange($event, item.label)" :label="item.label" />
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" v-model="open" append-to-body>
      <el-transfer :titles="['显示', '隐藏']" v-model="value" :data="columns" @change="dataChange"></el-transfer>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, toRefs, defineProps } from 'vue'
import { Menu, Refresh, Search } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    showSearch?: boolean
    search?: boolean
    showColumnsType?: string
    columns?: Array<{ label: string; key: string; visible: boolean }>
  }>(),
  {
    showSearch: true,
    search: true,
    showColumnsType: 'checkbox',
    columns: () => []
  }
)
const { showSearch, search, showColumnsType, columns } = toRefs(props)
const emits = defineEmits(['update:showSearch', 'queryTable'])

// 显隐数据
const value = ref([])
// 弹出层标题
const title = ref('显示/隐藏')
// 是否显示弹出层
const open = ref(false)

const toggleSearch = () => {
  emits('update:showSearch', !props.showSearch)
}
const refresh = () => {
  emits('queryTable')
}
const showColumn = () => {
  title.value = '显示/隐藏'
  open.value = true
}

// 勾选
function checkboxChange(event, label) {
  console.log(event, label)
  props.columns.filter((item) => item.label == label)[0].visible = event
}
const dataChange = (data) => {}
</script>

<style lang="scss" scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}
:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}
:deep(.el-dropdown-menu__item) {
  line-height: 30px;
  padding: 0 17px;
}
</style>
<script lang="ts">
export default { name: 'TableUtils' }
</script>
