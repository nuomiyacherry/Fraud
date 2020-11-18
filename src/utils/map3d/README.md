## Map

### Example

```js
this.loading = true
this.map3d = new Map3D(el, mapJson, {})
this.map3d.on('ready', _ => {
  this.loading = false
})
```

### Options

- `animation: false` 地图入场东动画
- `animationEasing: 'circularInOut'`
- `animationDuration: 3000`
- `depth: -15` 地图的厚度
- `layers: 15` 地图边界线的数量
- `background: '#000000'` canvas 背景颜色
- `opacity: 0`
- `rotate: Math.PI / 4` 地图旋转的角度
- `offset: [0, 0]` 地图的偏移值
- `roam: true` 控制地图的缩放与旋转
- `autoReisze: true` 窗口大小变化时，改变地图尺寸
- `light:` 地图的光照
  - `color: '#ffffff'` 光照颜色
  - `intensity: 0.5` 光照强度
- `selected: []` 默认选中的区域，**暂未实现**
- `visibleSouthSea: false` 是否显示南海诸岛，不是中国地图就不要用，中国地图需要展示南海诸岛的时候至为true
- `map: {[areaName]: {}}`
  - `center: [coordx, coordy]` 文字显示位置，经纬度
  - `selected: false` **暂未实现**
  - `areaStyle: {}` 参看下面的 areaStyle
  - `simpleTip: {}` 参看下面的 simpleTip
  - `borderStyle: {}` 参看下面的 borderStyle
  - `textStyle: {}` 参看下面的 textStyle
  - `tip: {}` 直接显示在地图上的简单提示
  - `data: {}`  tooltip默认会显示data中的name与value的内容，如果没有value，则只显示name
    - `name: ''`
    - `value: ''`

**regions 配置 example**

```js
  {
    map: {
      香港: {
        // center: [], // 文字的位置，经纬度
        textStyle: {
          normal: {
            show: false
          }
        }
      },
      澳门: {
        textStyle: {
          normal: {
            show: false
          }
        }
      }
    }
  }
```

