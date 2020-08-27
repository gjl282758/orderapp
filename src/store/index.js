import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: [],//点餐页面的数据
  },
  mutations: {
    //初始化数组数组 newarr是vue传过来的数组
    initgoodsLIST(state,newarr){
      state.goodsList=newarr
    },
    //改变商品数量
    changegoodsnum(state,params){
      //找到商品 改变对应的数量
      for(let obj of state.goodsList){
        for(let child of obj.foods){
          if(child.id==params.id){
            child.num+=params.num
            return
          }
        }
      }
    },
    //清空购物车
    clearGoodsnum(state){
      for(let obj of state.goodsList){
        for(let child of obj.foods){
          child.num=0
        }
      }
    }
  },
  getters: {
    //购物车数据:  数量>0的商品
    shopcarlist(state){
      let arr=[]
      for(let obj of state.goodsList){
        for(let child of obj.foods){
          if(child.num>0){
            arr.push(child)
          }
        }
      }
      return arr
    }
  }
})
