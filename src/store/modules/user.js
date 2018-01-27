// 用户变量储存
export default {
  state: {
    id: '',
    account: '',
    role_id: '',
    router: ''
  },
  mutations: {
    userInfo (state, {user, router}) {
      state.id = user.id
      state.account = user.account
      state.role_id = user.role_id
      state.router = router
      console.log(state.router)
    }
  },
  actions: {}
}
