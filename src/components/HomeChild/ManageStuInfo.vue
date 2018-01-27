<!-- 登录者查看所有所带班级的学生的信息 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看班级所有学生信息
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 90%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="user.gender" label="性别" width="120"></el-table-column>
      <el-table-column prop="tel" label="电话" ></el-table-column>
      <el-table-column prop="reward" label="奖惩" ></el-table-column>
      <el-table-column prop="point" label="绩点" ></el-table-column>
    </el-table>
      <el-button @click="toggleSelection()" type="info"  plain >全部取消</el-button>
      <el-button @click="toSelect()" class="checkin" plain>选择</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {},
  computed: {
    getTeamName () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        return this.$store.state.BasicInfo.basicInfo[4].value
      }
      return ''
    },
    getUser () {
      return this.$store.state.User
    }
  },
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
    }
  },
  beforeMount () {
    // 查询所带学生信息
    this.$http.post(`${this.getUser.router}selectOwnStu.do`, {teamName: this.getTeamName}).then(
      response => {
        let result = response.data
        console.log(result)
        this.tableData = result
      }
    ).catch(
      error => {
        console.log(error)
        console.log('查询老师所带学生信息出错啦')
      }
    )
  }
}
</script>
<style scoped>
</style>