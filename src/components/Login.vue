<template>
  <div class="kuang">
    <img class="people" src="../assets/firstPic.png">
    <div class="login">
      <h1>教务在线综合管理平台</h1>
      <h6>各位老师同学们可使用个人账号登录</h6>
      <el-input class="input" v-model="user.account" placeholder="请输入用户名"></el-input><br>
      <el-input class="input" type='password' v-model='user.password' placeholder="请输入密码"></el-input>
      <el-button type="primary" @click='UserLogin()'>登录</el-button><br>
      <a>忘记密码</a> <a>忘记用户名</a>
     </div>
  </div>
  
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        id: '',
        account: '',
        password: '',
        role_id: ''
      }
    }
  },
  methods: {
    UserLogin () {
      this.$http.post('LoginController/userLogin.do', this.user).then(
        response => {
          let result = response.data
         // console.log(JSON.stringify(result))// JSON.stringify(response)
         // console.log(result.token)
          if (result.status.value === '1') {
            // 登录成功--把token放到请求头里
            localStorage.setItem('token', result.token)
            this.$http.defaults.headers.common['Authorization'] = result.token
            // --把信息放到vuex中
            this.$store.commit('userInfo', result.userinfo)
            location.href = '#/home/First'
          } else {
            this.$message({
              showClose: true,
              message: '密码或用户名错误！',
              type: 'error'
            })
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('出登录错啦')
        }
      )
    }
  }
}
</script>
<style scoped>
  .kuang {
    width: 990px;
    margin: 0 auto;
    padding-top: 135px;
    position: relative;
  }
  .login {
    width: 380px;
    padding: 22px;
    position: absolute;
    right: 0;
    border:#DBE3E7 solid 1px;
    background-color: rgb(245, 245, 245);
    border-radius: 4px;
    box-sizing: border-box;
    transition: .2s;
  }
  .login:hover {
    box-shadow: 0 0 5px rgb(180, 180, 180);
  }
  .people{
    width: 60%;
    position: absolute;
    left: 0;
  }
  .el-button {
    background-color: #2BC4B7;
    width: 267.733px;
    margin-left: 34px;
    margin-top: 15px;
  }
  .input {
   width: 80%;
   margin-left: 34px;
   margin-top: 15px;
 }
 h1 {
   font-size: 28px;
   color: rgb(55, 61, 65);
   font-weight: 400;
   text-align: center;
 }
 h6 {
   margin-top: 5px;
   font-size: 16px;
   color: gainsboro;
   font-weight: 400;
   text-align: center;
 }
 a {
   float: right;
   margin-right: 35px;
   margin-top: 10px;
   font-size: 14px;
   color: rgb(179, 177, 177);
 }
 .el-input__inner:hover {
    border-color: #c0c4cc;
}
</style>

