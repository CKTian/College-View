import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Wtb from '@/components/HomeChild/Wtb'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/Home/Wtb',
        name: 'Wtb',
        component: Wtb
      }]
    }
  ]
})
