<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const message = reactive(route.params)
console.log(message)
const leaveMessage = () => {
  ElMessageBox.prompt('请输入留言内容', '留言板', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      message.value ? message.value.push(value) : message['value'] = [value]
      ElMessage({
        type: 'success',
        message: `留言成功`,
      })
    })
}
</script>
<template>
  <el-card>
    <el-button @click="leaveMessage" size="large" style="margin-bottom: 20px;">我要留言</el-button>
    <el-card v-for="m in message.value" class="message-item">{{ m }}</el-card>
  </el-card>
</template>

<style scoped>
.message-item {
  margin: 20px 20px;
}
</style>