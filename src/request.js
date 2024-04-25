import axios from 'axios'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL =  process.env.VUE_APP_BASE_URL
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 120000, // 请求超时时间
  baseURL: ConfigBaseURL,
  // token放入header
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'token': localStorage.getItem('token') || ''    // 请求头带上token
  }
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  let no_loading_urls = ['/analyze', '/chat']
  // 如果url以no_loading_urls中的某个字符串开头，则不显示loading
  config.loading = true
  for(let i = 0; i < no_loading_urls.length; i++) {
    if (config.url.startsWith(no_loading_urls[i])) {
      config.loading = false
      break
    }
  }
  if(config.loading !== false && !loadingInstance) {
    loadingInstance = Loading.service({
      lock: true,
      text: 'loading...'
    })
  }

  // 打印请求url及参数
  console.log('url: ' + config.url)
  console.log('params: ' + JSON.stringify(config.params))
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  if(loadingInstance) {
    loadingInstance.close()
  }
  console.log('data: ', response.data)
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  // 根据响应码配置msg
  let errormsg = error.message
  // 如果返回401则跳转到登录页
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  
  // switch (error.response.status) {
  //   case 400:
  //     errormsg = '请求错误'
  //     break
  //   case 401:
  //     errormsg = '未授权，请登录'
  //     break
  //   case 403:
  //     errormsg = '拒绝访问'
  //     break
  //   case 404:
  //     errormsg = `请求地址出错: ${error.response.config.url}`
  //     break
  //   case 408:
  //     errormsg = '请求超时'
  //     break
  //   case 500:
  //     errormsg = '服务器内部错误'
  //     break
  //   case 501:
  //     errormsg = '服务未实现'
  //     break
  //   case 502:
  //     errormsg = '网关错误'
  //     break
  //   case 503:
  //     errormsg = '服务不可用'
  //     break
  //   case 504:
  //     errormsg = '网关超时'
  //     break
  //   case 505:
  //     errormsg = 'HTTP版本不受支持'
  //     break
  //   default:
  //     errormsg = '连接错误'
  // }
  Message.error(errormsg + msg || '未知错误')

  if(loadingInstance) {
    loadingInstance.close()
  }
  return Promise.reject(error)
})