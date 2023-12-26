<template>
    <el-card shadow="always">
        <h1>ChatPaper-Click</h1>
        <p>一触即达 轻松科研</p>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入PDF链接" v-model="input2">
                <template slot="append"><el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button></template>
            </el-input>
        </div>
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传PDF文件，且不超过10M</div>
        </el-upload>
    </el-card>
</template>

<script>

export default{
    name:''
}
</script>

<style scoped>
    .el-upload__tip{
        color:red;
    }
</style>