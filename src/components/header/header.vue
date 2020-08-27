<template>
  <div id="box">
    <van-sticky class="wai">
      <div class="rgba">
        <div class="img">
          <img :src="orderdata.avatar" alt />
        </div>
        <ul class="right">
          <!-- //上部 -->
          <li style="margin:0 5px 0 0">
            <van-tag type="danger" size="large">品牌</van-tag>
            <span>{{orderdata.name}}</span>
          </li>
          <li style="font-size:16px">{{orderdata.description}}&emsp;/&emsp;{{orderdata.deliveryTime}}分钟送达</li>
          <li>
            <van-tag color="#fff" size="large" text-color="#F87170">减</van-tag>
            <div style="display: inline-block;
                    width: 160px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;">
               <span  v-for="(item,index) in orderdata.supports" :key="index"
             
            >{{item}}</span>
            </div>
           
            <!-- 蒙层 -->
            <button @click="show = true" class="btn">5个></button>
            <van-overlay :show="show" @click="show = false">
              <div class="block">
                <div class="masktxt">
                  <h2 style="font-size:20px;font-weight:bold;width:200px">{{orderdata.name}}</h2>
                  <van-rate
                    v-model="value2"
                    allow-half
                    void-icon="star"
                    color="#FF9A02"
                    style="text-indent: 8px;padding:20px"
                    readonly
                  />
                </div>

                <div class="discont">
                  <van-divider :style="{ color: '#fff', borderColor: '#fff',padding: '0 25px',fontSize:'20px',fontWeight:'bold'}">优惠信息</van-divider>
                  <p v-for="(item,index) in orderdata.supports" :key="index">
                    <van-tag type="primary" style="color:red;padding:2px">活动</van-tag>
                    <span>{{item}}</span>
                  </p>
                </div>

                <div class="contmsg">
                  <van-divider :style="{ color: '#fff', borderColor: '#fff',padding: '0 25px',fontSize:'20px',fontWeight:'bold'}">商家公告</van-divider>
                  <p>{{orderdata.bulletin}}</p>
                </div>
              </div>
            </van-overlay>
          </li>
        </ul>
      </div>
      <p>
        <van-notice-bar left-icon="volume-o" :text="orderdata.bulletin" />
      </p>
    </van-sticky>
  </div>
</template>

<script>
import {getorderlist} from "@/api/apis"
export default {
  data() {
    return {
      show: false,
      value2: 5,
      orderdata:{}
    };
  },
  async created () {
    // await async并不会改变异步语句的执行顺序, await后面的所有代码还是会放到线程的最后(异步区域去执行)
    let res = await getorderlist();
    // console.log(res.data.data);
    this.orderdata=res.data.data

  }

};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.btn{
  display: inline-block;
  width: 50px;
  line-height: 24px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
}
#box {
  background: url(../../assets/imgs/timg.jpg) 0px -206px;
  .wai {
    display: flex;
    flex-direction: column;
    .rgba {
      width: 100%;
      height: 170px;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .img {
        overflow: hidden;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .right {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          line-height: 33px;
          color: #fff;
          display: flex;
          align-items: center;
          
        }
      }
    }
    > p {
      background: rgba(0, 0, 0, 0.7);
      line-height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        display: inline-block;
        height: 15px;
        font-weight: bold;
      }
      label {
        display: inline-block;
        width: 320px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 100%;
  color: #fff;
  .masktxt {
    padding: 55px 80px 0px;
    h2 {
      font-size: 16px;
      text-align: center;
    }
  }
  .discont {
    p {
      color: #fff;
      line-height: 35px;
      margin-left: 20px;
      span:first-child {
        font-size: 12px;
        display: inline-block;
        padding: 0 7px;
        margin: 3px;
        background: #fff;
        font-weight: bold;
      }
      
    }
  }
  .contmsg {
    p {
      color: #fff;
      margin:0 20px;
    }
  }
}
.van-notice-bar{
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}
</style>