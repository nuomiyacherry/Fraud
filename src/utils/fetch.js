import axios from 'axios'
import {
  Message
  // Loading
} from 'element-ui'
import {
  router
} from '../main'
import qs from 'qs' // eslint-disable-line
import storage from './storage'
// import {
//   baseUrl
// } from 'constants/common'
const baseurl = require('mock/config').baseurl

// let loadingInstance

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: baseurl, // api的base_url
  // timeout: 30000, // 请求超时时间
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': decodeURIComponent(location.search).substr(1)
  }
})

const fetch = axios.create({
  headers: {
    Accept: 'application/json',
    // 这里必须使用application/json，不然bodyparser 处理参数会将boolean类型与number类型处理成string
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  // console.log(config)
  // Do something before request is sent
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  /*if (!config.notLoading) {
      loadingInstance = Loading.service({
          fullscreen: true,
          text: '正在加载'
      })
  }*/
  // if(config.headers)
  if (config.method === 'post') {
    if (!config.data) {
      config.data = {}
    }
  }

  return config
}, error => {
  // loadingInstance.close()
  Message.error({
    showClose: true,
    message: '加载超时',
    type: 'error'
  })
  console.log(error) // for debug
  Promise.reject(error)
})

function setMockData(url, data) {//eslint-disable-line
  fetch({
    method: 'post',
    url: '/mock/saveMockData',
    data: { url, data }
  }).then(res => {
    process.env.NODE_ENV === 'development' && console.log(res)
  })
    .catch(err => {
    process.env.NODE_ENV === 'development' && console.error(err)
  })
}

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log(response, 'response')
    const data = response.data

    if (data.sessionOut) {
      Message.error({
        showClose: true,
        message: '页面超时',
        type: 'error'
      })
      setTimeout(_ => {
        window.location.href = storage.get('loginUrl')
      }, 1000)
    } else {
      if (data.errorType !== 0) {
        Message.error({
          showClose: true,
          message: data.msg,
          type: 'error'
        })
      } else {
        // if (process.env.NODE_ENV === 'development' && !process.env.VUE_APP_MOCK) {
        //   setMockData(response.config.url, data)
        // }
        return data
      }
    }
  },
  error => {
    Message.error({
      showClose: true,
      message: '加载失败',
      type: 'error'
    })
    if (error.response) {
      switch (error.response.status) {
        // case 404:
        /**未找到页面**/
        // 404 跳转到404页面
        // router.replace({
        //   path: '/error/404'
        // })
        // break
        case 500:
          /**服务端报错**/
          /*router.replace({
            path: '/error/500'
          })*/
          break
      }
    }
    console.error('Error', error)
    return error
  }
)

export default service
