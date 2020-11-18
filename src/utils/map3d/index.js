import * as d3 from 'd3-geo'
import * as THREE from 'three'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'
import decode from './core/decode'
import Three from './core/three'
import {setStyles} from './libs/dom'
import {getType, loaderPromisify, normalizeFourValues} from './tool/util'
import {createCanvas, drawText, getTextWidth} from './tool/canvas'
import {hex2Rgba, rgbToRgba} from './tool/color'
import Loading from './components/loading'
import Tooltip from './components/tooltip/index'

const AREA = 'area',
  TEXT = 'text',
  BORDER = 'border',
  HOVERMODEL = 'hoverMode',
  CLICKMODEL = 'clickModel',
  comboDistance = 5,
  _animationEasing = 'quinticInOut',
  _animationDuration = 3000,
  // 以屏幕尺寸1920 * 1080 时中国地图缩放为35.98、层高为15时的样式为基准，确定这个基准后，根据不同地图的scale算出depth的值
  standardLayout = {
    zoom: 35.98,
    depth: 10
  },
  depth = -standardLayout.depth,
  defaultStyles = {
    areaStyle: {
      normal: {
        show: true,
        color: '#006de0',
        opacity: 1,
        texture: '',
        depth
      },
      emphasis: {
        show: true,
        color: '#ffff00',
        opacity: 1,
        texture: '',
        depth
      }
    },
    borderStyle: {
      normal: {
        show: true,
        color: '#aaffff',
        opacity: 1
      },
      emphasis: {
        show: true,
        color: '#55ffff',
        opacity: 1
      }
    },
    textStyle: {
      normal: {
        show: true,
        fontSize: 14,
        // fontFamily: 'sans-serif',
        fontFamily: '宋体',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#ffffff',
        opacity: 1,
        texture: '',
        height: 2,
        style: 'normal',
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1,
        curveSegments: 10,
        rotation: {
          x: 0,
          y: Math.PI / 4,
          z: Math.PI / 2
        },
        steps: 1
      },
      emphasis: {
        show: true,
        color: '#00ff00',
        fontSize: 14,
        fontFamily: '宋体',
        fontStyle: 'normal',
        fontWeight: 'normal',
        opacity: 1,
        texture: '',
        height: 2,
        style: 'normal',
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1,
        curveSegments: 10,
        steps: 1,
        rotation: {
          x: 0,
          y: Math.PI / 4,
          z: Math.PI / 2
        }
      }
    },
    simpleTip: {
      show: false,
      offset: [0, 0],
      padding: [5, 5],
      center: null,
      borderWidth: 2,
      border: '#FAEA2A',
      lineGap: 5,
      rotation: {
        x: 0,
        y: Math.PI / 4,
        z: Math.PI / 2
      },
      background: '#6A74AA',
      opacity: 1,
      formatter: '{name} \n {value}',
      textStyle: {
        color: '#FAEA2A',
        fontFamily: 'DS-Digital',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 24,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        textBaseline: 'top'
      }
    }
  },
  defaultOptions = {
    animation: false,
    animationEasing: _animationEasing,
    animationDuration: _animationDuration,
    depth,
    // layers: Math.abs(depth),
    layers: 2,
    // rendererOptions: {
    //   antialias: false
    // },
    stats: true,
    gui: false,
    controls: true, // orbit
    background: '#000000',
    opacity: 0,
    blending: false,
    padding: 20,
    cameraPosition: {x: 100, y: 0, z: 100},
    // 字体样式，font.json的绝对路径，修改文字字体需要传入对应字体的font.json路径
    // font: '/FZNewShuSong-Z10S__china.json',
    // zoom: 30,
    rotate: Math.PI / 4,
    offset: [0, 0],
    roam: true,
    autoResize: true,
    light: {
      color: 0xffffff,
      intensity: 1
    },
    pointLight: {
      color: 0xffffff,
      intensity: 2.5,
      distance: 120,
      position: [30, 0, 70]
    },
    actived: '', // 北京市
    map: {},
    extraBorder: null,
    tooltip: null,
    flylines: null,
    scatters: null,
    visualMap: null,
    nameMap: {},
    stopDefaultMousemove: false,
    stopDefaultClick: false,
    visibleSouthSea: false,
    carousel: {
      animation: false,
      time: 3000,
      sequence: null,
      handler: null
    }
  }

class Map3D extends Three {
  constructor(el, mapJson, options) {
    if (mapJson.type !== 'FeatureCollection') {
      throw new Error('geoJson数据格式不正确，请传入正确的geoJson地图数据')
    }
    if (options.depth) {
      defaultStyles.areaStyle.normal.depth = options.depth
      defaultStyles.areaStyle.emphasis.depth = options.depth
    }
    const opts = merge({}, defaultStyles, defaultOptions, options)
    super(el, opts)
    this.originalDepth = opts.depth
    if (this.loading) {
      this.loading.show()
    } else {
      this.loading = new Loading(this.el)
    }
    this.standardLayout = standardLayout
    this._options = cloneDeep(opts)
    this.mapJson = decode(cloneDeep(mapJson))
    this.defaultStyles = pick(opts, Object.keys(defaultStyles))
    this.init()
  }

  async init() {
    await this.necessaryInit()
    await this.processMapJson()
    this.promisifyLoader()
    this.setLight()
    this.paint(true)
  }

