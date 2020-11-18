import {randomInRange, pickOne} from './tool'
import {chinaCoordsMap} from '../constants/coordmap'
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

const nameMap = provinces.reduce((prev, cur, index) => {
  prev[cur] = chinaCoordsMap[index].name
  return prev
}, {})

const style1 = {
  areaStyle: {
    normal: {
      // color: '#3175E5'
      color: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
          {
            color: 'red',
            offset: 0
          },
          {
            color: 'green',
            offset: 1
          }
        ]
      }
    }
  }
}

const style2 = {
  areaStyle: {
    normal: {
      color: '#051764'
    }
  }
}

const style3 = {
  areaStyle: {
    normal: {
      color: '#5A299B'
    }
  }
}

const style4 = {
  areaStyle: {
    normal: {
      // color: '#3750C8'
      color: {
        type: 'linear',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            color: 'blue',
            offset: 0
          },
          {
            color: 'red',
            offset: 0.5
          },
          {
            color: 'green',
            offset: 1
          }
        ]
      }
    }
  }
}

const area1 = ['新疆', '黑龙江']
const area3 = ['河南', '内蒙古', '广东']
const area4 = ['广西', '海南', '台湾', '浙江', '安徽', '山东', '江苏', '辽宁', '吉林', '湖北']
const tipArea = ['新疆', '青海', '内蒙古', '湖北', '广西']
const arean = area1.concat(area3).concat(area4)
const area2 = chinaCoordsMap.filter(item => !arean.includes(item.name)).map(item => item.name)

const map = {
  ...setMapStyle(area1, style1),
  ...setMapStyle(area2, style2),
  ...setMapStyle(area3, style3),
  ...setMapStyle(area4, style4)
}

function setMapStyle(arr, style) {
  return arr.reduce((prev, cur) => {
    prev[cur] = {...style}
    prev[cur].center = chinaCoordsMap.find(item => item.name === cur).center
    prev[cur].data = cur === '四川' ? 0 : {value: randomInRange(1000, 100000)}
    prev[cur].z = 1
    prev[cur].borderStyle = {
      normal: {
        opacity: 1,
        color: '#00ffff'
      }
    }
    prev[cur].textStyle = {
      normal: {
        opacity: 1
      },
      emphasis: {
        show: true
      }
    }
    // if (tipArea.includes(cur)) {
    //   prev[cur].simpleTip = {
    //     show: true
    //   }
    // }
    return prev
  }, {})
}

const scatterShape = [
  // 六边形
  'hexagon',
  'circle',
  'triangle',
  'diamond',
  4,
  5,
  6,
  7
]
const colors = ['#74F6FD', '#DACD00', '#DA8000', '#CC1CDF']

function getFlylinesData(target) {
  const provs = chinaCoordsMap.filter(prov => prov.name !== target)
  return provs.map(p => ({
    source: {
      name: p.name,
      center: null
    },
    target: {
      // name: target,
      name: '外部',
      center: [106.230695, 51.280128]
    },
    lineStyle: {
      color: pickOne(colors),
      maxHeight: 500
    },
    symbolStyle: {
      color: pickOne(colors),
      size: randomInRange(5, 10),
      // symbol: pickOne(['dotted', 'ball']),
      // symbol: 'ball',
      opacity: Math.random()
    }
  }))
}

function getScatterData() {
  return chinaCoordsMap.map(province => ({
    color: pickOne(['red', '#00f3ff']),
    // show: Math.random() > 0.5,
    name: province.name,
    show: true,
    symbol: pickOne(scatterShape),
    // effectType: pickOne(['ripple', 'none']),
    effectType: 'none',
    data: {
      name: province.name + randomInRange(100, 10000),
      value: province.name === '四川' ? 0 : randomInRange(1000, 100000)
      // value1: randomInRange(100, 10000) + 'value1',
      // value2: randomInRange(100, 10000) + 'value2',
      // value3: randomInRange(100, 10000) + 'value3'
    }
  }))
}

export function getMap3dData() {
  const scatterData = getScatterData()
  scatterData.push({
    color: '#00f3ff',
    name: '美国',
    show: true,
    size: 64,
    lightray: {
      show: false
    },
    symbol: 'image:///images/cracker.png',
    effectType: 'none',
    center: [106.230695, 51.680128, 15],
    data: {
      name: '攻击来源',
      value: 123456
    }
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        scatterData,
        flylinesData: getFlylinesData('湖北'),
        map,
        nameMap,
        outlineObjects: arean.concat(area2)
      }
      resolve(data)
    }, 1000)
  })
}
