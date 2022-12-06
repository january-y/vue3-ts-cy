<template>
  <div class="panel-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
      ref="fromRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="account.pwd" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
// import { accountLoginRequest } from '@/service/login/index'
import useLoginStore from '@/store/login/index'

interface useAccount {
  name: string
  pwd: any
}

let account = reactive<useAccount>({
  name: '',
  pwd: '',
})

const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur',
    },
  ],
  pwd: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur',
    },
  ],
})

// login
const fromRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginHandle() {
  fromRef.value?.validate((res) => {
    if (res) {
      console.log('验证成功')
      const name = account.name
      const pwd = account.pwd

      loginStore.loginAccountAction({ name, password: pwd })
    } else {
      console.log('验证失败')
      ElMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error',
      })
    }
  })
}

defineExpose({
  loginHandle,
})
</script>

<style lang="less" scoped>
.panel-account {
  color: skyblue;
}
</style>
