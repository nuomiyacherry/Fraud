<template>
  <svg class="funnel-chart" ref="svg">
    <defs />
  </svg>
</template>

<script>
import * as d3 from "d3";
import { on, off } from "utils/dom";

const id = `funnel_${Date.now().toString(32)}_`;

export default {
  name: "",
  props: {
    colors: {
      type: Array,
      default: _ => ["#595af1", "#2193EC", "#16CDF6", "#11B8B0", "#43D3B8"]
    },
    gradientTransfer: "20%",
    data: {
      type: Array,
      // default: () => []
      default: () => [
        { name: "电信电信", value: 52412 },
        { name: "阿里", value: 45123 },
        { name: "腾讯", value: 34215 },
        { name: "华为", value: 21345 },
        { name: "移动", value: 12345 }
      ]
    }
  },
  data() {
    return {
      chartData: [],
      curColors: []
    };
  },
  mounted() {
    this.render();
    on(window, "resize", this.render);
  },
  beforeDestroy() {
    off(window, "resize", this.render);
  },
  methods: {
    render() {
      this.svg = d3.select(this.$refs.svg);
      this.handlerLayout();
      this.processColor();
      this.setRadialGradient();
      this.draw();
    },
    handlerLayout() {
      const width = this.$refs.svg.clientWidth,
        height = this.$refs.svg.clientHeight,
        len = this.data.length,
        longestItem = this.data.reduce(
          (prev, cur) =>
            prev.name.length * 2 + (prev.value + "").length >
            cur.name.length * 2 + (cur.value + "").length
              ? prev
              : cur,
          { name: "", value: "" }
        ),
        itemHeight = height / len,
        itemWidth =
          (width -
            longestItem.name.length * 12 -
            (longestItem.value + "").length * 6) /
          2,
        circlePieceWidth = itemWidth / len,
        lineGap = 5;

      this.chartData = this.data.map((item, i) => {
        const circleWidth = circlePieceWidth * (len - i),
          cx = itemWidth / 2,
          cy = itemHeight * i + itemHeight / 2,
          rx = circleWidth / 2;

        return {
          ...item,
          circleWidth,
          cx,
          cy,
          width: itemWidth,
          height: itemHeight,
          color: this.colors[i],
          rx: rx,
          ry: itemHeight / 3,
          x1: cx + rx + lineGap,
          y1: cy,
          x2: itemWidth * 2 - lineGap,
          y2: cy,
          tx: itemWidth * 2,
          ty: cy,
          text: item.name + " " + item.value
        };
      });
    },
    draw() {
      this.svg.selectAll("g").remove();
      this.drawArea();
      this.drawItem();
      this.animate();
    },
    drawArea() {
      const area = this.svg.append("g").classed("funnel-area", true),
        groove = 3;
      this.chartData.forEach((d, index) => {
        if (index === 0) return;
        const { rx, cx, cy, color } = d,
          { rx: prx, cx: pcx, cy: pcy } = this.chartData[index - 1],
          prevItem = this.chartData[index - 1],
          centerGap = (cx - rx - (pcx - prx)) / 2,
          centerY = pcy + (cy - pcy) / 2,
          c = d3.color(color);
        c.opacity = 0.5;
        // 没有弧度
        // let path = `M ${cx - rx} ${cy} L ${cx + rx} ${cy} L ${prevItem.cx +
        //   prevItem.rx} ${prevItem.cy} L ${prevItem.cx - prevItem.rx} ${
        //   prevItem.cy
        // }`;
        // 有弧度
        let path = `M ${pcx - prx} ${pcy} `;
        path += `Q ${pcx - prx + (centerGap + groove)} ${centerY -
          groove * 2} ${cx - rx} ${cy} `;
        path += `L ${cx + rx} ${cy} `;
        path += `Q ${pcx + prx - (centerGap + groove)} ${centerY -
          groove * 2} ${pcx + prx} ${pcy} z`;

        area
          .append("path")
          .attr("d", path)
          .attr("fill", c.toString());
      });
    },
    drawItem() {
      this.svg
        .selectAll("g.funnel-item")
        .data(this.chartData)
        .enter()
        .append("g")
        .classed("funnel-item", true)
        .call(parent => {
          parent
            .append("ellipse")
            .attr("cx", d => d.cx)
            .attr("cy", d => d.cy)
            .attr("rx", d => d.rx)
            .attr("ry", d => d.ry)
            .attr("fill", (d, i) => `url(#${id}_Radial${i})`);
          parent
            .append("line")
            .attr("x1", d => d.x1)
            .attr("y1", d => d.y1)
            .attr("x2", d => d.x2)
            .attr("y2", d => d.y2)
            .attr("stroke", d => d.color)
            .attr("stroke-dasharray", "2, 2");
          parent
            .append("text")
            .attr("x", d => d.tx)
            .attr("y", d => d.ty)
            .attr("fill", d => d.color)
            .text(d => d.text);
        });
    },
    animate() {
      this.svg
        .selectAll("g.funnel-area path")
        .attr("opacity", 0)
        .transition()
        .each(function(d, i) {
          d3.select(this)
            .transition()
            .duration(d => {
              return i * 100;
            })
            .delay((i + 1) * 100)
            .attr("opacity", 1);
        });
      this.svg
        .selectAll("g.funnel-item")
        .attr("opacity", 0)
        .transition()
        .each(function(d, i) {
          d3.select(this)
            .transition()
            .delay(i * 100)
            .duration(d => {
              return i * 100;
            })
            .attr("opacity", 1);
        });
    },
    processColor() {
      this.curColors = this.colors.map(color => {
        const brighter = d3
          .hsl(color)
          .brighter(0.7)
          .hex();
        return [color, brighter];
      });
    },
    setRadialGradient() {
      this.svg.selectAll("radialGradient").remove();
      this.svg
        .select("defs")
        .selectAll("radialGradient")
        .data(this.curColors)
        .enter()
        .append("radialGradient")
        .attr("gradientUnits", "objectBoundingBox")
        .attr("id", (d, i) => `${id}_Radial${i}`)
        .attr("fx", "50%")
        .attr("fy", "50%")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "100%")
        .call(parent => {
          parent
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d => d[0])
            .attr("stop-opacity", 1);
          parent
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => d[1])
            .attr("stop-opacity", 1);
        });
    }
  }
};
</script>

<style lang="less">
.funnel-chart {
  height: 100%;
  width: 100%;

  text {
    font-size: 12px;
    dominant-baseline: middle;
  }
}
</style>
