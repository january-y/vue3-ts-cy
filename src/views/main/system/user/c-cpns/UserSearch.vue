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
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入查询的用户名"
              v-model="userSearch.name"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="userSearch.realname"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              placeholder="请输入查询的手机号码"
              v-model="userSearch.cellphone"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="userSearch.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
  realname?: any
  cellphone?: any
  enable?: any
  createAt: any
}

const searchForm = ref<InstanceType<typeof ElForm>>()
const userSearch: IUserSearch = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: '',
})
const systemStore = useSystemStore()
function handleReset() {
  searchForm.value?.resetFields()
  instance?.proxy?.mitt.emit('on-reset')
}
// mitt
function handleSearch() {
  instance?.proxy?.mitt.emit('on-search', { name: userSearch.name })
}
instance?.proxy?.mitt.on('on-reset', systemStore.getUserListAction)

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
