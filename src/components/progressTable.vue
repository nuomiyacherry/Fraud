<template>
  <div class="progress-table-box" ref="progressTable">
    <el-table :data="tableData"  :default-expand-all="true" :show-header="tableHeaderShow" class="progress-table" height="100%">
      <el-table-column type="expand" width="1px" align="center">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.percent+'%'" placement="bottom">
            <el-progress :class="{'gradual':gradualProgress}" :color="progressColor" :percentage="scope.row.percent" :show-text="false"></el-progress>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="排名" width="65" align="center">
        <template slot-scope="scope">
          NO.{{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="left" show-overflow-tooltip v-for="(item,index) in tableHeader" :key="index" :prop="item.prop" :label="item.label" :width="index === tableHeader.length - 1 ? '100' : 'auto'">
        <template slot-scope="scope" >
          <el-button v-if="item.canClick" type="text" class="table-btn" @click="handleClick(scope.row)">{{scope.row[item.prop]}}</el-button>
          <div v-else :style="{'color':item.color||'rgb(139, 156, 196)'}">{{scope.row[item.prop]}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ProgressTable',
  props: {
    tableHeader: {
      type: Array,
      default: () => ([])
    },
    tableHeaderShow: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => ([])
    },
    progressColor: {
      type: String,
      default: '#5CBD9F'
    },
    gradualProgress: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    handleClick(item) {
      console.log(item, '====item====')
      this.$emit('tableHeaderClick', item)
    }
  }
}
</script>
<style lang="less">

</style>


