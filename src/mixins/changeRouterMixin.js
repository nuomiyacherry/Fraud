import storage from 'utils/storage'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'backupState'
    ])
  },
  methods: {
    changeRouter(path, params = null) {
      this.setRouteConf({
        flag: true,
        params,
        fromPath: this.$route.path
      })
      const lastRoutes = storage.get('lastRoutes')
      !lastRoutes.includes(path) && lastRoutes.push(path)
      storage.set('lastRoutes', lastRoutes)
      this.$router.push(path)
    },
    ...mapActions([
      'setRouteConf'
    ])
  }
}
