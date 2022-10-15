<template>
    <div class="loginContent">
        <el-form ref="baseForm" :model="ruleForm" :rules="rules" label-position="top">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"/>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code"/>
            </el-form-item>
            <div class="btn">
                <el-button @click="sendCode">{{btn_text}}</el-button>
                <el-button type="primary" @click="confirmOperation">登录 / 注册</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import {ElMessage} from 'element-plus'

export default {
    name: 'SignUp',
    data() {
        return {
            rules: {
                phone: [{required: true, message: '不可为空', trigger: 'change'}],
                code: [{required: true, message: '不可为空', trigger: 'change'}],
            },
            ruleForm: {
                phone: '',
                code: ''
            },
            btn_text: '发送验证码'
        }
    },
    methods: {
        confirmOperation() {
            this.$refs.baseForm.validate((valid) => {
                if (valid) {

                }
            })
        },
        sendCode() {
            if (!this.ruleForm.phone) {
                ElMessage.error("请先输入手机号")
            }
        }
    }
}
</script>
<style scoped>
.loginContent {
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>