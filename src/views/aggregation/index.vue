<template>
  <div class='aggregation' v-loading="loading">
    <el-row class="main-height" :gutter="10">
      <el-col :span="20">
        <div class="ratio21">
          <div class="row-h h-2">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="wrapper">
                  <ChartBox title="涉诈数据来源总览">
                    <div slot="chart" class="flow">
                      <img src="@/assets/img/data-gather3.gif" height="100%" width="100%" alt="">
                      <!-- <div class="flow-item" v-for="parent in flowData" :key="parent.type">
                        <div></div>
                      </div> -->
                    </div>
                  </ChartBox>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="wrapper map3d">
                  <div class="title">省平台对接现状</div>
                  <!-- <div ref="map3d"></div>
                  <ul class="visual-map">
                    <li v-for="(item, index) in mapAreaColor" :key="index">
                      <span :style="{'background-color': item.color}"></span>{{item.value}}
                    </li>
                  </ul> -->
                   <!-- mapItemborderColor="#98a3bd" -->
                  <VisualMapChart :pieces="pieces" :chartData="mapData" mapType="china" :roam="true" visualMapType="piecewise" :mapLabelEmphasisShow="true" :shadowBlur="0" tooltipFormatter="ministry" :visualMapBottom="20" :visualMapLeft="20"   mapItemborderColor="#032539"></VisualMapChart>
                  <!-- 011329 -->
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="row-h h-1">
            <div class="wrapper chart-list chart-list-row">
              <ChartBox title="管局上报">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line1type" size="mini" @change="changeLineData1">
                      <el-radio-button v-for="item in buttonList1" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart
                    :chartData="line1data"
                    :smooth="true"
                    :legendLeft="40"
                    :legendRight="40"
                    :gridTop="30"
                    :gridBottom="5"
                    :showLineArea="true"
                    :legendShow="false"
                    :colors="['#E77434']"
                    :areaStartColors="['#E77434']"
                    :areaEndColors="['rgba(0, 0, 0, 0)']"
                  ></LineChart>
                </div>
              </ChartBox>
              <ChartBox title="自主发现">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line2type" size="mini" @change="changeLineData2">
                      <el-radio-button v-for="item in buttonList2" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart
                    :chartData="line2data"
                    :smooth="true"
                    :legendLeft="40"
                    :legendRight="40"
                    :gridTop="30"
                    :gridBottom="5"
                    :showLineArea="true"
                    :legendShow="false"
                    :colors="['#01A3DF']"
                    :areaStartColors="['#01A3DF']"
                    :areaEndColors="['rgba(0, 0, 0, 0)']"
                  ></LineChart>
                </div>
              </ChartBox>
              <ChartBox title="基础企业上报">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line3type" size="mini">
                      <el-radio-button v-for="item in buttonList3" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart
                    :chartData="line3data"
                    :smooth="true"
                    :legendLeft="40"
                    :legendRight="40"
                    :gridTop="30"
                    :gridBottom="5"
                    :showLineArea="true"
                    :legendShow="false"
                    :colors="['#E77434']"
                    :areaStartColors="['#E77434']"
                    :areaEndColors="['rgba(0, 0, 0, 0)']"
                  ></LineChart>
                </div>
              </ChartBox>
              <ChartBox title="12321举报">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line4type" size="mini">
                      <el-radio-button v-for="item in buttonList4" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart
                    :chartData="line4data"
                    :smooth="true"
                    :legendLeft="40"
                    :legendRight="40"
                    :gridTop="30"
                    :gridBottom="5"
                    :showLineArea="true"
                    :legendShow="false"
                    :colors="['#01A3DF']"
                    :areaStartColors="['#01A3DF']"
                    :areaEndColors="['rgba(0, 0, 0, 0)']"
                  ></LineChart>
                </div>
              </ChartBox>
              <!-- <ChartBox title="公安协同">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line5type" size="mini" @change="changeLineData5">
                      <el-radio-button v-for="item in buttonList5" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <LineChart
                    :chartData="line5data"
                    :smooth="true"
                    :legendLeft="40"
                    :legendRight="40"
                    :gridTop="30"
                    :gridBottom="5"
                    :showLineArea="true"
                    :legendShow="false"
                    :colors="['#E77434']"
                    :areaStartColors="['#E77434']"
                    :areaEndColors="['rgba(0, 0, 0, 0)']"
                  ></LineChart>
                </div>
              </ChartBox> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ratio1111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈域名累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData1"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网址累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData3"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>   
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData4"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>         
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈短信累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData2"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
                 
          <!-- <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ号累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData5"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Aggregation',
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
.aggregation {
  .chart-list {
    .chart-box {
      width: 25%;
      float: left;
    }
  }
  .map3d {
    position: relative;
    background: url(~assets/img/border.png) no-repeat center center / 100% 100%;
    .title {
      position: absolute;
      left: 10px;
      top: 10px;
      height: 40px;
      line-height: 40px;
      padding: 0 25px;
      font-size: 0.16rem;
      color: #0cfbff;
      background: url(~assets/img/special-title.png) no-repeat center center / 100% 100%;
      z-index: 100;
    }
  }
  .visual-map{
    position: absolute;
    bottom: 20px;
    left: 30px;
    font-size: 12px;
    // line-height: 15px;
    li {
      margin-bottom: 8px;

      span {
        display: inline-block;
        height: 15px;
        width: 25px;
        border-radius: 3px;
        margin-right: 5px;
        vertical-align: middle;
        margin-top: -4px;
      }
    }
  }
}
</style>
