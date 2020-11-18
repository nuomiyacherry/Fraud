import fetch from 'utils/fetch'

// 各省反诈系统预警
export function getWarningTableData(data = {}) {
  return fetch({
    url: '/monitor/getWarningTableData',
    method: 'post',
    data: data
  })
}
// 各省反诈系统劝阻
export function getDissuadeTableData(data = {}) {
  return fetch({
    url: '/monitor/getDissuadeTableData',
    method: 'post',
    data: data
  })
}
// 涉诈互联网账号监测
export function getNetAccountMonitorTableData(data = {}) {
  return fetch({
    url: '/monitor/getNetAccountMonitorTableData',
    method: 'post',
    data: data
  })
}
// 涉诈APP监测
export function getAppMonitorTableData(data = {}) {
  return fetch({
    url: '/monitor/getAppMonitorTableData',
    method: 'post',
    data: data
  })
}
// 涉诈网站监测
export function getWebsiteMonitorTableData(data = {}) {
  return fetch({
    url: '/monitor/getWebsiteMonitorTableData',
    method: 'post',
    data: data
  })
}
// 涉诈舆情预警
export function getWarningList(data = {}) {
  return fetch({
    url: '/monitor/getWarningList',
    method: 'post',
    data: data
  })
}
// 涉诈网站全球访问监测
export function getMapData(data = {}) {
  return fetch({
    url: '/monitor/getMapData',
    method: 'post',
    data: data
  })
}