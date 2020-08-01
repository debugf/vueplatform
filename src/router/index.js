import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/login',
      component: () => import('../components/page/login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/home',
      name: 'home',
      component:() => import('../components/page/home.vue'),
      meta: {title: '首页'}
    }
  ]
})
