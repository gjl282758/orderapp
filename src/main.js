import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//样式重置表
import './assets/style/reset.css'
//粘性布局
import { Sticky } from 'vant';
Vue.use(Sticky);

//Popup 弹出层
import { Popup } from 'vant';
Vue.use(Popup);

//侧边导航
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

//标记
import { Tag } from 'vant';
Vue.use(Tag);

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//评分
import { Rate } from 'vant';
Vue.use(Rate);

//图片
import { Image as VanImage } from 'vant';
Vue.use(VanImage);

//图标
import { Icon } from 'vant';
Vue.use(Icon);

//标签页
import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