- `tooltip: {}` 参看Tooltip Options
- `stopDefaultMousemove: false` 默认开启鼠标 mousemove 事件，高亮选中的区域
- `stopDefaultClick: false` 默认开启鼠标点击事件
- `font: ''`
  - 默认空字符串，使用canvas绘制区域名称的文字
  - 需要使用threejs来绘制区域的名称，需要传入threejs字体的JSON文件路径
  - font字体通常都是通过ttf字体文件在 [http://gero3.github.io/facetype.js/](http://gero3.github.io/facetype.js/)生成json文件，由于生成的文件通常较大，所以在针对不同的地图时，要显示地图上的区域名称，最好是font.json的字体文件只包含该地图的区域名称
- `areaStyle: {}` 默认区域样式配置
  - `normal: {}`
    - `show: true`
    - `color: '#006de0'`
    - `opacity: 1`
    - `blending: false`
      - 是否开启背景融合
      - 开启，则地图中间的边框会比较明显，地图上的文字与光柱显示较清晰；
      - 不开启，则地图的边框不会很明显的显示，地图上的文字、光柱在区域的`opacity=1`时有些区域因为角度的原因不会显示出来，如果区域的`opacity`在[0-1]中间，则文字与区域可以显示出来，opacity值越大，越不明显
    - `texture: ''`, **暂未实现**
    - `depth` **暂未实现**
  - `emphasis: {}` 选中
    - `show: true`
    - `color: '#ffff00'`
    - `opacity: 1`
    - `texture: ''`
    - `depth`
- `borderStyle: {}` 默认边界线样式配置
  - `normal: {}`
    - `show: true`
    - `color: '#999999'`
    - `opacity: 1`
  - `emphasis: {}`
    - `show: true`
    - `color: '#66ffff'`
    - `opacity: 1`
- `textStyle: {}` 默认字体样式配置
  - `normal: {}`
    - `show: true`,
    - `fontSize: 12`
    - `color: '#cccccc'`
    - `opacity: 1`
    - `texture: ''` **暂未实现**
    - `rotation: {x: 0, y: Math.PI / 4, z: Math.PI / 2}`
    - `height: 2`
    - `bevelThickness: 1` 查看 threejs TextBufferGeometry 配置
    - `bevelSize: 1` 查看 threejs TextBufferGeometry 配置
    - `bevelSegments: 1` 查看 threejs TextBufferGeometry 配置
    - `curveSegments: 10` 查看 threejs TextBufferGeometry 配置
    - `steps: 1` 查看 threejs TextBufferGeometry 配置
  - `emphasis: {}`
    - `show: true`
    - `fontSize: 12`
    - `color: '#66ffff'`
    - `opacity: 1`
    - `texture: ''` **暂未实现**
    - `rotation: {x: 0, y: Math.PI / 4, z: Math.PI / 2}`
    - `height: 2`
    - `bevelThickness: 1`
    - `bevelSize: 1`
    - `bevelSegments: 1`
    - `curveSegments: 10`
    - `steps: 1`
- `simpleTip: {}` 地图上添加简单的提示
  - `show: false`
  - `offset: [0, 0]`
  - `padding: [5, 5]`
  - `center: null`
  - `borderWidth: 2`
  - `border: '#FAEA2A'`
  - `lineGap: 5`
  - `rotation: {}`
    - `x: 0`
    - `y: Math.PI / 4`
    - `z: Math.PI / `
  - `background: '#6A74AA'`
  - `opacity: 1`
  - `formatter: '{name} \n {value}'`
  - `textStyle: {}`
    - `color: '#FAEA2A'`
    - `fontFamily: 'DS-Digital'`
    - `fontWeight: 'normal'`
    - `fontStyle: 'normal'`
    - `fontSize: 14`
    - `lineHeight: 24`
    - `whiteSpace: 'nowrap'`
    - `textAlign: 'center'`
    - `textBaseline: 'top'`
- `scatters: null` 参看 Scatter Options
- `flylines: null` 参看 Flylines Options
- `visualMap: nul` 参看 VitualMap Options
- `nameMap: {}` 修改地图显示在区域上的文字
  - `{北京市: '北京', '内蒙古自治区': '内蒙古'}`
- `extraBorder: null` 自定义border 可传Array或Object  **慎用，地图边框添加过多会导致，渲染卡顿**
  - `name: '' | []` 可传Array或String, 不传则给整个地图添加一条border，否则则给相对应名称（与 nameMap 的值一致）的区域上添加
  - `color: ''`
  - `opacity: 1`
  - `z: 0` 上下的偏移值
- `carousel: {}` 地图轮播效果
  - `animation: false` 是否启用轮播
  - `time: 3000`
  - `sequence: null` 轮播的次序，区域名称组成的数组，名称应与nameMap 的值一致
  - `handler: null` 回调函数，参数是当前的区域，可以通过修改回调函数参数的data中的数据改变tooltip中显示的数据

### Scatter Options

- `tooltip: {}` 针对scatter tooltip 的个性化配置，参看Tooltip Options
- `show: true`
- `color: '#6DE8F3'`
- `size: 6`
- `symbol: 'circle'`
  - triangle(3) | diamond(6) === hexagon | 传 2-7 的数字
  - 图片 'image://图片地址'
- `effectType: 'ripple'` 可选值 ripple | none
- `effect: {}`
  - `period: 4` 2 - 7
  - `brushType: 'stroke'` 可选值 fill | stroke
  - `scale: 2.5` 动画中波纹的最大缩放比例
- `offset: [0, 0, 0]` z轴向上偏移不是经纬度
- `lightray: {}`
  - `show: false`
  - `texture: 'images/lightray.jpg'`
  - `color: '#6DE8F3'`
  - `opacity: 1`
  - `width: 12`
  - `height: 60`
  - `widthSegments: 1`
  - `heightSegments: 1`
- `animationEasing: 'linear'`
- `animationDuration: 1500`
- `data: [{}]`
  - `name: '北京'` 与 nameMap 的值一致
  - `show: true`
  - `color: '#6DE8F3'`
  - `center: [coordx, coordy]` scatter 显示经纬度
  - `size: 6`
  - `symbol: 'circle'` triangle(3) | diamond(6) === hexagon | 传 2-7 的数字
  - `effectType: 'ripple'` 可选值 ripple | none
  - `effect: {}`
    - `period: 4` 2 - 7
    - `brushType: 'stroke'` 可选值 fill | stroke
    - `scale: 2.5` 动画中波纹的最大缩放比例
  - `offset: [0, 0, 0]`
  - `lightray: {}`
    - `show: false`
    - `texture: 'images/lightray.jpg'`
    - `color: '#6DE8F3'`
    - `opacity: 1`
    - `width: 12`
    - `height: 60`
    - `widthSegments: 1`
    - `heightSegments: 1`
  - `animationEasing: 'linear'`
  - `animationDuration: 1500`
  - `data: {}` 数据
    - `name: 'IP'` scatter的显示名称
    - `value: ''`

### Flyline Options

- `lineStyle: {}`
  - `show: true`
  - `color: '#005fc4'`
  - `opacity: 1`
  - `maxHeight: 100`
  - `type: 'solid'` 可选值 solid | dashed
  - `dashSize: 5` type为dashed时有用 设置短线段的长度
  - `gapSize: 2` type为dashed时有用 设置短线段之间的距离
- `symbolStyle: {}`
  - `color: '#005fc4'`
  - `opacity: 1`
  - `size: 6`
  - `speed: 0.01` 线上标记的运动速度
  - `shadow: true` 是否有阴影`symbol:`dotted`时才有效果
  - `symbol: 'image://https://echarts.baidu.com/images/favicon.png'` dotted | ball
- `data: []`
  - `source: {}`
    - `name: '北京'` 与 nameMap 的值一致
    - `center: [coordx, coordy]` flyline 的起始显示经纬度
  - `target: {}` 同 source
  - `lineStyle: {}`
    - `show: true`
    - `color: '#005fc4'`
    - `opacity: 1`
    - `maxHeight: 100`
  - `symbolStyle: {}`
    - `color: '#005fc4'`
    - `opacity: 1`
    - `size: 6`
    - `speed: 0.01` 线上标记的运动速度
    - `shadow: true` 是否有阴影`symbol:`dotted`时才有效果
    - `symbol: 'image://https://echarts.baidu.com/images/favicon.png'` dotted | ball

### Tooltip Options

- `show: false`
- `enterable: false` 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true
- `trigger: 'mousemove'` mousemove | click
- `alwaysShowContent: false` 是否一直显示提示框内容
- `triggerOn: 'scatter'` 可选值 scatter | area , 默认为 scatter 上有 tooltip 效果
- `formatter: '{name}: <br/>  {value}'`
  - 默认显示data中的name与value,如果没有value只显示name，可以传函数
  - `value: {key}` 大括号里面的key为data对象中的可以，这样写的formatter会将data中的key对应的数据显示出来
```js
data = {
  name: '名称',
  value: 1234,
  ip: '12.12.12.12',
  domain: 'www.baidu.com'
}

formatter = `
  name: {name} <br />
  value: {value} <br/>
  ip: {ip} <br/>
  域名: {domain}
`
/*
tooltip的显示内容
name: 名称
value: 12.12.12.12
ip: 12.12.12.12
域名: www.baidu.com
*/
```
- `showDelay: 0`
- `hideDelay: 0`
- `position: []`
- `placement: 'right'` 可选值：left | right | top | bottom
- `pointCenter: false` 是否定位到tip的 高(top|bottom)| 宽(left | right) 的中间显示
- `offset: [20, 20]`
- `width: 'auto'` Number
- `height: 'auto'` Number
- `background: 'rgba(50,50,50,0.7)'`
- `transitionDuration: 100` 提示框浮层的移动动画过渡时间，单位是 ms，设置为 0 的时候会紧跟着鼠标移动
- `border: '#333'`
- `borderWidth: 0`
- `borderType: 'solid'`
- `padding: 5`
- `textStyle: {}`
  - `color: '#fff'`
  - `fontStyle: 'normal'`
  - `fontWeight: 'normal'`
  - `fontFamily: '宋体'`
  - `fontSize: 14`
  - `lineHeight: 24`
  - `whiteSpace: 'normal'`
- `extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'` 额外附加到浮层的 css 样式

### VisualMap Options

- 使用VisualMap后，地图区域(normal)或scatter设置的颜色会失效

#### Continuous
- `show: true`
- `type: 'continuous'`
- `triggerOn: 'map'` 可选值 map | scatter
- `left: 10` left | center | right | 百分比(%)
- `top: 'auto'` top | middle | bottom | 百分比(%)
- `right: 'auto'`
- `bottom: 10`
- `orient: 'vertical'` horizontal | vertical
- `padding: 5`
- `min: 0`
- `max: 200`
- `range: null` 值为数组，为初始化两个手柄的位置，值应在min max 范围内
- `calculable: true` 是否显示拖拽用的手柄
- `realtime: true` 拖拽时，是否实时更新
  - 如果为ture则拖拽手柄过程中实时更新图表视图
  - 如果为false则拖拽结束时，才更新视图
- `precision: 0` 数据展示的小数精度, 默认为0，无小数点。
- `itemWidth: 20` 即长条的宽度
- `itemHeight: 140` 即长条的高度
- `text: null` 两端的文字
- `textGap: 10`
- `inRange: {}`
- `controller: {}` 手柄的宽高
  - `width: 12`
  - `height: 12`
- `textControlGap: 3`
- `inactiveColor: '#aaaaaa'` 拖动手柄后，值不在最大最小值范围内的颜色
- `tipWidth: 6`
- `tipHeight: 6` 鼠标悬浮在颜色柱上时显示的三角形的宽高，这里的三角形是由两个宽高相等的三角形组成的
- `color: ['#2B4DEB', '#8BE3F2']`
- `textStyle: {}` 文字样式
  - `color: '#fff'`
  - `fontStyle: 'normal'`
  - `fontWeight: 'normal'`
  - `fontFamily: 'sans-serif'`
  - `fontSize: 12`

#### Peicewise

- `show: true`
- `type: 'piecewise'`
- `triggerOn: 'scatter'` 可选值 map | scatter
- `left: 10` left | center | right | 百分比(%)
- `top: 'auto'` top | middle | bottom | 百分比(%)
- `right: 'auto'`
- `bottom: 10`
- `orient: 'vertical'` horizonta | vertical
- `padding: 5`
- `splitNumber: 5` 如果设置了pieces或categories，则用pieces或categories的值
- `pieces: null`
- `categories: null`
- `min: 0`
- `max: 200`
- `unit: ''`  单位
- `inverse: false` 是否反转
- `precision: 0` 数据展示的小数精度, 默认为0，无小数点。
- `itemWidth: 20`
- `itemHeight: 14`
- `itemRadius: 4`
- `itemGap: 10`
- `itemSymbol: 'roundRect'`
- `textGap: 10`
- `text: null` 两端的文字
- `color: ['#2B4DEB', '#8BE3F2']`
- `inactiveColor: '#aaaaaa'`
- `textStyle: {}` 文字样式
  - `color: '#fff'`
  - `fontStyle: 'normal'`
  - `fontWeight: 'normal'`
  - `fontFamily: 'sans-serif'`
  - `fontSize: 12`

### Methods

- `ready` 地图已经绘制出来后的回调，地图上的文字没有绘制完成，加载 text 有异步函数
- `setOptions(mapJson, options)`

  - 不传 mapJson 则 mapJson 位置的参数的就是 options
  - 传了 mapJson 则地图重新渲染
  - options 参数同上，地图上的所有物体都会根据 options 重绘

- `setScatters(options, repaint)`

  - repaint 为 true 则 options 的配置同初始 Scatter Options 的配置一样
  - repaint 为 false 则 options 的只需传入 Scatter Options 中的 data 的配置

- `setFlylines(options, repaint)`

  - repaint 为 true 则 options 的配置同初始 Flyline Options 的配置一样
  - repaint 为 false 则 options 的只需传入 Flyline Options 中的 data 的配置

- `on('mouseenter', fn)` 事件监听
  根据 fn 的 event.intersects 判断当前鼠标事件的对象

- `off('mouseenter', fn)` 注销事件

- `registerMouseEvent('eventType', fn(e))` 注册事件
  - e中的intersects为点击获取的所有对象

- `destroy` 销毁 Map

### 问题

- 鼠标悬浮没有显示区域名称与地图的角度有关系，旋转角度就可以显示出来
- 光柱与canvas绘制的文字材质颜色与背景色混合造成的影响
- 地图角度旋转后，散点上的光柱可能会看不见
- 地图区域透明度为1（即`opacity: 1`）时，有些地区的光柱与文字也是看不见的，
- 这些情况都是它们的材质颜色与背景色混合造成的影响
