export default {
  data() {
    return {
      pageFilters: {
        pageIndex: 0, // 后台使用
        pageSize: 15,
        index: 1 // 前台分页使用
      },
      pageSizes: [15, 20, 30, 50],
      total: 0
    }
  },
  methods: {
    // 一页显示多少条
    handleSizeChange(val) {
      this.pageFilters.pageSize = val
      this.handleCurrentChange(1)
    },
    // 上下页
    handleCurrentChange(val) {
      this.pageFilters.index = val
      this.pageFilters.pageIndex = (val - 1) * this.pageFilters.pageSize
      this.getTableList()
    }
  }
}
