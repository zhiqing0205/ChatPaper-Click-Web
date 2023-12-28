<template>
    <el-card class="card">
        <h2>登录到ChatPaper-Click</h2>
        <el-input placeholder="请输入密码" v-model="input" show-password style="margin-top: 36px;"></el-input>
        <el-button type="primary" round style="margin-top: 25px;" @click="login">登录</el-button>
    </el-card>
</template>

<script>
import { login } from '@/api';
export default{
    name:'',
    data(){
        return{
            input:''
        }
    },
    methods:{
        login(){
            if(this.input === ''){
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
            } else {
                // let form = new FormData();
                // form.append(password, this.input);
                login(this.input).then(res=>{
                    console.log(res);
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.$router.push({ path: '/' });
                    // 保存登录状态
                    localStorage.setItem('token', res.access_token);
                }).catch(err=>{
                    this.$message({
                        message: '密码错误',
                        type: 'error'
                    });
                });
            }
        }
    },
    mounted(){
    }
}
</script>

<style>
  .card {
    width: 600px;
    /** 水平 竖直居中 */
    margin: 0 auto;
    margin-top: 100px;
    /** 宽度响应式 */
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
</style>