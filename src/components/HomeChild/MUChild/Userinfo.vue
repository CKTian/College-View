<!-- 用户个人信息模块  -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>个人信息管理
    <div v-for="item in getUserBasic">
      <svg v-if="item.type === 'picture'" class="icon headIcon" aria-hidden="true">
        <use :xlink:href="item.value"></use>
      </svg>
      <p v-else>
        <span>{{item.name}}:</span>
        <span>{{item.value}}</span>
      </p>
    </div>
    
    <i class="iconfont icon-icon11"></i>
    <el-button class="updatePwdButton" type="text" @click="toShowMUChild('/#/home/ManageUserinfo/UpdatePwd')">修改密码</el-button>
    <el-button class="updateInfoButton" type="text" @click="toShowMUChild('/#/home/ManageUserinfo/UpdateBasicInfo')">修改个人</el-button>
    <div class="basicInfo">
      <!-- <p>姓名：{{getBasicInfo.name}}</p>
      <p>用户名：{{getUser.account}}</p>
      <p>班级: {{getBasicInfo.team_name}}</p>
      <p>性别：{{getGender}}</p>
      <p>电话：{{getBasicInfo.tel}}</p>
      <p>奖惩：{{getBasicInfo.reward}}</p>
      <p>学分：{{getBasicInfo.point}}</p> -->
      <p></p>
    </div> 
    <div>
      
    </div>
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
    getUserBasic () {
      return this.$store.state.BasicInfo.basicInfo
    }
  },
  methods: {
    // changeHeadIcon (roleId) { // 根据权限显示头像
    //   if (roleId === 0) {
    //     // 超级管理员
    //     this.iconHref = '#icon-lingdao'
    //   } else if (roleId === 1) {
    //     // 老师
    //     this.iconHref = '#icon-nvshi'
    //   } else if (roleId === 2) {
    //     // 同学
    //     this.iconHref = '#icon-nvtongxue'
    //   }
    // },
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