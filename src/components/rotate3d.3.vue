<template>
  <section class="rotate3d" ref="rotate3d">
    <div class="stage" ref="stage">
      <!-- <div class="rotate3d-center">
      </div>-->
      <img class="rotate3d-center" src="@/assets/img/ministry/center.png" alt />
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
      <div class="rotate3d-up-decorates">
        <div v-for="i in 3" :key="i" :class="`rotate3d-up-decorate rotate3d-up-decorate-${i}`"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCircleDividePoint } from "@/utils/util";
import { on, off, setStyles } from "@/utils/dom";
export default {
  name: "Rotate3D",
  data() {
    return {
      list: [
        { name: "处理", value: 8, type: "country" },
        { name: "通报", value: 14, type: "province" },
        { name: "下发", value: 18, type: "enterprise" },
        { name: "研判", value: 74, type: "enterprise" },
        { name: "监测", value: 493, type: "enterprise" },
        { name: "验证", value: 6, type: "enterprise" }
      ]
    };
  },
  created() {
    this.setKeyframeStyle();
    // this.list = this.list.reduce((prev, cur, index) => {
    //   prev.push(
    //     cur,
    //     {name: `arrow${index}`, arrow: true}
    //   )
    //   return prev
    // }, [])
    // console.log(this.list)
  },
  mounted() {
    this.setLoyout();
    on(window, "resize", this.setLoyout);
  },
  destroyed() {
    off(window, "resize", this.setLoyout);
  },
  methods: {
    setLoyout() {
      const rotate3d = this.$refs.rotate3d,
        stage = this.$refs.stage,
        pWidth = rotate3d.offsetWidth,
        pHeight = rotate3d.offsetHeight,
        items = this.$refs.item,
        item = items[0],
        width = item.clientWidth,
        size = Math.min(pWidth, pHeight) + width,
        points = getCircleDividePoint(
          size / 2,
          size / 2,
          size / 2,
          this.list.length
        );
      setStyles(this.$refs.stage, {
        width: `${size}px`,
        height: `${size}px`,
        top: `-${width / 2}px`
      });
      points.forEach((point, i) => {
        setStyles(items[i], {
          left: `${point.x - width / 2}px`,
          top: `${point.y - width / 2}px`
        });
      });
    },
    setKeyframeStyle() {
      const count = this.list.length,
        keyframeGap = 100 / count,
        rotateGap = 360 / count,
        minScale = 0.5,
        maxScale = 1.2,
        scaleGap = ((maxScale - minScale) / count) * 2,
        classPrefix = "rotate3dItemRotate",
        rotateX = -90;
      let style = "";
      for (let i = 0; i < count; i++) {
        let middleFrames = "",
          scale;
        if (i === 0) {
          scale = maxScale;
          middleFrames += `
            50% {
              transform: rotateX(${rotateX}deg) rotateY(180deg) scale(${minScale});
            }
          `;
        } else if (i === count / 2) {
          scale = minScale;
          middleFrames += `
            50% {
              transform: rotateX(${rotateX}deg) rotateY(180deg) scale(${maxScale});
            }
          `;
        } else if (i < count / 2) {
          middleFrames += `
            ${keyframeGap * i}% {
              transform: rotateX(${rotateX}deg) rotateY(${rotateGap *
            i}deg) scale(${maxScale});
            }
            ${100 / 2 + keyframeGap * i}% {
              transform: rotateX(${rotateX}deg) rotateY(${360 / 2 +
            rotateGap * i}deg) scale(${minScale});
            }
          `;
          scale = 1 - scaleGap * i;
        } else {
          const secondFrame = 100 / 2 - (100 - keyframeGap * i),
            secondRotate = 360 / 2 - (360 - rotateGap * i);
          middleFrames += `
            ${secondFrame}% {
              transform: rotateX(${rotateX}deg) rotateY(${secondRotate}deg) scale(${minScale});
            }
            ${100 / 2 + secondFrame}% {
              transform: rotateX(${rotateX}deg) rotateY(${360 / 2 +
            secondRotate}deg) scale(${maxScale});
            }
          `;
          scale = i * scaleGap;
        }
        style += `
          @keyframes ${classPrefix}${i + 1} {
            0% {
              transform: rotateX(${rotateX}deg) rotateY(0deg) scale(${scale});
            }
            ${middleFrames}
            100% {
              transform: rotateX(${rotateX}deg) rotateY(360deg) scale(${scale});
            }
          }
        `;
      }
      !this.style && (this.style = document.createElement("style"));
      this.style.textContent = style;
      document.head.appendChild(this.style);
    }
  }
};
</script>

