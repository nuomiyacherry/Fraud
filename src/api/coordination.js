import fetch from 'utils/fetch'

// 态势总览
export function getTopData (data = {}) {
  return fetch({
    url: '/coordination/getTopData',
    method: 'post',
    data: data
  })
}
// 各省反诈系统预警
export function getWarningTableData(data = {}) {
  return fetch({
    url: '/coordination/getWarningTableData',
    method: 'post',
    data: data
  })
}
// 各省反诈系统劝阻
export function getDissuadeTableData(data = {}) {
  return fetch({
    url: '/coordination/getDissuadeTableData',
    method: 'post',
    data: data
  })
}
// 涉诈互联网账号监测
export function getNetAccountMonitorTableData(data = {}) {
  return fetch({
    url: '/coordination/getNetAccountMonitorTableData',
    method: 'post',
    data: data
  })
}
// 涉诈APP监测
export function getAppMonitorTableData(data = {}) {
  return fetch({
    url: '/coordination/getAppMonitorTableData',
    method: 'post',
    data: data
  })
}
// 涉诈网站监测
export function getWebsiteMonitorTableData(data = {}) {
  return fetch({
    url: '/coordination/getWebsiteMonitorTableData',
    method: 'post',
    data: data
  })
}
// 已处置详情(弹框)
export function getDisposeList(data = {}) {
  return fetch({
    url: '/coordination/getDisposeList',
    method: 'post',
    data: data
  })
}
// 赌博杀鸡盘网站用户量及访问量趋势
export function getWebsiteTrendLineData(data = {}) {
  return fetch({
    url: '/coordination/getWebsiteTrendLineData',
    method: 'post',
    data: data
  })
}