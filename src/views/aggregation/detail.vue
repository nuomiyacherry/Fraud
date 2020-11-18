<template>
  <div class='detail aggregation-detail'>
    <el-row class="full-block">
      <el-col :span="24 - rightRatio">
        <ChartBox :hasBg="false" noPadding="no-padding" title="系统建设">
          <div slot="chart">
            <el-row class="full-block" :gutter="20">
              <el-col :span="8">
                <div class="ratio23 full-block">
                  <div class="row-h h-2">
                    <div class="wrapper block-bg">
                      <h3>所处建设阶段</h3>
                      <ul class="checkbox-group">
                        <li v-for="item in constructs" :key="item.label">
                          <el-checkbox v-model="item.value === 1" >{{item.label}}</el-checkbox>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row-h h-3 block-bg">
                    <div class="wrapper">
                      <h3>系统功能</h3>
                      <ul class="checkbox-group">
                        <li v-for="(item,i) in functions" :key="item.label" :class="[item.value === 1 ? 'li-f-check' + i : '']">
                          <el-checkbox v-model="item.value === 1" >
                            {{item.label}}
                            <span class="dec" v-if="item.dec" >
                              <span>(&nbsp;&nbsp;</span>
                              <span v-for="obj in item.dec" :key="obj.label">
                                <el-tooltip class="item" effect="dark" :content="obj.value" placement="bottom">
                                  <span>
                                    <span v-if="obj.label !== ''">{{obj.label}}： </span>
                                    {{obj.value}}
                                  </span>
                                </el-tooltip>
                              </span>
                              <span> &nbsp;&nbsp;) </span>
                            </span>
                          </el-checkbox>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="ratio41 full-block">
                  <div class="row-h h-4">
                    <div class="wrapper block-bg">
                      <h3>对接的外部系统</h3>
                      <ul class="checkbox-group check-detail">
                        <li v-for="(item,index) in external" :key="item.label" :class="[item.value === 1 ? 'li-check' + index : '']">
                          <el-checkbox v-model="item.value === 1">
                            {{item.label}}
                            <span v-if="item.dec" :class="['dec', index === 10 ? 'sys' : '']">
                              <el-tooltip effect="dark" placement="bottom">
                                <span slot="content">
                                  <span>(&nbsp;&nbsp;</span>
                                  <span v-for="obj in item.dec" :key="obj.label">
                                    <span v-if="obj.label !== ''">{{obj.label}}： </span> {{obj.value}}
                                  </span>
                                  <span> &nbsp;&nbsp;) </span>
                                </span>
                                <span>
                                  <span>(&nbsp;&nbsp;</span>
                                  <span v-for="obj in item.dec" :key="obj.label">
                                    <span v-if="obj.label !== ''">{{obj.label}}： </span> {{obj.value}}
                                  </span>
                                  <span> &nbsp;&nbsp;) </span>
                                </span>
                              </el-tooltip>
                            </span>
                          </el-checkbox>
                          <ul :class="['check-son', item.value === 1? 'is-checked': '' ]"  v-if="item.children">
                            <li> (&nbsp;&nbsp;</li>
                            <li v-for="obj in item.children" :key="obj.label">
                              <el-checkbox v-model="obj.value === 1" >
                                {{obj.label}}
                                <span v-if="obj.per" class="percent">{{obj.per}}%</span>
                                <span class="dec" v-if="obj.dec" >
                                  <el-tooltip effect="dark" placement="bottom">
                                    <span slot="content">
                                      <span>(&nbsp;&nbsp;</span>
                                      <span v-for="d in obj.dec" :key="d.label">
                                        <span v-if="d.label !== ''">{{d.label}}： </span> {{d.value}}
                                      </span>
                                      <span>&nbsp;)</span>
                                    </span>
                                    <span>
                                      <span>(&nbsp;&nbsp;</span>
                                      <span v-for="d in obj.dec" :key="d.label">
                                        <span v-if="d.label !== ''">{{d.label}}： </span> {{d.value}}
                                      </span>
                                      <span>&nbsp;)</span>
                                    </span>
                                  </el-tooltip>
                                </span>
                              </el-checkbox>
                            </li>
                            <li> &nbsp;&nbsp;) </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="row-h h-1 block-bg">
                    <h3>主要建设厂家</h3>
                    <div class="manufactor">
                      <span>厂家名称：{{manufactor}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </ChartBox>
      </el-col>
      <el-col :span="rightRatio" v-if="rightRatio !== 0">
        <ChartBox :hasBg="false" noPadding="no-padding" title="系统成效">
          <div slot="chart">
            <div class="full-block block-bg">
              <!-- <div class="list-num">
                <span v-for="item in disposed" :key="item.label">
                  {{item.label}}：<span class="num-val">{{item.value}}</span>;
                </span>
              </div>
              <div class="list-num">
                <span v-for="item in coordination" :key="item.label">
                  {{item.label}}：<span class="num-val">{{item.value}}</span>;
                </span>
              </div>
              <div class="list-num">
                <span>其他成效：<span class="num-val other">{{other}}</span></span>
              </div> -->
              <div class="list-num">
                <span class="num-val" v-html="content"></span>
              </div>
            </div>
          </div>
        </ChartBox>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Detail',
  mixins: [sameMixin],
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {
          constructs: [0, 0, 0, 0, 0, 0],
          functions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          funLinkage: '',
          funOther: '',
          external: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          extSpamSMS: [0, 0, 0],
          extMobileTraffic: [0, 0, 0],
          extMobilePercent: [0, 0, 0],
          extFixedTraffic: [0, 0, 0],
          extFixedPercent: [0, 0, 0],
          extInfoTraffic: [0, 0, 0],
          extJMR: [0, 0, 0, 0],
          extMalicious: [0, 0, 0, 0],
          extPhishing: [0, 0, 0, 0],
          extPhishingCompany: '',
          extThirdSystem: {
            name: '',
            company: ''
          },
          extOther: '',
          manufactor: '',
          effect: {
            disposed: {
              domian: '',
              url: '',
              app: '',
              account: ''
            },
            coordination: {
              submitDomian: '',
              submitUrl: '',
              submitApp: '',
              submitAccount: '',
              receiveDomian: '',
              receiveUrl: '',
              receiveApp: '',
              receiveAccount: ''
            },
            other: ''
          }
        }
      }
    }
  },
  components: {},
  watch: {
    detailData: {
      deep: true,
      handler(val) {
        this.initData(val)
      }
    }
  },
  data() {
    return {
      rightRatio: 0,
      constructs: [
        { label: '未立项', value: 0 },
        { label: '项目建议书阶段', value: 0 },
        { label: '可行性研究报告阶段', value: 0 },
        { label: '初步设计阶段', value: 0 },
        { label: '建设阶段', value: 0 },
        { label: '建设完成阶段', value: 0 }
      ],
      functions: [
        { label: '涉诈网站、网址分析研判能力', value: 0 },
        { label: '涉诈APP分析研判能力', value: 0 },
        { label: '涉诈微信/QQ号分析研判能力', value: 0 },
        { label: '人工审核确认', value: 0 },
        { label: '监测预警', value: 0 },
        { label: '关联分析', value: 0 },
        { label: '协同处置', value: 0 },
        { label: '报表呈现', value: 0 },
        {
          label: '公安联动',
          value: 0
          // dec: [
          //   {
          //     label: '',
          //     value: ''
          //   }
          // ]
        },
        {
          label: '其他',
          value: 0
          // dec: [
          //   { label: '', value: '' }
          // ]
        }
      ],
      external: [
        { label: '省管局IDC信安系统', value: 0 },
        { label: '省管局DNS信安系统', value: 0 },
        { label: '备案系统', value: 0 },
        {
          label: '运营商垃圾短信系统',
          value: 0,
          children: [
            { label: '电信', value: 0 },
            { label: '移动', value: 0 },
            { label: '联通', value: 0 }
          ]
        },
        {
          label: '运营商移动网流量',
          value: 0,
          children: [
            { label: '电信', value: 0, per: 0 },
            { label: '移动', value: 0, per: 0 },
            { label: '联通', value: 0, per: 0 }
          ]
        },
        {
          label: '运营商固网流量',
          value: 0,
          children: [
            { label: '电信', value: 0, per: 0 },
            { label: '移动', value: 0, per: 0 },
            { label: '联通', value: 0, per: 0 }
          ]
        },
        {
          label: '移动上网日志留存系统',
          value: 0,
          children: [
            { label: '电信', value: 0 },
            { label: '移动', value: 0 },
            { label: '联通', value: 0 }
          ]
        },
        {
          label: '僵木蠕系统',
          value: 0,
          children: [
            { label: '管局', value: 0 },
            { label: '电信', value: 0 },
            { label: '移动', value: 0 },
            { label: '联通', value: 0 }
          ]
        },
        {
          label: '移动恶意程序系统',
          value: 0,
          children: [
            { label: '管局', value: 0 },
            { label: '电信', value: 0 },
            { label: '移动', value: 0 },
            { label: '联通', value: 0 }
          ]
        },
        {
          label: '钓鱼、仿冒网站监测相关系统',
          value: 0,
          children: [
            { label: '电信', value: 0 },
            { label: '移动', value: 0 },
            { label: '联通', value: 0 },
            {
              label: '其他',
              value: 0
              // dec: [{ label: '', value: '' }]
            }
          ]
        },
        {
          label: '第三方反诈系统',
          value: 0
          // dec: [
          //   { label: '系统名称', value: '系统名称' },
          //   { label: '所属单位', value: '所属单位' }
          // ]
        },
        {
          label: '其他',
          value: 0
          // dec: [{ label: '功能', value: '请注明其他主要功能' }]
        }
      ],
      manufactor: '',
      disposed: [
        { label: '已处置涉诈域名数', value: '', str: 'domian' },
        { label: '涉诈URL数', value: '', str: 'url' },
        { label: '涉诈APP数', value: '', str: 'app' },
        { label: '涉诈互联网账号数', value: '', str: 'account' }
      ],
      coordination: [
        { label: '已与公安协同报送涉诈域名数', value: '', str: 'submitDomian' },
        { label: '接收涉诈域名数', value: '', str: 'receiveDomian' },
        { label: '报送涉诈URL数', value: '', str: 'submitUrl' },
        { label: '接收涉诈URL数', value: '', str: 'receiveUrl' },
        { label: '报送涉诈APP数', value: '', str: 'submitApp' },
        { label: '接收涉诈APP数', value: '', str: 'receiveApp' },
        { label: '报送涉诈互联网账号数', value: '', str: 'submitAccount' },
        { label: '接收涉诈互联网账号数', value: '', str: 'receiveAccount' }
      ],
      other: '',
      content: ''
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.initData(this.detailData)
  },
  methods: {
    initData(data) {
      if(data.constructs && data.constructs.length !== 0) {
        this.constructs = this.getValue(data.constructs, this.constructs)
      }
      if(data.functions && data.functions.length !== 0) {
        this.functions = this.getValue(data.functions, this.functions)
        if(this.functions[8].value === 1) {
          this.functions[8]['dec'] = []
          this.functions[8].dec.push({
            label: '联动内容',
            value: data.funLinkage
          })
        }
        if(this.functions[9].value === 1) {
          this.functions[9]['dec'] = []
          this.functions[9].dec.push({
            label: '',
            value: data.funOther
          })
        }
      }
      if(data.external && data.external.length !== 0) {
        this.external = this.getValue(data.external, this.external)
        this.external[3].children = this.getValue(data.extSpamSMS, this.external[3].children)
        this.external[4].children = this.getValue2(data.extMobileTraffic, data.extMobilePercent, this.external[4].children)
        this.external[5].children = this.getValue2(data.extFixedTraffic, data.extFixedPercent, this.external[5].children)
        this.external[6].children = this.getValue(data.extInfoTraffic, this.external[6].children)
        this.external[7].children = this.getValue(data.extJMR, this.external[7].children)
        this.external[8].children = this.getValue(data.extMalicious, this.external[8].children)
        this.external[9].children = this.getValue(data.extPhishing, this.external[9].children)
        if(this.external[9].value === 1) {
          if(this.external[9].children[3].value === 1) {
            this.external[9].children[3]['dec'] = []
            this.external[9].children[3].dec.push({
              label: '',
              value: data.extPhishingCompany
            })
          }
        }
        if(this.external[10].value === 1) {
          this.external[10]['dec'] = []
          this.external[10].dec.push({
            label: '系统名称',
            value: data.extThirdSystem.name
          })
          this.external[10].dec.push({
            label: '所属单位',
            value: data.extThirdSystem.company
          })
        }
        if(this.external[11].value === 1) {
          this.external[11]['dec'] = []
          this.external[11].dec.push({
            label: '',
            value: data.extOther
          })
        }
      }
      this.manufactor = data.manufactor
      if(data.effect) {
        if(data.effect.flag === 1) {
          this.rightRatio = 6
          if(data.effect.disposed) {
            const disposed = data.effect.disposed
            for(let key in disposed) {
              this.disposed.forEach(item => {
                if(item.str === key) {
                  item.value = disposed[key]
                }
              })
            }
          }
          if(data.effect.coordination) {
            const coordination = data.effect.coordination
            for(let key in coordination) {
              this.coordination.forEach(item => {
                if(item.str === key) {
                  item.value = coordination[key]
                }
              })
            }
          }
          this.other = data.effect.other
          this.content = data.effect.content
        } else {
          this.rightRatio = 0
        }
      }
    },
    getValue(source, target) {
      return target.map((item, index) => {
        item.value = source[index]
        return item
      })
    },
    getValue2(source1, source2, target) {
      return target.map((item, index) => {
        item.value = source1[index]
        item.per = source2[index]
        return item
      })
    }
  }
}
</script>

