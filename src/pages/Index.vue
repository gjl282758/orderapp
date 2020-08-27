<template>
  <div class="app-box">
    <van-sticky>
      <!-- 头部组件 -->
      <v-header></v-header>
      <!-- 导航组件 -->
      <ul class="nav">
        <li>
          <router-link to="/Goods">商品</router-link>
        </li>
        <li>
          <router-link to="/Ratings">评价</router-link>
        </li>
        <li>
          <router-link to="/Seller">商家</router-link>
        </li>
      </ul>
    </van-sticky>
    <!-- 路由内容 -->
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>

    
  </div>
</template>

<script>
import header from "../components/header/header";

export default {
  //注册子组件
  components: {
    "v-header": header, //vue自定义组件命名的底线，不能和原生的标签重名
  },
};
</script>

<style lang="less" scoped>
@base: #2e2f3b;

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0 ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}

.app-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f2f2f4;
    background-color: #fff;
    li {
      a {
        display: inline-block;
        width: 50px;
        line-height: 50px;
        color: #666868;
        font-size: 18px;
        text-align: center;
      }
      .router-link-active {
        border-bottom: 3px solid #ffc300;
        color: #f6c21e;
      }
    }
  }
  
}
</style>