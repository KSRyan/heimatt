// 对axios进行配置  然后将配置好的axios导出
import axios from 'axios'
import store from '@/store'

// 进行配置
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头字段(错误写法，只会在main.js渲染时执行一次，不推荐)
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

// 请求拦截器，在每次请求前获取一次token，并设置给请求头
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.headers) {
    // 改变了对象的某个属性值
    config.headers.Authorization = `Bearer ${store.getUser().token}`
  }

  // 指向了一个对象，改变了内存的指向，覆盖了对象中之前所有的值，不推荐
  // config.headers = {
  //   Authorization: `Bearer ${store.getUser().token}`
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  // error 错误对象
  // error.response 响应对象
  // error.response 响应状态码
  if (error.response.status === 401) {
    // console.log(error.response.status)
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default axios
