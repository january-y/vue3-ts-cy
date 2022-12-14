<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="bottom" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="countRef1">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="total">{{ subtitle }}</span>
      <span class="number" ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CountUp } from 'countup.js'

onMounted(() => {
  const action1 = new CountUp(countRef1!.value, props.number1, {
    duration: 1,
    prefix: props.amount === 'saleroom' ? '￥' : '',
  })
  const action2 = new CountUp(countRef2!.value, props.number2, {
    duration: 1,
    prefix: props.amount === 'saleroom' ? '￥' : '',
  })
  action1.start()
  action2.start()
})
const countRef1 = ref<any>()
const countRef2 = ref<any>()

interface IProps {
  subtitle?: string
  tips?: any
  number1?: number
  number2?: number
  title?: string
  amount?: any
}
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量',
  amount: '',
})
</script>

<style lang="less" scoped>
.count-card {
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  .header {
    display: flex;
    justify-content: space-between;
    padding-right: 5px;

    span {
      font-size: 14px;
    }
  }
  .content {
    margin-top: 10px;
    span {
      font-size: 25px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .footer {
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;
    color: rgba(0, 0, 0, 0.85);
    padding-top: 10px;

    .total {
      font-weight: 600;
    }
    .number {
      margin-left: 5px;
    }
  }
}
</style>