  async setOptions(mapJson, options) {
    if (mapJson.type !== 'FeatureCollection') {
      ;[mapJson, options] = [null, mapJson]
    } else {
      this.mapJson = decode(mapJson)
      await this.processMapJson()
    }

    Object.keys(defaultOptions).forEach(key => {
      this.options = defaultOptions[key]
    })
    this.scatters = null
    this.flylines = null
    this.options = merge(this.options, defaultStyles, cloneDeep(options))

    this._options = cloneDeep(this.options)
    this.clear()
    this.paint()
  }

  resetDepth(options) {
    for (let key in options) {
      if (key === 'depth') {
        // options.depth = (options.depth / standardLayout.zoom) * (standardLayout.zoom / this.mapZoom)
        options.depth = (standardLayout.depth / standardLayout.zoom) * (options.depth / standardLayout.depth) * 2
      } else if (getType(options[key]) === 'object') {
        this.resetDepth(options[key])
      }
    }
  }

  async paint(init) {
    const {map, tooltip} = this.options
    this.mapStyleMerge(map, this.defaultStyles)

    this.resetDepth(this.options)
    this.tooltip = new Tooltip(this, tooltip || {})

    await this.initVisualMap()
    await this.initFlyline()

    this.drawMap()
    this.initScatter()

    this.registerMouseEvent('mousemove', this.mousemove.bind(this), this.areaMeshes)
    this.registerMouseEvent('mouseout', this.mouseout.bind(this), this.areaMeshes)

    this.registerMouseEvent('click', this.click.bind(this), this.areaMeshes)

    init && this._render()
    this.emit('ready', this)
    this.loading && this.loading.hide()
  }

  async initVisualMap() {
    if (!this.options.visualMap) return
    !this.canvas && this.addCanvas()
    const {VisualMap} = await import(/* webpackChunkName: 'visual-map' */ './components/visual-map/index')

    this.processVisualMapOptions()
    this.visualMap = await VisualMap(this.container, {
      ...this.options.visualMap,
      context: this.ctx,
      canvas: this.canvas
    })
    const {triggerOn, type} = this.visualMap.options
    if (triggerOn === 'scatter') {
      this.options.scatters.data.forEach(item => {
        const {value} = item.data
        item.color = this.visualMap.getColor(value)
      })
    } else if (triggerOn === 'map') {
      const mapOptions = this.options.map

      this.mapValues = {}
      Object.keys(mapOptions).forEach(key => {
        const value = (mapOptions[key].data || {}).value || 0,
          color = this.visualMap.getColor(value)
        mapOptions[key].areaStyle.normal.color = color
        mapOptions[key].areaStyle.inactive = {
          color: this.visualMap.options.inactiveColor
        }
        this.mapValues[key] = value
      })
    }
    if (type === 'piecewise') {
      this.visualMap.on('click', this.piecewiseVisualMapClick.bind(this))
    } else if (type === 'continuous') {
      this.visualMap.on('mousedown', this.continuousVisualMapMousedown.bind(this))
      this.visualMap.on('mouseup', this.continuousVisualMapMouseup.bind(this))
      this.visualMap.on('change', this.continuousVisualChange.bind(this))
    }

    this.visualMap.on('mouseover', this.visualMapMouseover.bind(this))
    this.visualMap.on('mouseout', this.visualMapMouseout.bind(this))
  }

  addCanvas() {
    const {context, canvas} = createCanvas(this.rendererSize.width, this.rendererSize.height)
    this.ctx = context
    this.canvas = canvas
    this.container.appendChild(canvas)
    setStyles(this.canvas, {
      position: 'absolute',
      // zIndex: 0,
      left: 0,
      top: 0
    })
  }

  setCanvasSize() {
    if (this.canvas) {
      this.canvas.width = this.rendererSize.width
      this.canvas.height = this.rendererSize.height
    }
  }

  resize() {
    this.setCanvasSize()
    this.visualMap && this.visualMap.resize()
  }

  async initScatter() {
    if (!this.options.scatters) return
    const Scatter = await import(/* webpackChunkName: 'scatter' */ './components/scatter/index')
    this.Scatter = Scatter.default
    !this.options.animation && this.drawScatter()
  }

  drawScatter() {
    this.scatters = new this.Scatter(this, this.options.scatters)

    if (this.visualMapRangeParams) {
      this.scatters.controlScatters({
        ...this.visualMapRangeParams,
        show: true,
        hideOther: true
      })
      this.visualMapRangeParams = null
    }
  }

  async initFlyline() {
    const options = this.options.flylines
    if (!options) return
    const Flyline = await import(/* webpackChunkName: 'flyline' */ './components/flyline/index')
    this.Flyline = Flyline.default
    !this.options.animation && (this.flylines = new this.Flyline(this, options))
  }

  processVisualMapOptions() {
    let {min, max, triggerOn, type} = this.options.visualMap,
      data
    triggerOn = triggerOn || (type === 'piecewise' ? 'scatter' : 'map')
    if (triggerOn === 'scatter') {
      data = this.options.scatters.data
    }
    if (triggerOn === 'map') {
      data = this.options.map
    }
    if (!min) min = this.getMinData(data)
    if (!max) max = this.getMaxData(data)

    Object.assign(this.options.visualMap, {min, max})
  }

