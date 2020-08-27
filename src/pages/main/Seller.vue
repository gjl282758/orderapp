    
<template>
  <div>
    <div class="shopTop">
      <div>
        <h2>{{orderdata.name}}</h2>
        <van-rate v-model="value" allow-half void-icon="star" color="#FFC300" readonly />
        <span>(661)</span>
        <span>月售{{orderdata.sellCount}}单</span>
      </div>

      <div class="like">
        <van-rate v-model="value2" icon="like" :count="1" style="text-indent: 5px;" />
        <p>已收藏</p>
      </div>
    </div>

    <div class="midBox">
      <div>
        <p>起送价</p>
        <h4>
          {{orderdata.minPrice}}
          <span>元</span>
        </h4>
      </div>
      <div>
        <p>商家配送</p>
        <h4>
          {{orderdata.deliveryPrice}}
          <span>元</span>
        </h4>
      </div>
      <div>
        <p>平均配送时间</p>
        <h4>
          {{orderdata.deliveryTime}}
          <span>分钟</span>
        </h4>
      </div>
    </div>

    <div class="headlist">&emsp;</div>

    <div class="footmsg">
      <h1>活动与公告</h1>
      <p>{{orderdata.bulletin}}</p>
      <div v-for="(item,index) in orderdata.supports" :key="index">
        <van-tag type="primary" style="color:#fff">减</van-tag>
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getorderlist } from "@/api/apis";
export default {
  data() {
    return {
      value: 5,
      value2: 5,

      orderdata: {},
    };
  },
  async created() {
    // await async并不会改变异步语句的执行顺序, await后面的所有代码还是会放到线程的最后(异步区域去执行)
    let res = await getorderlist();
    // console.log(res.data.data);
    this.orderdata = res.data.data;
  },
};
</script>

<style lang="less" scoped>
.shopTop {
  height: 70px;
  padding: 15px 5px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 16px;
    line-height: 40px;
  }
  span {
    font-size: 12px;
    margin-left: 15px;
  }
}
.like {
  margin-top: 15px;
  p {
    line-height: 35px;
    margin-right: 15px;
  }
}
.midBox {
  display: flex;
  justify-content: space-around;
  p {
    color: #b0b0b0;
    font-size: 14px;
    line-height: 50px;
  }
  h4 {
    font-size: 18px;
    text-align: center;
    margin: 0px 0 20px;
    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
}

.headlist {
  height: 30px;
  background: #f4f4f4;
  text-indent: 8px;
}
.footmsg {
  h1 {
    font-size: 18px;
    margin: 20px 8px;
  }
  p {
    margin:0 10px;
    font-size: 14px;
    color: red;
    line-height: 30px;
    border-bottom: 1px solid #EEEEEE;
    padding-bottom: 20px;
  }
  div{
    line-height: 40px;
    margin: 0 10px;
    span{
      margin: 0 5px;
    }
  }
}
</style>
