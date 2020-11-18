<template>
  <div class="wrapper-view">
    <!-- <keep-alive> -->
    <!-- <transition name="custom-classes-transition" mode="out-in" enter-active-class="animated heartBeat" > -->
        <!-- leave-active-class="animated bounceOutRight" -->
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
    <!-- </keep-alive> -->
  </div>
</template>
