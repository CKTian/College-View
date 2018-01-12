<template>
  <div>
    用户名：<p>{{user.account}}</p>
    新密码：<input type="password" v-model="user.password">
    确认密码：<input type="password">
    <button @click="update()">提交</button>
  </div>  
</template>
<script>
export default {
  name:"updatePwd",
  data () {
    return{
       user: {
        id: '',
        account: '',
        password: '',
        role_id: ''
      }
    }
  },
  methods: {
    update() {
      this.$http.post('UserController/updatePwd.do',this.user).then(
        response =>{
          console.log("修改成功") // 重新登录
        }
      ).catch(
        error => {
          console.log('修改出错啦')
        }
      )
    }
  }
}
</script>

