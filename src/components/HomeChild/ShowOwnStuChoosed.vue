<!--展示所带班级同学的选课情况  -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看班级同学选课情况 
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="userId" label="学号" width="180"></el-table-column>
      <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="ccList" label="所选课程"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      courseList: []
    }
  },
  components: {},
  computed: {
    getUser () {
      return this.$store.state.User
    },
    getTeamName () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        return this.$store.state.BasicInfo.basicInfo[4].value
      }
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    }
  },
  beforeMount () {
    this.$http.post(`${this.getUser.router}showStuChoosed.do`, {teamName: this.getTeamName}).then(
      response => {
        let result = response.data
        let arr = []
        // 遍历从数据库中查出的值
        result.forEach(element => {
          let uid = element.user_id
          let isHadUid = false
          // 遍历arr 查询是否有相同的id值
          arr.forEach(element2 => {
            if (element2.userId === uid) {
              // 插入已经存在的的uid 对应的数组中
              element2.ccList.push(element.course.name + '、')
              isHadUid = true
            }
          })
          if (!isHadUid) {
            // 新创建 一个对象
            let choosedCourseList = []
            choosedCourseList.push(element.course.name + '、')
            arr.push({userId: uid, sname: element.student.name, ccList: choosedCourseList})
            choosedCourseList = choosedCourseList.slice(0, -1)
          }
        })
        this.tableData = arr
        console.log(arr.length)
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询学生的所选课程出错了')
      }
    )
  }
}
</script>
<style scoped>
</style>