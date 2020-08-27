<template>
  <div>
    <!-- 上面 -->
    <div id="main_box">
      <div class="main">
        <!-- 左边 -->
        <div class="left_box">
          <p style="font-size:24px;font-weight: bold;color:#FFC300">5.0</p>
          <p style="margin:10px 0;font-weight: 500;">综合评价</p>
          <p style="font-size:12px;color:#999999">高于周边商家96%</p>
        </div>
        <!-- 右边 -->
        <div class="right_box">
          <p>
            <span>服务态度</span>
            <van-rate
              style="margin:0 10px"
              v-model="value"
              allow-half
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
            <span style="color:#F6CE4D">4.5</span>
          </p>
          <p>
            <span>菜品质量</span>
            <van-rate
              style="margin:0 10px"
              v-model="value1"
              allow-half
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
            <span style="color:#F6CE4D">4.5</span>
          </p>
          <p>
            <span>送达时间</span>
            <span style="color:#C2C2C2;margin-left:10px">20分钟</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 下面 -->
    <div id="bottom_box">
      <!-- 上部 -->
      <van-tabs type="card">
        <van-tab color: :title="alltitle">
          <div class="bbox">
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
                  <van-rate
                    style="margin:0 10px 0 0"
                    v-model="item.score"
                    allow-half
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    readonly
                  />
                  <span style="color:#C2C2C2;margin-left:10px">{{item.deliveryTime?item.deliveryTime:"30"}}分钟</span>
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
        <van-tab :title="goodtitle">
          <div class="bbox">
            <div v-for="(item,index) in gooddata" :key="index">
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
                  <van-rate
                    style="margin:0 10px 0 0"
                    v-model="item.score"
                    allow-half
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    readonly
                  />
                  <span style="color:#C2C2C2;margin-left:10px">{{item.deliveryTime}}分钟</span>
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
        <van-tab :title="badtitle">
          <div class="bbox">
            <div v-for="(item,index) in bad" :key="index">
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
                  <van-rate
                    style="margin:0 10px 0 0"
                    v-model="item.score"
                    allow-half
                    :size="15"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    readonly
                  />
                  <span style="color:#C2C2C2;margin-left:10px">{{item.deliveryTime}}分钟</span>
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
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getdatalist } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      value: 4.5,
      value1: 4.5,
      commentdata: [], //总数居
      alltitle:'',
      gooddata: [], //好评数据
      goodtitle:'',
      bad: [], //差评数据
      badtitle:'',
    };
  },

  async created() {
    let res = await getdatalist();
    // 时间转换
    for(let obj of res.data.data){
      obj.rateTime=getChinatime(new Date(obj.rateTime))
    }

    this.commentdata = res.data.data;

    this.alltitle=`全部${this.commentdata.length}`

    this.gooddata = res.data.data.filter((items) => items.score > 3);
    this.goodtitle=`满意${this.gooddata.length}`

    this.bad = res.data.data.filter((items) => items.score <= 3);
    this.badtitle=`不满意${this.bad.length}`

  },
};
</script>

<style lang="less" scoped>
#main_box {
  padding: 20px;
  border-bottom: 20px solid #f4f5f7;
  .main {
    display: flex;

    .left_box {
      padding: 5px;
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid #eeeeee;
    }
    .right_box {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 12px;
        display: flex;
        align-items: center;
      }
    }
  }
}
#bottom_box {
  padding: 20px;
  ul {
    display: flex;
    align-items: center;
    border: 1px solid #ffc300;
    border-radius: 4px;
    margin: 0 10px;
    li {
      display: inline-block;
      width: 118px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #ffc300;
      box-sizing: border-box;
      outline: none;
      font-weight: bold;
    }
    li:nth-child(3) {
      border-right: 0;
    }
  }
  .bbox {
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
