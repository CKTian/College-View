<!-- 录入成绩vue -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>成绩录入<br> 
    {{getUserBasicName}}老师，您好。请先选择一门课程:
    <el-select v-model="chooseValue" placeholder="请选择">
      <el-option v-for="(item, index) in course" :selected="index===0" :key="item.time" :label="item.name":value="item.id" @click.native="toShowStu()"></el-option>
    </el-select>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="team.name" label="班级" width="180"></el-table-column>
      <el-table-column prop="user_id" label="学号" width="180"></el-table-column>
      <el-table-column prop="student.name" label="姓名"></el-table-column>
      <el-table-column label="分数">
        <template slot-scope="scope">
          <el-input v-model="scope.row.score"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="updateScore()" class="checkin" plain>提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      course: [],
      chooseValue: '',
      tableData: []
    }
  },
  components: {},
  computed: {
    getUserBasicName () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        this.selectTeachCourse()
        this.toShowStu()
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
    selectTeachCourse () {
      this.$http.post(`${this.getUser.router}showTeachCourse.do`).then(
        response => {
          let result = response.data
          this.course = result
          this.chooseValue = result[0].id
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询所教课程出错了')
        }
      )
    },
    toShowStu () {
      this.$http.post(`${this.getUser.router}showChoosedCourseStu.do`, {courseId: this.chooseValue}).then(
        response => {
          let result = response.data
          this.tableData = result
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询课程里的学生出错了')
        }
      )
    },
    updateScore () {
      this.$http.post(`${this.getUser.router}updateScore.do`, {tableData: this.tableData}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
            this.$notify({
              title: 'ok~',
              message: '分数提交成功~',
              type: 'success'
            })
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改成绩出错啦~~~')
        }
      )
    }
  }
}
</script>
<style scoped>
</style>