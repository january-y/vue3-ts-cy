<template>
  <div class="panel-account">
    <el-form label-width="60px">
      <el-form-item label="账号">
        <el-input />
      </el-form-item>
      <el-form-item label="密码" show-password>
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.panel-account {
  color: skyblue;
}
</style>
