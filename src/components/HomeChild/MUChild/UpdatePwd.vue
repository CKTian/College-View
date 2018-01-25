<!-- 修改密码组件 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>
    修改密码
    <p> {{getUserBasic}},您好：</p>
    <el-input v-model='newPwd' placeholder="新密码" type="password"></el-input>
    <el-input v-model="makeSurePwd" placeholder="再次输入" type="password"></el-input>
    <el-button @click="returnView('/#/home/ManageUserinfo')" type="info" plain >取消</el-button>
    <el-button @click="changePwd()" class="checkin" plain>提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      id: '',
      newPwd: '',
      makeSurePwd: ''
    }
  },
  components: {},
  computed: {
    // 获取用户基本信息的用户名
    getUserBasic () {
      return this.$store.state.BasicInfo.basicInfo[2].value
    }
  },
  methods: {
    returnView (returnHref) {
      location.href = returnHref
    },
    changePwd () { // 更改密码
      // 判断两次的密码是否一致
      // 根据id 去修改
      this.$http.post('/home/StudentController/updatePwd.do', {pwd: this.newPwd}).then(
        response => {
          if (response.data.value === '1') {
            location.href = '/'
            // 修改成功
            this.$notify({
              title: 'ok~',
              message: '密码修改成功,请重新登录',
              type: 'success'
            })
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改密码错啦')
        }
      )
    }
  }
}
</script>
<style scoped>
.kuang{
  width: 30%;
  border: 1px black solid;
  margin-top: 10px;
  float: right;
}
.icon-vertical_line{
  font-weight: 900;
  color: #FF905C;
}
.checkin{
  background-color: #2BC4B7;
}
</style>