// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import Vuex from 'vuex'
import store from './store/store.js'
// 引入jsonp  npm i vue-jsonp --save
// import VueJsonp from 'vue-jsonp'

import VueLazyLoad from 'vue-lazyload'

import '@/assets/css/icon.css';

Vue.prototype.$axios = axios

Vue.config.productionTip = false
// 开启Vue 调试工具 vue-devtools
Vue.config.devtools = true

Vue.use(ElementUI)
Vue.use(Vuex)
// Vue.use(VueJsonp)
Vue.use(VueLazyLoad,{
  error:'./assets/img/alogo.png',
  loading:'assets/img/alogo.png'
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
