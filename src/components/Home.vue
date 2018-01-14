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
  computed: {
    getRoleId () {
      return this.$store.state.role_id
    }
  },
  created () {
    // 获取登陆者的权限
    // this.getRoleId
    // 显示该登陆者对应权限的组件
  },
  methods: {},
  beforeRouteEnter (to, from, next) { // 守卫
    next(vm => {
      if (vm.$http.defaults.headers.common['Authorization'] === undefined) {
        if (localStorage.getItem('token') !== null) {
          vm.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
          vm.$http.post('/Home/GetTokenController/token.do').then(
            response => {
              let result = response.data
              // 判断 状态
              if (result.status.value === '1') {
              // 成功->把信息存入vuex--------------------------------------------------------------------
                vm.$store.commit('userInfo', {id: result.id, account: result.account, role_id: result.role_id})
              } else {
                // 失败->
                vm.$http.defaults.headers.common['Authorization'] = ''
                window.localStorage.clear()
                // 返回login页
                location.href = '#/Login'
              }
            }
          ).catch(
            error => {
              console.log(error)
              console.log('出登录错啦')
            }
          )
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