<template>
  <div class="user-modal">
    <el-dialog v-model="dialogShow" title="新建用户" width="30%" center>
      <span> 芜湖起飞 </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">取消</el-button>
          <el-button type="primary" @click="dialogShow = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const dialogShow = ref(false)

function changeShow() {
  dialogShow.value = true
}

onMounted(() => {
  instance?.proxy?.mitt.on('show-modal', changeShow)
})

onUnmounted(() => {
  instance?.proxy?.mitt.off('show-moadl')
})

defineExpose({ changeShow })
</script>

<style lang="less" scoped>
.user-modal {
  color: skyblue;
}
</style>
