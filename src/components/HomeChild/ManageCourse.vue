<!-- 超级管理员管理课程 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>课程管理
    <el-table :data="tableData" style="width: 45%">
      <el-table-column label="编号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="name" label="课程名" width="120"></el-table-column>
      <el-table-column prop="teacher.name" label="任课老师" width="120"></el-table-column>
      <el-table-column prop="time" label="上课时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <i class="iconfont icon-icon11" @click="forUpdateOneCourseInfo(scope.$index,tableData)"></i>&nbsp;
          <i class="iconfont icon-icon12" @click="deleteOneCourseInfo(scope.$index,tableData)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="forInsertCourse()" class="checkin" plain><i class="iconfont icon-bianji"></i>&nbsp;增加一门课程</el-button>
    <!--修改课程 模态框部分-->
    <el-dialog title="修改课程信息" :visible.sync="UpdatedialogTableVisible">
      <el-form :model="form">
        <el-form-item  label="课程名" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" auto-complete="off"></el-input>
        </el-form-item>
		    <el-form-item label="任课老师" :label-width="formLabelWidth">
          <el-select v-model="form.teacherId">
            <el-option v-for="(item, index) in teachers" v-if="item.teacherId !== '0000'" :key="item.userId" :label="item.teacherName":value="item.teacherId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-select v-model="form.timeOne">
            <el-option key="星期一" label="星期一" value="星期一"></el-option>
            <el-option key="星期二" label="星期二" value="星期二"></el-option>
            <el-option key="星期三" label="星期三" value="星期三"></el-option>
            <el-option key="星期四" label="星期四" value="星期四"></el-option>
            <el-option key="星期五" label="星期五" value="星期五"></el-option>
          </el-select>
          <el-select v-model="form.timeTwo">
            <el-option key="12节" label="12节" value="12节"></el-option>
            <el-option key="34节" label="34节" value="34节"></el-option>
            <el-option key="56节" label="56节" value="56节"></el-option>
            <el-option key="78节" label="78节" value="78节"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdatedialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOneCourseInfo()">修 改</el-button>
      </div>
    </el-dialog>
    <!--增加课程 模态框部分-->
    <el-dialog title="增加课程信息" :visible.sync="InsertdialogTableVisible">
      <el-form :model="form">
        <el-form-item  label="课程名" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" auto-complete="off"></el-input>
        </el-form-item>
		    <el-form-item label="任课老师" :label-width="formLabelWidth">
          <el-select v-model="form.teacherId">
            <el-option v-for="(item, index) in teachers" v-if="item.teacherId !== '0000'" :key="item.userId" :label="item.teacherName":value="item.teacherId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-select v-model="form.timeOne">
            <el-option key="星期一" label="星期一" value="星期一"></el-option>
            <el-option key="星期二" label="星期二" value="星期二"></el-option>
            <el-option key="星期三" label="星期三" value="星期三"></el-option>
            <el-option key="星期四" label="星期四" value="星期四"></el-option>
            <el-option key="星期五" label="星期五" value="星期五"></el-option>
          </el-select>
          <el-select v-model="form.timeTwo">
            <el-option key="12节" label="12节" value="12节"></el-option>
            <el-option key="34节" label="34节" value="34节"></el-option>
            <el-option key="56节" label="56节" value="56节"></el-option>
            <el-option key="78节" label="78节" value="78节"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertdialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertOneCourseInfo()">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [], // 数据库查出的要展示的数据
      UpdatedialogTableVisible: false,
      InsertdialogTableVisible: false,
      formLabelWidth: '70px',
      form: {
        courseId: '',
        courseName: '',
        teacherName: '',
        teacherId: '',
        time: '',
        timeOne: '',
        timeTwo: '',
        userId: ''
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
    showAll () { // 展示全部课程信息
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
    },
    forUpdateOneCourseInfo (index, tableData) { // 为了修改一个课程
      this.form.courseId = tableData[index].id
      this.form.courseName = tableData[index].name
      this.form.teacherName = tableData[index].teacher.name
      this.form.teacherId = tableData[index].teacher_id
      let time = tableData[index].time
      this.form.timeOne = time.substring(0, 3)
      this.form.timeTwo = time.substring(3, 6)
      // 展示所有的老师
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
    updateOneCourseInfo () { // 修改课程信息
      this.form.time = this.form.timeOne + this.form.timeTwo
      console.log('courseId:' + this.form.courseId)
      console.log('courseName:' + this.form.courseName)
      console.log('teacherName:' + this.form.teacherName)
      console.log('teacherId:' + this.form.teacherId)
      console.log('userId:' + this.form.userId)
      this.$http.post(`${this.getUser.router}updateOneCourse.do`, {info: this.form}).then(
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
              title: 'ok~',
              message: result.message,
              type: 'success'
            })
            this.UpdatedialogTableVisible = false
            this.showAll() // 重新加载刷新
          }
        }
      ).catch(
        error => {
          console.log(error)
          console.log('修改课程信息出错了')
        }
      )
    },
    forInsertCourse () { // 为了增加一门课程
      this.form = {
        courseId: '',
        courseName: '',
        teacherName: '',
        teacherId: '',
        time: '',
        timeOne: '',
        timeTwo: '',
        userId: ''
      }
      // 展示所有的老师
      this.selectAllTeacher()
      this.InsertdialogTableVisible = true
    },
    insertOneCourseInfo () { // 增加一个课程信息
      if (this.form.courseName === '' || this.form.teacherId === '' || this.form.timeOne === '' || this.form.timeTwo === '') {
        this.$notify({
          title: 'notice',
          message: '请将信息填写完整！',
          type: 'warning'
        })
      } else {
        this.form.time = this.form.timeOne + this.form.timeTwo
        this.$http.post(`${this.getUser.router}insertOneCourse.do`, {info: this.form}).then(
          response => {
            let result = response.data
            if (result.value === '0' || result.value === '2') {
              this.$notify({
                title: 'notice',
                message: result.message,
                type: 'warning'
              })
            } else if (result.value === '1') {
              this.$notify({
                title: 'success',
                message: result.message,
                type: 'success'
              })
              this.InsertdialogTableVisible = false
              this.showAll()
            }
          }
        ).catch(
          error => {
            console.log(error)
            console.log('增加课程出错了')
          }
        )
      }
    },
    deleteOneCourseInfo (index, tableData) { // 删除一条课程信息
      let courseId = tableData[index].id
      this.$http.post(`${this.getUser.router}deleteOneCourse.do`, {info: courseId}).then(
        response => {
          let result = response.data
          if (result.value === '1') {
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
          console.log('删除一条课程出错了')
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
.checkin{
  background-color: #2BC4B7;
  color: aliceblue;
}
</style>