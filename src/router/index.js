import Vue from 'vue'
import Router from 'vue-router'
// 登录组件
import Login from '@/components/Login'
// 登录成功后 首页组件
import Home from '@/components/Home'
// 首页组件中的-- 首先显示的组件
import First from '@/components/HomeChild/First'
// 用户基本个人信息展示组件
import ManageUserinfo from '@/components/HomeChild/ManageUserinfo'
// 修改密码组件
import UpdatePwd from '@/components/HomeChild/MUChild/UpdatePwd'
// 修改个人基本信息组件
import UpdateBasicInfo from '@/components/HomeChild/MUChild/UpdateBasicInfo'
// 查看全部课程的vue
import AllCourse from '@/components/HomeChild/AllCourse'
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
        path: '/home/AllCourse',
        name: 'AllCourse',
        component: AllCourse
      },
      {
        path: '/home/ManageUserinfo',
        name: 'ManageUserinfo',
        component: ManageUserinfo,
        children: [{
          path: '/home/ManageUserinfo/UpdatePwd',
          name: 'UpdatePwd',
          component: UpdatePwd
        },
        {
          path: '/home/ManageUserinfo/UpdateBasicInfo',
          name: 'UpdateBasicInfo',
          component: UpdateBasicInfo
        }]
      }]
    }
  ]
})
