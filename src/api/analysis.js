'use strict'

import fetch from 'utils/fetch'

// 疑似受害者国内分布占比
export function fraudRings (data) {
  return fetch({
    url: '/analysis/fraudRings',
    method: 'post',
    data
  })
}

// 疑似受害者国内分布占比
export function domainGross (data) {
  return fetch({
    url: '/analysis/domainGross',
    method: 'post',
    data
  })
}

// 疑似受害者国内分布占比
export function domainLive (data) {
  return fetch({
    url: '/analysis/domainLive',
    method: 'post',
    data
  })
}

// table列表
export function tableList (data) {
  return fetch({
    url: '/analysis/tableList',
    method: 'post',
    data
  })
}

// 4:1页面接口

// 涉诈APP接入商城占比
export function getFraudAppMarket(data) {
  return fetch({
    url: '/analysis/getFraudAppMarket',
    method: 'post',
    data
  })
}

// 涉诈APP诈骗事件类型分布
export function getFraudAppEventType(data) {
  return fetch({
    url: '/analysis/getFraudAppEventType',
    method: 'post',
    data
  })
}
// 近一周涉诈APP发现趋势
export function getFraudAppDiscoverTrend(data) {
  return fetch({
    url: '/analysis/getFraudAppDiscoverTrend',
    method: 'post',
    data
  })
}
// 网站境内外接入占比
export function getWebsiteAccessProportion(data) {
  return fetch({
    url: '/analysis/getWebsiteAccessProportion',
    method: 'post',
    data
  })
}
// 涉诈团伙总量趋势
export function getFraudGroupTotalTrend(data) {
  return fetch({
    url: '/analysis/getFraudGroupTotalTrend',
    method: 'post',
    data
  })
}
// 涉诈团伙更新趋势
export function getFraudGroupUpdateTrend(data) {
  return fetch({
    url: '/analysis/getFraudGroupUpdateTrend',
    method: 'post',
    data
  })
}
// 涉诈网站分析_专用客户端访问占比排名
export function getClientVisitedRank(data) {
  return fetch({
    url: '/analysis/getClientVisitedRank',
    method: 'post',
    data
  })
}

// 疑似受害者国内分布占比
export function suspectedVictim(data) {
  return fetch({
    url: '/analysis/suspectedVictim',
    method: 'post',
    data
  })
}

// 存活网站数量趋势TOP5
export function liveWebRank(data) {
  return fetch({
    url: '/analysis/liveWebRank',
    method: 'post',
    data
  })
}

// 基本情况
export function baseInfoList(data) {
  return fetch({
    url: '/analysis/baseInfoList',
    method: 'post',
    data
  })
}

// 赌博杀猪盘-网站境内外接入占比
export function gambleWebOutside(data) {
  return fetch({
    url: '/analysis/gambleWebOutside',
    method: 'post',
    data
  })
}

// 赌博杀猪盘-存活域名数量趋势
export function gambleLiveDomain(data) {
  return fetch({
    url: '/analysis/gambleLiveDomain',
    method: 'post',
    data
  })
}

// 小额贷款手续费诈骗-网站境内外接入占比
export function loanFraudWebOutside(data) {
  return fetch({
    url: '/analysis/loanFraudWebOutside',
    method: 'post',
    data
  })
}

// 小额贷款手续费诈骗-存活域名数量趋势
export function loanFraudleLiveDomain(data) {
  return fetch({
    url: '/analysis/loanFraudleLiveDomain',
    method: 'post',
    data
  })
}

// 虚假彩票合买诈骗-网站境内外接入占比
export function lotteryFraudWebOutside(data) {
  return fetch({
    url: '/analysis/lotteryFraudWebOutside',
    method: 'post',
    data
  })
}

