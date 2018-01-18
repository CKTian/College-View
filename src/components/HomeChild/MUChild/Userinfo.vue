<!-- 用户个人信息模块  -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>个人信息管理
    <div>
      <svg class="icon headIcon" aria-hidden="true">
        <use :xlink:href="iconHref"></use>
      </svg>
      <el-button class="updatePwdButton" type="text" @click="toShowMUChild('/#/home/ManageUserinfo/UpdatePwd')">修改密码</el-button>
    </div>
    <i class="iconfont icon-icon11"></i>
    <el-button class="updateInfoButton" type="text">修改个人</el-button>
    <div class="basicInfo">
      <p>姓名：{{student.name}}</p>
      <p>用户名：{{account}}</p>
      <p>班级: {{team_name}}</p>
      <p>性别：{{gender}}</p>
      <p>电话：{{student.tel}}</p>
      <p>奖惩：{{student.reward}}</p>
      <p>学分：{{student.point}}</p>
    </div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconHref: '',
      account: '',
      gender: '',
      student: {
        id: '',
        user_id: '',
        name: '',
        team_id: '',
        tel: '',
        reward: '',
        point: ''
      },
      team_name: ''
    }
  },
  components: {},
  computed: {
    getRole_id () {
      return this.$store.state.User.role_id
    },
    getId () {
      return this.$store.state.User.id
    },
    getAccount () {
      return this.$store.state.User.account
    },
    getGender () {
      return this.$store.state.User.gender
    }
  },
  methods: {
    changeHeadIcon (roleId) { // 根据权限显示头像
      if (roleId === 0) {
        // 超级管理员
        this.iconHref = '#icon-lingdao'
      } else if (roleId === 1) {
        // 老师
        this.iconHref = '#icon-nvshi'
      } else {
        // 同学
        this.iconHref = '#icon-nvtongxue'
      }
    },
    selectUserinfo () { // 查询个人基本信息
      this.$http.post('/home/StudentController/getBasicInfo.do').then(
        response => {
          let result = response.data
          this.student = result.student
          this.team_name = result.team_name
          console.log('111' + this.student.name)
          // 把信息放到vuex中
          this.$store.commit('basicInfo', {student: result.student, team_name: result.team_name})
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询个人信息错啦')
        }
      )
    },
    checkSex (sex) {
      if (sex === 0) {
        this.gender = '男'
      } else {
        this.gender = '女'
      }
    },
    toShowMUChild (MUChildHref) {
      location.href = MUChildHref
    }
  },
  beforeRouteEnter (to, from, next) { // 守卫
    next(vm => {
      vm.selectUserinfo(vm)
    })
  },
  beforeMount () {
    // 获取vuex中当前登录用户的权限值
    let roleId = this.getRole_id
    this.account = this.getAccount // 调用计算方法 拿用户名
    let sex = this.getGender // 拿性别
    // 判断性别
    this.checkSex(sex)
    // 显示头像
    this.changeHeadIcon(roleId)
    // 根据id 查询个人信息
    this.selectUserinfo()
  }
}
</script>
<style scoped>
.headIcon{
  width: 100px;
  height: 100px;
}
.kuang{
  width: 50%;
  border: 1px solid black
}
.updatePwdButton{
  display: block;
}
.icon-icon11{
  font-size: 26px;
}
.icon-vertical_line{
  font-weight: 900;
  color: #FF905C;
}
</style>