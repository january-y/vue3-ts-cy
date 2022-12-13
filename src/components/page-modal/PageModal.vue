<template>
  <div class="user-modal">
    <el-dialog
      v-model="dialogShow"
      :title="
        isNew ? modalConfig?.header?.newTitle : modalConfig?.header?.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <!-- 自定义 -->
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
const props = defineProps<{
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
let formData: any = reactive(initialData)
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

  // 判断是否有选择权限
  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
    console.log(infoData)
  }

  systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  if (!isNew.value) {
    // 修改数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editUserId.value,
      infoData,
    )
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
