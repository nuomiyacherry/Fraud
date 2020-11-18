
// const baseUrl = require('../build/devServer.config').baseUrl
const isDev = process.env.NODE_ENV === 'development',
  outterline = 'http://39.98.200.240:9090/mock/14',
  innerline = 'http://39.98.200.240:9090/mock/14',
  productPrefix =
    process.env.VUE_APP_CURRENTMODE === 'demo'
      ? innerline
      : process.env.VUE_APP_CURRENTMODE === 'demoout'
      ? outterline
      : '',
  yapi = innerline

module.exports = {
  baseurl: isDev ? yapi : productPrefix
}
