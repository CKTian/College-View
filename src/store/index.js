import Vuex from 'vuex'
import Vue from 'vue'
import User from './modules/user'
import BasicInfo from './modules/BasicInfo'
import tBasicInfo from './modules/tBasicInfo'
Vue.use(Vuex)

// vue配置
let store = new Vuex.Store({
  modules: {
    User,
    BasicInfo,
    tBasicInfo
  }
})

export default store
