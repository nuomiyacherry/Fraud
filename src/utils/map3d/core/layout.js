export function computedLayout() {}

/**
 * 根据组件配置参数计算组件的偏移位置
 * @param {DOM} el
 * @param {Object} options
 * @param {Object} viewSize 要设置的位置的图形的宽高
 */
export function getTranslate(el, options, viewSize) {
  const {left, right, top, bottom, padding, itemWidth, orient} = options,
    {width, height, rightWidth} = viewSize,
    containerWidth = el.offsetWidth,
    containerHeight = el.offsetHeight,
    translateX =
      right !== 'auto'
        ? getTranslateX(right, 'right')
        : getTranslateX(left, 'left'),
    translateY =
      top !== 'auto'
        ? getTranslateY(top, 'top')
        : getTranslateY(bottom, 'bottom')

  function getTranslateX(value, dir) {
    if (value === 'left') return padding
    if (value === 'center') return (containerWidth - width - padding) / 2
    if (value === 'right') {
      value = 0
      dir = 'right'
      options.right = 0
    }
    let x = parseFloat(value)
    if (typeof value === 'string' && value.indexOf('%') > -1) {
      x = (x / 100) * containerWidth
    }
    if (dir === 'left') {
      x += padding
      x = x >= containerWidth ? containerWidth - padding - width : x
    } else {
      if (orient === 'vertical') {
        x = containerWidth - x - padding - rightWidth
        x = x < width ? width : x
      } else {
        x = containerWidth - x - padding - width
        x = x <= padding ? padding : x
      }
    }
    return x
  }

  function getTranslateY(value, dir) {
    if (value === 'top') return padding
    if (value === 'middle') return (containerHeight - height - padding) / 2
    if (value === 'bottom') {
      value = 0
      dir = 'bottom'
      options.bottom = 0
      options.top = 'auto'
    }
    let y = parseFloat(value)
    if (typeof value === 'string' && value.indexOf('%') > -1) {
      y = (y / 100) * containerHeight
    }
    y = dir === 'top' ? y + padding : containerHeight - y - height - padding
    y = y >= containerHeight ? containerHeight - padding - height : y
    y = y <= padding ? padding : y
    return y
  }

  return {
    translateX,
    translateY
  }
}
