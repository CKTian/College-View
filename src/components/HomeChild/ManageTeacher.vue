<!-- 管理老师模块的vue -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>
    <span>教师管理功能</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="account" label="用户名" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师名" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180" :formatter="toChinese"></el-table-column>    
      <el-table-column prop="teamName" label="所带班级"></el-table-column>
      <el-table-column label="操作" >
      <template slot-scope="scope">
        <i class="iconfont icon-icon11" @click="forUpdateOneTeacherInfo(scope.$index,tableData)"></i>&nbsp;
        <i class="iconfont icon-icon12" @click="deleteOneTeacherInfo(scope.$index,tableData)"></i>
      </template>
      </el-table-column>
    </el-table>
    <el-button @click="forInsertTeacher()" class="checkin" plain><i class="iconfont icon-bianji"></i>&nbsp;增加一位老师</el-button>
    <!--修改个人信息模态框部分-->
    <el-dialog title="修改老师信息" :visible.sync="UpdatedialogTableVisible">
      <el-form :model="form">
        <el-form-item  label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
		    <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所带班级" :label-width="formLabelWidth">
          <el-select v-model="form.teamName">
            <el-option v-for="(item, index) in team" v-if="item.id !== '0000'" :key="item.id" :label="item.name":value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdatedialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOneTeacherInfo()">修 改</el-button>
      </div>
    </el-dialog>
    <!--增加信息模态框部分-->
    <el-dialog title="修改老师信息" :visible.sync="InsertdialogTableVisible">
      <el-form :model="form">
        <el-form-item  label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
		    <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所带班级" :label-width="formLabelWidth">
          <el-select v-model="form.teamName">
            <el-option v-for="(item, index) in team" v-if="item.id !== '0000'" :key="item.id" :label="item.name":value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertTeacher()">增 加</el-button>
      </div>
    </el-dialog>
  </div>	
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      UpdatedialogTableVisible: false,
      InsertdialogTableVisible: false,
      gridData: [],
      team: [],
      formLabelWidth: '70px',
      form: {
        teamId: '',
        name: '',
        account: '',
        gender: '',
        teamName: '',
        userId: ''
      }
    }
  },
  components: {},
  computed: {
    getUserName () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        this.showAllTeacher()
        return this.$store.state.BasicInfo.basicInfo[2].value
      }
      return ''
    },
    getUser () {
      return this.$store.state.User
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    toChinese (row, column, cellValue) {
      switch (cellValue) {
        case 0:
          return '男'
        case 1:
          return '女'
        default:
          return '未设置'
      }
    },
    showAllTeacher () { // 显示所有的老师
      this.$http.post(`${this.getUser.router}selectAllTeacherInfo.do`).then(
        response => {
          let result = response.data
          this.tableData = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('超级管理员显示所有老师出错啦！')
        }
      )
    },
    forUpdateOneTeacherInfo (index, tableData) { // 为了修改一条老师数据
      this.UpdatedialogTableVisible = true
      this.form.name = tableData[index].teacherName
      this.form.gender = tableData[index].gender
      this.form.account = tableData[index].account
      this.form.teamName = tableData[index].teamName
      this.form.userId = tableData[index].userId
      // 查询出所有班级名称
      this.$http.post(`${this.getUser.router}selectAllTeamInfo.do`).then(
        response => {
          let result = response.data
          this.team = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('展示所有课名')
        }
      )
    },
    updateOneTeacherInfo () { // 修改一条教师信息
      console.log(this.getUser.router)
      this.$http.post(`${this.getUser.router}updateOneTeacher.do`, {info: this.form}).then(
        response => {
          console.log(response)
          let result = response.data
          if (result.value === '1') {
            // 修改成功
            this.UpdatedialogTableVisible = false
            this.$notify({
              title: 'ok~',
              message: '修改成功~',
              type: 'success'
            })
            this.showAllTeacher() // 重新加载刷新
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改教师的一条信息出错啦！')
        }
      )
    },
    forInsertTeacher () { // 增加一位老师
      this.form = {
        teamId: '',
        name: '',
        account: '',
        gender: '',
        teamName: '',
        userId: ''
      }
      // 显示模态框
      this.InsertdialogTableVisible = true
      // 查询出所有班级名称
      this.$http.post(`${this.getUser.router}selectAllTeamInfo.do`).then(
        response => {
          let result = response.data
          this.team = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('展示所有课名')
        }
      )
    },
    insertTeacher () {
      // 增加一个老师
      if (this.form.name === '' || this.form.gender === '' || this.form.account === '' || this.form.teamName === '') {
        this.$notify({
          title: 'notice',
          message: '请将信息填写完整！',
          type: 'success'
        })
      } else {
        this.$http.post(`${this.getUser.router}insertTeacher.do`, {info: this.form}).then(
          response => {
            let result = response.data
            this.$notify({
              title: 'notice',
              message: result.message,
              type: 'success'
            })
            if (result.value === '1') {
              this.InsertdialogTableVisible = false
              this.showAllTeacher() // 重新加载刷新
            }
          }
        ).catch(
          error => {
            console.log(error)
            console.log('增加老师出错啦~~')
          }
        )
      }
    },
    deleteOneTeacherInfo (index, tableData) { // 删除一个老师
      this.$http.post(`${this.getUser.router}deleteTeacher.do`, {userId: tableData[index].userId}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.$notify({
              title: 'ok~',
              message: result.message,
              type: 'success'
            })
            this.showAllTeacher()
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('删除一位老师出错啦')
        }
      )
    }
  },
  watch: {
    getUserName () {}
  }
}
</script>
<style scoped>
i:hover {
  cursor: pointer
}
.checkin{
  background-color: #2BC4B7;
  color: aliceblue;
}
</style>