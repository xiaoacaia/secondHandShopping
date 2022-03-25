<script setup>
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const route = useRoute()
const detailData = route.params.name ? route.params : {
  src: 'src/assets/picture/b59706fd5e43e196.jpg',
  description: 'Apple iPhone 13 Pro Max (A2644) 256GB 远峰蓝色 支持移动联通电信5G 双卡双待手机',
  name: 'iPhone 13 Pro Max',
  price: 5000
}

let isAdd = 0
const addGoodsToShoppingCart = () => {
  if (!isAdd) {
    isAdd = 1
    store.commit('addGood', detailData)
    ElMessage({
      message: '添加购物车成功!',
      type: 'success',
    })
  } else {
    ElMessage.error('你已经添加过了, 请勿重复添加哦~')
  }
}

const rebackToHome = () => {
  window.location.href = "/#content";
}

const leaveMessage = () => {
  router.push({
    name: 'leave-message', params: detailData
  })
}
</script>

<template>
  <div class="outer-detail">
    <div class="display-picture">
      <el-image :src="detailData.src" fit="cover" />
    </div>
    <div class="description">
      <h2>{{ detailData.description }}</h2>
      <div class="goods-price">
        价格 :
        <span style="color: #e4393c">￥{{ detailData.price }}</span>
      </div>
      <el-button class="leave-message-button" @click="leaveMessage">给商家留言</el-button>
      <div class="all-button">
        <el-button class="add-button" @click="addGoodsToShoppingCart">加入购物车</el-button>
        <el-button class="reback-button" @click="rebackToHome">返回</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer-detail {
  display: flex;
  padding: 20px;
}
.display-picture {
  flex: 1;
  width: 400px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.description {
  flex: 2;
  margin-left: 20px;
  padding: 80px 80px;
}

.goods-price {
  margin-top: 60px;
  font-size: 1.5rem;
}

.leave-message-button {
  margin-top: 60px;
  font-size: 1.8rem;
  color: white;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: rgb(40, 120, 173);
}

.all-button {
  position: absolute;
  bottom: 200px;
}

.add-button {
  font-size: 1.8rem;
  color: white;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: #df3033;
}
.reback-button {
  margin-left: 30px;
  font-size: 1.8rem;
  color: white;
  padding: 30px 20px;
  border-radius: 10px;
  background-color: rgb(40, 120, 173);
}
</style>