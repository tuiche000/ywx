import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
// import VueCookie from 'vue-cookie'
// import { userInfo } from './api'

//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import './assets/style/rem'
import 'mint-ui/lib/style.css'
//
import Button from './components/button'
import Product from './common/product'
Vue.component('button-vue', Button)
Vue.component('product-vue', Product)

Vue.use(ElementUI)
// Vue.use(VueCookie)
// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/images/err.png',
  loading: '/static/images/load.gif',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
Vue.use(MintUI)
Vue.config.productionTip = false

import { getStore } from '/utils/storage.js'  // 缓存的用户信息
const whiteList = ['home', 'register', 'login', 'area', 'category', 'shopnav', 'goodsDetails'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let userInfo = JSON.parse(getStore('userInfo'))
  console.log(userInfo)
  if (userInfo) {
    if (userInfo.status !== 0) {
      if (whiteList.indexOf(to.name) !== -1) { // 不需要登陆的页面
        console.log('不需要登陆')
        next()
      } else {
        next('/login')
      }
    } else {
      // store.commit('RECORD_USERINFO', {info: userInfo.result})
      if (to.path === '/login') { //  跳转到
        next({path: '/'})
      }
      next()
    }
  } else if (whiteList.indexOf(to.name) !== -1) { // 不需要登陆的页面
    next()
  } else {
    next('/login')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
