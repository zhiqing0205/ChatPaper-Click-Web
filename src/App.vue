<template>
  <div id="app">
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  margin: 0 !important;
  padding: 0 !important;
  
}
.el-main{
  background-attachment: fixed;
  background-image: url("https://img.ziuch.top/i/2023/12/27/mf01ew-2.webp");
  min-height: calc(100vh - 60px);
  padding-bottom: 0;
}
.el-header {
  line-height: 60px;
  padding: 0;
}
</style>
