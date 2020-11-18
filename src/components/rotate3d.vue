<template>
  <section class="rotate3d full-block" ref="rotate3d">
    <ul class="legend-list">
      <li v-for="(item,index) in legendList" :key="index" class="flex-layout">
        <div
          class="legend-color"
          :style="{'background':`url(${item.icon}) no-repeat 0 0 / 100% 100%`}"
        ></div>
        <div class="flex-1">{{item.label}}</div>
      </li>
    </ul>
    <img class="rotate3d-center" src="@/assets/img/ministry/center.png" />
    <div class="stage" ref="stage">
      <svg ref="svg">
        <!-- <defs>
          <marker id="markerArrow" markerWidth="8" markerHeight="8" refx="2" refy="5" orient="auto">
            <path d="M2,2 L2,8 L8,5 L2,2" style="fill: #61a8e0;" />
          </marker>
        </defs>-->
        <defs>
          <filter id="f3" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="4" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="multiply" />
          </filter>
          <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="-2%"   stop-color="rgba(172,153,47,0.2)"/>
            <stop offset="20%"  stop-color="rgba(172,153,47,0.2)"/>
            <stop offset="40%"  stop-color="#a89840"/>
            <stop offset="100%" stop-color="#a89840"/>
          </linearGradient>
          <mask id="Mask">
            <circle id="mCircle" r="50" fill="url(#grad)" />
          </mask>
          <radialGradient id="grad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stop-color="#fff" stop-opacity='1' />
            <stop offset="100%" stop-color="#fff" stop-opacity='0' />
          </radialGradient>
        </defs>
        <!-- <circle filter="url(#f3)">
          <animateMotion begin="0s" dur="10s" repeatCount="indefinite" />
        </circle> -->
        <!-- <animateTransform attributeName="transform" begin="0s" dur="10s" type="rotate" from="0 160 160" to="360 160 160" repeatCount="indefinite"/> -->
      </svg>
      <div class="rotate3d-box">
        <div
          ref="item"
          v-for="(item, index) in list"
          :class="`rotate3d-item rotate3d-item-${index+1}`"
          :key="item.name"
          :style="{'background':`url(${require('@/assets/img/ministry/'+item.type+'.png')}) 0 0 / 100% 100%`}"
        >
          <div v-if="item.arrow">
            <img src="@/assets/img/arrow.png" height="100%" width="100%" alt />
          </div>
          <div v-else>
            <p class="value">{{item.value}}</p>
            <p class="label">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import * as d3 from "d3"
