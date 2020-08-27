//引入axios模块
import axios from 'axios'
// 192.168.1.3国防家园  172.20.10.6无线网   172.16.15.247教室
//定义axios默认值
axios.defaults.baseURL = 'http://192.168.1.3:5000'


//获取商家信息
export var getorderlist=()=>axios.get('/shop/seller')

//获取评价数据
export var getdatalist=()=>axios.get('/shop/ratings')

//获取商品数据

export var getgoodslist=()=>axios.get('/goods/goods_list')
