<template>
  <div class="user-search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      ref="searchForm"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      :model="userSearch"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="userSearch[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="userSearch[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="userSearch[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col> </template
      ></el-row>
    </el-form>

    <!-- 2.按钮 -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleReset"
        >重置</el-button
      >
      <el-button
        type="primary"
        size="large"
        icon="ZoomOut"
        @click="handleSearch"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// 表单绑定searchForm item绑定prop(searchForm里的属性)
import type { ElForm } from 'element-plus'
import { reactive, ref, getCurrentInstance, onUnmounted } from 'vue'
import useSystemStore from '@/store/main/system/systems'

const instance = getCurrentInstance()
const props = defineProps<{
  searchConfig: any
}>()

// 定义form数据
const initialForm: any = {}
for (const i of props.searchConfig.formItems) {
  initialForm[i.prop] = i.initialValue ?? ''
}
const searchForm = ref<InstanceType<typeof ElForm>>()
// 表单数据
const userSearch: any = reactive(initialForm)
const systemStore = useSystemStore()
function handleReset() {
  searchForm.value?.resetFields()
  // instance?.proxy?.mitt.emit('on-reset')
  systemStore.getPageListDataAction('department', { size: 10, offset: 0 })
}
// mitt
function handleSearch() {
  instance?.proxy?.mitt.emit('on-search', {
    name: userSearch.name,
    leader: userSearch.leader,
  })
}
// instance?.proxy?.mitt.on('on-reset', systemStore.getPageListDataAction)

onUnmounted(() => {
  instance?.proxy?.mitt.off('on-reset')
})
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 10px 5px;
    margin-bottom: 2px;
  }
  .btns {
    text-align: right;
    padding-right: 55px;
    .el-button {
      height: 37px;
    }
  }
}
</style>
