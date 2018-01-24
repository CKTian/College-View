// 用户变量储存
export default {
  state: {
    id: '',
    account: '',
    role_id: '',
    gender: '',
    router: ''
  },
  mutations: {
    userInfo (state, {user, router}) {
      state.id = user.id
      state.account = user.account
      state.role_id = user.role_id
      state.gender = user.gender
      state.router = router
      console.log(state.router)
    },
    changeGender (state, val) {
      state.gender = val
    }
  },
  actions: {}
}
