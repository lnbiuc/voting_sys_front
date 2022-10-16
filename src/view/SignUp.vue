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
                <el-button @click="sendCode" :disabled="disabled">{{ btn_text }}</el-button>
                <el-button type="primary" @click="confirmOperation()">登录 / 注册</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import {ElMessage} from 'element-plus'
import {getCode, usrLogin} from '../axios/index.js'

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
            btn_text: '发送验证码',
            disabled: false,
            timer: null
        }
    },
    methods: {
        confirmOperation() {
            this.$refs.baseForm.validate((valid) => {
                if (valid) {
                    usrLogin(this.ruleForm.phone, this.ruleForm.code).then(res => {
                        if (res.data.code === 200) {
                            console.log(5)
                            ElMessage.success('登陆成功')
                            let token = res.data.data.token
                            window.localStorage.setItem('token',token)
                            this.$router.push('/')
                        } else {
                            ElMessage.warning(res.data.msg)
                        }
                    })
                } else {
                    ElMessage.error("参数不完整")
                }
            })
        },
        sendCode() {
            if (!this.ruleForm.phone) {
                ElMessage.error("请先输入手机号")
            } else {
                getCode(this.ruleForm.phone).then(res => {
                    if (res.data.code === 200) {
                        ElMessage.success(res.data.data)
                        this.btn_text = '已发送'
                        this.disabled = true
                        this.timer = setTimeout(this.changeStatus,60000)
                    } else {
                        ElMessage.error(res.data.msg)
                    }
                })
            }
        },
        changeStatus() {
            this.disabled = false
        }
    },
    beforeDestroy() {
        window.clearInterval(this.timer);
        this.timer = null
    },
    destroy() {
        window.clearInterval(this.timer);
        this.timer = null
    },
    beforeRouteLeave() {
        window.clearInterval(this.timer);
        this.timer = null
    },
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