  getMinData(data) {
    return Array.isArray(data)
      ? data.reduce((prev, cur) => {
          const value = (cur.data || {}).value || 0
          return prev > value ? value : prev
        }, 0)
      : Object.keys(data).reduce((prev, cur) => {
          const value = (data[cur].data || {}).value || 0
          return prev > value ? value : prev
        }, 0)
  }

  getMaxData(data) {
    return Array.isArray(data)
      ? data.reduce((prev, cur) => {
          const value = (cur.data || {}).value || 0
          return prev < value ? value : prev
        }, 0)
      : Object.keys(data).reduce((prev, cur) => {
          const value = (data[cur].data || {}).value || 0
          return prev < value ? value : prev
        }, 0)
  }

  setScatters(options, repaint = true) {
    if (this.scatters) {
      this.scatters.setOptions(options, repaint)
    } else {
      this.scatters = new this.Scatter(this, options)
    }
  }

  setFlylines(options, repaint = true) {
    if (this.flylines) {
      this.flylines.setOptions(options, repaint)
    } else {
      this.flylines = new this.Flyline(this, options)
    }
  }

  mapStyleMerge(map, defaultStyles) {
    for (let name in map) {
      if (map[name] && getType(map[name]) === 'object') {
        map[name] = merge({}, defaultStyles, map[name])
      } else {
        map[name] = defaultStyles
      }
    }
  }

  promisifyLoader() {
    this.fontLoader = loaderPromisify(new THREE.FontLoader())
    this.textureLoader = loaderPromisify(new THREE.TextureLoader())
  }

  render() {
    this.loading && this.loading.visible && this.loading.hide()
    this.scatters && this.scatters.render()
    this.flylines && this.flylines.render()
    if (!this.animated) {
      this.mapComboTween && this.mapComboTween.update()
      this.cameraTween && this.cameraTween.update()
    }
  }

  destroyHook() {
    this.loading && this.loading.destroy()
    this.visualMap && this.visualMap.destroy()
    this.tooltip && this.tooltip.destroy()
    this.off('ready')
    this.off('click')
    this.off('mousemove')
  }

  click(event) {
    const animated = !this.options.animation ? true : this.animated
    if (!animated) return
    const group = this.getIntersectGroup(event)
    if (this.handleOtherElement) return
    this.emit('click', group)
    if (!this.options.stopDefaultClick) {
      if (this[CLICKMODEL] && this[CLICKMODEL] === group && this[CLICKMODEL].selected) {
        this.setModelStyleByType(this[CLICKMODEL], 'normal')
        group.selected = false
        this[CLICKMODEL] = null
        return
      }
      if (!group) {
        if (this[CLICKMODEL]) {
          this[CLICKMODEL].selected = false
          this.setModelStyleByType(this[CLICKMODEL], 'normal')
          this[CLICKMODEL] = null
        }
        return
      }
      this[CLICKMODEL] && (this[CLICKMODEL].selected = false)
      this.setModelStyle(group, CLICKMODEL)
      group.selected = true
    }
  }

  mousemove(event) {
    const animated = !this.options.animation ? true : this.animated
    if (!animated) return
    const group = this.getIntersectGroup(event)
    this.emit('mousemove', group)
    if (!this.options.stopDefaultMousemove) {
      if (!group) {
        if (!this.options.carousel.animation) {
          if (this[HOVERMODEL] && this[HOVERMODEL] !== this[CLICKMODEL]) {
            this.setModelStyleByType(this[HOVERMODEL], 'normal')
            this[HOVERMODEL] = null
          }
          this.tooltip.options.triggerOn === 'area' && this.tooltip.hide(event)
        }

        !this.handleOtherElement && (this.container.style.cursor = 'default')

        this.carouselMouseOut()
        return
      }

      clearInterval(this.carouselTimer)
      if (this.carouseSequence) {
        this.carouselTimer = null
        this.activeModelIndex = this.carouseSequence.findIndex(name => name === group.name) || this.activeModelIndex
      }

      this.tooltip.options.triggerOn === 'area' &&
        this.tooltip.show({
          type: AREA,
          data: group.data,
          object: group,
          event
        })
      this.container.style.cursor = 'pointer'
      if (this[HOVERMODEL] === group) return
      if (this[CLICKMODEL] !== group) {
        this.setModelStyle(group, HOVERMODEL)
      } else {
        if (this[HOVERMODEL] && !this[HOVERMODEL].selected) {
          this.setModelStyleByType(this[HOVERMODEL], 'normal')
          this[HOVERMODEL] = null
        }
      }
    }
  }

  mouseout(event) {
    if (this[HOVERMODEL] && !this.options.carousel.animation) {
      this.setModelStyleByType(this[HOVERMODEL], 'normal')
      this[HOVERMODEL] = null
      this.tooltip.options.triggerOn === 'area' && this.tooltip.hide(event)
    }
    this.carouselMouseOut()
  }

  carouselMouseOut() {
    const animated = !this.options.animation ? true : this.animated
    if (animated && !this.carouselTimer) {
      this.carouselAnimate()
    }
  }

  continuousVisualChange(params, layout) {
    this.handleOtherElement = true
    const {min, max} = params,
      triggerOn = this.visualMap.options.triggerOn
    if (triggerOn === 'scatter') {
      if (this.scatters) {
        this.scatters.controlScatters({
          min,
          max,
          show: true,
          hideOther: true
        })
      } else {
        this.visualMapRangeParams = {min, max}
      }
    } else if (triggerOn === 'map') {
      this.setMapStyleByValueRange(min, max, 'change')
    }
  }

