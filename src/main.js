import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入全局样式表
import './assets/globle.css'
Vue.config.productionTip = false
// 注册element-ui
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
// 请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// response 拦截器中
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$ajax = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
