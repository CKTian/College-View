<!-- 查看登录老师所教课的课程表 -->
<template>
  <div class="kuang">
    <i class="iconfont icon-vertical_line"></i>{{getUserName}}老师，您好！您本学期的课表如下
    <el-table :data="tableData"  :span-method="objectSpanMethod" border style="text-align:center" :header-cell-style="headerCellStyle" :cell-style="cellStyle" @cell-mouse-enter="mouseHover">
      <el-table-column label="节数\星期" type="index" width="90px" style="text-align:center"></el-table-column>
      <el-table-column prop="mon" label="星期一"></el-table-column>
      <el-table-column prop="tue" label="星期二"></el-table-column>
      <el-table-column prop="wed" label="星期三"></el-table-column>
      <el-table-column prop="thu" label="星期四"></el-table-column>
      <el-table-column prop="fri" label="星期五"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      },
      {
        mon: '',
        tue: '',
        wed: '',
        thu: '',
        fri: ''
      }]
    }
  },
  components: {},
  computed: {
    getUserName () {
      if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
        this.showTimeTable()
        return this.$store.state.BasicInfo.basicInfo[2].value
      }
    },
    getUser () {
      return this.$store.state.User
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    headerCellStyle ({row, column, rowIndex, columnIndex}) { // 设置表头样式
      return {
        textAlign: 'center'
      }
    },
    cellStyle ({row, column, rowIndex, columnIndex}) { // 设置单元格样式
      if (row.mon !== '') {
        if (columnIndex === 1) {
          return {
            background: '#F5F6F7'
          }
        }
      }
      if (row.tue !== '') {
        if (columnIndex === 2) {
          return {
            background: '#F5F6F7'
          }
        }
      }
      if (row.wed !== '') {
        if (columnIndex === 3) {
          return {
            background: '#F5F6F7'
          }
        }
      }
      if (row.thu !== '') {
        if (columnIndex === 4) {
          return {
            background: '#F5F6F7'
          }
        }
      }
      if (row.fri !== '') {
        if (columnIndex === 5) {
          return {
            background: '#F5F6F7'
          }
        }
      }
    },
    mouseHover (row, column, cell, event) {
      // cell.bgColor = '#ffffff'
    },
    insertToTable (i, week, courseName) {
      if (week === '一') {
        this.tableData[i].mon = courseName
      } else if (week === '二') {
        this.tableData[i].tue = courseName
      } else if (week === '三') {
        this.tableData[i].wed = courseName
      } else if (week === '四') {
        this.tableData[i].thu = courseName
      } else if (week === '五') {
        this.tableData[i].fri = courseName
      }
    },
    showTimeTable () {
      this.$http.post(`${this.getUser.router}showTimeTable.do`, {userId: this.getUser.id}).then(
        response => {
          let result = response.data
          // 循环遍历 查分
          result.forEach(element => {
            let week = (element.courseTime).substring(2, 3)
            let hour = (element.courseTime).substring(3, 5)
            if (hour === '12') {
              this.insertToTable(0, week, element.courseName)
            } else if (hour === '34') {
              this.insertToTable(2, week, element.courseName)
            } else if (hour === '56') {
              this.insertToTable(4, week, element.courseName)
            } else if (hour === '78') {
              this.insertToTable(6, week, element.courseName)
            }
          })
        }
      ).catch(
        error => {
          console.log(error)
          console.log('查询老师课程表出错啦！')
        }
      )
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
<style scoped>
</style>