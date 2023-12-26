<template>
    <div>
        <el-row :gutter="10">
            <el-col :md="12" :lg="12" :xl="12" class="hidden-sm-and-down">
                <div class="grid-content bg-purple">left</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple">right</div>
            </el-col>
        </el-row>
        <el-button type="primary" icon="el-icon-document" class="hidden-md-and-up fixd-bottom" circle></el-button>
    </div>
</template>

<script>

export default{
    data(){
        return{
            have_analysis:false
        }
    },
    methods:{
    },
    mounted(){
        console.log('mounted');
    }
}
</script>

<style>   
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.fixd-bottom{
    position:fixed;
    right:20px;
    bottom:20px;
    animation: pulse 2s infinite;
 }
 @keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.125);
        opacity: 0.85;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>