  continuousVisualMapMousedown() {
    this.handleOtherElement = true
    this.controls.enabled = false
  }

  continuousVisualMapMouseup() {
    this.controls.enabled = true
    this.handleOtherElement = false
  }

  piecewiseVisualMapClick(params) {
    const {min, max, selected} = params,
      {triggerOn} = this.visualMap.options
    this.handleOtherElement = true
    if (triggerOn === 'scatter') {
      this.scatters &&
        this.scatters.controlScatters({
          min,
          max,
          zoom: true,
          show: selected
        })
    } else if (triggerOn === 'map') {
      const type = !selected ? 'inactive' : 'normal'
      Object.keys(this.mapValues).forEach(name => {
        const value = this.mapValues[name],
          group = this.scene.getObjectByName(name)
        if (value >= min && value <= max) {
          group.inactive = type === 'inactive'
          this.setModelStyleByType(group, type)
        }
      })
    }
  }

  visualMapMouseover(params, all) {
    this.handleOtherElement = true
    const {triggerOn, type} = this.visualMap.options
    const {min, max, selected} = params

    if (triggerOn === 'scatter') {
      this.scatters &&
        this.scatters.controlScatters({
          min,
          max,
          zoom: true,
          range: this.visualMap.layout.range,
          show: type === 'piecewise' ? selected : true
        })
    } else {
      if (triggerOn === 'map') {
        if ((type === 'continuous' && params.type === 'colorBar') || type === 'piecewise') {
          this.setMapStyleByValueRange(min, max, 'mouseover')
        }
      }
    }
    this.isVisualMapMouseout = false
  }

  visualMapMouseout() {
    if (this.isVisualMapMouseout) return
    const {triggerOn} = this.visualMap.options
    this.handleOtherElement = false
    if (triggerOn === 'scatter') {
      this.scatters &&
        this.scatters.controlScatters({
          zoom: false
        })
    }
    if (triggerOn === 'map') {
      this.activesMapName &&
        this.activesMapName.forEach(name => {
          const group = this.scene.getObjectByName(name)
          group && this.setModelStyleByType(group, 'normal')
        })
    }
    if (!this.isVisualMapMouseout) {
      this.isVisualMapMouseout = true
    }
  }

  setMapStyleByValueRange(min, max, eventType) {
    const styleKeyMaps = {
      mouseover: ['emphasis', 'normal'],
      change: ['normal', 'inactive'] // 对应continonus的最大最小值改变
    }
    eventType === 'mouseover' && (this.activesMapName = [])

    Object.keys(this.mapValues).forEach(name => {
      const value = this.mapValues[name],
        group = this.scene.getObjectByName(name)
      if (!group) return
      if (value >= min && value <= max) {
        const type = styleKeyMaps[eventType][0]
        eventType !== 'mouseover' && (group.inactive = type === 'inactive')
        this.setModelStyleByType(group, type)
        eventType === 'mouseover' && this.activesMapName.push(name)
      } else {
        const type = styleKeyMaps[eventType][1]
        eventType !== 'mouseover' && (group.inactive = type === 'inactive')
        this.setModelStyleByType(group, type)
      }
    })
  }

  getIntersectGroup(event) {
    const intersect = event.intersects[0]
    if (!intersect) return null
    const group = intersect.object.parent
    return this.mapNames.includes(group.name) ? group : this.mapNames.includes(group.name.split('_')[0]) && group.parent
  }

  async setActiveModel(name) {
    const group = this.scene.getObjectByName(name)
    if (group) {
      const {x, y} = this.vector3ToScreenPosition(group.data.center)

      this.setModelStyle(group, HOVERMODEL)
      if (this.options.carousel.handler) {
        await this.options.carousel.handler(this[HOVERMODEL])
      }
      this.tooltip &&
        this.tooltip.show({
          type: AREA,
          data: group.data,
          object: group,
          event: {
            offsetX: x,
            offsetY: y
          }
        })
    }
  }

  vector3ToScreenPosition(position) {
    const [x, y, z] = position,
      worldVector = new THREE.Vector3(x, y, z),
      vector = worldVector.project(this.camera),
      width = this.rendererSize.width / 2,
      height = this.rendererSize.height / 2
    return {
      x: Math.round(vector.x * width + width),
      y: Math.round(-vector.y * height + height)
    }
  }

  setModelStyle(group, key) {
    if (group instanceof THREE.Group) {
      this[key] && !this[key].selected && this.setModelStyleByType(this[key], 'normal')
      this[key] = group
      this.setModelStyleByType(this[key], 'emphasis')
    }
  }

