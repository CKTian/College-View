// 老师用户基本信息变量储存
export default {
  state: {
    name: '',
    team_name: '',
    id: ''
  },
  mutations: {
    tBasicInfo (state, basic) {
      state.name = basic.name
      state.team_name = basic.team.name
      state.id = basic.id
      console.log(state)
    }
  },
  actions: {}
}
