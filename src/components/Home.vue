<!-- home首页面 -->
<template>
  <div>
    <div class="home-nav" 
         :style="{'width':navShow.style.width}">
      <Nav @change="changeWidth"></Nav>
    </div>
    <div class="home-show" 
         :style="{'left':homeShow.style.left,'width':homeShow.style.width}">
      <i class="iconfont icon-shouye9 tofirst" @click="toFirst()"></i>
      <i class="iconfont icon-out tologin" @click="toLogin()"></i>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './HomeChild/Nav'
const NavBigwidth = '200px'
const NavSmallwidth = '50px'
export default {
  data () {
    return {
      isunfold: true,
      homeShow: {
        style: {
          left: NavBigwidth,
          width: this.getShowWidth(NavBigwidth)
        }
      },
      navShow: {
        style: {
          width: NavBigwidth
        }
      }
    }
  },
  components: {
    Nav
  },
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
  methods: {
    /**
     * 根据导航栏的宽度获取展示块的宽度
     * @param {String} navWidth 导航栏宽度
     * @returns {String} 展示块宽度
     */
    getShowWidth (navWidth) {
      return 'calc(100% - ' + navWidth + ')'
    },
    /**
     * 改变Nav宽度
     */
    changeWidth () {
      this.isunfold = !this.isunfold
      if (this.isunfold) {
        // 如果展开的时候
        this.homeShow.style.left = NavBigwidth
        this.homeShow.style.width = this.getShowWidth(NavBigwidth)
        this.navShow.style.width = NavBigwidth
      } else {
        // 如果缩紧的时候
        this.homeShow.style.left = NavSmallwidth
        this.homeShow.style.width = this.getShowWidth(NavSmallwidth)
        this.navShow.style.width = NavSmallwidth
      }
    },
     /**
     * 判断当前浏览器中是否存在token
     * @param {Object} vm vue实例指的是home
     */
    judgeToken (vm) {
      if (vm.$http.defaults.headers.common['Authorization'] === undefined) {
        if (localStorage.getItem('token') !== null) {
          vm.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
          vm.$http.post('/home/GetTokenController/token.do').then(
            response => {
              let result = response.data
              console.log(response)
              // 判断 状态
              if (result.status.value === '1') {
                // 根据登录者的权限分配路由
                let router = ''
                if (result.userMap.role_id === 0) {
                  router = '/home/SuperController/'
                } else if (result.userMap.role_id === 1) {
                  router = '/home/TeacherController/'
                  this.selectTeacherUserinfo(router)
                } else if (result.userMap.role_id === 2) {
                  router = '/home/StudentController/'
                  this.selectStudentUserinfo(router)
                }
                // 成功->把信息存入vuex
                vm.$store.commit('userInfo', {user: result.userMap, router})
              } else if (result.status.value === '0') {
                // 失败->
                vm.$http.defaults.headers.common['Authorization'] = ''
                window.localStorage.clear()
                // 返回login页
                location.href = '/#/'
              }
            }
          ).catch(
            error => {
              console.log(error)
              console.log('出登录错啦')
            }
          )
        } else {
          location.href = '/#/'
        }
      }
    },
    toFirst () {
      location.href = '/#/home/First'
    },
    toLogin () {
      this.$http.defaults.headers.common['Authorization'] = ''
      window.localStorage.clear()
      location.href = '/'
    },
    selectStudentUserinfo (router) { // 查询个人基本信息
      this.$http.post(`${router}getBasicInfo.do`).then(
        response => {
          let result = response.data
          this.student = result.student
          this.team_name = result.team_name
          // 把信息放到vuex中
          this.$store.commit('basicInfo', {student: result.student, team_name: result.team_name})
          console.log('UserInfo' + result.student)
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询个人信息错啦')
        }
      )
    },
    selectTeacherUserinfo (router) { // 查询老师个人基本信息
      this.$http.post(`${router}getBasicInfo.do`).then(
        response => {
          let result = response.data
          console.log(result)
          // 把信息放到vuex中
          this.$store.commit('tBasicInfo', result)
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询个人信息错啦')
        }
      )
    }
  },
  /**
   * @param {Object} to 之前的router
   * @param {Object} from 之后的router
   * @param {Function} next 调用即可去到指定router
   */
  beforeRouteEnter (to, from, next) { // 守卫
    next(vm => {
      vm.judgeToken(vm)
    })
  },
  /**
   * mount之前
   */
  beforeMount () {
    console.log('守卫')
    this.judgeToken(this)
  }
}
</script>
<style scoped>
.home-nav {
  height: 100%;
  position: fixed;
  left: 0;
  transition: .2s;
}
.home-show {
  padding: 8px 1% 20px;
  background: #F5F6F7;
  position: absolute;
  transition: .2s;
  left: 0;
  box-sizing: border-box;
}
i:hover{
  cursor: pointer;
}
.tofirst{
  position: absolute;
  right: 0;
  font-size: 20px;
  font-weight: 800;
}
.tologin{
  float: right;
  margin-right: 10px;
  font-size: 20px;
}
</style>