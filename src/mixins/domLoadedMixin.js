export default {
  data() {
    return {
      domLoaded: {}
    }
  },
  mounted() {
    this.transferPropsToDomLoaded()
  },
  methods: {
    transferPropsToDomLoaded() {
      this.domLoaded = this.$props
      // console.log('transferPropsToDomLoaded:', this, this.$props, this.domLoaded)
    }
  }
}
