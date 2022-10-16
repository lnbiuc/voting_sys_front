<template>
    <div class="title" style="text-align: center;margin: 20px auto;">
        <el-steps :active="2" align-center>
            <el-step title="第一步" description="填写基本信息"/>
            <el-step title="第二步" description="设置投票项目"/>
            <el-step title="第三步" description="提交表单"/>
        </el-steps>
    </div>
    <div class="items_add_form">
        <el-form ref="baseForm" :model="ruleForm" :rules="rules" label-position="top">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" show-word-limit maxlength="20"/>
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input v-model="ruleForm.introduction" type="textarea" show-word-limit maxlength="255"/>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-input v-model="ruleForm.img" show-word-limit maxlength="255"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="add">添加一项</el-button>
            </el-form-item>
        </el-form>
        {{items}}
        <div class="imgUp">
            <el-upload :on-error="this.upError"
                       :on-success="this.upSuccess"
                       action='https://www.beyondhorizon.top/api/admin/upload/img'
                       auto-upload
                       class="upload-demo"
                       :headers="token"
                       drag
                       enctype="multipart/form-data"
                       name="img">
                <el-icon class="el-icon--upload">
                    <i class="icon upload"/>
                </el-icon>
                <div class="el-upload__text">
                    将图片拖拽到此处或 <em>点击选择文件</em>上传
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        支持所有图片格式，图片大小必须在10MB以下
                    </div>
                </template>
            </el-upload>
        </div>
        <div class="items_list">
            <div class="items">
                <div class="item" v-for="i in this.items">
                    <div class="item_avatar_info">
                        <el-avatar class="item_img" :size="75" :src="i.img"/>
                        <div class="item_info">
                            <p class="item_title">{{ i.name }}</p>
                            <p class="item_introdiction">{{ i.introduction }}</p>
                        </div>
                    </div>
                    <div class="btn" @click="deleteOne(i.identifyId)">
                        <p>删除</p>
                    </div>
                </div>
            </div>
        </div>
        <el-button style="width: 100%" @click="submit">提交</el-button>
    </div>
</template>

<script>

import {useStepStore} from '../pinia/index.js'
import {ElMessage} from 'element-plus'

export default {
    name: "items",
    data() {
        return {
            items: [],
            token: {
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDE4ODAyMjQsInVzZXJJZCI6Iks0dldwQXoxIiwiaWF0IjoxNjY1NTkyMjI0fQ.4FvJpmIxr-miR3GXkF2BihqX-7C2iVAz09hPPzGlWqk'
            },
            ruleForm: {
                name: '',
                introduction: '',
                img: ''
            },
            rules: {
                name: [{required: true, message: '不可为空', trigger: 'change'}],
                introduction: [{required: true, message: '不可为空', trigger: 'change'}],
                img: [{required: true, message: '不可为空', trigger: 'change'}],
            },
        }
    },
    methods: {
        submit() {
            if (this.items.length > 0) {
                this.$router.push('/publish/submit/' + "success")
            } else {
                this.$router.push('/publish/submit/' + "error")
            }
        },
        add() {
            this.$refs.baseForm.validate((valid) => {
                if (valid) {
                    ElMessage.warning("添加成功")
                    let identifyId = Math.ceil(Math.random() * 100000);
                    let item = {
                        name: this.ruleForm.name,
                        introduction: this.ruleForm.introduction,
                        img: this.ruleForm.img,
                        identifyId: identifyId
                    }
                    this.items.push(item)
                    this.ruleForm.img = ''
                    this.ruleForm.name = ''
                    this.ruleForm.introduction = ''
                } else {
                    ElMessage.error("数据不完整")
                }
            })
        },
        deleteOne(index) {
            let list = this.items
            for (let i = 0; i < list.length; i++) {
                if (list[i].identifyId === index) {
                    list.splice(i, 1)
                    ElMessage.success("删除成功")
                }
            }
            this.items = list
        },
        upSuccess(response, file, fileList) {
            if (response.code === 200) {
                ElMessage.success('上传成功')
                this.ruleForm.img = response.data
            }
        },
        upError(err, file, fileList) {
            let msg = '上传失败' + err
            ElMessage.error('上传失败' + msg)
        },
    },
    created() {
        const store = useStepStore()
        store.active = 2
    }
}
</script>

}
<style scoped>

.title:hover, .item:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
    0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.5s;
}

.items {
    margin: 20px auto;
}

.item {
    border: 1px solid #d0d7de;
    border-radius: 7px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

.item_img, .item_info {
    margin: 10px 10px;
}

.item_info {
    width: 32vw;
    overflow: hidden;
    word-break: break-all;
    white-space: break-spaces;
}

.item_title {
    font-size: 1.2em;
    font-weight: 500;
}

.item_avatar_info {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.btn {
    height: inherit;
    border-radius: 0 7px 7px 0;
    background-color: #eee;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.btn > p {
    font-size: 1.3em;
}

.btn:hover {
    background-color: #747bff;
    color: #eeeeee;
}

.btn:hover > p {
    font-size: 1.6em;
    transition: font-size 0.5s;
}

@media screen and (max-width: 1000px) {
    .item {
        flex-direction: column;
    }

    .item_avatar_info {
        flex-direction: column;
    }

    .item_info {
        width: 90vw;
    }

    .item_info > p {
        text-align: center;
    }

    .btn {
        width: inherit;
        height: 40px;
        border-radius: 0 0 7px 7px;
    }
}
</style>