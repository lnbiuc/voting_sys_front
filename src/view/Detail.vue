<template>
    <div class="mainContent">
        <div class="title">
            <h1>{{ vote.title }}</h1>
            <span>{{ vote.describe }}</span>
            <div class="vote_info">
                <span>截止时间：{{vote.endTime}}</span>
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

export default {
    name: 'Detail',
    data() {
        return {
            "projectId": "2fhudf",
            "items": [
                {
                    "itemsId": "1",
                    "name": "投票项名称-1",
                    "introdiction": "投票项投票项简投票项投票项简介投票项简介简介投票项投票项简介投票项简介简介投票项投票项简介投票项简介简介介投票项简介简介-1",
                    "img": "投票项图片url",
                    "currentVotes": 234
                },
                {
                    "itemsId": "2",
                    "name": "投票项名称-2",
                    "introdiction": "投票项简介-2",
                    "img": "投票项图片url3",
                    "currentVotes": 57
                },
                {
                    "itemsId": "3",
                    "name": "投票项名称-3",
                    "introdiction": "投票项简介-3",
                    "img": "投票项图片url3",
                    "currentVotes": 190
                },
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
            progress: 0
        }
    },
    methods: {
        getProjectItems() {
            this.projectId = this.$route.params.votId
        },
        getProjectInfo() {
            const store = useVoteInfoStore()
            if (store.vote) {
                this.vote = store.vote
            } else {
                // axios请求vote信息,并保存进store
            }
        },
        submitVote(index) {
            let list = this.items
            for (let i = 0; i < list.length; i++) {
                if (list[i].itemsId === index) {
                    list[i].currentVotes = list[i].currentVotes + 1
                    ElMessage.success("投票成功")
                }
            }
            this.items = list
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
    justify-content: end;
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