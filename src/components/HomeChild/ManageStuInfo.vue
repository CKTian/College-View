<!-- 登录者查看所有所带班级的学生的信息 -->
<template>
  <div class="kuang">
    <ShowStuInfo :tableData="tableData" @fresh ="selectStuInfo"></ShowStuInfo>
  </div>
</template>

<script>
import ShowStuInfo from '@/components/HomeChild/MSChild/ShowStuInfo'
export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    ShowStuInfo
  },
  computed: {
    getTeamName: {
      get: function () {
        if (this.$store.state.BasicInfo.basicInfo.length !== 0) {
          if (this.getUser.router !== '/home/SuperController/') {
            // 一上来 展示所有该老师所带的学生信息
            this.selectStuInfo(this.$store.state.BasicInfo.basicInfo[4].value)
            return this.$store.state.BasicInfo.basicInfo[4].value
          } else {
            // 一上来 展示全部的学生信息
            this.selectStuInfo('')
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
    }
  },
  watch: {
    getTeamName () {}
  }
}
</script>
<style scoped>
lable {
  text-align: center;
}
</style>