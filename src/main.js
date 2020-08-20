// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './axios/index'

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false



// router.beforeEach((to) => {
//   document.title = `${to.meta.title} | 接口测试平台`;
// });


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
