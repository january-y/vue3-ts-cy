<template>
  <div class="user-search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      ref="searchForm"
      label-width="80px"
      size="large"
      :model="userSearch"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              placeholder="请输入查询的部门名"
              v-model="userSearch.name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="userSearch.leader"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="userSearch.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
interface IUserSearch {
  name?: any
  leader: any
  createAt: any
}

const searchForm = ref<InstanceType<typeof ElForm>>()
const userSearch: IUserSearch = reactive({
  name: '',
  leader: '',
  createAt: '',
})
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