// 虚假彩票合买诈骗-存活域名数量趋势
export function lotteryFraudleLiveDomain(data) {
  return fetch({
    url: '/analysis/lotteryFraudleLiveDomain',
    method: 'post',
    data
  })
}
// 涉诈网站分析_赌博杀猪盘_疑似受害者国内分布占比
export function gambleNatiionalDistribution(data) {
  return fetch({
    url: '/analysis/gambleNatiionalDistribution',
    method: 'post',
    data
  })
}
// 涉诈网站分析_小贷诈骗_疑似受害者国内分布占比
export function loanFraudNatiionalDistribution(data) {
  return fetch({
    url: '/analysis/loanFraudNatiionalDistribution',
    method: 'post',
    data
  })
}
// 涉诈网站分析_虚假彩票_疑似受害者国内分布占比
export function lotteryFraudNatiionalDistribution(data) {
  return fetch({
    url: '/analysis/lotteryFraudNatiionalDistribution',
    method: 'post',
    data
  })
}
// 涉诈网站分析-涉诈网站类型分布
export function getFraudWebsiteType(data = {}) {
  return fetch({
    url: '/analysis/getFraudWebsiteType',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_获取右侧顶部tab列表数据
export function getTabList(data = {}) {
  return fetch({
    url: '/analysis/getTabList',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_基本情况
export function getBasicList(data = {}) {
  return fetch({
    url: '/analysis/getBasicList',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_疑似受害者全国分布
export function getVictimNationalData(data = {}) {
  return fetch({
    url: '/analysis/getVictimNationalData',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_涉诈域名
export function getFraudDomainTableList(data = {}) {
  return fetch({
    url: '/analysis/getFraudDomainTableList',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_疑似嫌疑人源IP
export function getSuspectSrcIpTableList(data = {}) {
  return fetch({
    url: '/analysis/getSuspectSrcIpTableList',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析_主机IP
export function getHostIpTableList(data = {}) {
  return fetch({
    url: '/analysis/getHostIpTableList',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_涉诈APP发现分布统计_地图
export function getFraudAppDiscoverMapData(data = {}) {
  return fetch({
    url: '/analysis/getFraudAppDiscoverMapData',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_涉诈APP发现分布统计_表格
export function getFraudAppDiscoverTableList(data = {}) {
  return fetch({
    url: '/analysis/getFraudAppDiscoverTableList',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_涉诈APP高危接入IP分析
export function getHighRiskIpAccessData(data = {}) {
  return fetch({
    url: '/analysis/getHighRiskIpAccessData',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_涉诈APP发现总数
export function getFraudAppTotal(data = {}) {
  return fetch({
    url: '/analysis/getFraudAppTotal',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_APP舆情列表
export function getWarningList(data = {}) {
  return fetch({
    url: '/analysis/getWarningList',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_待定柱状图1
export function getBarData1(data = {}) {
  return fetch({
    url: '/analysis/getBarData1',
    method: 'post',
    data: data
  })
}
// 涉诈APP分析_待定柱状图2
export function getBarData2(data = {}) {
  return fetch({
    url: '/analysis/getBarData2',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析——总数
export function getFakeWebsiteList(data = {}) {
  return fetch({
    url: '/analysis/getFakeWebsiteList',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析——受害用户分布
export function getAffectedUsersRatio(data = {}) {
  return fetch({
    url: '/analysis/getAffectedUsersRatio',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_深度受害用户所涉仿冒网站类型
export function getDeepVitimPhishingType(data = {}) {
  return fetch({
    url: '/analysis/getDeepVitimPhishingType',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_浅中度受害用户所涉仿冒网站类型
export function getLightVitimPhishingType(data = {}) {
  return fetch({
    url: '/analysis/getLightVitimPhishingType',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_仿冒网页来源
export function getFakeWebSource(data = {}) {
  return fetch({
    url: '/analysis/getFakeWebSource',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_仿冒网页类型总数
export function getFakeWebType(data = {}) {
  return fetch({
    url: '/analysis/getFakeWebType',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_仿冒网页及深度受害用户趋势
export function getFakeWebTrend(data = {}) {
  return fetch({
    url: '/analysis/getFakeWebTrend',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析_地图数据
export function getFakeWebMapData(data = {}) {
  return fetch({
    url: '/analysis/getFakeWebMapData',
    method: 'post',
    data: data
  })
}

// 涉诈团伙分析 - 涉诈团伙新增趋势
export function getFraudAddTrend(data = {}) {
  return fetch({
    url: '/analysis/getFraudAddTrend',
    method: 'post',
    data: data
  })
}
// 涉诈团伙分析 - 涉诈团伙活动趋势
export function getFraudActiveTrend(data = {}) {
  return fetch({
    url: '/analysis/getFraudActiveTrend',
    method: 'post',
    data: data
  })
}
// 重点网站分析-域名平均存活周期趋势
export function getDomainSurviveTrend(data = {}) {
  return fetch({
    url: '/analysis/getDomainSurviveTrend',
    method: 'post',
    data: data
  })
}
// 重点网站分析 - 主机IP平均存活周期趋势
export function getHostIpSurviveTrend(data = {}) {
  return fetch({
    url: '/analysis/getHostIpSurviveTrend',
    method: 'post',
    data: data
  })
}
// 重点网站分析 - 域名境外接入率趋势
export function getDomainAccessTrend(data = {}) {
  return fetch({
    url: '/analysis/getDomainAccessTrend',
    method: 'post',
    data: data
  })
}

// 仿冒网站分析-仿冒类型
export function getFakeType(data = {}) {
  return fetch({
    url: '/analysis/getFakeType',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析 - 国外来源仿冒网站数量趋势
export function getForeignFakeWebTrend(data = {}) {
  return fetch({
    url: '/analysis/getForeignFakeWebTrend',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析 - 国内来源仿冒网站数量趋势
export function getCountryFakeWebTrend(data = {}) {
  return fetch({
    url: '/analysis/getCountryFakeWebTrend',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析 - 受害用户数量趋势
export function getVitimUserTrend(data = {}) {
  return fetch({
    url: '/analysis/getVitimUserTrend',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析 - 深度受害用户数量趋势
export function getDeepVitimUserTrend(data = {}) {
  return fetch({
    url: '/analysis/getDeepVitimUserTrend',
    method: 'post',
    data: data
  })
}
// 仿冒网站分析 - 浅中度受害用户数量趋势
export function getLightVitimUserTrend(data = {}) {
  return fetch({
    url: '/analysis/getLightVitimUserTrend',
    method: 'post',
    data: data
  })
}
// 重点APP分析 - APP伪装类型发现趋势
export function getPretendTypeTrend(data = {}) {
  return fetch({
    url: '/analysis/getPretendTypeTrend',
    method: 'post',
    data: data
  })
}
// 重点APP分析 - 涉诈APP新闻高频关键词
export function getFraudKeywordsData(data = {}) {
  return fetch({
    url: '/analysis/getFraudKeywordsData',
    method: 'post',
    data: data
  })
}
