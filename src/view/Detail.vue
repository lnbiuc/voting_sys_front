<template>
    <div class="mainContent">
        <div class="title">
            <h1>{{ vote.title }}</h1>
            <span>{{ vote.projectInfo }}</span>
            <div class="vote_info">
                <span>剩余票数：{{ number }}</span>
                <span>截止时间：{{ vote.endTime }}</span>
            </div>
        </div>
        <div class="items">
            <div class="item" v-for="i in items">
                <div class="item_avatar_info">
                    <el-avatar class="item_img" :size="100" :src="i.img"/>
                    <div class="item_info">
                        <p class="item_title">{{ i.name }}</p>
                        <p class="item_introdiction">{{ i.introdiction }}</p>
                    </div>
                </div>
                <div class="item_votes">
                    <p>{{ i.currentVotes }} 票</p>
                </div>
                <div class="btn" @click="submitVote(i.itemsId)">
                    <p>投票</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useVoteInfoStore} from '../pinia/index.js'
import {ElMessage} from 'element-plus'
import {getProjectItems, submitVot} from '../axios/index.js'

export default {
    name: 'Detail',
    data() {
        return {
            temp: '',
            "projectId": "",
            "items": [
                {
                    "itemsId": "1",
                    "name": "正在加载",
                    "introdiction": "数据正在加载，请稍等",
                    "img": "https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/93021665907032739.jpg",
                    "currentVotes": 234
                }
            ],
            vote: {},
            customColors: [
                {color: '#f56c6c', percentage: 100},
                {color: '#e6a23c', percentage: 80},
                {color: '#5cb87a', percentage: 60},
                {color: '#1989fa', percentage: 40},
                {color: '#6f7ad3', percentage: 20},
            ],
            timer: null,
            progress: 0,
            number: null
        }
    },
    methods: {
        getProjectItems() {
            this.projectId = this.$route.params.votId
            getProjectItems(this.projectId).then(res => {
                if (res.data.code === 200) {
                    this.vote = res.data.data.project[0]
                    this.items = res.data.data.items
                    if (this.number === null) {
                        this.number = res.data.data.project[0].votingNumber
                    }
                    return
                }
                if (res.data.code === 401) {
                    ElMessage.warning("此投票已经结束，您可以浏览其他投票")
                }
            })
        },
        getProjectInfo() {
            const store = useVoteInfoStore()
            if (store.vote) {
                this.vote = store.vote
            }
        },
        submitVote(itemsId) {
            if (this.number <= 0) {
                ElMessage.error("票数不足")
            } else {
                submitVot(this.vote.projectId, itemsId).then(res => {
                    this.number = this.number - 1
                    if (res.data.code === 200) {
                        ElMessage.success("投票成功")
                        this.getProjectItems()
                    } else {
                        ElMessage.error(res.data.msg)
                    }
                })
            }

        }
    },
    created() {
        this.getProjectItems()
        this.getProjectInfo()
        this.timer = window.setInterval(this.setProgress, 100)
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
.mainContent {
    width: 50vw;
    margin: 10px auto;
    text-align: center;
}

.title {
    display: flex;
    flex-direction: column;
    border: 1px solid #d0d7de;
    border-radius: 7px;
    margin: 20px auto;
    padding: 10px 10px;
}

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

.item_img, .item_info, .item_votes {
    margin: 10px 10px;
}

.item_info {
    width: 20vw;
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

.item_votes {
    display: flex;
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

.vote_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: gray;
}

@media screen and (max-width: 1000px) {
    .item {
        flex-direction: column;
    }

    .mainContent {
        width: 94vw;
    }

    .item_avatar_info {
        flex-direction: column;
    }

    .item_info {
        width: 90vw;
    }

    .btn {
        width: inherit;
        height: 50px;
        border-radius: 0 0 7px 7px;
    }

    .item_votes {
        justify-content: center;
    }
}
</style>