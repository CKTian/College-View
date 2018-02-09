<!-- 展示所有的学生的信息 -->
<template>
  <div>
    <i class="iconfont icon-vertical_line"></i>查看{{getTeamName}}所有学生信息
    <el-table :data="tableData" style="width: 90%" >
      <el-table-column align="center" label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="user.account" label="用户名" width="120"></el-table-column>
      <el-table-column align="center" prop="user.gender" label="性别" width="120" :formatter="toChinese"></el-table-column>
      <el-table-column align="center" v-if="getUser.router === '/home/SuperController/'" prop="team.name" label="班级" width="120"></el-table-column>
      <el-table-column align="center" prop="tel" label="电话" ></el-table-column>
      <el-table-column align="center" prop="reward" label="奖惩" ></el-table-column>
      <el-table-column align="center" prop="point" label="绩点" ></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <i class="iconfont icon-icon11" @click.stop="forUpdateOneStuInfo(scope.$index,tableData)"></i>&nbsp;
          <i class="iconfont icon-icon12" @click.stop="deleteOneStuInfo(scope.$index,tableData)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="forInsertStu()" class="checkin" plain><i class="iconfont icon-bianji"></i>&nbsp;增加一位学生</el-button>
    <!--修改信息模态框部分-->
    <el-dialog  title="修改学生个人信息" :visible.sync="UpdatedialogFormVisible">
      <el-form :model="form">
        <el-form-item  label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="getUser.router === '/home/SuperController/'" label="班级" :label-width="formLabelWidth">
          <el-select v-model="form.teamId">
            <el-option v-for="(item, index) in teams" v-if="item.id !== '0000'" :key="item.id" :label="item.name":value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" :value="0" number></el-option>
            <el-option label="女" :value="1" number></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖惩" :label-width="formLabelWidth">
          <el-input v-model="form.reward" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="绩点" :label-width="formLabelWidth">
          <el-input v-model="form.point" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdatedialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toUpdate()">修 改</el-button>
      </div>
    </el-dialog>
    <!--增加信息模态框部分-->
    <el-dialog title="增加学生信息" :visible.sync="InsertdialogTableVisible">
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
        <el-form-item label="所属班级" :label-width="formLabelWidth">
          <el-select v-model="form.teamId" placeholder="请选择班级">
            <el-option v-for="(item, index) in teams" v-if="item.id !== '0000'" :key="item.id" :label="item.name":value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertStu()">增 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['tableData'],
  data () {
    return {
      multipleSelection: [], // 选择一条后，记录一个数据
      UpdatedialogFormVisible: false,
      InsertdialogTableVisible: false,
      formLabelWidth: '70px',
      form: {
        name: '',
        account: '',
        gender: '',
        teamId: '',
        teamName: '',
        tel: '',
        reward: '',
        point: '',
        userId: ''
      },
      teams: []
    }
  },
  components: {},
  computed: {
    getTeamName: {
      get: function () {
        if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
          if (this.getUser.router !== '/home/SuperController/') {
            return this.$store.state.BasicInfo.basicInfo[4].value
          } else {
            return ''
          }
        }
        return ''
      },
      set: function (val) {}
    },
    getUser () {
      return this.$store.state.User
    }
  },
  methods: {
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
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    forUpdateOneStuInfo (index, tableData) {
      this.form.name = tableData[index].name
      this.form.account = tableData[index].user.account
      this.form.gender = tableData[index].user.gender
      this.form.tel = tableData[index].tel
      this.form.reward = tableData[index].reward
      this.form.point = tableData[index].point
      this.form.userId = tableData[index].user_id
      this.form.teamId = tableData[index].team.id
      this.showALLteam()
      this.UpdatedialogFormVisible = true
    },
    toUpdate () {
      console.log(this.form.teamId)
      this.$http.post(`${this.getUser.router}toUpdateStuInfo.do`, {id: this.form.userId, form: this.form}).then(
        response => {
          let result = response.data
          console.log(result)
          if (result.value === '1') {
            this.$notify({
              title: 'ok~',
              message: '修改成功~',
              type: 'success'
            })
            this.UpdatedialogFormVisible = false
            this.$emit('fresh', this.getTeamName)
          } else if (result.value === '0') {
            this.$notify({
              title: 'ok~',
              message: result.message,
              type: 'warning'
            })
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改学生信息出错了~')
        }
      )
    },
    showALLteam () { // 显示所有的班级
      // 查询出所有班级名称
      this.$http.post(`${this.getUser.router}selectAllTeamInfo.do`).then(
        response => {
          let result = response.data
          this.teams = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('展示所有课名')
        }
      )
    },
    forInsertStu () { // 为了增加一个学生
      this.form = {
        name: '',
        account: '',
        gender: '',
        teamId: '',
        teamName: '',
        tel: '',
        reward: '',
        point: '',
        userId: ''
      }
      this.InsertdialogTableVisible = true
      this.teams = this.showALLteam()
    },
    insertStu () { // 增加一个学生
      if (this.form.name === '' || this.form.gender === '' || this.form.account === '' || this.form.teamId === '') {
        this.$notify({
          title: 'notice',
          message: '请将信息填写完整！',
          type: 'warning'
        })
      } else {
        this.$http.post(`${this.getUser.router}insertStu.do`, {info: this.form}).then(
          response => {
            let result = response.data
            if (result.value === '0') {
              this.$notify({
                title: 'notice',
                message: result.message,
                type: 'warning'
              })
            } else if (result.value === '1') {
              this.$notify({
                title: 'notice',
                message: result.message,
                type: 'success'
              })
              this.InsertdialogTableVisible = false
              this.$emit('fresh', this.getTeamName)
            }
          }
        ).catch(
          error => {
            console.log(error)
            console.log('增加一个学生出错啦')
          }
        )
      }
    }
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