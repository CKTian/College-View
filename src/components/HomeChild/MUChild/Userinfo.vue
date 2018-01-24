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
      <p>姓名：{{getBasicInfo.name}}</p>
      <p>用户名：{{getUser.account}}</p>
      <p>班级: {{getBasicInfo.team_name}}</p>
      <p>性别：{{getGender}}</p>
      <p>电话：{{getBasicInfo.tel}}</p>
      <p>奖惩：{{getBasicInfo.reward}}</p>
      <p>学分：{{getBasicInfo.point}}</p>
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
    getUser () {
      // 这里我们渲染图片
      this.changeHeadIcon(this.$store.state.User.role_id)
      // 获取vuex中存储的值
      return this.$store.state.User
    },
    getBasicInfo () {
      return this.$store.state.BasicInfo
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
      } else if (roleId === 2) {
        // 同学
        this.iconHref = '#icon-nvtongxue'
      }
    },
    toShowMUChild (MUChildHref) {
      location.href = MUChildHref
    }
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