import lightray from '../../assets/images/lightray.jpg'

export const _animationEasing = 'linear'
export const _animationDuration = 1500
export const scatterScale = 1.5
export const SCATTER = 'scatter'
export const symbolMap = {
  triangle: 3,
  diamond: 6,
  hexagon: 6,
  circle: 100
}
export const color = '#6DE8F3'
export const scatterOpt = {
  show: false,
  size: 8,
  color,
  // triangle(3) | diamond(6) === hexagon | 传2-7的数字
  symbol: 'circle',
  effectType: 'ripple', // ripple | none
  effect: {
    period: 4, // max 7
    brushType: 'stroke', // fill | stroke
    scale: 2
  },
  offset: [0, 0, 0],
  lightray: {
    show: false,
    texture: `image://${lightray}`,
    color: '#00ff00',
    // color: '#ff0000',
    opacity: 1,
    width: 8,
    height: 80,
    widthSegments: 1,
    heightSegments: 1
  },
  animationEasing: _animationEasing,
  animationDuration: _animationDuration,
  tooltip: null
}
