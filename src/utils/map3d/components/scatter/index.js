import * as THREE from 'three'
import merge from 'lodash/merge'
import extend from 'lodash/extend'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import cloneDeep from 'lodash/cloneDeep'
import Tooltip from '../tooltip/index'
import {getTexture} from '../../core/texture'
import {
  _animationEasing,
  _animationDuration,
  scatterScale,
  SCATTER,
  symbolMap,
  scatterOpt
} from './options'

export default class Scatter {
  constructor(context, options) {
    const necessaryExtendProps = [
      'container',
      'standardLayout',
      'mapCenterVectors',
      'scene',
      'textureLoader',
      'TWEEN',
      'tweenEasing'
    ]
    this.defaultOptions = {
      ...scatterOpt,
      data: [
        // { name: '北京市', ...scatterOpt }
      ]
    }
    this.initOptions(options)
    extend(this, pick(context, necessaryExtendProps))

    this.context = context
    this.init()
  }

  init() {
    this.allScatters = []
    this.rippleGroup = []
    this.textures = []
    this.lightrays = []
    this.scatterEvents = []
    this.options.data && this.paint(this.options.data)
    if (this.options.tooltip && this.options.tooltip.show) {
      this.tooltip = new Tooltip(this.options.tooltip)
    }
    if (this.context.tooltip.options.triggerOn === 'scatter') {
      this.tooltip = this.context.tooltip
    }
    this.triggerScatterScale()
  }

  initOptions(options) {
    const _opt = omit(options, ['data']),
      _scatterOpt = merge({}, scatterOpt, _opt)
    options.data &&
      (this.defaultOptions.data = cloneDeep(options.data).map(item =>
        merge({}, _scatterOpt, item)
      ))
    this.options = merge({}, this.defaultOptions, _scatterOpt)
  }

  setOptions(options, repaint) {
    if (repaint) {
      this.allScatters.forEach(item => {
        this.context.remove(item)
      })
      this.initOptions(options)
      this.init()
    } else {
      const data = cloneDeep(options).map(item => merge({}, scatterOpt, item))
      this.paint(data)
    }
  }

  triggerScatterScale() {
    const trigger = this.tooltip ? this.tooltip.options.trigger : 'mousemove'
    this.context.registerMouseEvent(
      trigger,
      this.setActiveScatter.bind(this),
      this.allScatters
    )
  }

  setActiveScatter(event) {
    const intersect = event.intersects[0]
    if (this.activeScatter) {
      this.activeScatter.scale.set(1, 1, 1)
      this.container.style.cursor = 'default'
      this.activeScatter = null
      this.tooltip && this.tooltip.hide(event)
    }
    if (!intersect) return
    const object = intersect.object,
      group = object.parent
    if (
      group instanceof THREE.Group &&
      group.name.toLowerCase().indexOf(SCATTER) > -1
    ) {
      const scatter = group.getObjectByName(SCATTER)
      if (scatter) {
        scatter.scale.set(scatterScale, scatterScale, scatterScale)
        this.activeScatter = scatter
        this.container.style.cursor = 'pointer'
        this.tooltip &&
          this.tooltip.show({
            type: object.name,
            object: group,
            ...group.data,
            event
          })
      }
    }
  }

  controlScatters(params) {
    const {min, max, show, zoom, hideOther, range} = params
    this.allScatters.forEach(group => {
      const value = (group.data.data || {}).value || 0
      if (!min && !max) {
        const scatter = group.getObjectByName('scatter')
        scatter.scale.set(1, 1, 1)
        return
      }
      if (range && (value < range.min || value > range.max)) return
      const scatter = group.getObjectByName('scatter')
      if (min <= value && max >= value) {
        if (show) {
          zoom
            ? scatter.scale.set(scatterScale, scatterScale, scatterScale)
            : scatter.scale.set(1, 1, 1)
          group.visible = true
        } else {
          group.visible = false
        }
      } else {
        scatter.scale.set(1, 1, 1)
        if (hideOther) {
          group.visible = false
        }
      }
    })
  }

