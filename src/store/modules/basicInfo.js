// 学生用户基本信息变量储存
export default {
  state: {
    name: '',
    team_name: '',
    tel: '',
    reward: '',
    point: ''
  },
  mutations: {
    basicInfo (state, basic) {
      state.name = basic.student.name
      state.team_name = basic.team_name
      state.tel = basic.student.tel
      state.reward = basic.student.reward
      state.point = basic.student.point
    },
    changeTel (state, val) {
      state.tel = val
    }
  },
  actions: {}
}
