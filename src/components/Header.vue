<template>
    <!--显示logo和slogan-->
    <div class="header">
        <img src="@/assets/ChatGPT.png" alt="logo" @click="to_index"/>
        <span @click="to_index">ChatPaper</span>
        <!-- 显示在最右边 -->
        <img src="@/assets/GitHub.png" alt="github" style="margin-left: auto; margin-right: 25px;" @click="to_github"/>
      </div>  
</template>

<script>
export default {
  name: 'Header',
  methods: {
    to_index() {
      this.$router.push({ path: '/' });
    },
    to_github() {
      window.open('https://github.com/zhiqing0205/ChatPaper-Click');
    }
  }
}
</script>

<style>
.header{
  display: flex;
  /* 左对齐 */
  justify-content: flex-start;
  align-items: center;
  padding-left: 25px;
  font-size: 30px;
  font-weight: bold;
  color: #409eff;
  /* background-color: #d3e3fd; */
  img{
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
}
</style>