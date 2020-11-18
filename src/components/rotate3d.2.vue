<template>
  <section class="rotate3d" ref="rotate3d">
    <div class="scene">
      <div v-for="i in count" :key="i" :class="`rotate-item rotate-item-${i}`" ref="div">{{i}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Rotate3D",
  data() {
    return {
      count: 10,
      speed: 0.002
    };
  },
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less">
.rotate3d {
  perspective: 1000px;
  // perspective-origin: 50% 50%;
  height: 100%;
  transform-style: preserve-3d;
  // backface-visibility: visible;
  transform: rotateX(-45deg);

  // overflow: hidden;
  @count: 10;
  @deg: 360deg / @count;
  @translateZ: 150px;
  .loop(@i) when (@i <= @count) {
    .rotate-item-@{i} {
      transform: rotateY(@deg * @i) translateZ(@translateZ);
      background: saturate(hsl(90, 80%, 50%), 0.1 * 1);
    }
    .loop(@i + 1);
  }
  .scene {
    position: relative;
    perspective: 1000px;
    // height: 100%;
    margin: 0 auto;
    padding: 30px 0;
    width: 100px;
    height: 50px;
    transform-style: preserve-3d;
    .rotate-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 100%;
    }
    .loop(1);
  }
}
</style>
