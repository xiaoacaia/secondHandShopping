<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const allOrder = computed(() => store.state.orderData)

const cancelOrder = (index) => {
  store.commit('cancelOrder', index)
}
</script>


<template>
  <el-card class="outer-card">
    <el-tag size="large">全部订单 {{ allOrder.length }}</el-tag>
    <br />
    <el-card v-for="(good, index) in allOrder" class="single-card">
      <div class="single_item">
        <el-image style="width: 10.6em" :src="`../../src/assets/picture/${good.src}`" />
        <div class="single_info">
          <p class="good-description">{{ good.good_description }}</p>
          <p>￥{{ good.price }}</p>
        </div>
        <div class="delete-button">
          <el-popconfirm title="确认取消订单?" @confirm="cancelOrder(index)">
            <template #reference>
              <el-button type="danger" size="large">取消订单</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-card>
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
</style>