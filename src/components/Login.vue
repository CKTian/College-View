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
          let result = response.data
          console.log(result.message)// JSON.stringify(response)
          console.log(result.token)
          if (result.value === '1') {
            // 登录成功
            localStorage.setItem('token', result.token)
            this.$http.defaults.headers.common['Authorization'] = result.token
            location.href = '#/Home/Wtb'
          } else {
            // 登录失败
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

