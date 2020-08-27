<template>
  <div>
    <!-- 头部 -->
    <div class="top_box">
      <h1>新用户下单立减5元</h1>
    </div>
    <!-- 清空 -->
    <div class="car_box">
      <span>购物车</span>
      <div @click="clickClear">
        <img src="../../assets/imgs/del.png" alt />
        <span>清空购物车</span>
      </div>
    </div>
    <!-- 订餐 -->
    <div class="shop_box">
      <div v-for="child in shopcarlist" :key="child.id">
        <label
          style="margin-left: 20px;
                width: 160px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                "
        >{{child.name}}</label>
        <label style="font-weight:bold;color:#FF3300">￥{{child.price.toFixed(2)}}</label>
        <div id="btn">
          <p
            @click="clickadd(-1,child.id)"
            style="color: #AAAAAA;border:1px solid #DDDDDD;background-color: #FFf;"
            v-show="child.num>0"
          >-</p>
          <span v-show="child.num>0">{{child.num}}</span>
          <p @click="clickadd(1,child.id)" style="border:1px solid #FFC301;background-color: #FFC301;">+</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    //点击+ - 改变数量
    clickadd(num, id) {
      this.$store.commit("changegoodsnum", {
        id,
        num,
      });
    },
    //清空购物车
    clickClear(){
      this.$store.commit("clearGoodsnum")
    }
  },
  computed: {
    shopcarlist() {
      return this.$store.getters.shopcarlist;
    }
  }
};
</script>

<style lang="less" scoped>
// 购物车加减
#btn {
  margin-right: 20px;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 20px;
    line-height: 30px;
    text-align: center;
  }
  p {
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    line-height: 20px;
    width: 20px;
    border-radius: 50%;
    text-align: center;
    border: 0;
  }
}

.top_box {
  height: 40px;
  background-color: #fee7c8;

  text-align: center;
  h1 {
    line-height: 40px;
    color: #df4011;
  }
}
.car_box {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  color: #9b9b9b;
  font-weight: bold;
  > span {
    margin-left: 20px;
  }
  div {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
}
.shop_box {
  height: 160px;
  overflow-y:scroll ;
  display: flex;
  flex-direction: column;
  >div {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/.van-stepper__plus {
  background-color: #ffc300;
  color: #000;
  font-weight: bold;
}
/deep/.van-stepper__minus {
  color: #aaaaaa;
  background-color: #fff;
  border: 2px solid #dddddd;
}
</style>