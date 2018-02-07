<!-- 班级管理的vue -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>班级管理
    <el-table :data="tableData" style="width: 45%" highlight-current-row @row-click="manageStu">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="teamName" label="班级名称" width="120"></el-table-column>
      <el-table-column prop="teacherName" label="班主任" width="120"></el-table-column>
      <el-table-column @row-click="manageStu" prop="countStu" label="班级人数" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <i class="iconfont icon-icon11" @click.stop="forUpdateOnTeamInfo(scope.$index,tableData)"></i>&nbsp;
          <i class="iconfont icon-icon12" @click="deleteOneTeamInfo(scope.$index,tableData)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="forInsertTeam()" class="checkin" plain><i class="iconfont icon-bianji"></i>&nbsp;增加一门课程</el-button>
    <!--模态框部分  查看一个班级中的同学-->
    <el-dialog title="班级学生" :visible.sync="dialogTableVisible">
      <el-tag v-for="stu in stus" :key="stu.name"  type="info" color="#2BC4B7" style="color:#fff">
        {{stu.name}}
      </el-tag>
    </el-dialog>
    <!--修改班级信息 模态框部分-->
    <el-dialog title="修改班级信息" :visible.sync="UpdatedialogTableVisible">
      <el-form :model="form">
        <el-form-item  label="班级名" :label-width="formLabelWidth">
          <el-input v-model="form.teamName" auto-complete="off"></el-input>
        </el-form-item>
		    <el-form-item label="班主任" :label-width="formLabelWidth">
          <el-select v-model="form.teacherId">
            <el-option v-for="(item, index) in teachers" v-if="item.teacherId !== '0000'" :key="item.userId" :label="item.teacherName":value="item.teacherId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="班级人数" :label-width="formLabelWidth">
          <el-input v-model="form.countStu" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdatedialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOneTeamInfo()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      currentRow: null,
      UpdatedialogTableVisible: false,
      InsertdialogTableVisible: false,
      dialogTableVisible: false,
      formLabelWidth: '70px',
      stus: [],
      form: {
        teamName: '',
        teacherId: '',
        teacherName: '',
        countStu: ''
      },
      teachers: []
    }
  },
  components: {},
  computed: {
    getUser () {
      this.showAll()
      return this.$store.state.User
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    showAll () { // 展示所有的班级信息
      this.$http.post('/home/SuperController/selectAllTeam.do').then(
        response => {
          let result = response.data
          this.tableData = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询所有班级信息出错了')
        }
      )
    },
    manageStu (row, column, cell, event) { // 查看一个班级的所有学生
      this.currentRow = row
      let teamId = this.currentRow.teamId
      // 查询该班级的所有同学
      this.showAllTeamStu(teamId)
      this.dialogTableVisible = true
    },
    showAllTeamStu (teamId) { // 查询该班级的所有学生名
      this.$http.post(`${this.getUser.router}selectTeamStus.do`, {info: teamId}).then(
        response => {
          let result = response.data
          this.stus = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询班级中的学生出错啦')
        }
      )
    },
    forUpdateOnTeamInfo (index, tableData) { // 为了修改一个课程
      this.form.teamName = tableData[index].teamName
      this.form.teamId = tableData[index].teamId
      this.form.teacherId = tableData[index].teacherId
      this.form.teacherName = tableData[index].teacherName
      this.form.countStu = tableData[index].countStu
      console.log(this.form)
      this.selectAllTeacher()
      this.UpdatedialogTableVisible = true
    },
    selectAllTeacher () { // 查询全部的老师
      this.$http.post(`${this.getUser.router}selectAllTeacherInfo.do`).then(
        response => {
          let result = response.data
          this.teachers = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询全部老师出错啦')
        }
      )
    },
    updateOneTeamInfo () { // 修改一个班级的信息
      this.$http.post(`${this.getUser.router}updateOneTeam.do`, {info: this.form}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.UpdatedialogTableVisible = false
            this.$notify({
              title: 'ok~',
              message: result.message,
              type: 'success'
            })
            this.showAll()
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改一个班级的信息出错')
        }
      )
    }
  },
  watch: {
    getUser () {}
  }
}
</script>
<style scoped>
i:hover {
  cursor: pointer
}
el-table :hover{
  cursor: pointer
}
.checkin{
  background-color: #2BC4B7;
  color: aliceblue;
}
</style>