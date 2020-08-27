<template>
  <div class="order-box">
    <div class="order-left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item,index) in goodsList_x"
            :key="index"
            :title="item.name"
            @click="clickTab(index)"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="order-right">
      <div>
        <div v-for="(item,index) in goodsList_x" :key="index" :id="index">
          <h1>{{item.name}}</h1>

          <van-card
            v-for="(data,Index) in item.foods"
            :key="Index"
            :desc="data.goodsDesc"
            :title="data.name"
            :thumb="data.imgUrl"
          >
            <template #tags>
              <van-tag plain type="danger">特惠</van-tag>
              <p style="line-height:25px;color: #646566;">
                月售:{{data.rating}}份
                <span style="margin-left:10px">好评度:{{data.rating}}%</span>
              </p>
              <div style="display: flex;justify-content: space-between;align-items: center;height:30px">
                <span
                  @click="click_show(item)"
                  style="color:#FF3300;font-weight:bold;font-size:20px"
                >￥{{data.price.toFixed(2)}}</span>
                <div id="btn">
                  <p
                    @click="clickadd(-1,data.id)"
                    style="color: #AAAAAA;border:1px solid #DDDDDD;background-color: #FFf;"
                    v-show="data.num>0"
                  >-</p>
                  <span v-show="data.num>0">{{data.num}}</span>
                  <p @click="clickadd(1,data.id)" style="border:1px solid #FFC301;background-color: #FFC301;margin-right: 10px;">+</p>
                </div>
              </div>
            </template>
            <!-- <template #footer></template> -->
          </van-card>
        </div>
      </div>
    </div>

    <!-- 购物车弹出框 -->
    <transition name="slide-fade">
      <div class="popup_box" v-show="isshow">
        <shopcar></shopcar>
      </div>
    </transition>
    <!-- 购物车条 -->
    <div class="bottom-box">
      <!-- 左边 -->
      <div class="box_left">
        <div>
          <img src="../../assets/imgs/smile.png" alt />
          <p>联系商家</p>
        </div>
      </div>
      <!-- 中间 -->
      <div class="box_center">
        <!-- 左边 -->
        <div @click="isshow=!isshow" class="left">
          <div v-show="totalnum>0" id="subtitle">{{totalnum}}</div>
          <van-icon
            :color="shopcarlist_x.length>0? '#FFCA4C' : '#C4C4C4'"
            style="margin-top: 10px;"
            name="shopping-cart"
            size="35"
          />
        </div>
        <!-- 右边 -->
        <div class="right">
          <p>￥{{totalprice.toFixed(2)}}</p>

          <span>另需配送费￥4元|支持自取</span>
        </div>
      </div>

      <!-- 右边 -->
      <div class="box_right">
        <p
          :style="shopcarlist_x.length>0?'background-color:#FFC300;color:#000;font-weight: bold;font-size: 14px;': 'background-color:#222222;color:#aaaaaa;font-weight: bold;font-size: 12px;'"
        >{{shopcarlist_x.length>0? '去结算' : '￥20元起送'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getgoodslist } from "@/api/apis";
import BScroll from "better-scroll";
import shopcar from "./shopcar";

export default {
  //注册子组件
  components: {
    shopcar, //vue自定义组件命名的底线，不能和原生的标签重名
  },
  data() {
    return {
      isshow: false,
      activeKey: 0, //当前选中的索引
    };
  },
  async created() {
    let res = await getgoodslist();
    // console.log(res.data.goodsList);

    // 记住要添加前端字段,需要在发送给vuex之前!!先改在赋值
    for (let obj of res.data.goodsList) {
      for (let child of obj.foods) {
        child.num = 0;
      }
    }

    // 初始化vuex数据
    this.$store.commit("initgoodsLIST", res.data.goodsList);
  },
  methods: {
    click_show(item) {
      this.$router.push({ name: "Productdetails", params: item });
    },
    clickTab(index) {
      // console.log(index)

      //点击某个选项卡,则让右侧滚动到对应的div上s
      this.rightbetter.scrollToElement(document.getElementById(index), 600);
    },

    //点击+ - 改变数量
    clickadd(num, id) {
      this.$store.commit("changegoodsnum", {
        id,
        num,
      });
    },
  },
  mounted() {
    // 3. 使用  new Scroll(要滚动的DOM容器)
    // 它只是优化滚屏！！！所以你的容器必须原来就有滚动条！！！！容器必须固定高度， overflow: scroll || auto
    // 参数1： DOM容器 || DOM选择器（如果传入字符串，则会自动转换为querySelector）
    // 参数2： 配置对象
    // let leftbetter = new BScroll(document.querySelector('.order-left'));
    this.leftbetter = new BScroll(".order-left", {
      click: true,
    });
    this.rightbetter = new BScroll(document.querySelector(".order-right"), {
      click: true, //允许滚动面板点击
      probeType: 3, //实时派发滚动事件
    });

    this.rightbetter.on("scroll", (obj) => {
      // _y当前滚动距离
      let _y = Math.abs(obj.y);

      // 循环判断区间值， 设置选项卡选中索引
      for (let obj of this.getdivarr) {
        if (obj.endY > _y && _y >= obj.startY) {
          this.activeKey = obj.index;
          break;
        }
        if(this.activeKey>7){
          this.leftbetter.scrollToElement(document.getElementById('7'),600);
        }else{
           this.leftbetter.scrollToElement(document.getElementById('0'),600);
        }
      }
    });
  },
  computed: {
    //获取所有div高度数组并拿到区间段值
    getdivarr() {
      // console.log("计算属性被运行了！！！！")
      // [189, 105, 525, 315, 525, 315, 567, 609, 882, 357]
      // 0-189   0
      // 189-294 1
      // 294-819 2

      // 之前div高度总和 -  (之前div高度总和+自己的高度)   当前div索引
      // {startY:  endY:  index:  }

      // 获取div高度?
      let arr = [];
      let total = 0; //累加的高度总和

      for (let i = 0; i < this.goodsList_x.length; i++) {
        //计算高度和区间段内
        let curDivheight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: total + curDivheight, index: i });
        total += curDivheight;
      }

      return arr;
    },

    //vuex数据
    goodsList_x() {
      return this.$store.state.goodsList;
    },
    shopcarlist_x() {
      return this.$store.getters.shopcarlist;
    },
    //总价格
    totalprice() {
      let total = 0;
      for (let obj of this.shopcarlist_x) {
        total += obj.price * obj.num;
      }
      return total;
    },
    //总数量
    totalnum() {
      let tonum = 0;
      for (let obj of this.shopcarlist_x) {
        tonum += obj.num;
      }
      return tonum;
    },
  },
};
</script>

