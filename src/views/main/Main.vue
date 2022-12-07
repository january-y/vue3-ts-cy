<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px" class="main-aside">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header class="main-header" height="100px">
          <main-header />
        </el-header>
        <el-main class="main-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .main-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      transition: width 0.3s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }
    .main-header {
      background-color: rgb(66, 165, 174);
    }
    .main-main {
      background-color: rgb(29, 52, 79);
    }
  }
}
</style>
