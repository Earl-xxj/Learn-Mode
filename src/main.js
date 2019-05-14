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
import VueJsonp from 'vue-jsonp'

import '@/assets/css/icon.css';


Vue.config.productionTip = false
// 开启Vue 调试工具 vue-devtools
Vue.config.devtools = true

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueJsonp)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
