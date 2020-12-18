import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading, MessageBox, Message } from 'element-ui'
/**
 * 加载全局的loading
 */
let loadingInstance = null
/**
 * 一些常见的http状态码信息
 */
let httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}
// 创建一个axios的自定义的实例service，并且可以自定义其配置
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,//请求发出的延迟毫秒数。如果请求花费的时间超过延迟的时间，那么请求会被终止
})
/**
 * 给自定义的axios实例service添加一个请求拦截器
 */
service.interceptors.request.use(config => {
  //loading开始
  loadingInstance = Loading.service({
    target: 'body',
    spinner: 'el-icon-loading',
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  });
  // 在发送请求之前做些什么，比如传token
  if (store.getters.token) {
    // 第一种写法
    // config.headers = {
    //   "Authorization": token
    // }
    //第二种写法
    config.headers['Authorization'] = 'Bearer ' + getToken()
  };
  // // 在这里可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口,因为返回的是二进制流，所以需要设置请求响应类型为blob,就可以在此处设置。
  // if (config.url.includes('pur/contract/export')) {
  //   config.headers['responseType'] = 'blob'
  // };
  // // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
  // if (config.url.includes('pur/contract/upload')) {
  //   config.headers['Content-Type'] = 'multipart/form-data'
  // }
  return config
}, error => {
  //出错，也要loading结束
  loadingInstance.close();
  // 对请求错误做些什么
  console.log(error) // for debug
  return Promise.reject(error);
})
/**
 * 给自定义的axios实例service添加一个响应拦截器
 */
service.interceptors.response.use(response => {
  //loading结束
  loadingInstance.close()
  //在这里对返回的数据进行处理
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return Promise.resolve(res)
  }

}, error => {
  //出错，也要loading结束
  loadingInstance.close()
  if (error.response) {
    // 根据请求失败的http状态码去给用户相应的提示
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
    Message({
      message: tips,
      type: 'error'
    })
    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
    // if (error.response.status === 401) {
    //   loadingInstance.close()
    //   router.replace({
    //     path: '/login',
    //   })
    // }
    return Promise.reject(error)
  } else {
    Message({
      message: '请求超时, 请刷新重试',
      type: 'error'
    })
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})
/**
 * 统一封装GET请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [`params` 是即将与请求一起发送的 URL参数,请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const GET = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'GET',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装POST请求
 * @param {String} url [请求的url地址]
 * @param {Object} data  [`data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH']
 * @param {Object} config [请求时配置]
 */
export const POST = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'POST',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装PUT请求
 * @param {String} url [请求的url地址]
 * @param {Object} data  [`data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH']
 * @param {Object} config [请求时配置]
 */
export const PUT = (url, data, config) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'PUT',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装PATCH请求
 * @param {String} url [请求的url地址]
 * @param {Object} data  [`data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH']
 * @param {Object} config [请求时配置]
 */
export const PATCH = (url, data, config) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'PATCH',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 统一封装DELETE请求
 * @param {String} url [请求的url地址]
 * @param {Object} data  [`data` 是作为请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH']
 * @param {Object} config [请求时配置]
 */
export const DELETE = (url, data, config) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'DELETE',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
export default service