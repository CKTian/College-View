<!-- 修改个人基本信息vue -->
<template>
  <div class="kuang">
     <i class="iconfont icon-vertical_line"></i>
    修改个人信息
    <p> {{getUserBasic}},您好：</p>
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
     // 获取用户基本信息的用户名
    getUserBasic () {
      return this.$store.state.BasicInfo.basicInfo[2].value
    },
    getUserGender: {
      get: function () {
        let gender
        if (this.$store.state.BasicInfo.basicInfo[3].value === '男') {
          gender = 0
        } else if (this.$store.state.BasicInfo.basicInfo[3].value === '女') {
          gender = 1
        } else if (this.$store.state.BasicInfo.basicInfo[3].value === 0) {
          gender = 0
        } else if (this.$store.state.BasicInfo.basicInfo[3].value === 1) {
          gender = 1
        }
        return gender
      },
      set: function (val) {
        this.$store.commit('changeGender', val)
      }
    },
    genderBasicTel: {
      get: function () {
        return this.$store.state.BasicInfo.basicInfo[5].value
      },
      set: function (val) {
        this.$store.commit('changeTel', val)
      }
    }
  },
  methods: {
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
  }
}
</script>
<style scoped>
.kuang{
  width: 30%;
  border: 1px black solid;
}
</style>