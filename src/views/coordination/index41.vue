<template>
  <div class='coordination'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="7">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈互联网账号监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="netAccountMonitorTableData" size="mini" stripe ref="netAccountMonitorScrollTable" >
                      <el-table-column prop="account" label="账号" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="source" label="来源" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.source" target="view_window">{{scope.row.source}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="findTime" label="发现时间" align="center" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="appMonitorTableData" size="mini" stripe ref="appMonitorScrollTable">
                      <el-table-column prop="appName" label="名称" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a @click="handleClick(scope.row)">{{scope.row.appName}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="label" label="诈骗类型" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="findTime" label="发现时间" align="center" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="websiteMonitorTableData" size="mini" stripe ref="websiteMonitorScrollTable" >
                      <el-table-column prop="url" label="网址" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.url" target="view_window">{{scope.row.url}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="findTime" label="发现时间" align="center" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="full-block pr">
          <div class="cus-title">涉诈数据处置概览</div>
          <div class="btns">
            <span :class="{'active': videoName == 'domain'}" @click="clickBtn('domain')">域名处置</span>
            <span :class="{'active': videoName == 'app'}" @click="clickBtn('app')">APP处置</span>
            <span :class="{'active': videoName == 'wechat'}" @click="clickBtn('wechat')">互联网账号处置</span>
          </div>
          <div class="top-data">
            <span>已处置域名：<span class="num" @click="openDialog(topData.domain,'已处置域名','domain')">{{topData.domain}}</span></span>
            <span>已处置APP：<span class="num" @click="openDialog(topData.app,'已处置APP','app')">{{topData.app}}</span></span>
            <span>已处置互联网账号：<span class="num" @click="openDialog(topData.internetAccount,'已处置互联网账号','account')">{{topData.internetAccount}}</span></span>
          </div>
          <div class="full-block" style="padding-bottom:0.1rem;">
            <video ref="Video" width="100%" height="100%" :src="videoSrc" autoplay="autoplay" muted loop="loop"></video>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="ratio11">
          <div class="row-h h-1">
            <div class="wrapper pr left-chart-list">
              <ChartBox title="实时预警能力">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="warningTableData" size="mini" stripe ref="warningScrollTable">
                      <el-table-column prop="" label="域名" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.domain" target="view_window">{{scope.row.domain}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fraudType" label="诈骗类型" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="province" label="预警省份" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="time" label="预警时间" align="center" show-overflow-tooltip></el-table-column> 
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="实时劝阻能力">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="dissuadeTableData" size="mini" stripe ref="dissuadeScrollTable">
                      <el-table-column prop="dissuadeObject" label="劝阻对象" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="location" label="手机号定位" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="simulateObject" label="冒充对象" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="case" label="案件" align="center" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="occurrenceTime" label="发生时间" align="center" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
          <!-- <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="赌博杀猪盘网站用户量及访问量趋势">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="activeBtnType" size="mini" @change="changeLineData">
                      <el-radio-button v-for="item in websiteTrendBtns" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart :chartData="websiteTrendLineData" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <!-- :custom-class="'dispose-'+dialogType" -->
    <el-dialog :title="dialogTitle" :visible.sync="dialoggVisible" :append-to-body="true" width="36%" top="10vh" >
      <div class="dispose-list" v-loading="loading" element-loading-background="rgba(36,72,98,1)">
        <ul>
          <li class="list-item" v-for="(item,index) in disposeList" :key="index">
            <div class="item-group" v-for="(d, inx) in getGroupArray(item)" :key="inx">
              <div class="item" v-for="(v,i) in d" :key="i">
                <i :class="['icon','iconfont',v.icon]"></i>
                <span class="item-label">{{v.name}}</span>
                <span class="item-value">{{v.value}}</span>
              </div>
            </div>
          </li>
        </ul>
        <!-- <el-pagination prev-text="上一页" next-text="下一页" :page-size="5" :pager-count="7" layout="prev, pager, next" :total="total"></el-pagination> -->
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="fraudAppDetailVisible" :append-to-body="true" width="28%" top="12vh" >
      <div class="fraud-app-detail" >
        <ul>
          <li class="large">
            <i class="icon iconfont iconAPP"></i>
            <span class="label">APP名称：</span>
            <span class="value">{{selectedAppInfo.appName}}</span>
          </li>
          <li class="small">
            <i class="icon iconfont icongongdan"></i>
            <span class="label">分类：</span>
            <span class="value">{{selectedAppInfo.appType}}</span>
          </li>
          <li class="block">
            <i class="icon iconfont iconname"></i>
            <span class="label">标签：</span>
            <span class="value">{{selectedAppInfo.tags}}</span>
          </li>
          <li class="large">
            <i class="icon iconfont iconshijian"></i>
            <span class="label">发现时间：</span>
            <span class="value">{{selectedAppInfo.findTime}}</span>
          </li>
          <li class="small">
            <i class="icon iconfont iconziyuan"></i>
            <span class="label">诈骗类型：</span>
            <span class="value">{{selectedAppInfo.label}}</span>
          </li>
          <li class="block">
            <i class="icon iconfont iconshijian"></i>
            <span class="label">发布时间：</span>
            <span class="value">{{selectedAppInfo.publishTime}}</span>
          </li>
        </ul>
        <div class="desc">{{selectedAppInfo.desc}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Coordination',
  mixins: [sameMixin],
  props: {},
  components: {},
  data() {
    return {
      videoSrc: require('@/assets/videos/domain41.mp4')
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    clickBtn(value) {
      this.videoName = value
      this.videoSrc = require(`@/assets/videos/${this.videoName}41.mp4`)
    }
  }
}
</script>

<style scoped lang="less">
.coordination{
  .top-data{
    position: absolute;
    top: 0.4rem;
    left: 0;//35%;
    right:0;
    z-index:100;
    display: flex;
    justify-content: center;
    &>span{
      font-size: 0.12rem;
      padding: 0.05rem 0.2rem;
      background: rgba(29,61,86,0.8);//#082640;
      margin-left: 0.05rem;
      // float: left;      
    }
    .num{
      font-family: 'DS-Digital';
      color: #efc45e;
      font-size: 0.2rem;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .btns{
    position: absolute;
    top: 0.05rem;//10px;
    right: 10px;//0.8rem;
    font-size: 0.14rem;
    // width: 100%;
    text-align: right;
    z-index: 10;
    // height: 30px;
    // margin-bottom: 10px;
    span{
      float: left;
      padding: 0.05rem 0.08rem;
      margin-left: 10px;
      border: 1px solid #3F6A79;
      background: #1A3E4E;
      color: #6AB3CE;
      cursor: pointer;
      &.active{
        border: 1px solid #22A1BF;
        color: #0CFBFF;
      }
      &:hover{
        border: 1px solid #22A1BF;
        color: #0CFBFF;
      }
    }
    
  }
  video{
    object-fit: fill;
  }
}
</style>
