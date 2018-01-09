<template>
  <div>
    用户名：<input type='text' v-model='user.account'>
    密码：<input type='password' v-model='user.password'>
    <button @click='UserLogin()'>登录</button>
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
      this.$http.post('UserController/userLogin.do', this.user).then(
        response => {
          console.log(response.data.message)// JSON.stringify(response)
        }
      ).catch(
        error => {
          console.log(error)
          console.log('登录失败')
        }
      )
    }
  }
}
</script>