  async paint(data) {
    if (!Array.isArray(data)) return
    for (let d of data) {
      const group = new THREE.Group(),
        {
          show,
          color,
          symbol,
          size,
          offset,
          effectType,
          effect,
          center,
          lightray,
          name,
          data
        } = d,
        model = this.scene.getObjectByName(name) || this.scene,
        position = center
          ? this.context.coordToVector3(center.slice(0, 2), center[3])
          : this.mapCenterVectors[name],
        options = {
          color,
          show,
          size: size / this.standardLayout.zoom
        }
      if (!position) return

      let mesh,
        isCustomSymbol = false
      if (offset && Array.isArray(offset)) {
        offset[0] && (position[0] += offset[0])
        offset[1] && (position[1] += offset[1])
        offset[2] && (position[2] += offset[2])
      }
      position[2] += 0.1 / this.standardLayout.zoom
      options.position = position
      this.lightrays.push({
        name,
        options: lightray,
        position
      })
      if (typeof symbol === 'number') {
        options.segments = symbol
        mesh = this.drawRegularPolygonMesh({...options})
      } else {
        if (symbol.startsWith('image://')) {
          options.symbol = symbol
          isCustomSymbol = true
          mesh = await this.drawCustomSymbol({...options})
        } else {
          options.segments = symbolMap[symbol]
          mesh = this.drawRegularPolygonMesh({...options})
        }
      }
      mesh.name = SCATTER
      group.name = `${name}_${SCATTER}`
      group.data = {
        data,
        name
      }
      group.add(mesh)
      if (effectType === 'ripple') {
        const {period, brushType, scale} = effect,
          drawFn = isCustomSymbol
            ? 'drawCustomSymbol'
            : brushType === 'fill'
            ? 'drawRegularPolygonMesh'
            : 'drawRegularPolygonLine'
        for (let k of Array.from({length: period - 1})) {
          const mesh = await this[drawFn]({...options})
          mesh.name = 'effectScatter'
          group.add(mesh)
        }
        // Array.from({length: period - 1}).forEach((item, i) => {
        //   const mesh = this[drawFn]({...options})
        //   mesh.name = 'effectScatter'
        //   group.add(mesh)
        // })
        group.scaleEnd = scale
        this.rippleGroup.push(group)
      } else {
        if (!isCustomSymbol) {
          const _mesh = mesh.clone()
          _mesh.material.opacity = 0.5
          _mesh.scale.set(1.25, 1.25, 1.5)
          group.add(_mesh)
        }
      }
      this.allScatters.push(group)
      model.add(group)
    }
    this.effectScatterRipple()
    this.drawLightrays()
  }

  async drawCustomSymbol(options) {
    const {size, color, position, show, symbol} = options,
      texture = await getTexture(symbol),
      geometry = new THREE.PlaneBufferGeometry(size * 2, size * 2),
      material = new THREE.MeshBasicMaterial({
        map: texture,
        // color,
        depthTest: false,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      }),
      plane = new THREE.Mesh(geometry, material),
      [x, y, z] = position
    plane.position.set(x, y, z)
    // plane.rotation.y = Math.PI / 2
    plane.rotation.z = Math.PI / 2
    plane.visible = show
    return plane
  }

