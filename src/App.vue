<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* 基本配置开始 */
*{
  margin: 0;
  padding: 0;
}
ul, ol {
  list-style: none;
}
a {
  text-decoration: none;
}
/* 基本配置结束 */
#app {
  width: 100%; height: 100%;
  background-color: #F5F6F7;
}
body,html{
  width: 100%; height: 100%;
}
</style>
