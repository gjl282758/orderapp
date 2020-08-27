<template>
  <div id="box">
    <!-- 返回按钮 -->
    <van-sticky>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    
    <!-- 头部 -->
    <div class="top_box">
      <img :src="productlist.imgUrl" alt />
    </div>
    <!-- 产品 -->
    <div class="center_box">
      <h1>{{productlist.name}}</h1>
      <p>
        <span>月售{{productlist.sellCount}}份</span>
        <span>好评率{{productlist.rating}}%</span>
      </p>
      <div>
        <p>
          <span style="font-weight: bold;color:#FF3300">￥</span>
          <span style="font-size: 24px;font-weight: bold;color:#FF3300">{{productlist.price}}</span>
          <span style="text-decoration: line-through;margin-left:10px">￥99.40</span>
        </p>
        <button>
          <img src="../../assets/imgs/car.png" alt />
          <span>加入购物车</span>
        </button>
      </div>
    </div>
    <!-- 商品介绍 -->
    <div class="productsIntroduction">
      <h1>商品介绍</h1>
      <p>{{productlist.goodsDesc}}</p>
    </div>
    <!-- 推荐吐槽 -->
    <div class="tucao_div">
      <van-tabs type="card">
        <van-tab :title="alltitle">
          <div id="all_box">
            <div v-for="(item,index) in commentdata" :key="index">
              <!-- 左边 -->
              <div>
                <van-image round width="4rem" height="4rem" :src="item.avatar" />
              </div>
              <!-- 右边 -->
              <div style="margin-left:20px">
                <p>
                  <span>{{item.username}}</span>
                  <span style="margin-left:20px">{{item.rateTime}}</span>
                </p>

                <p>
                  <span>{{item.text? item.text:"暂无评论"}}</span>
                </p>
                <p>
                  <van-icon name="good-job" color="#FFC300" />
                  <van-tag
                    style="margin:2px;"
                    v-for="(data,index) in item.recommend"
                    :key="index"
                    plain
                  >{{data}}</van-tag>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="推荐"></van-tab>
        <van-tab title="吐槽"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      productlist: [],
      commentdata: [], //总数居
      alltitle: "",
      gooddata: [], //好评数据
      goodtitle: "",
      bad: [], //差评数据
      badtitle: "",
    };
  },
  created() {
    console.log(this.$route.params.foods);
    for (let obj of this.$route.params.foods) {
      this.productlist = obj;
      this.commentdata = this.productlist.ratings;
      this.alltitle = `全部${this.commentdata.length}`;
      console.log(this.commentdata);
      for (let time of this.commentdata) {
        time.rateTime = getChinatime(new Date(time.rateTime));
      }
      break;
    }
  },

  methods: {
    onClickLeft() {
      this.$router.push("/Goods");
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #f4f5f7;
  .top_box {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .center_box {
    background-color: #fff;
    padding: 20px;
    h1 {
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }
    > p {
      line-height: 30px;
      > span {
        margin: 0 5px;
        color: #999999;
      }
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        display: inline-block;
        width: 150px;
        height: 50px;
        border-radius: 25px;
        border: 0;
        background-color: #ffc300;
        display: flex;
        align-items: center;

        img {
          margin-left: 11px;
        }
        span {
          margin-left: 5px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .productsIntroduction {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    h1 {
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }
    p {
      line-height: 25px;
    }
  }
  .tucao_div {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
    #all_box {
      margin-top: 20px;
      > div {
        padding-bottom: 20px;
        margin-bottom: 20px;
        display: flex;
        border-bottom: 1px solid #f4f4f4;
        > div:nth-child(2) {
          display: flex;
          flex-direction: column;
          p {
            line-height: 30px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }
        }
      }
    }
  }
}
/deep/.van-tab.van-tab--active{
 background-color: #ffc300;
  font-weight: bold;

 color: #000;
}
/deep/.van-tabs__nav--card{
  font-weight: bold;
    border-radius: 6px;
    border: 1px solid #ffc300;
}
/deep/.van-tab{
  color: #ffc300;
border-right: 1px solid #ffc300;

}
</style>