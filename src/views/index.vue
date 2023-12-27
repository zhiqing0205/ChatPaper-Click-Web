<template>
    <el-card shadow="always" class="card">
        
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            style="margin-bottom: 36px; margin-top: 25px;"

            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传PDF文件，且不超过10M</div>
        </el-upload>
        
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入PDF链接" v-model="input2">
                <template slot="append"><el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button></template>
            </el-input>
        </div>

        <el-divider>最近动态</el-divider>    
        <el-carousel :interval="5000" arrow="always" v-if="papers.length > 0">
            <el-carousel-item v-for="paper in papers" :key="paper.id">
                <div class="mask">
                    <h2>{{ paper.title }} - {{ paper.created_at }}</h2>
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script>
import { getPapers } from '@/api';
export default{
    name:'',
    data(){
        return{
            papers:[],
            input2:''
        }
    },
    methods:{
        getPapers(){
            getPapers().then(res=>{
                this.papers = res;
            });
        }
    },
    mounted(){
        this.getPapers();
    },
}
</script>

<style scoped>
    .el-upload__tip{
        color:red;
    }
    .el-carousel__item h2 {
        color: #fff;
        font-size: 18px;
        margin: 0;
        /** 换行 */
        word-break: break-all;
        /** 最大宽度 */
        max-width: 75%;
        margin: 0 auto;
    }
  
  .el-carousel__item {
    /* 加上蒙版 */
    background-image: url(https://img.ziuch.top/i/random.php);
  }

  .card {
    width: 800px;
    /** 水平 竖直居中 */
    margin: 0 auto;
    margin-top: 100px;
    /** 宽度响应式 */
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /** 水平 竖直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>