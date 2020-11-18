<template>
  <div class='analysis'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="12">
        <el-col class="ratio21">
          <div class="row-h h-2">
            <div class="wrapper">
              <ChartBox title="大数据综合分析">
                <div slot="chart">
                  <img :src="leftImg" width="100%" height="100%"/>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <el-row class="full-block">
                <el-col :span="6">
                  <div class="wrapper">
                    <ChartBox title="">
                      <div slot="chart" >
                        <ul class="full-block total-ul">
                          <li class="pr" v-for="(item,index) in maptotalList" :key="index">
                            <CornerBg :border="false"></CornerBg>
                            <div class="label">{{item.label}}</div>
                            <div class="value">{{item.value}}</div>
                          </li>
                        </ul>
                      </div>
                    </ChartBox>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="wrapper">
                    <ChartBox title="私盘荐股诈骗域名总量">
                      <div slot="chart">
                        <LineChart
                          :chartData="line1data"
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
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="wrapper">
                    <ChartBox title="私盘荐股诈骗域名存活周期">
                      <div slot="chart">
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
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col class="ratio21">
          <div class="row-h h-2">
            <div class="wrapper">
              <div class="graphTitle">
                <div class="title">私盘推荐类诈骗聚合动态分析</div>
                <div v-for="(item, ind) in graphBtns" :key="ind" class="btn" :class="[{'active': item.active}, ind===0 ? 'btn-0':'',ind===1 ? 'btn-1':'',ind===2 ? 'btn-2':'',ind===3 ? 'btn-3':'',ind===4 ? 'btn-4':'']"  @click="changeGraph(item.name, ind)">
                  {{item.name}}
                </div>
              </div>
              <div class="graphContent">
                <img :src="rightGraphImg" width="98%" height="98%"/>
              </div>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <div class="full-block">
                <el-table height="100%" :data="tableData" size="mini" stripe :style="{background:bk,'border-color':bk1}" style="{opacity:0.6}">
                  <el-table-column prop="weChatQQ" label="微信QQ" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="isogeny" label="同源" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="ip" label="嫌疑人IP" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="control" label="操控" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="" label="涉诈域名" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <a :href="'http://'+scope.row.swindleDomain" target="view_window">{{scope.row.swindleDomain}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="analysis" label="解析" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="swindleMainframe" label="涉诈主机" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="dataTransmission" label="数据传输" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="appName" label="APP名称" show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
              <!-- <el-row class="full-block">
                <el-col :span="12">
                  <div class="wrapper">
                    <ChartBox title="涉诈资源集合更新趋势">
                       <div slot="chart">

                       </div>
                    </ChartBox>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="wrapper">
                    <ChartBox title="涉诈类型分析">
                      <div slot="chart">

                      </div>
                    </ChartBox>
                  </div>
                </el-col>
              </el-row> -->
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Analysis',
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

<style lang="less" scoped>
 .analysis {
   .el-table {
     a {
       color: #52bbce;
     }
   }
   .total-ul {
     li {
       /* width: calc(50% - 10px); */
       /* margin-right: 20px; */
       margin-bottom: 10px;
       vertical-align: top;
       background-color: #072446;
       display: block;
       /* float: left; */
       text-align: center;
       min-height: calc(33.333% - 10px);
       &:nth-of-type(even){
         margin-right: 0px;
       }
       .label {
         color:#96a8d9;
         font-size: 0.8vmax;
         padding: 1vh 1vw 0;
       }
       .value {
         color: #4ff1fd;
         font-family: 'DS-Digital';
         font-size: 1.2vmax;
         padding: 1vh 1vw;
       }
     }
   }
   .graphTitle {
     width: 100%;
     height: 36px;
     display: flex;
     div {
       margin-right: 5px;
       height: 100%;
       
       &.title {
         color: #0cfbff;
         flex: 4;
         background-image: url('~assets/img/graphTitle.png');
         background-size: 100% 100%;
         background-repeat: no-repeat;
         font-size: 0.16rem;
         height: 36px;
         line-height: 36px;
         text-align: center;
       }
       &.btn-0 {
         margin-top: 2px;
         flex:1;
         background: rgba(221,135,73,0.10);
          border: 1px solid #994222;
          color:#994222;
         font-size: 0.16rem;
         height: 32px;
         line-height: 32px;
         text-align: center;
         cursor: pointer;
         &.active {
           background: rgba(221,135,73,0.10);
            border: 1px solid #E0693C;
         }
       }
       &.btn-1 {
         margin-top: 2px;
         flex:1;
         background: rgba(67,120,226,0.10);
          border: 1px solid #325DD0;
          color:#325DD0;
         font-size: 0.16rem;
         height: 32px;
         line-height: 32px;
         text-align: center;
         cursor: pointer;
         &.active {
            background: rgba(67,120,226,0.10);
            border: 1px solid #5D89FF;
            color:#5D89FF;
         }
       }
       &.btn-2 {
         margin-top: 2px;
         flex:1;
        background: rgba(138,85,255,0.10);
        border: 1px solid #7B2CA5;
        color:#7B2CA5;
         font-size: 0.16rem;
         height: 32px;
         line-height: 32px;
         text-align: center;
         cursor: pointer;
         &.active {
            background: rgba(138,85,255,0.10);
            border: 1px solid #BD52F6;
            color:#BD52F6;
         }
       }
       &.btn-3 {
         margin-top: 2px;
         flex:1;
         background: rgba(90,201,225,0.10);
          border: 1px solid #2FB6D2;
          color:#2FB6D2;
         font-size: 0.16rem;
         height: 32px;
         line-height: 32px;
         text-align: center;
         cursor: pointer;
         &.active {
            background: rgba(90,201,225,0.10);
            border: 1px solid #45DFFF;
            color:#45DFFF;
         }
       }
       &.btn-4 {
         margin-top: 2px;
         flex:1;
         background: rgba(181,193,75,0.10);
        border: 1px solid #A1AB43;
        color:#A1AB43;
         font-size: 0.16rem;
         height: 32px;
         line-height: 32px;
         text-align: center;
         cursor: pointer;
         &.active {
            background: rgba(181,193,75,0.10);
            border: 1px solid #D2DF5D;
            color:#D2DF5D;
         }
       }
     }
   }
   .graphContent {
     width: 100%;
     height: calc(100% - 36px);
     padding: 1%;
   }
 }
</style>
