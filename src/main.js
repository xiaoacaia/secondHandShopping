import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

/**
还需要的步骤
1. 商品查询：支持商品分类检索、关键词模糊搜索；
2、购物车：呈现用户已经选择好的商品，支持删除和添加已经选择的商品；
3、在线留言：卖家和买家可以相互文字沟通；
4、我的订单：可以查询已购买的订单；
 */