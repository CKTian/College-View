// 学生用户基本信息变量储存
export default {
  state: {
    basicInfo: []
  },
  mutations: {
    basicInfo (state, basic) {
      state.basicInfo = basic
    },
    changeTel (state, val) {
      state.basicInfo[5].value = val
    }
  },
  actions: {}
}
