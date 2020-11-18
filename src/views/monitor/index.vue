<template>
  <div class='monitor'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="11">
        <div class="ratio12">
          <div class="row-h h-1">
            <div class="wrapper pr left-chart-list">
              <ChartBox title="各省反诈系统预警">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="warningTableData" size="mini" stripe ref="warningScrollTable">
                      <el-table-column prop="" label="域名" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.domain" target="view_window">{{scope.row.domain}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="fraudType" label="诈骗类型" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="province" label="预警省份" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="time" label="预警时间" show-overflow-tooltip></el-table-column> 
                    </el-table>
                  </div>
                </div>
              </ChartBox>
              <ChartBox title="各省反诈系统劝阻">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="dissuadeTableData" size="mini" stripe ref="dissuadeScrollTable">
                      <el-table-column prop="dissuadeObject" label="劝阻对象" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="location" label="归属地" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="simulateObject" label="冒充对象" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="case" label="案件" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="occurrenceTime" label="发生时间" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-2">
            <div class="wrapper">
              <ChartBox>
                <div slot="chart" class="left-bottom">
                  <!-- <PieChart :chartData="disposedType" :radius="['60%','80%']" :center="['30%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true"></PieChart> -->
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="ratio21">
          <div class="row-h h-2">
            <div class="wrapper pr map-box">
              <div class="map-title">涉诈网站全球访问监测</div>
              <!-- <VisualMapChart :chartData="mapData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="受害者数量"></VisualMapChart> -->
              <div class="crosswise-scroll-box">
                <div class="scroll-title">涉诈舆情预警</div>
                <vueSeamless :data='warningList' :class-option="defaultOption" class="seamless-warp warning-list">
                  <ul ref="scrollUl" class="scroll-ul">
                    <li v-for="(item,index) in warningList" :key="index" ref="scrollLi">
                      <span class="waning-time">{{item.findTime}}</span>
                      <span class="waning-title">{{item.title}}</span>
                    </li>
                  </ul>
                </vueSeamless>
              </div>
              <!-- <MapLineScatterChart mapType="world" :mapZoom="1.2" :layoutCenter="['50%', '50%']" :chartData="worldMapData" :mapLineOpacity="0.07" :effectSymbolSize="4" :symbolSize="4"></MapLineScatterChart> -->
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper chart-list">
              <ChartBox title="涉诈互联网账号监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="netAccountMonitorTableData" size="mini" stripe ref="netAccountMonitorScrollTable">
                      <el-table-column prop="account" label="账号" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="type" label="类型" width="60px" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="source" label="来源" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.source" target="view_window">{{scope.row.source}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="findTime" label="发现时间" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
              <ChartBox title="涉诈APP监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="appMonitorTableData" size="mini" stripe ref="appMonitorScrollTable">
                      <el-table-column prop="appName" label="名称" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="label" label="标签" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="findTime" label="发现时间" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
              <ChartBox title="涉诈网站监测">
                <div slot="chart">
                  <div class="full-block">
                    <el-table height="100%" :data="websiteMonitorTableData" size="mini" stripe ref="websiteMonitorScrollTable">
                      <el-table-column prop="url" label="网址" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.url" target="view_window">{{scope.row.url}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="findTime" label="发现时间" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Monitor',
  mixins: [sameMixin],
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.monitor {
  // width: 100%;
  // background: url(~assets/img/monitor/page.png) no-repeat center center / 100% 100%;
  .left-bottom{
    background-image: url('~assets/img/monitor/monitor.gif');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .map-title {
    width:2.4rem;
    color: #0cfbff;
    background-image: url('~assets/img/graphTitle.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 0.16rem;
    height: 36px;
    line-height: 36px;
    text-align: center;
    position: absolute;
    top:0;
    left:0;
    z-index:10;
  }
  .crosswise-scroll-box{
    position: absolute;
    top:5px;
    left:2.5rem;
    right:18%;
    background: #133A4F;
    height:30px;
    line-height: 30px;
    font-size: 12px;//0.16rem;
    padding:0 10px;
    .scroll-title{
      color:#3BA6D8;
      float:left;
      margin-right:5px;
    }
    .warning-list{
      float:left;
      width:calc(~'100% - 80px');
      overflow: hidden;
      height:30px;
      li{
        float: left;
        white-space: nowrap;
        color:#52bbce;
        .waning-time{
          margin:0 10px;
        }
      }
    }
  }
  .left-chart-list{
    .chart-box {
      width: 50%;
      float: left;
    }
  }
  .chart-list{
    .chart-box {
      width: 33.33%;
      float: left;
    }
  }
  .map-box {
    background: url(~assets/img/border.png) no-repeat center center / 100% 100%;
  }
}

</style>
