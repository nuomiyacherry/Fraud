'use strict'

import fetch from 'utils/fetch'

// 疑似受害者国内分布占比
export function suspectedVictim (data) {
  return fetch({
    url: '/special/suspectedVictim',
    method: 'post',
    data
  })
}

// 存活网站数量趋势TOP5
export function liveWebRank (data) {
  return fetch({
    url: '/special/liveWebRank',
    method: 'post',
    data
  })
}

// 基本情况
export function baseInfoList (data) {
  return fetch({
    url: '/special/baseInfoList',
    method: 'post',
    data
  })
}

// 赌博杀猪盘-网站境内外接入占比
export function gambleWebOutside (data) {
  return fetch({
    url: '/special/gambleWebOutside',
    method: 'post',
    data
  })
}

// 赌博杀猪盘-存活域名数量趋势
export function gambleLiveDomain (data) {
  return fetch({
    url: '/special/gambleLiveDomain',
    method: 'post',
    data
  })
}

// 小额贷款手续费诈骗-网站境内外接入占比
export function loanFraudWebOutside (data) {
  return fetch({
    url: '/special/loanFraudWebOutside',
    method: 'post',
    data
  })
}

// 小额贷款手续费诈骗-存活域名数量趋势
export function loanFraudleLiveDomain (data) {
  return fetch({
    url: '/special/loanFraudleLiveDomain',
    method: 'post',
    data
  })
}

// 虚假彩票合买诈骗-网站境内外接入占比
export function lotteryFraudWebOutside (data) {
  return fetch({
    url: '/special/lotteryFraudWebOutside',
    method: 'post',
    data
  })
}

// 虚假彩票合买诈骗-存活域名数量趋势
export function lotteryFraudleLiveDomain (data) {
  return fetch({
    url: '/special/lotteryFraudleLiveDomain',
    method: 'post',
    data
  })
}