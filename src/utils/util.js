import { Message } from 'element-ui'

export function title(title) {
  title = title || '****系统'
  window.document.title = title
}
/**
 * async/await catch 错误
 * @param {Promise} promise
 * @param {String} errTxt
 * @return {Promise}
 */
export function asyncTo(promise, errTxt) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      err = errTxt || '请求失败'
      return [err, undefined]
    })
}
/**
 * 睡眠函数
 * @param {number} time
 */
export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export function simpleAsyncTo(promise, errTxt) {
  return promise
    .then(data => {
      // 如果没有
      if (data.isNormal === true) {
        return data
      } else {
        errCb(data.returnModel || errTxt)
        return null
      }
    })
    .catch(err => {
      process.env.NODE_ENV === 'development' && console.error(err)
      errCb('请求失败')
      return null
    })
}

/**
 * 处理报错
 * @param {string} msg
 */
export const errCb = msg => {
  process.env.NODE_ENV === 'development' && console.error(msg)
  Message.error({
    showClose: true,
    message: msg
  })
}

// 防抖函数
// 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
export function debounce(fn, delay = 1000) {
  let timer = null
  return function() {
    if (timer !== null) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(_ => {
      fn.apply(context, arguments)
    }, delay)
  }
}

// 节流函数：当持续触发事件时，保证一定时间段内只调用一次事件处理函数
export function throttle(fn, delay = 1000) {
  let timer = null
  let start = Date.now()
  return function() {
    const cur = Date.now()
    const wait = delay - (cur - start)
    const context = this
    clearTimeout(timer)
    if (wait <= 0) {
      fn.aplly(context, arguments)
      start = Date.now()
    } else {
      timer = setTimeout(_ => {
        fn.apply(context, arguments)
      }, delay)
    }
  }
}

/**
 * 获取椭圆上的点，亦可获取圆上的点，圆上的点弧长是等分的，椭圆的点不是等分的
 * @param {Number} rx x轴半径
 * @param {Number} ry y轴半径
 * @param {Number} cx 圆心x
 * @param {Number} cy 圆心y
 * @param {Number} count 等分的数量
 * @param {Object} options
 * counterclockwise: true 返回的数据是顺时针还是逆时针 true 逆时针
 * startAngle: 0 起始角度，从正下方开始计算
 */
export function getEllipsePoints(rx, ry, cx, cy, count, options) {
  options = {
    startAngle: 0,
    counterclockwise: true,
    ...options
  }

  const radian = Math.PI / 180,
    radians = radian * Math.round(360 / count), // 弧度
    { counterclockwise, startAngle } = options,
    startRadians = !counterclockwise
      ? -(radian * startAngle - radians)
      : radian * startAngle,
    points = []
  for (let i = 0; i < count; i++) {
    const x = cx + rx * Math.sin(radians * i + startRadians),
      y = cy + ry * Math.cos(radians * i + startRadians)
    if (!counterclockwise) {
      points.unshift({ x, y }) // 顺时针
    } else {
      points.push({ x, y }) // 逆时针
    }
  }
  return points
}

export function getCircleDividePoints(radius, cx, cy, count, options = {}) {
  return getEllipsePoints(radius, radius, cx, cy, count, options)
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}
/**
 * 计算椭圆上N个等分点的坐标
 * @param {Number} radius 半径
 * @param {Number} cx 圆心x
 * @param {Number} cy 圆心y
 * @param {Number} count 等分的数量
 * @param {Object} options
 * counterclockwise: true 返回的数据是顺时针还是逆时针 true为逆时针
 * startAngle: 0 起始角度，从正下方开始计算
 * precision：0.001 精度，值越小算出来等分点的长度越接近，但也会消耗更多的性能
 */
export function getEllipseDividePoints(rx, ry, cx, cy, count, options) {
  options = {
    precision: 0.001, // 值越小算出来等分点的长度越接近，但也会消耗更多的性能
    counterclockwise: true,
    startAngle: 0,
    ...options
  }
  const q = rx + ry,
    h = ((rx - ry) / (rx + ry)) ** 2,
    m = 22 / (7 * Math.PI) - 1,
    n = Math.pow((rx - ry) / rx, 33.697),
    // 椭圆周长
    l = Math.PI * q * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))) * (1 + m * n),
    points = [],
    onelength = l / count,
    radian = Math.PI / 180,
    { precision, counterclockwise, startAngle } = options,
    startRadians = !counterclockwise
      ? -radian * startAngle
      : radian * startAngle

  let angle = 0,
    x0 = rx,
    y0 = 0
  for (let i = 0; i < count; i++) {
    let dist = 0,
      x = 0,
      y = 0
    while (dist < onelength) {
      angle += precision
      x = rx * Math.sin(radian * angle + startRadians)
      y = ry * Math.cos(radian * angle + startRadians)
      dist += distance(x0, y0, x, y)
      x0 = x
      y0 = y
    }
    const p = { x: x + cx, y: y + cy }
    if (!counterclockwise) {
      points.unshift(p) // 顺时针
    } else {
      points.push(p) // 逆时针
    }
  }
  if (!counterclockwise) {
    points.unshift(points.pop())
  }
  return points
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

//千位分隔符-仅限于整数
export function insertSeparator(num) {
  const number = Number(num)
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return (number + '').replace(reg, '$&,')
}
