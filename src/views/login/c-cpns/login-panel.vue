<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!--  -->
    <div class="tabs">
      <el-tabs v-model="ElPanelValue" type="border-card" stretch>
        <el-tab-pane label="账号登入" name="account">
          <template #label>
            <div class="label">
              <el-icon class="el-icon-margin"><UserFilled /></el-icon>
              <span>账号登入</span>
            </div>
          </template>
          <div>哈哈哈</div>
          <div>哈哈哈</div>
        </el-tab-pane>
        <el-tab-pane label="手机登入" name="phone">
          <template #label>
            <div class="phone">
              <el-icon class="el-icon-margin"><Cellphone /></el-icon>
              <span>手机登入</span>
            </div>
          </template>
          <div>手机登入</div>
          <div>手机登入</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleLoginBtnClick"
      >登入</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ElPanelValue = ref('account')
let isRemPwd = ref(false)

function handleLoginBtnClick() {
  if (ElPanelValue.value === 'account') {
    console.log(ElPanelValue.value)
    console.log('账号密码登入')
  } else {
    console.log(ElPanelValue.value)
    console.log('手机号登入')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .el-icon-margin {
      margin-right: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    // 覆盖默认大小
    // --el-button-size: 45px !important;
    margin-top: 10px;
    width: 100%;
  }

  .phone {
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon-margin {
      margin-right: 5px;
    }
  }
}
</style>
