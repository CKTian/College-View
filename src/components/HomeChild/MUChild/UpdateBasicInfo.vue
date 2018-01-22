<!-- 修改个人基本信息vue -->
<template>
  <div class="kuang">
     <i class="iconfont icon-vertical_line"></i>
    修改个人信息
    <p> {{genderBasicName}},您好：</p>
    电话：<el-input  v-model="genderBasicTel" ></el-input>
    性别：<el-radio-group v-model="getUserGender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
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
    getUserId () {
      return this.$store.state.User.id
    },
    getUserGender: {
      get: function () {
        return this.$store.state.User.gender
      },
      set: function (val) {
        this.$store.commit('changeGender', val)
      }
    },
    genderBasicName () {
      return this.$store.state.BasicInfo.name
    },
    genderBasicTel: {
      get: function () {
        return this.$store.state.BasicInfo.tel
      },
      set: function (val) {
        this.$store.commit('changeTel', val)
      }
    }
  },
  methods: {
    getVuexInfo () { // 获取vuex的值
      let userId = this.getUserId
      this.id = userId
      let userGender = this.getUserGender
      this.gender = userGender
      let userName = this.genderBasicName
      this.name = userName
      let userTel = this.genderBasicTel
      this.tel = userTel
    },
    returnView (returnHref) {
      location.href = returnHref
    },
    changeBasic () { // 修改基本信息
      this.$http.post('/home/StudentController/UpdateBasicInfo.do', {tel: this.genderBasicTel, gender: this.getUserGender}).then(
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
  },
  beforeMount () {
    // 获取信息绑定
    this.getVuexInfo()
  }
}
</script>
<style scoped>
.kuang{
  width: 30%;
  border: 1px black solid;
}
</style>