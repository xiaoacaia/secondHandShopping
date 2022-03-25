import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../../src/components/Login.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('../../src/components/Content.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../../src/components/Detail.vue')
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('../../src/components/ShoppingCart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../../src/components/Order.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../../src/components/Demo.vue')
    },
    {
      path: '/leave-message',
      name: 'leave-message',
      component: () => import('../../src/components/leaveMessage.vue')
    },
  ]
})

export default router