<template>
    <div class="form">
        <el-form ref="baseForm" :model="ruleForm" :rules="rules" label-position="top">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" show-word-limit maxlength="20"/>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
                <el-input v-model="ruleForm.describe" type="textarea" show-word-limit maxlength="255"/>
            </el-form-item>
            <el-form-item label="持续时间" prop="time">
                <el-date-picker
                        v-model="ruleForm.time"
                        type="datetimerange"
                        range-separator="To"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                />
            </el-form-item>
            <el-form-item label="每人选票数" prop="votingNumber">
                <el-input-number v-model="ruleForm.votingNumber" :min="1" :max="10"/>
            </el-form-item>
            <el-form-item label="获胜人数" prop="wayWin">
                <el-input-number v-model="ruleForm.wayWin" :min="1" :max="10"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {ElMessage} from 'element-plus'

export default {
    name: "baseInfo",
    data() {
        return {
            rules: {
                title: [{required: true, message: '不可为空', trigger: 'change'}],
                describe: [{required: true, message: '不可为空', trigger: 'change'}],
                time: [{required: true, message: '不可为空', trigger: 'change'}],
                votingNumber: [{required: true, message: '不可为空', trigger: 'change'}],
                wayWin: [{required: true, message: '不可为空', trigger: 'change'}],
            },
            ruleForm: {
                title: '',
                describe: '',
                time: '',
                votingNumber: '',
                wayWin: ''
            },
        }
    },
    methods: {
        submit() {
            this.$refs.baseForm.validate((valid) => {
                if (valid) {
                    ElMessage.success("提交成功")
                    this.$router.push('/publish/items')
                } else {
                    ElMessage.error("数据不完整")
                }
            })
        }
    }
}
</script>

<style scoped>
.form {
    width: 100%;
    margin: 20px auto;
}
</style>