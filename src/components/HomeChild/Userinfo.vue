<!-- 用户个人信息模块  -->
<template>
  <div>
    <div>
      <svg class="icon headIcon" aria-hidden="true">
        <use :xlink:href="iconHref"></use>
      </svg>
    </div>
    <el-button type="text">修改密码</el-button>
    姓名：{{student.name}}
    用户名：{{account}}
    班级: {{team_name}}
    性别：{{gender}}
    电话：{{student.tel}}
    奖惩：{{student.reward}}
    学分：{{student.point}}
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
        console.log('111')
        this.iconHref = '#icon-nvtongxue'
      }
    },
    selectUserinfo () { // 查询个人基本信息
      this.$http.post('/home/StudentController/getBasicInfo.do').then(
        response => {
          let result = response.data
          this.student = result.student
          this.team_name = result.team_name
        }
      ).catch(
        error => {
          console.log(error)
          console.log('出登录错啦')
        }
      )
    }
  },
  beforeMount () {
    // 获取vuex中当前登录用户的权限值
    let roleId = this.getRole_id
    this.account = this.getAccount // 调用计算方法 拿用户名
    this.gender = this.getGender // 拿性别
    console.log(this.gender)
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
</style>