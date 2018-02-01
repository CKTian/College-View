<!--展示所带班级同学的选课情况  -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看班级同学选课情况 
    <p style="display:none">{{getHidden}}</p>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 90%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="userId" label="学号" width="180"></el-table-column>
      <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="ccList" label="所选课程"></el-table-column>
    </el-table>
    <el-button @click="forShow()" class="checkin" plain>查看学生成绩单</el-button>
    <!--模态框部分-->
    <el-dialog title="成绩单" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="cname" label="课程名" width="150"></el-table-column>
        <el-table-column property="score" label="分数" width="200" :formatter="toChinese"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      courseList: [],
      multipleSelection: [], // 选择一条后，记录一个数据
      dialogTableVisible: false,
      formLabelWidth: '40px',
      gridData: []
    }
  },
  components: {},
  computed: {
    getHidden () {
      this.showOwnStuChoosed()
      return this.$store.state.User
    },
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
    },
    handleSelectionChange (val) {
      window.a = val
      this.multipleSelection = val
    },
    showOwnStuChoosed () {
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
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询学生的所选课程出错了')
      }
    )
    },
    forShow () {
      if (this.multipleSelection.length > 1) {
        this.$alert('只能选择一项哦~', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      if (this.multipleSelection.length === 0) {
        this.$alert('请选择一项哦~', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.showOwnStuChoosedScore()
      this.dialogTableVisible = true
    },
    showOwnStuChoosedScore () {
      this.$http.post(`${this.getUser.router}showOwnStuChoosedScore.do`, {uid: this.multipleSelection[0].userId}).then(
        response => {
          let result = response.data
          this.gridData = result
          console.log(result)
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询成绩单')
        }
      )
    },
    toChinese (row, column, cellValue) {
      switch (cellValue) {
        case '':
          return '未出成绩'
        default:
          return cellValue
      }
    }
  }
}
</script>
<style scoped>
</style>