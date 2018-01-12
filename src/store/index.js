import Vuex from 'vuex'
import Vue from 'vue'
import User from './modules/User'

Vue.use(Vuex)

// vue配置
let store = new Vuex.Store({
  modules: {
    User
  }
})

export default store
