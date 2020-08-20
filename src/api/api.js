// src\api\api.js
import axios from 'axios';    // 导入axios

let host = 'http://127.0.0.1:9000/api';

// 登录
export const login = params => { return axios.post(`${host}/user/login`, params)};

// 注册
export const register = params => { return axios.post(`${host}/user/register`, params)};


// ---------------------项目管理接口------------------------
// 项目列表接口
export const projects_list = () => { return axios.get(`${host}/project/`)};
// 新增项目接口
export const add_projects = params => { return axios.post(`${host}/project/`), params}