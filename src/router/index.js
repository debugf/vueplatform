// src\router\index.js
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
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import('../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          // 系统主页
          path: '/dashboard',
          component: () => import('../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          // 项目管理页
          path: '/project',
          component: () => import('../components/page/ProjectsList.vue'),
          meta: { title: '项目管理' }
        },
      ]
  }
  ]
})
