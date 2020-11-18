// const project = process.env.PROJECT
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const mockPath = path.join(__dirname, `./mockdata/index.js`)
const existData = require(mockPath)
const existurls = existData.map(item => item[0])
const apis = []
// let proxy = require('../config/projects.conf')[project].config.proxyTable['/front'].target
// proxy = proxy.substr(0, proxy.length - 1)
// const proxy = require('../config/projects.conf')[project].config.frontMockUrl
const proxy = require('../build/devServer.config').frontMockUrl

// getAllUrls(path.join(__dirname, `../src/${project}/api`))

// getAllUrls(path.join(__dirname, `../src/api`))

// const existApis = apis.filter(item => !existurls.includes(item.url))
// // console.log(existurls, 'existurls')
// // console.log(apis, 'apis')
// // console.log(existApis, 'existApis')

// if (existApis.length) {
//   runningEnd()
//     .then(({ data, errorInterfaces, undefinedInterfaces }) => {
//       undefinedInterfaces.length && console.error('未定义接口', undefinedInterfaces)
//       errorInterfaces.length && console.error('请求失败的接口', errorInterfaces)
//       const _data = `// 未定义接口\nexports.undefinedInterfaces = ${JSON.stringify(undefinedInterfaces)}\n\n` +
//         `// 请求失败的接口\nexports.errorInterfaces = ${JSON.stringify(errorInterfaces)}\n\n` +
//         `module.exports = ${JSON.stringify(data.concat(existData), null, 2)}`
//       fs.writeFileSync(mockPath, _data, 'utf8')
//     })
// }
let existApis
exports.getAllMockData = _ => {
  console.log('mock======')
  getAllUrls(path.join(__dirname, `../src/api`))

  existApis = apis.filter(item => !existurls.includes(item.url))
  // console.log(existurls, 'existurls')
  // console.log(apis, 'apis')
  console.log(existApis, 'existApis')

  if (existApis.length) {
    runningEnd()
      .then(({ data, errorInterfaces, undefinedInterfaces }) => {
        undefinedInterfaces.length && console.error('未定义接口', undefinedInterfaces)
        errorInterfaces.length && console.error('请求失败的接口', errorInterfaces)
        const _data = `// 未定义接口\nexports.undefinedInterfaces = ${JSON.stringify(undefinedInterfaces)}\n\n` +
          `// 请求失败的接口\nexports.errorInterfaces = ${JSON.stringify(errorInterfaces)}\n\n` +
          `module.exports = ${JSON.stringify(data.concat(existData), null, 2)}`
        fs.writeFileSync(mockPath, _data, 'utf8')
      })
  }
}

// 获取所有的url
function getAllUrls(path) {
  fs.readdirSync(path).forEach(file => {
    const newPath = [path, file].join('/')
    const stat = fs.statSync(newPath)
    if (stat.isFile()) {
      if (/(.*)\.(js)/.test(file)) {
        const data = fs.readFileSync(newPath)
        // const reg = /[(url:\s)|(method:\s)]+[\'|\"]([a-zA-Z1-9\_\-\.\/]+)[\'|\"]/g
        // const reg = /(url:\s[\'|\"]([a-zA-Z1-9\_\-\.\/]+)[\'|\"])|(method:\s[\'|\"]([a-zA-Z1-9\_\-\.\/]+)[\'|\"])/g
        const reg = /(url:\s[\'|\"](\S+)[\'|\"])|(method:\s[\'|\"](\S+)[\'|\"])/g
        // const url = data.toString().match(reg)

        let res, count = 0, item = {}

        while (res = reg.exec(data)) {
          let val

          if (val = res[2]) {
            item.url = val
            count++
          } else if (val = res[4]) {
            item.method = val
            count++
          }
          if (count % 2 === 0) {
            apis.push(item)
            item = {}
          }
        }
      }
    } else if (stat.isDirectory()) {
      getAllUrls(newPath)
    }
  })
}

function asyncTo(promise, errTxt) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      err = errTxt || '请求失败'
      return [err, undefined]
    })
}

// 请求封装
function ajax(item) {
  const { url, method } = item
  return axios({
    url: `${proxy}${url}`,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}

// 一直执行完所有的请求
async function runningEnd() {
  const arr = []
  const errorInterfaces = []
  const undefinedInterfaces = []
  for (let item of existApis) {
    const [err, res] = await asyncTo(ajax(item))
    const { url } = item
    if (!url) {
      continue
    }

    if (err) {
      // console.error(url, '请求失败')
      errorInterfaces.push(url)
    } else {
      const { data } = res
      if (data.errcode === 404) {
        // console.error(url, '此接口未定义')
        undefinedInterfaces.push(url)
      } else {
        arr.push([url, data])
      }
    }
  }
  return {
    data: arr,
    errorInterfaces,
    undefinedInterfaces
  }
}
