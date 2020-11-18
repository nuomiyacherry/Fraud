import fetch from 'utils/fetch'

// 态势总览
export function getOverview(data = {}) {
  return fetch({
    url: '/nav/getOverview',
    method: 'post',
    data: data
  })
}