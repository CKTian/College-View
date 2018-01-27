import Vuex from 'vuex'
import Vue from 'vue'
import User from './modules/user'
import BasicInfo from './modules/BasicInfo'
Vue.use(Vuex)

// vue配置
let store = new Vuex.Store({
  modules: {
    User,
    BasicInfo
  }
})

export default store
