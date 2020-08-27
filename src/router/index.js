import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../pages/Index.vue'
// import { resolve } from 'core-js/fn/promise'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index, //webpack异步模块
      redirect: '/Goods',
      children: [
        {
          path: '/Goods',
          name: 'Goods',
          component: () => import('../pages/main/Goods.vue')},
        {
          path: '/Ratings',
          name: 'Ratings',
          component: () => import('../pages/main/Ratings.vue')  //webpack异步模块
        },
        {
          path: '/Seller',
          name: 'Seller',
          component: () => import('../pages/main/Seller.vue')  //webpack异步模块
        },

      ]
    },
    {
      path: '/Productdetails',
      name: 'Productdetails',
      component: () => import('../pages/main/Productdetails.vue')
      
    }






  ]
})





export default router