  effectScatterRipple() {
    !this.rippleGroupTween && (this.rippleGroupTween = new this.TWEEN.Group())
    this.rippleGroupTween.removeAll()
    const {
        animationEasing = _animationEasing,
        animationDuration = _animationDuration
      } = this.options,
      easing = this.tweenEasing[animationEasing]
    this.rippleGroup.forEach(group => {
      const meshes = group.children
      if (meshes) {
        const scale = group.scaleEnd,
          delay = animationDuration / meshes.length
        meshes.forEach((mesh, i) => {
          if (mesh.name === 'effectScatter') {
            const start = {
                scale: 1,
                opacity: 1
              },
              end = {
                scale,
                opacity: 0
              }
            new this.TWEEN.Tween(start, this.rippleGroupTween)
              .to(end, animationDuration)
              .easing(easing)
              .delay(delay * i)
              .repeat(Infinity)
              .onUpdate(obj => {
                const {scale, opacity} = obj
                mesh.material.opacity = opacity
                mesh.scale.set(scale, scale, scale)
              })
              .start()
          }
        })
      }
    })
    new this.TWEEN.Tween(this, this.rippleGroupTween)
      .to({}, animationDuration)
      .delay(50)
      .start()
  }

  lightrayAnimate() {
    !this.lightrayTween && (this.lightrayTween = new this.TWEEN.Group())
    this.lightrayTween.removeAll()
    this.lightrayArray.forEach(mesh => {
      new this.TWEEN.Tween(mesh.geometry.parameters, this.lightrayTween)
        .to({height: mesh.height}, 1500)
        .easing(this.tweenEasing[_animationEasing])
        .start()
        .onComplete(_ => {
          // console.log(_, mesh.height)
          this.lightrayTween.removeAll()
          this.lightrayTween = null
        })
    })
  }

  render() {
    this.rippleGroupTween && this.rippleGroupTween.update()
    this.lightrayTween && this.lightrayTween.update()
  }

  // 画多边形
  drawRegularPolygonMesh({size = 6, segments = 6, color, position, show}) {
    const geometry = new THREE.CircleBufferGeometry(size, segments),
      material = new THREE.MeshBasicMaterial({
        color,
        transparent: true
      }),
      mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...position)
    mesh.visible = show
    return mesh
  }

  // 画多边形的边线
  drawRegularPolygonLine({size = 8, segments = 6, color, position, show}) {
    const geometry = new THREE.CircleGeometry(size, segments),
      material = new THREE.MeshBasicMaterial({
        color,
        transparent: true
      })
    geometry.vertices.shift()
    const line = new THREE.LineLoop(geometry, material)
    line.position.set(...position)
    line.visible = show
    return line
  }

  async drawLightrays() {
    this.lightrayArray = []
    for (let value of this.lightrays) {
      await this.drawLightray(value)
    }
    this.lightrayAnimate()
  }

  async drawLightray({name, options, position}) {
    const {texture: src, width, height} = options,
      texture = await getTexture(src)
    const lightray1 = this.drawPlane({
        ...options,
        texture,
        position,
        width: width / this.standardLayout.zoom,
        height: height / this.standardLayout.zoom
      }),
      model = this.scene.getObjectByName(`${name}_${SCATTER}`) || this.scene
    lightray1.name = `${name}_lightray`
    const lightray2 = lightray1.clone()
    lightray2.rotation.y = Math.PI / 2
    model.add(lightray1)
    model.add(lightray2)
    this.lightrayArray.push(lightray1, lightray2)
  }

  drawPlane({
    position = [0, 0, 0],
    show = true,
    color = 'red',
    width = 6,
    height = 10,
    widthSegments = 1,
    heightSegments = 1,
    opacity = 1,
    texture = ''
  }) {
    const geometry = new THREE.PlaneBufferGeometry(
        width * 2,
        height * 2,
        // 1,
        widthSegments,
        heightSegments
      ),
      material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity,
        color,
        depthTest: false,
        transparent: true,
        side: THREE.DoubleSide,
        // blending: THREE.AdditiveBlending
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneFactor,
        blendSrcAlpha: 1
      }),
      plane = new THREE.Mesh(geometry, material),
      [x, y, z] = position
    plane.position.set(x, y, z + height)
    // plane.height = height * 2
    plane.rotation.x = Math.PI / 2
    plane.rotation.z = Math.PI
    plane.visible = show
    return plane
  }
}
