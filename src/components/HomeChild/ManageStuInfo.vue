<!-- 登录者查看所有所带班级的学生的信息 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>查看{{getTeamName}}所有学生信息
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 90%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="user.gender" label="性别" width="120" :formatter="toChinese"></el-table-column>
      <el-table-column prop="tel" label="电话" ></el-table-column>
      <el-table-column prop="reward" label="奖惩" ></el-table-column>
      <el-table-column prop="point" label="绩点" ></el-table-column>
    </el-table>
      <el-button @click="toggleSelection()" type="info"  plain >全部取消</el-button>
      <el-button @click="forUpdate()" class="checkin" plain>修改</el-button>
    <!--模态框部分-->
    <el-dialog  title="修改学生个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item  label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toUpdate()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [], // 选择一条后，记录一个数据
      dialogFormVisible: false,
      formLabelWidth: '50px',
      form: {
        name: '',
        gender: '',
        tel: '',
        reward: '',
        point: '',
        userId: ''
      }
    }
  },
  components: {},
  computed: {
    getTeamName: {
      get: function () {
        if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
          // 一上来 展示所有该老师所带的学生信息
          this.selectStuInfo(this.$store.state.BasicInfo.basicInfo[4].value)
          return this.$store.state.BasicInfo.basicInfo[4].value
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
    handleSelectionChange (val) {
      window.a = val
      this.multipleSelection = val
      if (this.multipleSelection.length !== 0) {
        this.form.name = this.multipleSelection[0].name
        this.form.gender = this.multipleSelection[0].user.gender
        this.form.tel = this.multipleSelection[0].tel
        this.form.reward = this.multipleSelection[0].reward
        this.form.point = this.multipleSelection[0].point
        this.form.userId = this.multipleSelection[0].user_id
      }
    },
    selectStuInfo (teamName) {
      // 查询所带学生信息
      this.$http.post(`${this.getUser.router}selectOwnStu.do`, {teamName: teamName}).then(
        response => {
          let result = response.data
          this.tableData = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询老师所带学生信息出错啦')
        }
      )
    },
    forUpdate () {
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
      this.dialogFormVisible = true
    },
    toUpdate () {
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
            this.dialogFormVisible = false
            this.selectStuInfo(this.getTeamName)
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改学生信息出错了~')
        }
      )
    }
  }
}
</script>
<style scoped>
lable {
  text-align: center;
}
</style>