<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const route = useRoute()
// const curName = window.localStorage.getItem("have_login").split('=')[0].slice(1)
const curName = computed(() => store.state.curName)
let message = ref([])

const getData = async () => {
  const req = fetch(`http://localhost:4000/goods/getChat/?id=${route.params.id}`, {
    method: 'get',
  })
  const stream = await req;
  const res = await stream.text();
  return JSON.parse(res)[0].chat;
}

const initMessage = async () => {
  let res = await getData()
  if (res) {
    res = JSON.parse(res)
    message.value = res
  }
}

onMounted(() => {
  initMessage()
})

const ws = new WebSocket(`ws://127.0.0.1:4000/chat`)

ws.onmessage = function (msg) {
  if (msg.data) {
    message.value = JSON.parse(msg.data)
  }
}

const leaveMessage = () => {
  ElMessageBox.prompt('请输入留言内容', '留言板', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      message.value.push({
        data: value,
        curName: curName.value,
      })
      fetch(`http://localhost:4000/goods/updateChat`, {
        method: 'post',
        body: JSON.stringify({
          id: route.params.id,
          data: message.value
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      ws.send(JSON.stringify(message.value))
      ElMessage({
        type: 'success',
        message: `留言成功`,
      })
    })
}
</script>
<template>
  <div id="messages"></div>
  <el-card>
    <el-button @click="leaveMessage" size="large" style="margin-bottom: 20px;">我要留言</el-button>
    <el-card v-for="msg in message" class="message-item">
      <div :style="{ 'text-align': curName === msg.curName ? 'right' : 'left' }">
        <el-tag :type="curName === msg.curName ? '' : 'success'" style="margin-right: 20px;">{{ msg.curName }}</el-tag>
        {{ msg.data }}
      </div>
    </el-card>
  </el-card>
</template>

<style scoped>
.message-item {
  margin: 20px 20px;
}
</style>