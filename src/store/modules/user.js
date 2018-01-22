// 用户变量储存
export default {
  state: {
    id: '',
    account: '',
    role_id: '',
    gender: ''
  },
  mutations: {
    userInfo (state, user) {
      state.id = user.id
      state.account = user.account
      state.role_id = user.role_id
      state.gender = user.gender
      console.log(state.gender)
    },
    changeGender (state, val) {
      state.gender = val
    }
  },
  actions: {}
}
