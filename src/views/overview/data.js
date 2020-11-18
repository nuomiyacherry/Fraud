import { getCoord, mapName } from '@/constants/worldsForMap'//eslint-disable-line
const provinces = [
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '黑龙江省',
  '吉林省',
  '辽宁省',
  '上海市',
  '山东省',
  '江苏省',
  '安徽省',
  '浙江省',
  '江西省',
  '福建省',
  '河南省',
  '湖北省',
  '湖南省',
  '海南省',
  '广西壮族自治区',
  '广东省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '宁夏回族自治区',
  '青海省',
  '新疆维吾尔自治区',
  '台湾省',
  '香港特别行政区',
  '澳门特别行政区'
]

const coords = [
  {
    name: '北京',
    center: [116.525424, 40.277672]
  },
  {
    name: '天津',
    center: [117.482083, 39.341208]
  },
  {
    name: '河北',
    center: [115.274407, 38.362957]
  },
  {
    name: '山西',
    center: [112.257251, 37.128518]
  },
  {
    name: '内蒙古',
    center: [110.748672, 41.423192]
  },
  {
    name: '黑龙江',
    center: [128.520461, 46.950597]
  },
  {
    name: '吉林',
    center: [126.975088, 43.332681]
  },
  {
    name: '辽宁',
    center: [123.553191, 41.06214]
  },
  {
    name: '上海',
    center: [121.403438, 31.097639]
  },
  {
    name: '山东',
    center: [117.997207, 36.067855]
  },
  {
    name: '江苏',
    center: [119.800142, 33.240592]
  },
  {
    name: '安徽',
    center: [117.445288, 31.112728]
  },
  {
    name: '浙江',
    center: [120.094499, 28.96795]
  },
  {
    name: '江西',
    center: [115.691077, 27.604804]
  },
  {
    name: '福建',
    center: [118.068928, 25.995128]
  },
  {
    name: '河南',
    center: [113.82837, 33.792663]
  },
  {
    name: '湖北',
    center: [112.26918, 31.212352]
  },
  {
    name: '湖南',
    center: [111.754056, 27.539223]
  },
  {
    name: '海南',
    center: [109.803942, 19.12266]
  },
  {
    name: '广西',
    center: [109.569377, 24.084451]
  },
  {
    name: '广东',
    center: [113.653577, 24.016868]
  },
  {
    name: '重庆',
    center: [107.633061, 29.810576]
  },
  {
    name: '四川',
    center: [102.628997, 30.042951]
  },
  {
    name: '贵州',
    center: [107.485883, 27.046109]
  },
  {
    name: '云南',
    center: [101.511361, 24.421822]
  },
  {
    name: '西藏',
    center: [88.412486, 31.693395]
  },
  {
    name: '陕西',
    center: [108.295364, 33.646196]
  },
  {
    name: '甘肃',
    center: [104.505521, 34.928903]
  },
  {
    name: '宁夏',
    center: [106.124483, 37.316797]
  },
  {
    name: '青海',
    center: [96.559326, 35.707387]
  },
  {
    name: '新疆',
    center: [85.542507, 39.949912]
  },
  {
    name: '台湾',
    center: [120.989499, 23.63605]
  },
  {
    name: '香港',
    center: [114.249895, 22.256975]
  },
  {
    name: '澳门',
    center: [113.557912, 22.193541]
  }
]

const nameMap = provinces.reduce((prev, cur, index) => {
  prev[cur] = coords[index].name
  return prev
}, {})

// const style1 = {
//   areaStyle: {
//     normal: {
//       color: '#6BC5F2'
//     }
//   }
// }

// const style2 = {
//   areaStyle: {
//     normal: {
//       color: '#4FA3ED'
//     }
//   }
// }

// const style3 = {
//   areaStyle: {
//     normal: {
//       color: '#3784E8'
//     }
//   }
// }

// const style4 = {
//   areaStyle: {
//     normal: {
//       color: '#3C54C8'
//     }
//   }
// }

