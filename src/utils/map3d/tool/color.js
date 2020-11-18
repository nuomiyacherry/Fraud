/* 前端的颜色表示方式多种，一种是以3个或6个十六进制的数子表示，一种是RGB的数字形式，还有一种是直接以颜色的英文来表示。这三种都是不支持透明色的。所以还有RGBA的表式方式，在RGB的的基础上加入了Alpha透明，使网页可以展现更加复杂绚丽的效果。

随机颜色
在平时的码农日常中，经常会用到求随机颜色的地方，下面是我总结的几种简单的实现随机颜色的方式：

十六进制格式（#000000-#FFFFFF）
第一种是比较简单的方法，这种方法是先随机生成ffffff以内16进制数，然后判断位数，少于6位的用while循环在前面加0，凑够6位。 */
// 随机生成十六进制颜色
export function randomHex1() {
  // 生成ffffff以内16进制数
  let hex = Math.floor(Math.random() * 16777216).toString(16)
  while (hex.length < 6) {
    // while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex
  }
  // 返回‘#’开头16进制颜色
  return '#' + hex
}

/*
还有一种比较方便但是比较难懂的方法，需要用到位运算。
按执行顺序可以分为以下六步：
先执行Math.random() * 0x1000000，其中0x1000000=0xffffff+1，因为Math.random()取不到1，所以+1，这样就会生成一个1-16777216(不包含)以内的浮点数。
然后执行<<0，这是取整运算，去掉后面的小数点。这时为一个16777216(不包含)以内的十进制数。
之后执行.toString(16)，把十进制数转化为六位以下16进制数。
再后执行'00000'+，这时因为之前生成的16进制数最少可能仅一位，在前面加上5个0。
最后执行.substr(-6)，是去从-6开始的后面所有字符串，也就是最后6位数。
*/
export function randomHex() {
  // 随机生成十六进制颜色
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  )
}

// RGB格式
export function randomRgb() {
  // 随机生成RGB颜色
  const r = Math.floor(Math.random() * 256) // 随机生成256以内r值
  const g = Math.floor(Math.random() * 256) // 随机生成256以内g值
  const b = Math.floor(Math.random() * 256) // 随机生成256以内b值
  return `rgb(${r},${g},${b})` // 返回rgb(r,g,b)格式颜色
}

// RGBA格式
export function randomRgba() {
  // 随机生成RGBA颜色
  const r = Math.floor(Math.random() * 256) // 随机生成256以内r值
  const g = Math.floor(Math.random() * 256) // 随机生成256以内g值
  const b = Math.floor(Math.random() * 256) // 随机生成256以内b值
  const alpha = Math.random() // 随机生成1以内a值
  return `rgb(${r},${g},${b},${alpha})` // 返回rgba(r,g,b,a)格式颜色
}

/* 颜色格式转化
在编码过程中，经常会遇到要将颜色格式相互转化的问题,其中十六进制格式和RGB格式是可以相互转化的，但是RGBA格式由于多了前两者没有的Alpha透明属性，所以和前两者转化会丢失Alpha值，不建议进行转化，下面是颜色转化的方法：
*/
// 十六进制转为RGBA
export function hex2Rgba(hex, alpha = 1) {
  // 十六进制转为RGB
  const rgb = [] // 定义rgb数组
  // eslint-disable-next-line no-useless-escape
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    // 判断传入是否为#三位十六进制数
    let sixHex = '#'
    hex.replace(/[0-9A-F]/gi, function(kw) {
      // 把三位16进制数转化为六位
      sixHex += kw + kw
    })
    hex = sixHex // 保存回hex
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    // 判断传入是否为#六位十六进制数
    hex.replace(/[0-9A-F]{2}/gi, function(kw) {
      // 十六进制转化为十进制并存如数组
      rgb.push(eval('0x' + kw)) // eslint-disable-line
    })
    // 输出RGB格式颜色
    return `rgba(${rgb.join(',')}, ${alpha})`
  } else {
    console.log(`Input ${hex} is wrong!`)
    return `rgba(0, 0, 0, ${alpha})`
  }
}

export function rgbToRgba(rgb, alpha) {
  const nums = rgb.split(',').map(item => {
    const index = item.indexOf('(')
    if (index > -1) {
      item = item.substr(index + 1)
    }
    return parseInt(item)
  })

  return `rgba(${nums.join(', ')}, ${alpha})`
}

// RGB转为十六进制
export function rgb2Hex(rgb) {
  // eslint-disable-next-line no-useless-escape
  if (/^rgb\((\d{1,3}\,){2}\d{1,3}\)$/i.test(rgb)) {
    // test RGB
    let hex = '#' // 定义十六进制颜色变量
    rgb.replace(/\d{1,3}/g, function(kw) {
      // 提取rgb数字
      kw = parseInt(kw).toString(16) // 转为十六进制
      kw = kw.length < 2 ? 0 + kw : kw // 判断位数，保证两位
      hex += kw // 拼接
    })
    return hex // 返回十六进制
  } else {
    console.log(`Input ${rgb} is wrong!`)
    // 输入格式错误,返回#000
    return '#000'
  }
}

export function rgbToHsl(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    L = (max + min) / 2

  let H, S

  if (max === min) {
    H = 0
    S = 0
  } else {
    const d = max - min
    S = L > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        H = 60 * ((g - b) / d + (g < b ? 6 : 0))
        break
      case g:
        H = 60 * ((b - r) / d + 2)
        break
      case b:
        H = 60 * ((r - g) / d + 4)
        break
    }
  }
  return [H, S, L]
}
