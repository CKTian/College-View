<!--  -->
<template>
  <div>
    <img class="people" src="../../assets/firstPic.png">
    <h2>Quick Entry</h2>
    <h4>What do you want to do now？</h4>
    <div class="quick">
      <div class="row">
        <div class="cell" @click="toRouterView('/#/home/ManageUserinfo')">
          <i class="iconfont icon-dianping"></i>
          <p>个人信息管理</p>
          <p class="pChild">点击进入个人信息模块，修改个人基本信息</p>
        </div>
        <div class="cell" @click="toRouterView('/#/home/AllTeacher')">
          <i class="iconfont icon-geren"></i>
          <p>查看全部老师</p>
          <p class="pChild">点击进入学校老师信息模块，查看所有在校老师信息</p>
        </div>
      </div>
      <div class="row">
        <div class="cell" @click="toRouterView('/#/home/AllCourse')">
          <i class="iconfont icon-youji"></i>
          <p>查看全部课程</p>
          <p class="pChild">点击进入学校课程信息模块，查看学校所有开设的课程信息</p>
        </div>
        <div class="cell">
          <i class="iconfont icon-zonghe"></i>
          <p>信息统计</p>
          <p class="pChild">点击进入信息统计模块，查看学生选课信息统计汇总</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {},
  computed: {},
  methods: {
    toRouterView (paraHref) {
      location.href = paraHref
    }
  }
}
</script>
<style scoped>
.people{
  width: 35%;
  margin-left: 30%;
  margin: 0 auto;
  display: block;
}
h2{
  text-align: center;
  color: #3E4E53;
  margin-top: 4%;
}
h4{
  text-align: center;
  color: #DBE3E7;
  font-weight: 600;
  font-size: 18px;
}
.quick{
  width: 70%;
  margin: 0 auto;
  margin-top: 25px;
}
.row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
.row:last-child{
  margin-bottom: 0;
}
.cell{
  width: 47%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 15px rgb(233, 233, 233);
}
.cell:hover{
  cursor: pointer;
}
i{
  color:#2BC4B7;
  font-size: 35px;
}
p{
  color: #3E4E53;
  margin: 5px;
  margin-top: 15px;
}
.pChild{
  font-size: 14px;
  color: rgb(196, 204, 207);
}
</style>