'use strict'
const frontMockUrl = 'http://39.98.200.240:9090/mock/14'
//const targetUrl = 'http://172.31.134.7:9090/mock/47'
// const targetUrl = 'http://172.31.131.136:8091'//修改成自己的后端地址:端口
// const targetUrl = 'http://172.31.131.135:18090'//修改成自己的后端地址:端口
const targetUrl = 'http://39.98.200.240:9090/mock/14'//修改成自己的后端地址:端口
// const targetUrl = 'http://172.31.131.134:8090'//修改成自己的后端地址:端口
// const targetUrl = 'http://172.31.131.130:9002'//修改成自己的后端地址:端口
const targetPort = 9001
const baseUrl = ''//虚拟的baseUrl，不是api的url已有的前缀
const apiPrefix = ['/']//api的url已有的前缀
let proxyTable = {}
if(baseUrl) {
  proxyTable[baseUrl] = {
    target: targetUrl,
    changeOrigin: true,
    ws: false,
    pathRewrite: {
      [`^${baseUrl}`]: ''
    }
  }
}else{
  apiPrefix.forEach(item => {
    proxyTable[item] = {
      target: targetUrl,
      ws: false,
      changeOrigin: true
    }
  })
}

module.exports = {
  frontMockUrl,
  baseUrl,
  dev: {
    port: targetPort,
    proxy: {
      ...proxyTable
    }
  }
}