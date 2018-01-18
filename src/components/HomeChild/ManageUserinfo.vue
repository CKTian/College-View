<!-- 个人信息管理组件 -->
<template>
  <div>
    <div class="m-userinfo">
      <Userinfo></Userinfo>
    </div>
    <div class="m-updatePwd">
        <router-view/>
    </div>
  </div>
</template>

<script>
import Userinfo from '@/components/HomeChild/MUChild/Userinfo'
export default {
  data () {
    return {
    }
  },
  components: {
    Userinfo
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
</style>