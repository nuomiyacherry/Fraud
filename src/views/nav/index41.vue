<template>
  <div class='nav'>
    <el-row>
      <el-col :span="3" class="wrapper-left">
        <!-- <div class="item" v-for="item in btnList[0]" :key="item.name">
          <div class="btn" @click="handleClick(item)">
            {{item.name}}
          </div>
        </div> -->
      </el-col>
      <el-col :span="18" class="center">
        <div class="nav-total">
          <ul>
            <li v-for="(item,index) in totalList" :key="index">
              <span class="label">{{item.label}}</span>
              <span class="value">{{item.value}}</span>
            </li>
          </ul>
        </div>
        <div class="carousel">
          <el-carousel :interval="4000" type="card" indicator-position="none" arrow="never" :autoplay="autoplay" ref="carousel" @change="changeHandle">
            <el-carousel-item v-for="(item, index) in sysMenus" v-if="!item.hidden" :key="index">
              <div class="screenshot" @click="setActive(item, index)">
                <img :src="require(`assets/img/nav${item.path}.png`)" height="100%" width="100%" alt="">
                <div class="el-carousel__mask"></div>
                <!-- <p class="name">{{item.meta.title}}</p> -->
              </div>
            </el-carousel-item>
          </el-carousel>
          <a class="arrow arrow-left" href="javascript:;" @click="prev"></a>
          <a class="arrow arrow-right" href="javascript:;" @click="next"></a>
        </div>
        <!-- <div class="conner conner-lb"></div> -->
        <div class="conner conner-rt"></div>
        <div class="stage"></div>
        <p class="name">{{name}}</p>
        <div class="flow-arrow left"></div>
        <div class="flow-arrow right"></div>
      </el-col>
      <el-col :span="3" class="wrapper-right">
        <!-- <div class="item" v-for="item in btnList[1]" :key="item.name">
          <div class="btn" @click="handleClick(item)">
            {{item.name}}
          </div>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { initBtnList } from '@/api/common'
// import { getGroupArray } from '@/constants/utils'
import { getOverview } from '@/api/nav'
import { mapGetters } from 'vuex'
import {insertSeparator} from 'utils/util'
export default {
  name: 'Nav',
  props: {},
  components: {},
  data() {
    return {
      // btnList: [],
      sysMenus: [],
      autoplay: false,
      activeIndex: 0,
      name: '',
      totalList: []
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  created() {},
  mounted() {
    // this.initBtnList()
    this.getOverview()
    this.initMenus()
  },
  methods: {
    // async initBtnList() {
    //   const res = await this.$simpleAsyncTo(initBtnList(), '获取按钮列表失败！')
    //   if (res) {
    //     this.btnList = getGroupArray(res.returnModel, 4)
    //   }
    // },
    async getOverview() {
      const res = await this.$simpleAsyncTo(getOverview(), '获取态势总览失败')
      if (res) {
        this.totalList = res.returnModel
        this.totalList.forEach(item => {
          item.value = insertSeparator(item.value)
        })
      }
    },
    handleClick(item) {
      this.$router.push(item.path)
    },
    initMenus() {
      this.menus.forEach(menu => {
        if ( menu.path !== '/nav') {
          this.sysMenus.push(menu)
        }
      })
      console.log('this.sysMenus', this.sysMenus)
    },
    setActive(menu, index) {
      if (this.activeIndex !== index) return
      this.$router.push(menu.path)
    },
    prev() {
      this.$refs.carousel.prev()
    },
    next() {
      this.$refs.carousel.next()
    },
    changeHandle(index) {
      this.activeIndex = index
      this.name = this.sysMenus[index].meta.title
    }
  }
}
</script>

<style scoped lang="less">
</style>
