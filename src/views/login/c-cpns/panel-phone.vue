<template>
  <div class="panel-phone">
    <el-form label-width="70px" size="large">
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="code">
          <el-input />
          <span class="send-code">
            <el-button type="primary">发送验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.code {
  display: flex;
  justify-content: center;
  align-items: center;

  .send-code {
    margin-left: 8px;
  }
}
</style>
