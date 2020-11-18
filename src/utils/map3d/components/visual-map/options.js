const textStyle = {
  color: '#fff',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontSize: 12
}

export const continuousOptions = {
  type: 'continuous',
  min: 0,
  max: 200,
  triggerOn: 'map',
  range: null,
  calculable: true,
  realtime: true,
  precision: 0,
  itemWidth: 20,
  itemHeight: 140,
  text: null,
  textGap: 10,
  show: true,
  controller: {
    width: 12,
    height: 12
  },
  left: 10,
  top: 'auto',
  right: 'auto',
  bottom: 10,
  orient: 'vertical', // horizontal | vertical
  padding: 5,
  background: 'rgba(0, 0, 0, 0)',
  borderColor: '#ccc',
  borderWidth: 0,
  inactiveColor: '#aaaaaa',
  tipWidth: 6,
  tipHeight: 6,
  textControlGap: 3,
  color: ['#2B4DEB', '#8BE3F2'],
  textStyle
}

export const piecewiseOptions = {
  show: true,
  type: 'piecewise',
  triggerOn: 'scatter',
  splitNumber: 5,
  pieces: null,
  categories: null,
  min: 0,
  max: 200,
  unit: '', // 单位
  inverse: false,
  precision: null,
  itemWidth: 20,
  itemHeight: 14,
  itemRadius: 4,
  itemGap: 10,
  itemSymbol: 'roundRect',
  align: 'auto',
  text: null,
  textGap: 10,
  left: 10,
  top: 'auto',
  right: 'auto',
  bottom: 10,
  orient: 'vertical', // horizontal
  padding: 5,
  background: 'rgba(0, 0, 0, 0)',
  borderColor: '#ccc',
  borderWidth: 0,
  color: ['#2B4DEB', '#8BE3F2'],
  inactiveColor: '#aaaaaa',
  textStyle
}
