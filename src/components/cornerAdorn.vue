<template>
  <div class="corner-adorn">
    <div class="corner-adorn-top-left adorn-line"></div>
    <div class="corner-adorn-top-right adorn-line"></div>
    <div class="corner-adorn-bottom-left adorn-line"></div>
    <div class="corner-adorn-bottom-right adorn-line"></div>
  </div>
</template>

<script>
export default {
  name: "CornerAdorn"
};
</script>

<style lang="less" scoped>
.corner-adorn {
  @deepColor: #80734d;
  @lightenColor: #bdbd2f;
  @borderWidth: 2px;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-top: @borderWidth solid @deepColor;
  border-bottom: @borderWidth solid @deepColor;

  @lgw: 15px;
  @mdw: @lgw / 3 * 2;
  @smw: @lgw / 3;
  @h: 12px;
  .adorn-line {
    width: @lgw;
    height: @h;
    border-top: @borderWidth solid @lightenColor;
    position: absolute;
    top: -@borderWidth;
    left: 0;

    &::before,
    &::after {
      content: "";
      display: inline-block;
      height: @borderWidth;
      background: @lightenColor;
      position: absolute;
      left: 0;
    }
    &::before {
      width: @mdw;
      top: 3px;
    }
    &::after {
      width: @smw;
      bottom: 0;
    }

    &.corner-adorn-top-right {
      left: calc(~"100% - @{lgw}");
      transform: rotateY(180deg);
    }

    &.corner-adorn-bottom-left {
      top: calc(~"100% - @{h} + @{borderWidth}");
      transform: rotateX(180deg);
    }
    &.corner-adorn-bottom-right {
      left: calc(~"100% - @{lgw}");
      top: calc(~"100% - @{h} + @{borderWidth}");
      transform: rotateX(180deg) rotateY(180deg);
    }
  }
}
</style>
