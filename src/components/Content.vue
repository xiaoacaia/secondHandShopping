
<script setup>
import { ref, reactive, watch, computed } from 'vue'
import initialPictureSrc from '../data/pictureSrc.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const shoppingCartData = computed(() => store.state.shoppingCartData)
const allOrder = computed(() => store.state.orderData)

const router = useRouter()
// 搜索框数据
const selectData = ref('')
const activeTagName = ref('手机')

const sourceGoodsData = initialPictureSrc
let data = reactive({
  displayGoodsData: initialPictureSrc
})
const resetSelectData = () => {
  selectData.value = ''
}

watch(selectData, () => {
  const res = []
  if (selectData.value) {
    sourceGoodsData.forEach(category => {
      if (category.children) {
        category.children.forEach(e => {
          if (e.name.slice(0, selectData.value.length).toLowerCase() === selectData.value.toLowerCase()) {
            res.push(e)
          }
        })
      }
    })
    data.displayGoodsData = [{
      category_name: '搜索的商品',
      children: res
    }]
  }
  activeTagName.value = '搜索的商品'
  if (!selectData.value.length) {
    activeTagName.value = '手机'
    data.displayGoodsData = sourceGoodsData
  }
})

const toDatil = (goods) => {
  router.push({
    name: 'detail', params: goods
  })
}

const toShoppingCart = () => {
  router.push({
    name: 'shopping-cart'
  })
}
const toOrder = () => {
  router.push({
    name: 'order'
  })
}
</script>

<template>
  <el-card class="info-header">
    <el-row>
      <el-col :span="10">
        <el-input v-model="selectData" class="info-input">
          <template #prepend>
            <div>请输入你想要搜索的商品</div>
          </template>
        </el-input>
      </el-col>
      <el-col :span="2" style="margin-left: 30px;">
        <el-button type="primary" @click="resetSelectData">重置</el-button>
      </el-col>
      <el-col :span="7"></el-col>
      <el-col :span="4">
        <el-badge :value="allOrder.length" style="margin-left: 0px;">
          <el-button @click="toOrder">我的订单</el-button>
        </el-badge>
        <el-badge :value="shoppingCartData.length" style="margin-left: 20px;">
          <el-button @click="toShoppingCart">我的购物车</el-button>
        </el-badge>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <el-tabs v-model="activeTagName">
      <el-tab-pane
        v-for="category in data.displayGoodsData"
        :label="category.category_name"
        :name="category.category_name"
      >
        <el-row>
          <el-col v-for="goods in category.children" :key="goods" :span="4">
            <el-card class="goods-card" @click="toDatil(goods)">
              <el-image style="width: 10.6em; height: 10.6em" :src="goods.src" />
              <div class="goods-description">
                <div>{{ goods.name }}</div>
                <div>￥{{ goods.price }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style>
.box-card {
  margin-top: 20px;
}

.goods-card {
  font-size: 0.95rem;
  width: 14em;
  margin: 20px;
  border-radius: 10px;
  text-align: center;
}
.goods-card:hover {
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid rgb(122, 187, 230);
}
.goods-description {
  color: rgb(90, 152, 209);
}
.goods-description div {
  margin: 10px 0px;
}
</style>