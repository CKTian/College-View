<template>
  <nav id='navQ' class='nav'>
    <div id='head'>
      頭像
    </div>
    <ul>
      <li v-for="li in navData" 
          @click="isShowChild(li)" 
          :style="{'max-height': li.maxHeight}" 
          :class="isShowChild ? 'active-li': ''"
          :key="li.liName">
        <a class="par-a">
          <!-- 
            主图标
            想旋转加v-if='li.children.length != 0' 
            :style="{'transform': arrRotate(li)}" 
            不想旋转就去掉
          -->
          <i class='iconfont' 
            :class="li.iconClass"
            :style="{'transform': arrRotate(li)}"></i>
          <span :style="{'display': navUnflod ? 'inline' : 'none'}">{{li.liName}}</span>
        </a>
        <ul class='child-ul'>
          <li class='child-li' 
              v-for='childLi in li.children'
              :key="childLi.name">
            <a @click.stop 
               :href='childLi.liHref'>
              <!-- 这里是子图标 -->
              <i class="iconfont" :class="childLi.iconClass"></i>
              <span :style="{'display': navUnflod ? 'inline' : 'none'}">{{childLi.liName}}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
// max为a的line-height + padding
const maxHeight = '46px'
export default {
  name: 'navQ',
  data () {
    return {
      navUnflod: 'true',
      navData: []
    }
  },
  methods: {
    /**
     * 展示子菜单,使用max-height的方法
     * @param {Object} activeLi 点击的li标签
     */
    isShowChild (activeLi) {
      if (activeLi.isShowChild) {
        activeLi.isShowChild = !activeLi.isShowChild
        activeLi.maxHeight = maxHeight
      } else {
        if (activeLi.children.length === 0) {
          location.href = activeLi.liHref
        } else {
          this.navData.forEach(item => {
            item.isShowChild = false
            item.maxHeight = maxHeight
          })
          // 一个是21px
          activeLi.maxHeight = `${(activeLi.children.length + 1) * parseInt(maxHeight)}px`
          activeLi.isShowChild = !activeLi.isShowChild
        }
      }
    },
    /**
     * 箭头旋转角度
     * @param {Object} activeLi 选中的li标签
     * @returns {String} 旋转的角度rotate(90deg)|rotate(0deg)
     */
    arrRotate (activeLi) {
      if (activeLi.isShowChild) {
        return 'rotate(90deg)'
      } else {
        return 'rotate(0deg)'
      }
    }
  },
  /**
   * 创建时查询nav数据
   */
  beforeMount () {
    // 区后台查询该权限的nav
    this.$http.post('/home/NavController/selectNav.do')
    .then(res => {
      // 回来加上样式数据,isShowChild,maxHeight
      // 判断状态
      if (res.data.status.value === '1') {
        res.data.newNavlist.forEach(value => {
          value.isShowChild = false
          value.maxHeight = maxHeight
        })
        console.log(res.data.newNavlist)
        this.navData = res.data.newNavlist
      } else {
        alert('网络错误,未查到nav数据')
      }
    })
  }
}
</script>

<style scoped>
#head{
  background: #2BC4B7;
  width: 100%;
  height:230px;
}
.nav {
  height: 100%; width: 100%;
  background: #FFF;
  float: left;
  box-sizing: border-box;
  color: rgb(193, 201, 206);
  font-size: 14px;
  line-height: 14px;
}
.change-button {
  height: 30px;  width: 100%;
  border: 0;
  background: #4A5064;
  color: #aeb9c2;
  text-align: center;
  line-height: 30px;
  transition: .2s;
  cursor: pointer;
}
.change-button:hover {
  color: #fff;
}
.nav li {
  transition: 0.3s;
  overflow: hidden;
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
}
.par-a:hover {
  color: #FF905C;
}
.par-a:link {
  color: #FF905C;
}
/* .nav li:hover {
  background: #232a2f;
} 
.nav a:link,
.nav a:valid,
.nav a:hover,
.nav a:active {
 
}*/
.nav a {
  display: block;
  padding: 16px 0 16px 10px;
}
.nav li i {
  display: inline-block;
  width: 30px;
  margin-right: 12px;
  text-align: center;
  transition: 0.3s;
}
.child-ul li {
  position: relative;
}
/* .child-ul li .fa-circle-thin {
  position: absolute;
  font-size: 16px;
  line-height: 36px;
  top: 0;
  left: -16px;
} */
/* 列表主选项的颜色,样式开始 */
.active-li > a {
  background: #fff;
}
.active-li a,
.active-li .fa {
  color: #949799;
}
.active-li a {
  position: relative;
  z-index: 20;
  transition: 0.2s;
  left: 0;
}
/* 列表主选项的颜色,样式结束 */
.child-li {
  position: relative;
  transition: 0.2s;
  left: 0;
}
.child-li:hover a{
  color: #FF905C;
}
.child-li a{
  left: 22px;
}
</style>
