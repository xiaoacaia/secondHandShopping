<script setup>
import { useStore } from 'vuex'
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const store = useStore()

const selectDataIndex = ref([])
const allShoppingCartData = computed(() => store.state.shoppingCartData)

// 根据选择的索引生成选择的数据
const allSelectData = computed(() => selectDataIndex.value.map(index => allShoppingCartData.value[index]))

const deleteGood = (index) => {
  store.commit('deleteGoodByIndex', index)
}

const selectAllData = ref(false)
const changeSelectAllData = () => {
  if (selectAllData.value) {
    selectDataIndex.value = Array.from({ length: allShoppingCartData.value.length }, (_, k) => k)
  } else {
    selectDataIndex.value = []
  }
}

// 根据当前选择的数据计算花费的钱数
const allMoney = computed(() => allSelectData.value.reduce((pre, cur) => Number(pre) + Number(cur.price), 0))

const payMoney = () => {
  store.commit('addOrder', allSelectData.value)
  if (selectDataIndex) {
    store.commit('deleteGoodByIndex', selectDataIndex.value)
    // 提交之后, 取消全选, 清除当前选择索引(自动清空当前选择数据)
    selectAllData.value = false
    selectDataIndex.value = []
  }
  ElMessage({
    message: '付款成功!',
    type: 'success',
  })
}

</script>

<template>
  <el-card class="outer-card">
    <el-tag size="large">全部商品 {{ allShoppingCartData.length }}</el-tag>
    <br />
    <el-checkbox-group v-model="selectDataIndex">
      <el-card v-for="(good, index) in allShoppingCartData" class="single-card">
        <el-checkbox :label="index">
          <div class="single_item">
            <el-image style="width: 10.6em" :src="`../../${good.src}`" />
            <div class="single_info">
              <p class="good-description">{{ good.description }}</p>
              <p>￥{{ good.price }}</p>
            </div>
            <div class="delete-button">
              <el-button type="danger" size="large" @click="deleteGood(index)">删除</el-button>
            </div>
          </div>
        </el-checkbox>
      </el-card>
    </el-checkbox-group>
  </el-card>
  <el-card class="bottom-card">
    <div class="bottom-div">
      <div>
        <el-checkbox
          v-model="selectAllData"
          @change="changeSelectAllData"
          label="全选"
          size="large"
          style="margin-left: 20px;"
        />
      </div>
      <div>
        <p style="margin-right: 50px;">总价: {{ allMoney }} ￥ 元</p>
        <el-popconfirm title="是否立即结算?" @confirm="payMoney">
          <template #reference>
            <el-button size="large" style="margin-right: 37px;">结算</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.outer-card {
  margin: 20px 20px;
}

.single-card {
  padding: 50px 0px;
  margin: 20px 0px;
}

/* item 中flex 布局 */
.single_item {
  display: flex;
  width: 88vmax;
}

/* 默认撑满 */
.single_info {
  margin-top: 12px;
  margin-left: 20px;
  flex: 1;
}

/* 文字描述 */
.good-description {
  max-width: 60vmax;
  /* 换行 */
  white-space: normal;
  line-height: 1.5em;
}

.delete-button {
  display: flex;
  align-items: center;
}

.bottom-card {
  margin: 20px 20px;
}
.bottom-div {
  display: flex;
  justify-content: space-between;
}

.bottom-div div {
  display: flex;
  align-items: center;
}
</style>