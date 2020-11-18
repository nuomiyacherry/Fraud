import axios from 'axios'
import fetch from 'utils/fetch'
const baseurl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_RATIO === 'ratio41'
      ? '/package2'
      : '/package1'
    : ''
const json = {}

export async function getMapJson(name, prefix = '/map') {
  const path = `${baseurl}${prefix}/${name}`
  if (!json[path]) {
    json[path] = await axios
      .get(`${path}.json`)
      .then(response => response.data)
      .catch(err => err)
  }
  return json[path]
}

export async function getCityMapJson(prov, city) {
  const data = await getMapJson(city, `/map/${prov}`)
  return data
}

// 获取菜单
export function initPro (data = {}) {
  return fetch({
    url: '/init/initPro',
    method: 'post',
    data
  })
}

// 获取导航页按钮列表
export function initBtnList (data = {}) {
  return fetch({
    url: '/init/btn/list',
    method: 'post',
    data
  })
}