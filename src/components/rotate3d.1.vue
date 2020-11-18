<template>
  <section class="rotate3d" ref="rotate3d">
    <div class="scene">
      <div class="rotate-center"></div>
      <div v-for="i in count" :key="i" :class="`rotate-item rotate-item-${i}`" ref="div">{{i}}</div>
    </div>
  </section>
</template>

<script>
import { on, off, setStyles } from "utils/dom";
export default {
  name: "Rotate3D",
  data() {
    return {
      count: 6,
      speed: 0.006,
      minScale: 0.5,
      maxScale: 1
    };
  },
  mounted() {
    this.setLayout();
    this.animation();
    on(window, "resize", this.setLayout);
  },
  destroyed() {
    off(window, "resize", this.setLayout);
  },
  methods: {
    setLayout() {
      const container = this.$refs.rotate3d,
        width = container.offsetWidth,
        height = container.offsetHeight,
        div = this.$refs.div[0],
        dWidth = div.offsetWidth,
        dHeight = div.offsetHeight,
        padding = 0;

      this.scaleDelta = (this.maxScale - this.minScale) / 2;
      let rx, ry;
      rx = (width - dWidth) / 2;
      ry = (height - dHeight) / 2;
      this.radius = (rx > ry ? ry : rx) + padding;
      this.origin = {
        x: rx,
        y: ry
      };
      this.maxY = this.origin.y + this.radius;
    },
    animation() {
      this.$refs.div &&
        this.$refs.div.forEach((el, i) => {
          !el.angle &&
            (el.angle = -((Math.PI * 2) / this.$refs.div.length) * i);
          this.rotate(el);
        });
      requestAnimationFrame(this.animation.bind(this));
    },
    rotate(el) {
      el.angle += this.speed;
      el.angle > Math.PI * this.radius && (el.angle -= Math.PI * this.radius);
      el.x = this.radius * Math.sin(el.angle) + this.origin.x;
      el.z = this.radius * Math.cos(el.angle) - this.origin.x;
      el.y = this.radius * Math.cos(el.angle) + this.origin.y;
      const scale = 1 - this.scaleDelta + (el.y * this.scaleDelta) / this.maxY;
      setStyles(el, {
        transform: `translate3d(${el.x}px, ${el.y}px, ${el.z}px) scale(${scale})`,
        left: 0,
        top: 0,
        opacity: 1
      });
    }
  }
};
</script>

<style lang="less">
.rotate3d {
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: visible;
  .scene {
    position: relative;
    height: 100%;
    // transform-style: preserve-3d;
    transform: rotateX(70deg);

    .rotate-center {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      background: red;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .rotate-item {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80px;
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      text-align: center;
      border-radius: 100%;
      transition: all 0.2s linear;
      transform: translate(-50%, -50%);
      opacity: 0;
      // -webkit-box-reflect: below 0
      //   linear-gradient(
      //     180deg,
      //     rgba(255, 255, 255, 0),
      //     rgba(255, 255, 255, 0) 30%,
      //     rgba(255, 255, 255, 0.3)
      //   );

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        transform-origin: 50% 100%;
        transform: rotateX(90deg) translatez(-3px) translateY(-5px);
        // transform: rotateX(45deg);
        // box-shadow: inset 0px -100px 100px -100px #585247;
      }
    }
    @count: 6;
    @deg: 1 / @count * 30;
    .loop(@i) when (@i <= @count) {
      .rotate-item-@{i} {
        background-color: darken(hsl(90, 80%, 50%), @deg * @i);
      }
      .loop(@i + 1);
    }
    .loop(1);
  }
}
</style>
