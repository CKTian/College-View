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
    <el-button v-if="getUser.role_id !== 0" class="updateInfoButton" type="text" @click="toShowMUChild('/#/home/ManageUserinfo/UpdateBasicInfo')">修改个人</el-button>
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
    },
    getUser () {
      return this.$store.state.User
    }
  },
  methods: {
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