  async processMapJson() {
    const {nameMap, visibleSouthSea} = this.options

    if (visibleSouthSea) {
      const southSeaJson = await import(/* webpackChunkName: 'southsea' */ './assets/southsea')
      this.mapJson.features.push(southSeaJson.default.features[0])
    }
    !this.left && this.getGeoBounds()

    this.mapNames = []
    this.mapCenters = {}
    this.mapCenterVectors = {}
    // this.coordToVector3()
    // const path = d3.geoPath().projection(this.projection)
    // path.centroid(d.geometry)
    // 把经纬度转换成x, y, z坐标
    this.mapJson.features.forEach(d => {
      const {cp, name: origionName} = d.properties,
        name = nameMap[origionName] || origionName,
        center = cp || d3.geoCentroid(d.geometry),
        vectors3 = this.coordToVector3(center)
      d.name = name
      d.center = center
      d.centerVector3 = vectors3

      this.mapCenterVectors[name] = vectors3
      this.mapNames.push(name)
      this.mapCenters[name] = center
      d.vector3 = {
        singleSide: [],
        doubleSide: []
      }
      d.geometry.coordinates.forEach((coordinates, i) => {
        d.vector3[i] = []
        coordinates.forEach((c, j) => {
          if (Array.isArray(c[0])) {
            d.vector3.doubleSide.push(c.map(cinner => this.coordToVector3(cinner)))
          } else {
            d.vector3.singleSide.push(this.coordToVector3(c))
          }
        })
      })
    })
  }

  // 经纬度转换成墨卡托投影
  coordToVector3(coord = [], z = 0) {
    if (!this.projection) {
      const {rotate, offset, center, zoom, padding} = this.options

      if (!this.mapCenter) {
        this.mapCenter = center || this.getMapCenter()
        // this.mapCenter = center || d3.geoCentroid(this.mapJson)
        this.options.center = this.mapCenter
      }
      if (!this.mapZoom) {
        this.mapZoom = (zoom || this.getZoom()) - (padding * 2) / this.standardLayout.zoom
        this.options.zoom = this.mapZoom
      }
      this.projection = d3
        .geoMercator()
        .center(this.mapCenter)
        .scale(this.mapZoom)
        .rotate(rotate)
        .translate(offset)
    }
    const [x, y] = this.projection(coord.concat()).reverse()
    return [x, y, z]
  }

  getGeoBounds() {
    ;[[this.left, this.top], [this.right, this.bottom]] = d3.geoBounds(this.mapJson)
  }

  getMapCenter() {
    return [(this.left + this.right) * 0.5, (this.bottom + this.top) * 0.5]
  }

  getZoom() {
    const {width, height} = this.rendererSize,
      scaleX = width / Math.abs(this.left - this.right),
      scaleY = height / Math.abs(this.top - this.bottom)
    return Math.min(scaleX, scaleY) * 2
  }

  getModelCenter(geoJson) {
    const [[left, top], [right, bottom]] = d3.geoBounds(geoJson)
    return [(left + right) * 0.5, (bottom + top) * 0.5]
  }

  async drawMap() {
    this.areaMeshes = []
    this.textList = []
    const mapGroup = new THREE.Group(),
      {map, depth, animation, layers, visibleSouthSea} = this.options
    this.segDepth = layers - 1 === 0 ? depth : depth / (layers - 1)
    this.mapJson.features.forEach(d => {
      const modelGroup = new THREE.Group(),
        areaGroup = new THREE.Group(),
        borderGroup = new THREE.Group(),
        {name, vector3, centerVector3} = d,
        {areaStyle, borderStyle, textStyle} = map[name] || this.options,
        center = (map[name] || {}).center,
        centerPoint = center ? this.coordToVector3(center) : centerVector3

      if (name === '南海诸岛' && !visibleSouthSea) return
      this.textList.push({
        text: name,
        center: centerPoint,
        textStyle
      })
      const areaSingleMeshes = this.drawArea(vector3.singleSide, areaStyle.normal),
        borderSingleMesh = this.drawBorder(vector3.singleSide, borderStyle.normal)
      let simpleTipMesh
      if (map[name] && map[name].data && map[name].simpleTip.show) {
        const {data = {}, simpleTip} = map[name],
          center = data.center ? this.coordToVector3(data.center) : centerPoint
        !data.name && (data.name = name)
        simpleTipMesh = this.drawSimpleTip(simpleTip, data, center)
      }

      areaSingleMeshes.forEach(mesh => areaGroup.add(mesh))
      borderGroup.add(borderSingleMesh)
      vector3.doubleSide.forEach(item => {
        const areaDoubleMeshes = this.drawArea(item, areaStyle.normal),
          borderDoubleMesh = this.drawBorder(item, borderStyle.normal)
        areaDoubleMeshes.forEach(mesh => areaGroup.add(mesh))
        borderGroup.add(borderDoubleMesh)
      })
      modelGroup.data = {
        ...(map[name] ? map[name].data : {}),
        name,
        vector3,
        center: centerPoint
      }
      modelGroup.name = name
      areaGroup.name = `${name}_${AREA}`
      borderGroup.name = `${name}_${BORDER}`
      modelGroup.add(areaGroup)
      modelGroup.add(borderGroup)
      simpleTipMesh && modelGroup.add(simpleTipMesh)

      if (animation) {
        modelGroup.position.x = centerPoint[0] * comboDistance
        modelGroup.position.y = centerPoint[1] * comboDistance
      }
      mapGroup.add(modelGroup)
    })

    this.mapGroup = mapGroup
    this.scene.add(mapGroup)
    this.drawExtraBorders()
    this.drawTexts()
    animation && this.mapComboAnimation()
  }

