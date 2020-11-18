export function drawRect(ctx, options) {
  const {
    color,
    x = 0,
    y = 0,
    width,
    height,
    lineWidth,
    type = 'fill',
    detect
  } = options
  ctx.save()
  ctx.beginPath()
  ctx.translate(x, y)
  ctx.rect(0, 0, width, height)
  ctx.closePath()
  ctx.lineWidth = lineWidth
  if (detect) {
    detect && detect(options)
  } else {
    ctx[type + 'Style'] = color
    ctx[type]()
  }
  ctx.restore()
}

export function drawTrangle(ctx, options) {
  const {
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    color = '#ffffff',
    lineWidth = 0,
    type = 'fill',
    detect
  } = options
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x3, y3)
  ctx.lineWidth = lineWidth
  if (detect) {
    detect && detect(options)
  } else {
    ctx[type + 'Style'] = color
    ctx[type]()
  }
  ctx.closePath()
  ctx.restore()
}

/**
 * 绘制一个有填充色的圆角矩形
 * @param {Canvas2DContext} ctx
 * @param {Number} x 左上角x轴坐标
 * @param {Number} y 左上角y轴坐标
 * @param {Number} width 矩形的宽度
 * @param {Number} height 矩形的高度
 * @param {Number} radius 圆的半径
 * @param {String} type stroke | fill
 * @param {String} color 颜色
 */
export function drawRoundRect(ctx, width, height, radius) {
  ctx.beginPath()
  ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
  ctx.lineTo(radius, height)
  ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
  ctx.lineTo(0, radius)
  ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2)
  ctx.lineTo(width - radius, 0)
  ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2)
  ctx.lineTo(width, height - radius)
  ctx.closePath()
}
