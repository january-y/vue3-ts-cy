<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handlenNewUser">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="60px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="部门名称"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="部门领导"
          prop="leader"
          width="150px"
        />
        <el-table-column
          align="center"
          label="上级部门"
          prop="parentId"
          width="150px"
        />

        <el-table-column prop="createAt" label="创建时间" align="center">
          <!-- 作用域插槽 -->
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>

        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column width="170" align="center" label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              text
              icon="Edit"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              text
              icon="Delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/systems'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref, getCurrentInstance, onUnmounted } from 'vue'

const instance = getCurrentInstance()
const systemStore = useSystemStore()
const currentPage = ref<any>(1)
const pageSize = ref<any>(10)
fetchPageListData()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

function handlenNewUser() {
  instance?.proxy?.mitt.emit('show-modal', true)
}

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
function handleEdit(itemData: any) {
  // 编辑
  instance?.proxy?.mitt.emit('show-modal', false)
  instance?.proxy?.mitt.emit('on-edit', itemData)
  // 传id修改数据
  instance?.proxy?.mitt.emit('editid', itemData.id)
}
// 起请求函数
function fetchPageListData(otherData: any = null) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const info = { size, offset, ...otherData }

  systemStore.getPageListDataAction('department', info)
}

// mitt
function search(data: any) {
  fetchPageListData(data)
}
instance?.proxy?.mitt.on('on-search', search)

function handleDelete(id: number) {
  systemStore.deletePageByIdAction('department', id)
}

onUnmounted(() => {
  instance?.proxy?.mitt.off('on-search')
})
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .table {
    :deep(.el-table__cell) {
      padding: 13px 0 !important;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