<style lang="less">
.rotate3d {
  width: 100%;
  height: 100%;
  overflow: hidden;

  @rotate: 65deg;
  .stage {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    perspective: 1000px;
    transform-style: preserve-3d;
    transform: rotateX(@rotate);
    margin: auto;
    position: relative;
  }

  @rotateItem: -90deg;
  .rotate3d-center {
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: rotateX(@rotateItem) translate(-50%, 0);
    // transform: rotateX(-65deg) rotateY(-19deg) translate(-50%, -10%);
    transform: rotateX(-65deg) rotateY(0deg) translate(-50%, -10%);
    width: 100%;
    height: 50%;

    // background: hsl(90, 66%, 72%);
    .box {
      width: 50%;
      height: 50%;
    }
  }

  @animateDuration: 15s;
  .rotate3d-box {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    border: 2px dashed #eeff00;
    border-radius: 100%;
    animation: rotate @animateDuration linear infinite;

    // &:before {
    //   content: '';
    //   width: 100%;
    //   height: 100%;
    //   border-radius: 100%;
    //   background: radial-gradient(#0a1fad, #2f3871);
    //   position: absolute;
    // }
    .rotate3d-item {
      width: 80px;
      height: 80px;
      position: absolute;
      transform: rotateX(@rotateItem);
      border-radius: 100%;
      background-color: #7f8fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;

      &:before {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background: radial-gradient(#1529b1, #2f3871);
        position: absolute;
        bottom: -70%;
        transform: rotateX(-75deg);
      }

      // &:after {
      //   content: '';
      //   width: 100%;
      //   height: 100%;
      //   border-radius: 100%;
      //   background: radial-gradient(#1529b1, #2f3871);
      //   position: absolute;
      // }

      img {
        width: 100%;
        height: 100%;
      }
      .value {
        font-size: 24px;
        font-family: DS-Digital;
      }
    }
    @count: 6;
    .loop(@i) when (@i <= @count) {
      .rotate3d-item-@{i} {
        @name: ~"rotate3dItemRotate@{i}";

        animation: @name @animateDuration linear infinite;
        // animation: rotateBox @animateDuration linear infinite;
      }
      .loop(@i + 1);
    }
    .loop(1);
  }

  @keyframes rotateBox {
    0% {
      transform: rotate(0deg) scale(1);
    }
  }
  .rotate3d-up-decorates {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    // border: 2px dashed #2F52AF;
    border-radius: 100%;
    transform: translate3d(0, -55px, -70px) scale(1.3);
    .rotate3d-up-decorate {
      position: absolute;
      width: 100%;
      height: 100%;
      // border: 1px solid #2F52AF;
      border-radius: 100%;
    }

    @count: 3;
    .loopDecorate(@i) when (@i < @count) {
      .rotate3d-up-decorate-@{i} {
        transform: scale(1 - @i * 0.2);
      }
      .loopDecorate(@i + 1);
    }
    .loopDecorate(1);
  }
  // @count: 6;
  // @per: 1 / @count;
  // @minScale: 0.5;
  // @maxScale: 1.2;
  // @perScale: (@maxScale - @minScale) / @count;
  // .loopKeyframes(@i) when (@i < @count) {
  //   @keyframes rotateItem_@{i} {
  //     0% {
  //       transform: rotateX(rotateItem) rotateY(0deg) scale(1 - @perScale * @i);
  //     }

  //     50% {
  //       transform: rotateX(rotateItem) rotateY(180deg) scale(1);
  //     }

  //     100% {
  //       transform: rotateX(rotateItem) rotateY(360deg) scale(@minScale);
  //     }
  //   }
  // }
}
</style>
