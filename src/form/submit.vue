<template>
    <div class="title" style="
    text-align: center;
    margin: 20px auto;">
        <el-steps :active="3" align-center>
            <el-step title="第一步" description="填写基本信息"/>
            <el-step title="第二步" description="设置投票项目"/>
            <el-step title="第三步" description="提交表单"/>
        </el-steps>
    </div>
    <el-result v-if="success"
               icon="success"
               title="提交成功"
               sub-title="你的表单已经提交，投票将会在特定时间开始"
    >
        <template #extra>
            <el-button type="primary" @click="this.$router.push('/')">Back</el-button>
        </template>
    </el-result>
    <el-result v-if="error"
               icon="error"
               title="发生错误"
               sub-title="表单提交发生错误，请联系管理员"
    >
        <template #extra>
            <el-button type="primary" @click="this.$router.push('/')">Back</el-button>
        </template>
    </el-result>
</template>

<script>
import {useStepStore} from '../pinia/index.js'

export default {
    name: "submit",
    data() {
        return {
            status: '',
            success: false,
            error: false
        }
    },
    created() {
        const store = useStepStore()
        store.active = 3
        this.status = this.$route.params.status
        if (this.status) {
            if (this.status === 'success') {
                this.success = true
            } else if (this.status === 'error') {
                this.error = true
            }
        }
    }
}
</script>

<style scoped>

</style>