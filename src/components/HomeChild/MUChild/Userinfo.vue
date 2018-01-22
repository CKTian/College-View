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
    <el-button class="updateInfoButton" type="text" @click="toShowMUChild('/#/home/ManageUserinfo/UpdateBasicInfo')">修改个人</el-button>
    <div class="basicInfo">
      <p>姓名：{{student.name}}</p>
      <p>用户名：{{getAccount}}</p>
      <p>班级: {{team_name}}</p>
      <p>性别：{{getGender}}</p>
      <p>电话：{{getTel}}</p>
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
    getTel () {
      return this.$store.state.BasicInfo.tel
    },
    getGender: {
      get: function () {
        if (this.$store.state.User.gender === 0) {
          return '男'
        } else if (this.$store.state.User.gender === 1) {
          return '女'
        }
      },
      set: function () {
      }
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
    toShowMUChild (MUChildHref) {
      location.href = MUChildHref
    }
  },
  beforeMount () {
    // 获取vuex中当前登录用户的权限值
    let roleId = this.getRole_id
    this.account = this.getAccount // 调用计算方法 拿用户名
    let sex = this.getGender // 拿性别
    console.log(sex)
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