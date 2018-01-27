<!-- 查看登陆者的所有选课 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看我的选课
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 80%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="course.name" label="课程名" width="120"></el-table-column>
      <el-table-column prop="course.teacher.name" label="任课老师" width="120"></el-table-column>
      <el-table-column prop="course.time" label="上课时间" show-overflow-tooltip></el-table-column>
    </el-table>
      <el-button @click="toggleSelection()" type="info"  plain >全部取消</el-button>
      <el-button @click="toDelete()" class="checkin" plain>删除选课</el-button>
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
    toDelete () {
      this.$http.post('/home/StudentController/deleteChoosedCourse.do', {list: this.multipleSelection}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.multipleSelection.forEach(item => {
              this.tableData.forEach((showItem, index) => {
                if (item.id === showItem.id) {
                  this.tableData.splice(index, 1)
                }
              })
            })
            this.$notify({
              title: 'ok~',
              message: '删除成功！',
              type: 'success'
            })
            location.href = '/#/home/ChoosedOwnCourse'
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询我的选课出错啦')
        }
      )
    }
  },
  beforeMount () {
    // 查询出所有登录者的选课
    this.$http.post('/home/StudentController/selectChoosedList.do').then(
      response => {
        let result = response.data
        this.tableData = result
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询我的选课出错啦')
      }
    )
  }
}
</script>
<style scoped>
</style>