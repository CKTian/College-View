import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import First from '@/components/HomeChild/First'
import Userinfo from '@/components/HomeChild/Userinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/home/First',
        name: 'First',
        component: First
      },
      {
        path: '/home/Userinfo',
        name: 'Userinfo',
        component: Userinfo
      }]
    }
  ]
})
