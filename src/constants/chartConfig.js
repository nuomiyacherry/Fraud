// 正规的坐标轴的配置
export const AxisOpt = (chartColors, rotate, flag, legendShow, axisType = 'value', markPoint = false, hasTimeAxis = false) => {
  // markPoint = markPoint || false
  // axisType = axisType || 'value'
  let xAxisType = ''
  let yAxisType = ''
  let gridTop = ''
  let gridBottom = 0
  if (flag) {
    xAxisType = axisType
    yAxisType = 'category'
  } else {
    xAxisType = 'category'
    yAxisType = axisType
  }
  markPoint ? gridTop = 45 : (legendShow ? gridTop = 30 : gridTop = 10)
  hasTimeAxis ? gridBottom = 30 : gridBottom = 5
  return {
    grid: {
      top: gridTop,
      left: 10,
      right: 20,
      bottom: gridBottom,
      containLabel: true
    },
    yAxis: {
      type: yAxisType,
      splitLine: {
        show: false,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: chartColors.axisSplitLine
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chartColors.axisLabel
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        },
        symbol: ['none', 'arrow']
      }
    },
    xAxis: {
      type: xAxisType,
      splitLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        },
        symbol: ['none', 'arrow']
      },
      axisLabel: {
        show: true,
        color: chartColors.axisLabel,
        rotate: rotate
      }
    }
  }
}
// 网格坐标轴的配置
export const gridAxisOpt = (chartColors, rotate, flag, legendShow, axisType = 'value', markPoint = false, hasTimeAxis = false) => {
  let xAxisType = ''
  let yAxisType = ''
  let gridTop = ''
  let gridBottom = 0
  if (flag) {
    xAxisType = axisType
    yAxisType = 'category'
  } else {
    xAxisType = 'category'
    yAxisType = axisType
  }
  markPoint ? gridTop = 45 : (legendShow ? gridTop = 30 : gridTop = 10)
  hasTimeAxis ? gridBottom = 30 : gridBottom = 5
  return {
    grid: {
      top: gridTop,
      left: 10,
      right: 20,
      bottom: gridBottom,
      containLabel: true
    },
    yAxis: {
      type: yAxisType,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'dotted',
          color: chartColors.axisSplitLine
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chartColors.axisLabel
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        },
        symbol: ['none', 'arrow']
      }
    },
    xAxis: {
      type: xAxisType,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'dotted',
          color: chartColors.axisSplitLine
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        },
        symbol: ['none', 'arrow']
      },
      axisLabel: {
        show: true,
        color: chartColors.axisLabel,
        rotate: rotate
      }
    }
  }
}
// 一个x轴,且x轴为类目轴,2个y轴,y轴为value
export const xAxisyAxis2Opt = (chartColors, yAxisName, xAxisData, rotate, legendShow, markPoint) => {
  yAxisName = yAxisName || []
  markPoint = markPoint || false
  let gridTop = ''
  markPoint ? gridTop = 45 : legendShow ? gridTop = 30 : gridTop = 10
  return {
    grid: {
      top: gridTop,
      left: 10,
      right: 10,
      bottom: 10,
      containLabel: true
    },
    yAxis: [{
      type: 'value',
      name: yAxisName[0],
      min: 0,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: chartColors.axisSplitLine
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chartColors.axisLabel
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        }
      }
    },
    {
      type: 'value',
      name: yAxisName[1],
      min: 0,
      axisLabel: {
        color: chartColors.axisLabel
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: chartColors.axisLine
        }
      },
      splitLine: {
        show: false
      }
    }
    ],
    xAxis: {
      type: 'category',
      splitLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: chartColors.axisLine
        }
      },
      axisLabel: {
        show: true,
        color: chartColors.axisLabel,
        rotate: rotate
      },
      data: xAxisData
    }
  }
}

// tooltip的配置鼠标悬浮上去显示seriesName和该类别的name和value
export const tooltipOpt = (trigger, opt) => {
  trigger = trigger || 'axis'
  return {
    trigger: trigger,
    axisPointer: {
      type: 'shadow'
    },
    ...opt
  }
}

// legendOpt的配置
export const legendOpt = (left, top, right, bottom, type, orient, opt) => {
  left = left || 'auto'
  top = top || 'auto'
  right = right || 'auto'
  bottom = bottom || 'auto'
  type = type || 'plain'
  orient = orient || 'horizontal'
  return {
    type: type,
    orient: orient,
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    ...opt
  }
}

export const markLineAverageOpt = (chartColors, markLineAverage, averageLabel) => {
  if (!markLineAverage) {
    return {}
  } else {
    return {
      markLine: {
        precision: 0,
        lineStyle: {
          normal: {
            color: chartColors.whiteColor
          }
        },
        label: {
          normal: {
            position: 'middle',
            formatter: averageLabel + '：{c}'
          }
        },
        data: [{
          type: 'average',
          name: '平均值'
        }]
      },
      markPoint: {
        data: [{
          type: 'max',
          name: '最大值'
        },
        {
          type: 'min',
          name: '最小值'
        }
        ]
      }
    }
  }
}

//折线图，柱状图数值转换 带单位
export const valueConvertWithUnit = (value) => {
  if (value < 100000000) { //亿
    return value / 10000 + '万'
  } else {
    return value / 100000000 + '亿'
  }
}

//折线图，柱状图数值转换 不带单位
export const xAxisValueOpt = (option, maxValue, minValue) => {
  if (maxValue > 100000000 || minValue < -100000000) {
    option.name = '亿'
    option.axisLabel.formatter = (value) => {
      return value / 100000000
    }
  } else if (maxValue > 10000 || minValue < -10000) {
    option.name = '万'
    option.axisLabel.formatter = (value) => {
      return value / 10000
    }
  }
}

// visualMapOpt的配置
export const visualMapOpt = (left, top, right, bottom, orient, align, opt) => {
  left = (left === 0 || left) ? left : 'auto'
  top = (top === 0 || top) ? top : 'auto'
  right = (right === 0 || right) ? right : 'auto'
  bottom = bottom === 0 || bottom ? bottom : 'auto'
  align = align || 'auto'
  orient = orient || 'vertical'
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    orient: orient,
    align: align,
    ...opt
  }
}

// 获取TrangleBarColors颜色
export function initTrangleBarColors() {
  const colors = []
  for(let i = 0; i < 10; i++) {
    if(i === 0) {
      colors.push({
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: '#fa4060' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#ff6c98' // 100% 处的颜色
        }]
      })
    } else {
      colors.push({
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: '#1f7cd9' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#35edfe' // 100% 处的颜色
        }]
      })
    }
  }
  return colors
}

// 获取颜色 
export function initPictorialBarColors() {
  const colors = []
  for(let i = 0; i < 10; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0,
        color: '#0077ff' // 0% 处的颜色
      }, {
        offset: 1,
        color: '#01f5f7' // 100% 处的颜色
      }]
    })
  }
  return colors
}