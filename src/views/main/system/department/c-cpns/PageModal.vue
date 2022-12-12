<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogShow"
      :title="isNew ? '新建部门' : '编辑'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/systems'

// interface IFormData {
//   name: string
//   realname: string
//   password: any
//   cellphone: any
//   roleId: any
//   departmentId: any
// }
const formData: any = reactive({
  name: '',
  leader: '',
  parentId: '',
})
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)
const instance = getCurrentInstance()
const dialogShow = ref(false)
let isNew = ref(true)
let editUserId = ref()

function changeShow(isShow?: any) {
  dialogShow.value = true
  if (!isShow) {
    isNew.value = false
  } else {
    isNew.value = true
    for (const key in formData) {
      formData[key] = ''
    }
  }
}

function handleConfirm() {
  dialogShow.value = false
  systemStore.newPageDataAction('department', formData)
  if (!isNew.value) {
    // 修改数据
    systemStore.editPageDataAction('department', editUserId.value, formData)
  }
}

function editHandle(itemData: any) {
  for (const key in formData) {
    formData[key] = itemData[key]
  }
}

function changeEditUserId(id: any) {
  editUserId.value = id
}

onMounted(() => {
  instance?.proxy?.mitt.on('show-modal', changeShow)
  instance?.proxy?.mitt.on('on-edit', editHandle)
  instance?.proxy?.mitt.on('editid', changeEditUserId)
})

onUnmounted(() => {
  instance?.proxy?.mitt.off('show-moadl')
  instance?.proxy?.mitt.off('on-edit')
  instance?.proxy?.mitt.off('editid')
})

defineExpose({ changeShow })
</script>

<style lang="less" scoped>
.user-modal {
  color: skyblue;
  .form {
    padding-right: 20px;
    .el-input {
      height: 35px;
    }
  }
}
</style>
