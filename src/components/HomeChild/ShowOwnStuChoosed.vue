<!--展示所带班级同学的选课情况  -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看选课情况 
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="" label="学号" width="180"></el-table-column>
      <el-table-column prop="" label="姓名" width="180"></el-table-column>
      <el-table-column prop="" label="所选课程"></el-table-column>
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
  computed: {},
  methods: {
    indexMethod (index) {
      return index + 1
    },
    getUser () {
      return this.$store.state.User
    }
  },
  beforeMount () {
    this.$http.post(`${this.getUser.router}showStuChoosed.do`).then(
      response => {
        let result = response.data
        console.log(result)
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