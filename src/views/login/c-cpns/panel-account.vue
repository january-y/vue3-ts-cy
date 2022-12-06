<template>
  <div class="panel-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
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
import { reactive } from 'vue'
import type { FormRules } from 'element-plus'

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
    { required: true, message: '请输入正确的账号', trigger: 'blur' },
    {
      min: 3,
      max: 20,
      message: '长度为3-20之间',
      trigger: 'blur',
    },
  ],
})
</script>

<style lang="less" scoped>
.panel-account {
  color: skyblue;
}
</style>
