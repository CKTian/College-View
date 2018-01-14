// 用户变量储存
export default {
  state: {
    id: '',
    account: '',
    role_id: ''
  },
  mutations: {
    userInfo (state, user) {
      state.id = user.id
      state.account = user.account
      state.role_id = user.role_id
      console.log(state.account)
    }
  },
  actions: {}
}
