import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      shoppingCartData: [],
      orderData: [],
      leaveMessage: [],
      curName: ''
    }
  },
  mutations: {
    addName(state, payload) {
      state.curName = payload
    },
    addGood(state, payload) {
      state.shoppingCartData.push(payload)
    },
    deleteGoodByIndex(state, payload) {
      if (Array.isArray(payload)) {
        const res = []
        state.shoppingCartData.forEach((v, i) => {
          if (!payload.includes(i)) res.push(v)
        })
        state.shoppingCartData = res
      } else {
        state.shoppingCartData.splice(payload, 1)
      }
    },
    // order
    addOrder(state, payload) {
      state.orderData.push(...payload)
    },
    cancelOrder(state, payload) {
      state.orderData.splice(payload, 1)
    },
  }
})

export default store