  mapComboAnimation() {
    !this.mapComboTween && (this.mapComboTween = new this.TWEEN.Group())
    this.mapComboTween.removeAll()
    const {animationEasing = _animationEasing, animationDuration = _animationDuration} = this.options,
      easing = this.tweenEasing[animationEasing],
      groups = this.mapGroup.children

    groups.forEach((group, i) => {
      const end = {x: 0, y: 0, z: 0}
      new this.TWEEN.Tween(group.position, this.mapComboTween)
        .to(end, animationDuration)
        .easing(easing)
        .start()
    })
    new this.TWEEN.Tween(this, this.mapComboTween)
      .to({}, animationDuration)
      .onComplete(_ => {
        this.mapComboTween.removeAll()
        this.mapComboTween = null
        this.options.flylines && (this.flylines = new this.Flyline(this, this.options.flylines))
        this.options.scatters && (this.scatters = new this.Scatter(this, this.options.scatters))
        this.cameraTween = new this.TWEEN.Group()
        new this.TWEEN.Tween(this.camera.position, this.cameraTween)
          .to(this.options.cameraPosition, animationDuration / 2)
          .start()
          .onComplete(_ => {
            this.animated = true
            this.cameraTween.removeAll()
            this.cameraTween = null
            this.carouselAnimate()
          })
      })
      .start()
  }

  carouselAnimate() {
    const {time, sequence, animation} = this.options.carousel
    if (!animation) return
    !this.activeModelIndex && (this.activeModelIndex = 0)
    if (!this.carouseSequence) {
      this.carouseSequence = sequence || this.mapNames
    }
    this.setActiveModel(this.carouseSequence[this.activeModelIndex])

    clearInterval(this.carouselTimer)
    this.carouselTimer = setInterval(_ => {
      this.activeModelIndex++
      this.activeModelIndex = this.activeModelIndex >= this.carouseSequence.length ? 0 : this.activeModelIndex
      const name = this.carouseSequence[this.activeModelIndex]
      this.setActiveModel(name)
    }, time)
  }

