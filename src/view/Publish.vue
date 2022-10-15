<template>
    <div class="title">
        <el-steps :active="active"  align-center>
            <el-step title="第一步" description="填写基本信息" />
            <el-step title="第二步" description="设置投票项目" />
            <el-step title="第三部" description="提交表单" />
        </el-steps>
    </div>
    <div class="form">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: "Publish",
    data() {
        return {
            active: 1
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.form {
    width: 50vw;
    margin: 20px auto;
}

.title {
    width: 60vw;
    text-align: center;
    margin: 20px auto;
}
</style>