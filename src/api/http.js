// 安装axios
// $npm i axios -S
// 创建初始化 axios

import axios from "axios";
import Cookies from 'js-cookie';
import router from "@/router";

const service = axios.create({
  timeout: 30000,   // 超时响应时间
  baseURL: "http://127.0.0.1:8085/api",
  headers: {
    "Content-Type": "application/json;chatset=utf-8" // 表单数据转化
  }
})

// request 拦截器设置
service.interceptors.request.use(
  (config) => {

    const adminJson = Cookies.get('admin')
    if (adminJson) {
        // 设置请求头
        config.headers['token'] = JSON.parse(adminJson).token
    }
    return config
  },
  (error) => {
    console.log('request报错信息', error);
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
    if (res.code === '401') {
        router.push('/login')
    }
    return res
  },
  (error) => {
    console.log('request报错信息', error);
    Promise.reject(error)
  }
)

export default service