<style lang="less" scoped>
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

// 购物车加减
#btn {
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

.order-box {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding-bottom: 70px;
  .order-left {
    width: 80px;
    overflow: scroll;
    height: 100%;
  }
  .order-right {
    flex: 1;
    overflow: scroll;
    > div {
      h1 {
        line-height: 40px;
        text-indent: 1em;
        background-color: #f4f4f4;
      }
    }
  }
  .bottom-box {
    width: 95%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    position: fixed;
    bottom: 10px;
    border-radius: 30px;
    margin: 0 10px;
    overflow: hidden;
    .box_left {
      width: 70px;
      height: 100%;
      background-color: #222222;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0 0 0;

        p {
          color: #aaaaaa;
          line-height: 25px;
          font-size: 12px;
        }
      }
    }
    .box_center {
      height: 100%;
      flex: 1;
      background-color: #222222;
      margin-left: 5px;
      display: flex;
      align-items: center;
      .left {
        margin: 10px 5px 10px 5px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #333333;
        text-align: center;
        position: relative;
        // 小标
        #subtitle {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          background-color: #ff3300;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 100;
        }
      }
      .right {
        flex: 1;
        p {
          font-size: 16px;
          color: #fff;
        }
        span {
          font-size: 8px;
          color: #747474;
        }
      }
    }
    .box_right {
      width: 70px;
      height: 100%;
      p {
        line-height: 60px;
        text-align: center;
      }
    }
  }
}
.van-card:not(:first-child) {
  margin-top: 0;
}
.van-card {
  background-color: #fff;
}
/deep/.van-stepper__plus {
  background-color: #ffc300;
  color: #000;
}
/deep/.van-stepper__minus {
  color: #aaaaaa;
  background-color: #fff;
  border: 2px solid #dddddd;
}
/deep/.van-sidebar-item--select {
  padding: 10px 10px 20px 10px;
}

// 弹出框
.popup_box {
  width: 100%;
  // height: 300px;
  position: fixed;
  bottom: 40px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  overflow: hidden;
  padding-bottom: 40px;
}
</style>