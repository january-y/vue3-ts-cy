<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title }}</h3>
      <el-button type="primary" @click="handlenNewUser">{{
        contentConfig?.header?.btnTitle
      }}</el-button>
    </div>
    <div class="table">
      <!-- <el-table :data="pageList" border style="width: 100%" row-key="id"> -->
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig?.childrenTree"
      >
        <template v-for="item in contentConfig?.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEdit(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDelete(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  hName="why"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
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
import usePermissions from '@/hooks/usePermissions'
import { ref, getCurrentInstance, onUnmounted } from 'vue'

const props = defineProps<{
  contentConfig: {
    pageName: any
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any
    childrenTree?: any
  }
}>()

// 0.获取是否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

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
// 发起请求函数
function fetchPageListData(otherData: any = null) {
  // 判断权限
  if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const info = { size, offset, ...otherData }
  // console.log(info)
  // console.log(props.contentConfig?.pageName)

  systemStore.getPageListDataAction(props.contentConfig?.pageName, info)
}

// mitt
function search(data: any) {
  fetchPageListData(data)
}
instance?.proxy?.mitt.on('on-search', search)

function handleDelete(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig?.pageName, id)
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
