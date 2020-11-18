<template>
  <section class="rotate3d" ref="rotate3d">
    <div class="stage" ref="stage">
      <div
        class="rotate3d-center"
        :style="{'background':`url(${require('@/assets/img/ministry/center.png')}) 0 0 / 100% 100%`}"
      ></div>
      <!-- <img class="rotate3d-center" src="@/assets/img/ministry/center.png" alt=""> -->
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
      <!-- <div class="rotate3d-up-decorates">
        <div v-for="i in 3" :key="i" :class="`rotate3d-up-decorate rotate3d-up-decorate-${i}`"></div>
      </div>-->
    </div>
  </section>
</template>
<script>
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
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.rotate3d {
  width: calc(~"100% - 100px"); //100%;
  height: 64%;
  border-radius: 50%;
  position: relative;
  left: 50px;
  top: 18%;
  .rotate3d-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
    width: 100%;
    height: 110%;
  }
  .rotate3d-box {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    border: 2px dashed #eeff00;
    border-radius: 50%;
    // animation: rotate 20s linear infinite;
  }
  @keyframes animX {
    0% {
      left: -50px;
    }
    100% {
      left: calc(~"100% - 50px");
    }
  }
  @keyframes animY {
    0% {
      top: -50px;
    }
    100% {
      top: calc(~"100% - 50px");
    }
  }
  @keyframes scale {
    0% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.7);
    }
  }

  .rotate3d-item {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    .value {
      font-size: 36px;
      font-family: DS-Digital;
      text-align: center;
    }
    .label {
      text-align: center;
    }
  }
  //6个圆,x和y轴动画加起来是20s , 20/6 约等于 3.333 每个球y轴 从0递减3.333,x轴与y差10/2s
  //  .rotate3d-item-1 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -5s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;

  //   }

  //   .rotate3d-item-2 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -8.333s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) -3.333s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) -3.333s infinite alternate;
  //   }

  //   .rotate3d-item-3 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -11.666s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) -6.666s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) -6.666s infinite alternate;
  //   }

  //   .rotate3d-item-4 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -14.999s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) -9.999s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) -9.999s infinite alternate;
  //   }

  //   .rotate3d-item-5 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -18.332s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) -13.332s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) -13.332s infinite alternate;
  //   }

  //   .rotate3d-item-6 {
  //     animation: animX 10s cubic-bezier(0.36, 0, 0.64, 1) -21.665s infinite alternate,
  //     animY 10s cubic-bezier(0.36, 0, 0.64, 1) -16.665s infinite alternate,
  //     scale 20s cubic-bezier(0.36, 0, 0.64, 1) -16.665s infinite alternate;
  //   }
  @count: 6;
  @animationDuration: 20s;
  .loop(@i) when (@i <= @count) {
    .rotate3d-item-@{i} {
      animation: animX @animationDuration / 2 cubic-bezier(0.36, 0, 0.64, 1) -5s -
          ((@animationDuration / @count) * (@i - 1)) infinite alternate,
        animY @animationDuration / 2 cubic-bezier(0.36, 0, 0.64, 1) 0s -
          (@animationDuration / @count) * (@i - 1) infinite alternate,
        scale @animationDuration cubic-bezier(0.36, 0, 0.64, 1) 0s -
          (@animationDuration / @count) * (@i - 1) infinite alternate;
    }
    .loop(@i + 1);
  }
  .loop(1);
}
</style>

