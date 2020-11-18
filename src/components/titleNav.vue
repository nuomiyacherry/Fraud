<template>
  <div class="titleNav">
    <div v-for="(item, index) in titleNavList" :key="index">
      <div class="borderBox">
        <div class="left">
          <span :class="['icon', 'iconfont', item.iconName]"></span>
        </div>
        <div class="center">{{item.title}}</div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'titleNav',
  props: {
    titleNavList: {
      type: Array,
      default: () => [
        {iconName: 'iconmenu', title: '企业安全'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.titleNav {
  .borderBox {
    display: flex;
    float: left;
    width: 130px;
    height: 30px;
    line-height:30px;
    color: #fff;
    font-size: 14px;
    position: relative;
    margin-right: 15px;
    .left {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      background-color: #4868e7;
      border-radius: 50%;
      span {
        position: relative;
      }
    }
    .center {
      flex: 4;
      padding-left: 26px;
      margin-left: 24px;
      float: left;
      left: -20px;
      background-image: radial-gradient(circle at -6px 15px, transparent 20px, #4868e7 21px);
    }
    .right {
      flex: 1;
      background-image: linear-gradient(235deg, transparent 4px, #4868e7 0);
    }
  }
}
</style>

