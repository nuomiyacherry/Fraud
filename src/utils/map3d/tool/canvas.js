export function createCanvas(width, height, background) {
  const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  context.fillStyle = background || 'rgba(255, 255, 255, 0)'
  context.fillRect(0, 0, width, height)
  return {
    context,
    canvas
  }
}

export function drawText(ctx, options = {}) {
  const {
    text = '',
    fontSize = 12,
    // sans-serif Arial 微软雅黑 宋体
    fontFamily = 'sans-serif',
    fontStyle = 'normal',
    fontWeight = 'normal',
    color = '#ffffff',
    x = 0,
    y = 0,
    textAlign = 'center',
    textBaseline = 'middle',
    type = 'fill',
    // function,鼠标事件回调
    detect = null,
    maxWidth
  } = options
  ctx.save()
  ctx.font = `${fontSize}px ${fontFamily} ${fontWeight} ${fontStyle}`
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  if (detect) {
    detect && detect(options)
  } else {
    ctx[type + 'Style'] = color
    ctx[type + 'Text'](text, x, y, maxWidth || ctx.canvas.width)
  }
  ctx.restore()
}

// 获取文字的宽度
export function getTextWidth(ctx, text, textStyle = {}) {
  if (typeof ctx === 'string') {
    const canvas = document.createElement('canvas')
    textStyle = text
    text = ctx
    ctx = canvas.getContext('2d')
  }
  const {
    fontFamily = '宋体',
    fontSize = 12,
    fontStyle = 'normal',
    fontWeight = 'normal'
  } = textStyle
  ctx.font = `${fontSize}px ${fontWeight} ${fontStyle} ${fontFamily}`
  return ctx.measureText(text).width
}

/**
 * 根据给定的一组颜色，生成一组指定数量的渐变色
 * @param {Array<String>} colors 给定颜色的数组
 * @param {Number} count 要生成多少种颜色
 * @param {Object} ctx CanvasRenderingContext2D
 * @return {Array} 一组渐变色
 */
export function genColors(colors, count, ctx) {
  if (colors.length > count) return colors
  const isNew = !ctx
  if (isNew) {
    const canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = 1
    canvas.height = count
    document.body.appendChild(canvas)
  }
  const gradient = ctx.createLinearGradient(0, 0, 0, count),
    len = colors.length - 1
  colors.forEach((color, i) => {
    gradient.addColorStop(i / len, color)
  })

  const x = 0,
    y = 0
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1, count)

  colors = Array.from({ length: count }, (n, i) => getPixelColor(ctx, x, y + i))

  isNew ? document.body.removeChild(ctx.canvas) : ctx.clearRect(x, y, 1, count)

  return colors
}

/**
 * 在canvas指定位置上获取画布的颜色
 */
export function getPixelColor(ctx, x, y) {
  const imageData = ctx.getImageData(x, y, 1, 1)
  let strHex = '#'
  for (let i = 0; i < 3; i++) {
    let hex = Number(imageData.data[i]).toString(16)
    if (hex.length === 1) {
      hex = `0${hex}`
    }
    strHex += hex
  }
  return strHex
}