import { on, off } from "utils/dom"
export default {
  name: "Rotate3d",
  data() {
    return {
      list: [
        { name: "处理", value: 8, type: "country" },
        { name: "通报", value: 14, type: "province" },
        { name: "下发", value: 18, type: "enterprise" },
        { name: "研判", value: 74, type: "enterprise" },
        { name: "监测", value: 493, type: "enterprise" },
        { name: "验证", value: 6, type: "enterprise" }
      ],
      legendList: [
        {
          label: "国家",
          icon: require("@/assets/img/ministry/country_legend_icon.png")
        },
        {
          label: "省级",
          icon: require("@/assets/img/ministry/province_legend_icon.png")
        },
        {
          label: "企业",
          icon: require("@/assets/img/ministry/enterprise_legend_icon.png")
        }
      ],
      ellipse: null,
      obj: {}
    }
  },
  mounted() {
    this.getSvgContainerSize()
    on(window, "resize", this.getSvgContainerSize)
    // const path = this.ellipsePath(100, 100, 50, 20)
    // d3.select("svg").select('path').remove()
    // d3.select("svg")
    //   .append("path")
    //   .attr("d", path)
    //   .attr("stroke", "red")
  },
  beforeDestroy() {
    off(window, "resize", this.getSvgContainerSize)
  },
  methods: {
    ellipsePath(cx, cy, rx, ry) {
      //非数值单位计算，如当宽度像100%则移除
      if (isNaN(cx - cy + rx - ry)) return
      const path =
        "M" +
        (cx - rx) +
        " " +
        cy +
        "a" +
        rx +
        " " +
        ry +
        " 0 1 1 " +
        2 * rx +
        " 0" +
        "a" +
        rx +
        " " +
        ry +
        " 0 1 1 " +
        -2 * rx +
        " 0" +
        "z"
      return path
    },
    async getSvgContainerSize() {
      const container = d3.select(this.$refs.svg)
      const width = this.$refs.svg.clientWidth
      const height = this.$refs.svg.clientHeight
      const padding = 12
      const cx = width / 2
      const cy = height / 2
      const rx = width / 2 - padding
      const ry = height / 2 - padding
      this.obj = {cx, cy, rx, ry}
      // const path = this.ellipsePath(
      //   width / 2,
      //   height / 2,
      //   width / 2 - 12,
      //   height / 2 - 12
      // )
      const path = this.ellipsePath(cx, cy, rx, ry)
      const path1 = this.ellipsePath(
        width / 2,
        height / 2,
        width / 2 - 100,
        height / 2 - 50
      )
      
      // d3.select(this.$refs.svg)
      container.select("#path").remove()
      // d3.select(this.$refs.svg)
      container.select("#path1").remove()
      // d3.select(this.$refs.svg)
      //   .select("path")
      //   .remove()
      this.ellipse = container//d3.select(this.$refs.svg)
        .append("path")
        .attr("id", 'path')
        .attr("d", path)
        .attr("stroke", "url(#linear)")
        .attr("stroke-width", 3)
        .attr("fill", "transparent")
        .attr("filter", "url(#f3)")
      // d3.select(this.$refs.svg)
      container.append("path")
        .attr("id", 'path1')
        .attr("d", path1)
        .attr("stroke", "url(#linear)")
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr("filter", "url(#f3)")
      // d3.select("circle")
      //   .attr("cx", -2)
      //   .attr("cy", 0)
      //   .attr("r", 4)
      //   .attr("fill", "#f3d939")
      // const ellipseline = ellipse.node()
      // const len = ellipseline.getTotalLength()
      // const mCircle = container.select('#mCircle')
      const lineWidth = 5
      const flyline = container.append('path')
        .attr('id', 'flyline')
        .attr('stroke', '#a89840')
        .attr('fill', 'none')
        .attr('stroke-width', lineWidth)
        .attr('mask', "url(#Mask)")
        // .attr("filter", "url(#f3)")
      this.transition(flyline)
    },
    transition() {
      const _this = this
      const flyline = d3.select(this.$refs.svg).select('#flyline')
      const {cx, cy, rx, ry} = this.obj
      const ellipseline = this.ellipse.node()
      const len = ellipseline.getTotalLength()
      const mCircle = d3.select(this.$refs.svg).select('#mCircle')
      flyline.transition()
        .duration(10000)
        .ease(d3.easeLinear)
        .attrTween('d', function (d) {
          return function (t) {
            const p = ellipseline.getPointAtLength(t * len)
            let path
            if (t < 0.5) {
              path = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${p.x} ${p.y}`
            } else if (t >= 0.5) {
              const start = ellipseline.getPointAtLength((t < 0.75 ? 0.4 : 0.5) * len)
              path = `M ${start.x} ${start.y} A ${rx} ${ry} 0 0 1 ${p.x} ${p.y}`
              // t 接近于1时，基本path是一个椭圆，蒙版的存在，会显示两段飞线
              // path = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${p.x} ${p.y}` 
            }
            mCircle.attr('cx', p.x)
              .attr('cy', p.y)
            return path
          }
        })
        .on('end', _this.transition)
    }
  }
}
</script>
<style lang="less" scoped>
.rotate3d {
  position: relative;
  .legend-list {
    position: absolute;
    left: 10px;
    top: 10px;
    li {
      line-height: 2vh;
      font-size: 1.4vh;
      margin-bottom: 5px;
      align-items: center;
      color: #b0c6f2;
      .legend-color {
        width: 1.5vh;
        height: 1.5vh;
        margin-right: 6px;
      }
    }
  }
  .rotate3d-center {
    width: 24vh;//12vmax;//calc(~"100% - 150px");
    height: 24vh;//12vmax;
    position: absolute;
    // left: calc(~'50% - 6vmax');//75px;
    left: calc(~'50% - 12vh');//75px;
    top: calc(~'50% - 20vh');
    z-index:9999999;
    // transform-style: preserve-3d;
    // transform: rotateX(-20deg);
  }
  .stage {
    width: calc(~"100% - 150px");
    height: 60%;
    position: absolute;
    left: 75px;
    top: 20%;
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }

  .rotate3d-item {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    z-index: 200;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    // &:before {
    //   content: "";
    //   width: 60%;
    //   height: 90%;
    //   border-radius: 100%;
    //   background: radial-gradient(#1529b1, #2f3871);
    //   position: absolute;
    //   bottom: -70%;
    //   transform: rotateX(-75deg);
    // }
    .value {
      font-size: 36px;
      font-family: DS-Digital;
      text-align: center;
    }
    .label {
      text-align: center;
    }
    &.rotate3d-item-1 {
      width: 120px;
      height: 120px;
      bottom: -20px;
      left: 14%;
      .value {
        font-size: 40px;
      }
    }
    &.rotate3d-item-2 {
      width: 120px;
      height: 120px;
      bottom: -20px;
      right: 14%;
      .value {
        font-size: 40px;
      }
    }
    &.rotate3d-item-3 {
      top: calc(~"50% - 60px");
      right: -30px;
    }
    &.rotate3d-item-4 {
      width: 90px;
      height: 90px;
      top: -10px;
      right: 20%;
      .value {
        font-size: 28px;
      }
    }
    &.rotate3d-item-5 {
      width: 90px;
      height: 90px;
      top: -10px;
      left: 20%;
      .value {
        font-size: 28px;
      }
    }
    &.rotate3d-item-6 {
      top: calc(~"50% - 60px");
      left: -30px;
    }
  }
}
</style>

