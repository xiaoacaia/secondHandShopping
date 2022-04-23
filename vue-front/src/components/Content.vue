
<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const shoppingCartData = computed(() => store.state.shoppingCartData)
const allOrder = computed(() => store.state.orderData)
// const curName = window.localStorage.getItem("have_login").split('=')[0].slice(1)
const curName = computed(() => store.state.curName)

let initData = ref([])
// 获取数据
const getData = async () => {
  const req = fetch('http://localhost:4000/goods/selectAll', {
    method: 'get',
  })
  const stream = await req;
  const res = await stream.text();
  return res;
}
let allData = null
let sourceGoodsData = null

const initialData = async () => {
  const endData = {}
  let res = await getData()
  allData = JSON.parse(res)
  const set = new Set()
  JSON.parse(res).forEach(i => {
    if (!set.has(i.category_name)) {
      set.add(i.category_name)
      endData[i.category_name] = [i]
    } else {
      endData[i.category_name].push(i)
    }
  })
  initData.value = endData
  sourceGoodsData = endData
}

onMounted(() => {
  initialData()
})


const router = useRouter()
// 搜索框数据
const selectData = ref('')
const activeTagName = ref('手机')

let data = reactive({
  displayGoodsData: initData
})
const resetSelectData = () => {
  selectData.value = ''
}

watch(selectData, () => {
  const res = []
  if (selectData.value) {

    allData.forEach(e => {
      if (e.good_name.slice(0, selectData.value.length).toLowerCase() === selectData.value.toLowerCase()) {
        res.push(e)
      }
    })

    data.displayGoodsData = {
      '搜索的商品': res
    }
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

const loginOut = () => {
  window.localStorage.removeItem("have_login");
  window.location.href = "/";
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
      <el-col :span="3"></el-col>
      <el-col :span="8">
        <el-tag size="large">当前登陆用户 {{ curName }}</el-tag>
        <el-badge :value="allOrder.length" style="margin-left: 20px;">
          <el-button @click="toOrder">我的订单</el-button>
        </el-badge>
        <el-badge :value="shoppingCartData.length" style="margin-left: 20px;">
          <el-button @click="toShoppingCart">我的购物车</el-button>
        </el-badge>
        <el-button @click="loginOut" style="margin-left: 20px;">退出登陆</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <el-tabs v-model="activeTagName">
      <el-tab-pane v-for="(category, index) in data.displayGoodsData" :label="index" :name="index">
        <el-row>
          <el-col v-for="good in category" :key="good" :span="4">
            <el-card class="goods-card" @click="toDatil(good)">
              <el-image style="width: 10.6em; height: 10.6em" :src="`src/assets/picture/${good.src}`" />
              <div class="goods-description">
                <div>{{ good.good_name }}</div>
                <div>￥{{ good.price }}</div>
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