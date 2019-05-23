import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta:{},
      children:[
        {
          path: '/recommend',
          component: resolve => require(['../components/pages/recommend.vue'], resolve),
          name: 'recommend',
        },
        {
          path: '/singer',
          component: resolve => require(['../components/pages/singer.vue'], resolve),
          name: 'singer',
          children:[
            {
              path: ':id',
              component: resolve => require(['../components/pages/singerDetail.vue'], resolve),
              name: 'singerDetail',
            }
          ]
        },
        {
          path: '/rankList',
          component: resolve => require(['../components/pages/rankList.vue'], resolve),
          name: 'rankList',
        },
        {
          path: '/search',
          component: resolve => require(['../components/pages/search.vue'], resolve),
          name: 'search',
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:  resolve => require (['../components/pages/login.vue'], resolve)
    }
  ]
})
