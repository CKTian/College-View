<!-- 查看全部课程的vue -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看全部课程
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 45%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="课程名" width="120"></el-table-column>
      <el-table-column prop="teacher.name" label="任课老师" width="120"></el-table-column>
      <el-table-column prop="time" label="上课时间" show-overflow-tooltip></el-table-column>
    </el-table>
      <el-button @click="toggleSelection()" type="info"  plain >全部取消</el-button>
      <el-button @click="toSelect()" class="checkin" plain>选择</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      multipleSelection: [] // 选择一条后，记录一个数据
    }
  },
  components: {},
  computed: {},
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      window.a = val
      this.multipleSelection = val
    },
    toSelect () {
      console.log(this.multipleSelection)
      this.$http.post('/home/StudentController/selectCourse.do', {list: this.multipleSelection}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.$notify({
              title: 'ok~',
              message: '添加成功',
              type: 'success'
            })
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询全部课程出错啦')
        }
      )
    }
  },
  beforeMount () {
    // 查询全部课程信息
    this.$http.post('/home/StudentController/selectAllCourse.do').then(
      response => {
        let result = response.data
        this.tableData = result
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询全部课程出错啦')
      }
    )
  }
}
</script>
<style scoped>

.icon-vertical_line{
  font-weight: 900;
  color: #FF905C;
}
.checkin{
  background-color: #2BC4B7;
}
</style>