import axios from 'axios'

import router from '../router'

// resqust拦截器
axios.interceptors.request.use(
  config => {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Token ${token}`;
      }
      return config
  },
    err => {
      return Promise.reject(err);
    }
);

// response拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response;
    if (!res) {
      return Promise.reject(error)
    }
    switch (res.status) {
      case 401:
        this.$message.error('未登录');
        router.push({path: '/'});
      case 403:
        this.$message.error('没有该操作权限');
        router.push({name: '403'});
      case 500:
        this.$message.error('服务器错误');
    }
    return Promise.reject(error.response.data)
  });