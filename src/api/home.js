import fetch from 'utils/fetch'

// 态势总览
export function getOverview (data = {}) {
  return fetch({
    url: '/home/getOverview',
    method: 'post',
    data: data
  })
}
// 涉诈微信 / QQ类型分布
export function getDisposedType (data = {}) {
  return fetch({
    url: '/home/getDisposedType',
    method: 'post',
    data: data
  })
}
// 涉诈微信QQ号举报量趋势
export function getReportTrend (data = {}) {
  return fetch({
    url: '/home/getReportTrend',
    method: 'post',
    data: data
  })
}
// 涉诈APP类型分布
export function getFraudAppType (data = {}) {
  return fetch({
    url: '/home/getFraudAppType',
    method: 'post',
    data: data
  })
}
// 应用商店涉诈APP总量排名
export function getAppMarketRank (data = {}) {
  return fetch({
    url: '/home/getAppMarketRank',
    method: 'post',
    data: data
  })
}
// 涉诈域名总量趋势
export function getDomainTrend (data = {}) {
  return fetch({
    url: '/home/getDomainTrend',
    method: 'post',
    data: data
  })
}
// 涉诈网站类型分布
export function getFraudWebsiteType (data = {}) {
  return fetch({
    url: '/home/getFraudWebsiteType',
    method: 'post',
    data: data
  })
}
// 涉诈网站境外接入国家排名
export function getWebsiteCountryRank (data = {}) {
  return fetch({
    url: '/home/getWebsiteCountryRank',
    method: 'post',
    data: data
  })
}
// 涉诈网站境内外接入特征
export function getLiquidFillData (data = {}) {
  return fetch({
    url: '/home/getLiquidFillData',
    method: 'post',
    data: data
  })
}
// 疑似受害者全国分布
export function getMapData (data = {}) {
  return fetch({
    url: '/home/getMapData',
    method: 'post',
    data: data
  })
}
// 疑似受害者访问趋势
export function getVisitedTrend (data = {}) {
  return fetch({
    url: '/home/getVisitedTrend',
    method: 'post',
    data: data
  })
}

// 国际诈骗防范态势
export function getCountryFraud(data = {}) {
  return fetch({
    url: '/home/getCountryFraud',
    method: 'post',
    data: data
  })
}

// 省际诈骗防范态势
export function getProvinceFraud(data = {}) {
  return fetch({
    url: '/home/getProvinceFraud',
    method: 'post',
    data: data
  })
}

// 涉诈微信QQ发现数量月趋势
export function getWechatDiscoverTrend(data = {}) {
  return fetch({
    url: '/home/getWechatDiscoverTrend',
    method: 'post',
    data: data
  })
}
// 涉诈网站发现数量月趋势
export function getWebsiteDiscoverTrend(data = {}) {
  return fetch({
    url: '/home/getWebsiteDiscoverTrend',
    method: 'post',
    data: data
  })
}
// 涉诈APP发现数量月趋势
export function getAppDiscoverTrend(data = {}) {
  return fetch({
    url: '/home/getAppDiscoverTrend',
    method: 'post',
    data: data
  })
}
// 涉诈微信QQ处置量月趋势
export function getWechatDisposeTrend(data = {}) {
  return fetch({
    url: '/home/getWechatDisposeTrend',
    method: 'post',
    data: data
  })
}
// 涉诈网站处置量月趋势
export function getWebsiteDisposeTrend(data = {}) {
  return fetch({
    url: '/home/getWebsiteDisposeTrend',
    method: 'post',
    data: data
  })
}
// 涉诈APP处置量月趋势
export function getAppDisposeTrend(data = {}) {
  return fetch({
    url: '/home/getAppDisposeTrend',
    method: 'post',
    data: data
  })
}