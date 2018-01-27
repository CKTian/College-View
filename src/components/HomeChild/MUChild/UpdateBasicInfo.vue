<!-- 修改个人基本信息vue -->
<template>
  <div class="kuang">
     <i class="iconfont icon-vertical_line"></i>
    修改个人信息
    <p> {{getUserBasic}},您好：</p>
    <p v-if="getUser.role_id === 2">电话：</p><el-input  v-model="genderBasicTel" v-if="getUser.role_id === 2"></el-input>
    性别：<el-radio-group v-model="getUserGender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
    <el-button @click="returnView('/#/home/ManageUserinfo')" type="info" plain >取消</el-button>
    <el-button @click="changeBasic()" class="checkin" plain>提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '',
      gender: '',
      name: '',
      id: ''
    }
  },
  components: {},
  computed: {
     // 获取用户基本信息的用户名
    getUserBasic () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        return this.$store.state.BasicInfo.basicInfo[2].value
      }
      return ''
    },
    getUserGender: {
      get: function () {
        if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
          console.log(this.$store.state.BasicInfo.basicInfo[3].value)
          return this.$store.state.BasicInfo.basicInfo[3].value
        }
        return 0
      },
      set: function (val) {
        this.$store.commit('changeGender', val)
      }
    },
    genderBasicTel: {
      get: function () {
        if (this.$store.state.BasicInfo.basicInfo.length !== 0 && this.$store.state.User.role_id === 2) {
          return this.$store.state.BasicInfo.basicInfo[5].value
        }
        return ''
      },
      set: function (val) {
        this.$store.commit('changeTel', val)
      }
    },
    getUser () {
      return this.$store.state.User
    }
  },
  methods: {
    returnView (returnHref) {
      location.href = returnHref
    },
    changeBasic () { // 修改基本信息
      let tel = ''
      if (this.getUser.role_id === 2) {
        tel = this.genderBasicTel
      }
      this.$http.post(`${this.getUser.router}UpdateBasicInfo.do`, {tel: tel, gender: this.getUserGender}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.$notify({
              title: 'ok~',
              message: '个人信息修改成功',
              type: 'success'
            })
            location.href = '/#/home/ManageUserinfo'
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改个人基本信息出错啦')
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
}
</style>