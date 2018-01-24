<!-- 查看全部老师信息 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看全部老师
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="name" label="教师" width="180"></el-table-column>
      <el-table-column prop="team.name" label="所带班级" width="180"></el-table-column>
      <el-table-column prop="str" label="所受课程"></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      multipleSelection: [], // 选择一条后，记录一个数据
      courseList: []
    }
  },
  components: {},
  computed: {},
  methods: {
    indexMethod (index) {
      return index + 1
    }
  },
  beforeMount () {
    this.$http.post('/home/StudentController/selectAllTeacher.do').then(
      response => {
        let result = response.data
        this.tableData = result
        result.forEach(element => {
          element.str = ''
          element.courseList.forEach(
            element2 => {
              element.str += element2.name + '、'
            }
          )
          element.str = element.str.slice(0, -1)
          // this.courseList.push(element.courseList)
        })
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询全部老师出错啦')
      }
    )
  }
}
</script>
<style scoped>
</style>