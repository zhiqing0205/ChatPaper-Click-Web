<template>
    <el-card shadow="always">
        <embed :src="pdf_url" width="100vw" height="100vh"/>
    </el-card>
</template>

<script>

export default{
    name:'',
    data(){
        return{
            pdf_url:''
        }
    },
    methods:{

    },
    created(){
        this.$message({
            message: 'PDF加载中',
            type: 'success'
        });
    },
    mounted(){
        console.log('mounted');
    }
}
</script>

<style scoped>

</style>