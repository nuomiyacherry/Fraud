import * as d3 from 'd3-scale'

// 获取数组的前十个
export function getTop10(value, name) {
  const seriesData = []
  const categoryData = []
  value.forEach((item, index) => {
    if (index < 10) {
      seriesData.push(item)
    }
  })
  name.forEach((item, index) => {
    if (index < 10) {
      categoryData.push(item)
    }
  })
  return {
    seriesData: seriesData,
    categoryData: categoryData
  }
}

/**
 * [transPieData 把数据转化为饼图需要的数据格式]
 * @data  {[Array]} [数组]
 * @name  {[String]} [名称key]
 * @value  {[String]} [数值key]
 * @return {[Array]} [转化后的数组]
 */
export function transPieData(data, name, value, fn) {
  let res = []
  if (data) {
    data.forEach(v => {
      let temp = v[name]
      fn && (temp = fn(temp))
      if (temp) {
        res.push({
          name: temp,
          value: v[value] || 0
        })
      }
    })
  }
  return res
}

/**
 * [transBarData 把数据转化为柱状图需要的数据格式]
 * @data  {[Array]} [数组]
 * @name  {[String]} [名称key]
 * @value  {[String]} [数值key]
 * @return {[Array]} [转化后的数组]
 */
export function transBarData(data, name, value, fn) {
  let xData = [],
    yData = []
  if (data) {
    data.forEach(v => {
      let temp = v[name]
      fn && (temp = fn(temp))
      if (temp) {
        xData.push(temp)
        yData.push(v[value] || 0)
      }
    })
  }
  return [xData, yData]
}

/**
 * [sortKeysArr 把数组某个属性的值存为数组]
 * @data  {[Array]} [数组]
 * @keysArr  {[Array]} [名称key Array]
 * @return {[Object]} [转化后的对象，包含各个属性的数组]
 */
export function sortKeysArr(data, keysArr) {
  let keysObj = {}
  keysArr.forEach(key => {
    keysObj[key] = []
  })
  if (data) {
    data.forEach(v => {
      keysArr.forEach(key => {
        keysObj[key].push(v[key])
      })
    })
  }
  return keysObj
}

/**
 * [getMaxValue 获取数组最大值]
 * @data  {[Array]} [数组]
 * @maxValue  {[Number]} [最大值]
 * @return {[Number]} [最大值]
 */
export function getMaxValue(data, maxValue = 0) {
  let tempArr = [...data]
  tempArr.sort((a, b) => b - a)
  if (tempArr.length > 0 && tempArr[0] > maxValue) {
    maxValue = tempArr[0]
  }
  return maxValue
}

/**
 * [getMinValue 获取数组最小值]
 * @data  {[Array]} [数组]
 * @maxValue  {[Number]} [最小值]
 * @return {[Number]} [最小值]
 */
export function getMinValue(data, minValue = 0) {
  let tempArr = [...data]
  tempArr.sort((a, b) => a - b)
  if (tempArr.length > 0 && tempArr[0] < minValue) {
    minValue = tempArr[0]
  }
  return minValue
}
/**
 *[getGroupArray 把一维数组转化为数组长度为cols的二位数组]
 * @data {[Array]} [数组]
 * @cols {[Number]} [数组按cols长度进行切割]
 * @return {[Array]} [转化后的数组]
 */
export function getGroupArray(data, cols) {
  const list = []
  let current = []
  if (data && data.length !== 0) {
    data.forEach(t => {
      current.push(t)
      if (current.length === cols) {
        list.push(current)
        current = []
      }
    })
  }
  if (current.length) {
    list.push(current)
  }
  return list
}

// 二次赛贝尔曲线函数
export function bezierCurveTo(x1, y1, x2, y2, dx = (x2 - x1) / 2, angle = 0) {
  if (y1 === y2) return `M ${x1} ${y1 + 1} L ${x2} ${y2}`
  const radian = (angle * Math.PI) / 180
  const dy = Math.tan(radian) * dx
  // const cpx1 = x1 + dx
  const cpx1 = x1 + (x2 - x1) / 4
  const cpy1 = y1 < y2 ? y1 - dy : y1 + dy
  const cpx2 = x2 - dx
  // const cpx2 = x2 - (x2 - x1) / 4
  const cpy2 = y1 < y2 ? y2 + dy : y2 - dy
  return `M ${x1} ${y1} C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${x2} ${y2}`
}

/**
 * [getMinValue 把“其他”和“未知”排在最后（饼图排序）]
 * @data  {[Array]} [数组]
 * @needRank  {[Boolean]} [是否需要排序，默认由大到小排序]
 * @return {[Array]} [排序后的数组]
 */
export function rankUnknownData(data, needRank = true) {
  let arr = [],
    unknownArr = []
  if (data) {
    if (needRank) data.sort((a, b) => b.value - a.value)
    data.forEach(v => {
      if (v.name === '其它' || v.name === '其他' || v.name === '未知') {
        unknownArr.push(v)
      } else {
        arr.push(v)
      }
    })
  }
  return [...arr, ...unknownArr]
}

/**
 *[getAddMaxValue 获取一组数组同一列和的最大值]
 * @data  {[Array]} [数组]
 * @maxValue  {[Number]} [最大值]
 * @return {[Number]} [最大值]
 */
// serialArray
export function getColumnMaxValue(seriesData = []) {
  let sLen = seriesData.length
  let cLen = seriesData[0].length
  let arr = []
  for (var i = 0; i < cLen; ++i) {
    arr.push(0)
    for (var j = 0; j < sLen; ++j) {
      arr[i] += seriesData[j][i]
    }
  }
  let maxValue = getMaxValue(arr)
  console.log(maxValue, '=====maxValue=======')
  return maxValue
}

/**
 * @param {Array} data
 * @return {Array}
 */
export function getRangeData(data, domain, range) {
  if (!data && data.length === 0) return
  var logScale = d3
    .scaleLog()
    .domain(domain)
    .range(range)
  return data.map(item => logScale(item))
}
/**
 * 数字千分法
 * @param {Number} num
 * @return {String}
 */
export function toThousands(num) {
  num = (num || 0).toString()
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}

/**
 * 数字保留1位小数取万
 * @param {Number} num
 * @return {String}
 */
export function getTenThousands(num) {
  if (num > 10000) {
    num = parseFloat(num / 10000).toFixed(1)
    // num = toFixedNum(num, 1)
  }
  return num
}

export function formateValue(num) {
  return num > 10000 ? getTenThousands(num) : toThousands(num)
}

