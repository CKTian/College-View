<!-- home首页面 -->
<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  methods: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$http.defaults.headers.common['Authorization'] === undefined) {
        if (localStorage.getItem('token') !== null) {
          vm.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        } else {
          next('/')
        }
      }
    })
  }
}
</script>
<style scoped>
</style>