// const area1 = ['新疆', '黑龙江']
// const area3 = ['河南', '内蒙古', '广东']
// const area4 = [
//   '广西',
//   '海南',
//   '台湾',
//   '浙江',
//   '安徽',
//   '山东',
//   '江苏',
//   '辽宁',
//   '吉林',
//   '湖北'
// ]
// const arean = area1.concat(area3).concat(area4)
// const area2 = coords
//   .filter(item => !arean.includes(item.name))
//   .map(item => item.name)

// function getMapData(min, max, area) {
//   let arr = []
//   area.forEach(item => {
//     arr.push({ name: item, value: Math.floor(Math.random() * (max - min + 1) + min) })
//   })
//   return arr
// }
// const map = {
//   ...setMapStyle(area1, style1, getMapData(0, 200, area1)),
//   ...setMapStyle(area2, style2, getMapData(200, 400, area2)),
//   ...setMapStyle(area3, style3, getMapData(400, 600, area3)),
//   ...setMapStyle(area4, style4, getMapData(600, 800, area4))
// }

// function setMapStyle(arr, style, mapData) {
//   return arr.reduce((prev, cur) => {
//     prev[cur] = { ...style }
//     // prev[cur].textStyle = {
//     //   normal: {
//     //     show: true,
//     //     fontSize: 16,
//     //     color: '#eee'
//     //   }
//     // }
//     prev[cur].center = coords.find(item => item.name === cur).center
//     prev[cur].data = mapData.filter(item => item.name === cur)[0]
//     return prev
//   }, {})
// }

// const scatterShape = [
//   // 六边形
//   'hexagon',
//   'circle',
//   'triangle',
//   'diamond',
//   4,
//   5,
//   6,
//   7
// ]
// const colors = ['#74F6FD', '#DACD00', '#DA8000', '#CC1CDF']

// function randomInRange(min, max) {
//   return Math.floor(Math.random() * (max - min) + min)
// }

// function pickOne(data) {
//   return data[Math.floor(Math.random() * data.length)]
// }

function getFlylinesData(target, mapData) {
  // const provs = coords.filter(prov => prov.name !== target)
  return mapData.map(p => ({
    source: {
      name: p.name,
      // center: null
      center: getCoord(p.name)
    },
    target: {
      // name: target,
      name: target,
      center: getCoord(target)  //coords.filter(item => item.name === target)[0].center //[110.444119, 50.798952]
    },
    lineStyle: {
      color: '#DACD00' //pickOne(colors)
    },
    symbolStyle: {
      color: '#DACD00', //pickOne(colors),
      size: 10,
      // symbol: pickOne(['dotted', 'ball']),
      // symbol: 'ball',
      opacity: 0.7 //Math.random()
    }
  }))
}

function getScatterData(target, mapData) {
  // const total = mapData.reduce((pre, cur) => {
  //   return pre.value + cur.value
  // })
  // const newMapData = mapData.slice(0)
  // mapData.push({ name: target, value: total })
  return mapData.map(item => ({
    color: '#FFFFAF', //'#05FA8C', //pickOne(['red', '#00f3ff']),
    // show: Math.random() > 0.5,
    show: true,
    // symbol: pickOne(scatterShape),
    // effectType: pickOne(['ripple', 'none']),
    size: 12,
    center: getCoord(item.name),
    data: { 
      name: item.name,
      data: {
        name: '攻击次数',
        value: item.value
      }
    }
    // {
    //   name: province.name,
    //   value: randomInRange(1000, 10000)
    // }
  }))
}

function getMaxValue (data) {//eslint-disable-line
  let max = 0
  if(data && data.length) {
    data.sort((a, b) => {
      return b.value - a.value
    })
    max = data[0].value
  }
  return max
}
// const data = [
//   {name: '湖北', value: 5621},
//   {name: '湖南', value: 9567},
//   {name: '广东', value: 102364},
//   {name: '浙江', value: 7724}
// ]
// getMaxValue(data)

export function getData(mapData) {
  let map = {}
  mapData && mapData.forEach(item => {
    let center = coords.find(el => el.name === item.name).center
    map[item.name] = {
      data: { ...item },
      center: center
    }
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        map,
        nameMap
      }
      resolve(data)
    }, 1000)
  })
}