import fetch from 'utils/fetch'

// 管局上报
export function getAuthorityReportData(data = {}) {
  return fetch({
    url: '/aggregation/getAuthorityReportData',
    method: 'post',
    data: data
  })
}
// 自主发现
export function getIndependentDiscoveryData(data = {}) {
  return fetch({
    url: '/aggregation/getIndependentDiscoveryData',
    method: 'post',
    data: data
  })
}
// 基础企业集团上报
export function getGroupReport(data = {}) {
  return fetch({
    url: '/aggregation/getGroupReport',
    method: 'post',
    data: data
  })
}
// 12321上报
export function get12321Report(data = {}) {
  return fetch({
    url: '/aggregation/get12321Report',
    method: 'post',
    data: data
  })
}
// 公安协同
export function getPublicSecurityCoordination(data = {}) {
  return fetch({
    url: '/aggregation/getPublicSecurityCoordination',
    method: 'post',
    data: data
  })
}
// 涉诈累计排名
export function getFraudRank(data = {}) {
  return fetch({
    url: '/aggregation/getFraudRank',
    method: 'post',
    data: data
  })
}
// 涉诈APP累计上报排名
export function getFraudAppRank(data = {}) {
  return fetch({
    url: '/aggregation/getFraudAppRank',
    method: 'post',
    data: data
  })
}
// 涉诈域名累计上报排名
export function getFraudDomainRank(data = {}) {
  return fetch({
    url: '/aggregation/getFraudDomainRank',
    method: 'post',
    data: data
  })
}
// 涉诈网址累计上报排名
export function getFraudUrlRank(data = {}) {
  return fetch({
    url: '/aggregation/getFraudUrlRank',
    method: 'post',
    data: data
  })
}
// 涉诈短信累计上报排名
export function getFraudMessageRank(data = {}) {
  return fetch({
    url: '/aggregation/getFraudMessageRank',
    method: 'post',
    data: data
  })
}

// // 国际诈骗防范态势
// export function getCountryFraud(data = {}) {
//   return fetch({
//     url: '/aggregation/getCountryFraud',
//     method: 'post',
//     data: data
//   })
// }


// // 省际诈骗防范态势
// export function getProvinceFraud(data = {}) {
//   return fetch({
//     url: '/aggregation/getProvinceFraud',
//     method: 'post',
//     data: data
//   })
// }
// 部省对接现状
export function getProvinceSystemDocking(data = {}) {
  return fetch({
    url: '/aggregation/getProvinceSystemDocking',
    method: 'post',
    data: data
  })
}

// 某一个省平台对接详情
export function getDetails(data = {}) {
  return fetch({
    url: '/aggregation/getDetails',
    method: 'post',
    data: data
  })
}
// 省系统建设情况
export function getProvSystem(data = {}) {
  return fetch({
    url: '/aggregation/getProvSystem',
    method: 'post',
    data: data
  })
}
// 公安协同联动情况
export function getSecurityCoordination(data = {}) {
  return fetch({
    url: '/aggregation/getSecurityCoordination',
    method: 'post',
    data: data
  })
}
// 左侧数据来源
export function getDataSource(data = {}) {
  return fetch({
    url: '/aggregation/getDataSource',
    method: 'post',
    data: data
  })
}

// 涉诈域名每月TOP5
export function getFraudDomainTop(data = {}) {
  return fetch({
    url: '/aggregation/getFraudDomainTop',
    method: 'post',
    data: data
  })
}
// 涉诈网址每月TOP5
export function getFraudUrlTop(data = {}) {
  return fetch({
    url: '/aggregation/getFraudUrlTop',
    method: 'post',
    data: data
  })
}
// 涉诈APP每月TOP5
export function getFraudAppTop(data = {}) {
  return fetch({
    url: '/aggregation/getFraudAppTop',
    method: 'post',
    data: data
  })
}
// 涉诈短信每月TOP5
export function getFraudMessageTop(data = {}) {
  return fetch({
    url: '/aggregation/getFraudMessageTop',
    method: 'post',
    data: data
  })
}