  // 绘制地图区域 points 是一个二维数组 [[x,y], [x,y], [x,y]]
  drawArea(points, {show, color, opacity, depth, texture}) {
    const shape = new THREE.Shape()
    points.forEach((d, i) => {
      const [x, y] = d
      if (i === 0) {
        shape.moveTo(x, y)
      } else if (i === points.length - 1) {
        shape.quadraticCurveTo(x, y, x, y)
      } else {
        shape.lineTo(x, y, x, y)
      }
    })
    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        steps: 2,
        depth,
        depthTest: false,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      }),
      // MeshLambertMaterial | MeshBasicMaterial | MeshPhongMaterial
      material = new THREE.MeshPhongMaterial({
        color,
        opacity,
        transparent: true,
        side: THREE.DoubleSide
      })
    this.noBledingOpacity(material, opacity)
    texture && (material.map = texture)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = AREA
    mesh.visible = show
    this.areaMeshes.push(mesh)
    return [mesh]
  }

  noBledingOpacity(material, opacity) {
    if (this.options.blending) {
      material.blending = THREE.AdditiveBlending
    } else {
      material.opacity = opacity === 1 ? 0.65 : opacity
    }
  }

  drawExtraBorders() {
    const {extraBorder} = this.options
    if (Array.isArray(extraBorder)) {
      extraBorder.forEach(item => {
        this.addBorder(item)
      })
    } else if (getType(extraBorder) === 'object') {
      this.addBorder(extraBorder)
    }
  }

  addBorder({color = '#ffffff', opacity = 1, z = 0, name}) {
    let mapData
    if (name) {
      if (Array.isArray(name)) {
        mapData = this.mapJson.features.filter(d => name.includes(d.name))
      } else {
        mapData = this.mapJson.features.filter(d => name === d.name)
      }
    } else {
      mapData = this.mapJson.features
    }
    const group = new THREE.Group()
    mapData.forEach(d => {
      const {name, vector3} = d,
        borderGroup = new THREE.Group(),
        modelGroup = this.scene.getObjectByName(name),
        borderMeshSingle = this.drawBorder(
          vector3.singleSide,
          {
            show: true,
            color,
            opacity
          },
          z
        )
      borderGroup.add(borderMeshSingle)
      vector3.doubleSide.forEach(item => {
        const borderMeshDouble = this.drawBorder(
          item,
          {
            show: true,
            color,
            opacity
          },
          z
        )
        borderGroup.add(borderMeshDouble)
      })
      borderGroup.name = `extraBorder_${name}_${z}`
      modelGroup ? modelGroup.add(borderGroup) : group.add(borderGroup)
    })
    group.children && this.scene.add(group)
  }

  drawBorder(points, {show, color, opacity}, z) {
    const material = new THREE.LineBasicMaterial({
        color,
        opacity,
        // side: THREE.DoubleSide,
        transparent: true
      }),
      geometry = new THREE.BufferGeometry(),
      positions = []
    if (z) {
      points.forEach(d => {
        const [x, y] = d
        positions.push(x, y, (z / this.originalDepth) * this.options.depth)
      })
    } else {
      Array.from({length: this.options.layers}).forEach((item, i) => {
        const _points = points.reduce((prev, cur) => {
          const [x, y, z] = cur
          prev.push(x, y, z + this.segDepth * i)
          return prev
        }, [])

        positions.push(..._points)
      })
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.computeBoundingSphere()

    const border = new THREE.Line(geometry, material)
    border.visible = show
    border.name = BORDER
    return border
  }

  async initFont() {
    const {map = {}, textStyle} = this.options
    if (textStyle.normal.show || textStyle.emphasis.show) {
      this.font = await this.fontLoader(this.options.font)
    } else {
      Object.keys(map).some(item => {
        const textStyle = map[item].textStyle
        return textStyle.normal.show || textStyle.emphasis.show
      }) && (this.font = await this.fontLoader(this.options.font))
    }
  }

  async drawTexts() {
    if (this.options.font) {
      await this.initFont()
      if (!this.font) return
    }
    this.textList.forEach(item => {
      const {text, center, textStyle} = item,
        mesh = this.font
          ? this.drawThreeText(text, textStyle.normal, center)
          : this.drawCanvasText(text, textStyle.normal, center)
      if (mesh) {
        const model = this.scene.getObjectByName(text) || this.scene
        mesh.name = `${text}_${TEXT}`
        model.add(mesh)
      }
    })
  }

  drawThreeText(
    text,
    {
      show,
      color,
      opacity,
      texture,
      height,
      style,
      fontSize,
      steps,
      bevelThickness,
      bevelSize,
      bevelSegments,
      curveSegments,
      rotation
    },
    center
  ) {
    if (this.font) {
      const exist = text.split('').every(t => t === ' ' || !!this.font.data.glyphs[t])
      if (!exist) return
    }
    const geometry = new THREE.TextBufferGeometry(text, {
        font: this.font,
        size: fontSize - 2,
        height,
        style,
        bevelThickness,
        bevelSize,
        bevelSegments,
        curveSegments,
        steps
      }),
      material = new THREE.MeshBasicMaterial({
        color,
        opacity,
        depthTest: false,
        transparent: true
      })
    texture && (material.map = texture)
    const mesh = new THREE.Mesh(geometry, material),
      scale = 1 / this.standardLayout.zoom

    mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    mesh.position.set(center[0], center[1], (fontSize * scale) / 2)
    mesh.scale.set(scale, scale, scale)
    mesh.rendererOrder = 2
    mesh.geometry.center()
    mesh.name = TEXT
    mesh.visible = show
    return mesh
  }

  drawCanvasText(text, style, center) {
    if (!text) return
    const {color, opacity, fontSize, rotation, show} = style,
      width = getTextWidth(text, style),
      {canvas, context} = createCanvas(width, fontSize),
      _color =
        color.indexOf('rgba') !== -1
          ? color
            ? color.indexOf('rgb') !== -1
            : rgbToRgba(color, opacity)
          : hex2Rgba(color, opacity)

    drawText(context, {
      text,
      x: 1,
      y: 1,
      ...style,
      textAlign: 'left',
      textBaseline: 'top',
      color: _color
    })
    const mesh = this.drawTextPlane(canvas, width, fontSize),
      scale = 1 / this.standardLayout.zoom

    mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    mesh.position.set(center[0], center[1], (fontSize * scale) / 2)
    mesh.scale.set(scale, scale, scale)
    mesh.rendererOrder = 2
    mesh.geometry.center()
    mesh.name = TEXT
    mesh.visible = show
    return mesh
  }

  drawSimpleTip(style, data, center) {
    const {show, formatter, rotation, offset, background, border, borderWidth, textStyle, lineGap, opacity} = style,
      html = this.formatterTipHtml(formatter, data),
      padding = normalizeFourValues(style.padding),
      {width, height, texts} = this.getTipLayout(html, textStyle, padding, lineGap, borderWidth),
      {canvas, context} = createCanvas(width + borderWidth + (width % 2 === 0 ? 0 : 1), height + borderWidth)
    context.globalAlpha = opacity
    context.save()
    context.beginPath()
    context.rect(1, 1, width, height)
    context.fillStyle = background
    context.strokeStyle = border
    context.lineWidth = borderWidth
    context.fill()
    context.stroke()
    context.restore()
    texts.forEach((text, i) => {
      drawText(context, {
        text,
        x: (width + borderWidth) / 2,
        y: padding[0] + borderWidth + i * (textStyle.fontSize + lineGap),
        ...textStyle
      })
    })
    // canvas.style.marginLeft = '10px'
    // this.el.appendChild(canvas)
    const mesh = this.drawTextPlane(canvas, width + borderWidth, height, 1, false),
      scale = 1 / this.standardLayout.zoom

    mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    mesh.position.set(center[0] + offset[0] * scale, center[1] + offset[1] * scale, (height * scale) / 2)
    mesh.scale.set(scale, scale, scale)
    mesh.rendererOrder = 2
    mesh.geometry.center()
    mesh.name = TEXT
    mesh.visible = show
    return mesh
  }

  formatterTipHtml(formatter, data) {
    if (typeof formatter === 'function') return formatter(data)
    Object.keys(data).forEach(key => {
      formatter = formatter.replace(`{${key}}`, data[key])
    })
    return formatter
  }

  getTipLayout(html, style, padding, lineGap) {
    const arr = html.split('\n').map(i => i.trim()),
      width = arr.reduce((prev, cur) => {
        const w = getTextWidth(cur, style)
        return prev > w ? prev : w
      }, 0),
      height = arr.length * style.fontSize + lineGap * (arr.length - 1)
    return {
      width: width + padding[1] + padding[3],
      height: height + padding[0] + padding[2],
      texts: arr
    }
  }

  drawTextPlane(canvas, width, height, opacity = 0.9, blending = true) {
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    texture.minFilter = THREE.LinearFilter
    const planeGeometry = new THREE.PlaneBufferGeometry(width, height, 1, 1),
      planeMaterial = new THREE.MeshBasicMaterial({
        // color,
        opacity,
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      })
    if (blending) {
      // blending: THREE.AdditiveBlending
      planeMaterial.depthTest = false
      planeMaterial.blending = THREE.CustomBlending
      planeMaterial.blendEquation = THREE.AddEquation
      planeMaterial.blendSrc = THREE.OneFactor
      planeMaterial.blendDst = THREE.OneFactor
      planeMaterial.blendSrcAlpha = 0
    }
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    return plane
  }

  /**
   * 设置一个区域的颜色
   * @param {THREE.Group} g area group
   * @param {String} type normal | emphasis
   */
  setModelStyleByType(model, type) {
    const name = model.name,
      {
        map = {},
        areaStyle: defaultAreaStyle,
        textStyle: defaultTextStyle,
        borderStyle: defaultBorderStyle
      } = this.options,
      {areaStyle = defaultAreaStyle, textStyle = defaultTextStyle, borderStyle = defaultBorderStyle} = map[name] || {},
      areaType = model.inactive && type === 'normal' ? 'inactive' : type

    if (type === 'normal') {
      model.position.z = 0
    } else if (type === 'emphasis') {
      model.position.z = -(1 / this.originalDepth) * areaStyle[areaType].depth * (this.originalDepth / 3)
    }
    model.children.forEach(group => {
      const cname = group.name
      if (`${name}_${TEXT}` === cname) {
        textStyle[type] && this.setTextStyle(group, textStyle[type])
      } else if (`${name}_${AREA}` === cname) {
        areaStyle[areaType] && this.setAreaStyle(group, areaStyle[areaType])
      } else if (`${name}_${BORDER}` === cname) {
        borderStyle[type] && this.setBorderStyle(group, borderStyle[type])
      }
    })
  }

  setAreaStyle(group, {show = true, color, depth, opacity, texture}) {
    group.children.forEach(mesh => {
      color && mesh.material.color.set(color)
      opacity && this.noBledingOpacity(mesh.material, opacity)
      depth && (mesh.geometry.depth = depth)
      texture && (mesh.material.map = texture)
      mesh.visible = show
    })
  }

  setBorderStyle(group, {show, color, opacity}) {
    group.children.forEach(mesh => {
      color && mesh.material.color.set(color)
      opacity && (mesh.material.opacity = opacity)
      mesh.visible = show
      // mesh.position.z = depth
    })
  }

  setTextStyle(mesh, {show, color, height, opacity, texture, rotation}) {
    color && mesh.material.color.set(color)
    opacity && (mesh.material.opacity = opacity)
    height && (mesh.material.height = height)
    texture && (mesh.material.map = texture)
    if (rotation) {
      rotation.x && (mesh.rotation.x = rotation.x)
      rotation.y && (mesh.rotation.y = rotation.y)
      rotation.z && (mesh.rotation.z = rotation.z)
    }
    mesh.visible = show
  }

  setCamera() {
    const {cameraPosition, animation} = this.options,
      {x, y, z} = cameraPosition,
      {width, height} = this.rendererSize,
      position = animation ? [x / 2, y, z * 2] : [x, y, z]

    this.camera = new THREE.PerspectiveCamera(10, width / height, 1, 1000)
    this.camera.up.x = 0
    this.camera.up.y = 0
    this.camera.up.z = 1
    this.camera.position.set(...position)
    this.camera.lookAt(0, 0, 0)
  }

  setLight() {
    const {color = 0xffffff, intensity = 1} = this.options.light || {}
    const directionalLight = new THREE.DirectionalLight(color, intensity)
    this.scene.add(directionalLight)
    const pointOpt = this.options.pointLight
    const pointLight = new THREE.PointLight(pointOpt.color, pointOpt.intensity, pointOpt.distance)
    pointLight.position.set(...pointOpt.position)
    this.scene.add(pointLight)
    // const helper = new THREE.PointLightHelper(pointLight, 5)
    // this.scene.add(helper)
    // const controll = {
    //   x: pointLight.position.x,
    //   y: pointLight.position.y,
    //   z: pointLight.position.z,
    //   intensity: pointLight.intensity
    // }
    // this.gui.add(controll, 'x', -100, 100).onChange(e => {
    //   pointLight.position.x = e
    // })
    // this.gui.add(controll, 'y', -100, 100).onChange(e => {
    //   pointLight.position.y = e
    // })
    // this.gui.add(controll, 'z', -100, 100).onChange(e => {
    //   pointLight.position.z = e
    // })
    // this.gui.add(controll, 'intensity', 0, 3).onChange(e => {
    //   pointLight.intensity = e
    // })
  }

  setHelper() {
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)
  }

  /**
   * 过渡动画
   * @param {Object|*} from - 修改的启始值
   * @param {Object|*} to - 修改的结束值
   * @param {number} [time] - 完成时间
   * @param {number} [delay=0] - 延迟时间
   * @param {callback} [callback] - 完成回调
   * @example
   * transition(area.position, {x:0,y:0,z:10}, 300)
   */
  transition(from, to, time, delay, callback) {
    this.TWEEN.removeAll()
    if (typeof time !== 'number') {
      time = 300
    }
    if (!callback) callback = () => {}
    new this.TWEEN.Tween(from)
      .to(to, time)
      .delay(delay || 0)
      .start()
      .onComplete(callback)
  }
}

export default Map3D
