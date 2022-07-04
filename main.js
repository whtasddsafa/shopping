import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$http = $http
// 请求拦截器
$http.baseUrl ="https://api-ugo-web.itheima.net"
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
  	title: '加载中'
  });
}
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

// 响应拦截器
$http.afterRequest = function () {
  // do something...
  uni.hideLoading();
}
// 封装的弹框的方法
uni.$showMsg = (title='数据请求失败',duration=2000)=>{
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}