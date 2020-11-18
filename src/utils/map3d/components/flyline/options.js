import point from '../../assets/images/point1.png'

export const COLOR = '#005fc4'
export const pointCount = 100
export const flylineOpt = {
  lineStyle: {
    color: COLOR,
    show: true,
    opacity: 1,
    type: 'solid', // dashed
    maxHeight: 100,
    dashSize: 5,
    gapSize: 2,
    animation: true,
    animationEasing: 'linear',
    animationDuration: 1500
  },
  symbolStyle: {
    size: 6,
    speed: 0.01,
    color: COLOR,
    opacity: 1,
    shadow: true,
    // symbol: 'ball' // dotted | line | ball
    symbol: `image://${point}`
  }
}