<style lang="less">
// 系统概况的详情
  .aggregation-detail {
    .el-checkbox {
      color: #3aa4d4 !important;
      .el-checkbox__label {
        font-size: 0.08rem;
        line-height: 0.2rem;
      }
      .el-checkbox__inner {
        border: 1px solid #3aa4d4;
        background-color: transparent;
        &::after {
          border-color: #e7a314;
        }
      }
      .el-checkbox__input.is-checked {
        .el-checkbox__inner {
          border: 1px solid #e7a314;
        }
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color:#e7a314;
      }
    }
    .checkbox-group {
      li {

        &.li-f-check8 {
          >label {
            .el-checkbox__label {
              width:100%;
              .dec {
                  width: calc(~'100% - 70px') !important;
                  display: inline-block;
                  vertical-align: top;
                }
            }
          }
        }
      }
      &.check-detail {
        >li {
          &.li-check10 {
            >label {
              width:100% !important;
              .el-checkbox__label {
                width:100% !important;
                
              }
            }
          }
        }
      }
    }

  }
</style>
<style scoped lang="less">
.detail {
  height: 100%;
  width: 100%;
  .block-bg {
    background: rgba(70, 196, 255, 0.1);
    border: 1px solid #124d87;
  }
  h3 {
    font-size: 0.1rem;
    color: #0cfbff;
    padding-left: 0.15rem;
    line-height: 0.2rem;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0.1rem;
      top: 0.07rem;
      height: 0.08rem;
      width: 0.02rem;
      background: #ffa600;
    }
  }
  .checkbox-group {
    height: calc(~'100% - 0.2rem');
    width: 100%;
    padding: 0.05rem 0.15rem;
    > li {
      line-height: 0.2rem;
      height: 0.2rem;
      width: 100%;
      
      // overflow: hidden;
      label {
        overflow: hidden;
        display: block;
        width: 100%;
        .dec {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    &.check-detail {
      > li {
        > label {
          vertical-align: top;
          display: inline-block;
          // float: left;
          width: auto;
          &.is-checked {
            .check-son {
              li {
                color: #ffa600;
              }
            }
          }
        }
        &.li-check9 {
          height:0.4rem;
        }
        &.li-check10 {
          >label {
            width:100% !important;
            .el-checkbox__label {
              width:100% !important;
              .dec {
                  &.sys {
                    width: calc(~'100% - 100px');
                    display: inline-block;
                    vertical-align: top;
                }
              }
            }
          }
        }
        .check-son {
          vertical-align: top;
          display: inline-block;
          // float: left;
          &.is-checked {
            li {
                color: #ffa600;
              }
          }
          li {
            font-size: 0.08rem;
            float: left;
            line-height: 0.2rem;
            height: 0.2rem;
            color: #3aa4d4;
            label {
              margin-right: 0.05rem;
            }
          }
        }
      }
    }
  }
  .percent {
    border-bottom: 1px solid #ffa600;
    padding: 0 0.05rem;
    color: #ffa600;
  }
  .manufactor {
    padding: 0.05rem 0.15rem;
    height: calc(~'100% - 0.2rem');
    span {
      font-size: 0.08rem;
      line-height: 0.16rem;
      color: #38a4d2;
      width: 100%;
      height: 100%;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  .list-num {
    font-size: 0.08rem;
    padding: 0.1rem 0.15rem;
    color: #38a4d2;
    line-height: 0.2rem;
    > span {
      &:first-child {
        // padding-left: 0.16rem;
      }
    }
    .num-val {
      display: inline-block;
      // border-bottom: 1px solid #2493ca;
      color: #ffa600;
      // padding: 0 0.1rem;
      &.other {
        padding: 0rem;
        display: inline;
        border-bottom: none;
        color: #38a4d2;
      }
    }
  }
}
</style>
