<template>
    <div class="mainContent">
        <div class="items">
            <div class="item" v-for="i in items">
                <div class="item_avatar_info">
                    <el-avatar class="item_img" :size="100" :src="i.img"/>
                    <div class="item_info">
                        <p class="item_title">{{ i.name }}</p>
                        <p class="item_introdiction">{{ i.introduction }}</p>
                    </div>
                    <div>
                        <a v-if="i.status" class="ui tag label green">胜出</a>
                        <a v-if="!i.status" class="ui tag label red">失败</a>
                    </div>
                </div>
                <div class="item_votes">
                    <p>{{ i.currentVotes }} 票</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getResult} from '../axios/index.js'
import {ElMessage} from 'element-plus'

export default {
    name: 'Result',
    data() {
        return {
            projectId: '',
            temp: '',
            items: [
                {
                    "img": "https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/67801665928336659.jpg",
                    "itemsId": "21",
                    "name": "i2",
                    "currentVotes": 130,
                    "projectId": "wUiKHCvD",
                    "introduction": "i2",
                    "status": true
                },
                {
                    "img": "https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/67801665928336659.jpg",
                    "itemsId": "22",
                    "name": "i1",
                    "currentVotes": 60,
                    "projectId": "wUiKHCvD",
                    "introduction": "i1",
                    "status": true
                },
                {
                    "img": "https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/67801665928336659.jpg",
                    "itemsId": "23",
                    "name": "i3",
                    "currentVotes": 4,
                    "projectId": "wUiKHCvD",
                    "introduction": "i3",
                    "status": true
                },
                {
                    "img": "https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/67801665928336659.jpg",
                    "itemsId": "24",
                    "name": "i4",
                    "currentVotes": 2,
                    "projectId": "wUiKHCvD",
                    "introduction": "i4",
                    "status": false
                }
            ]
        }
    },
    methods: {
        getResult() {
            getResult().then(res => {
                this.temp = res.data.data
            })
        },
        submitVote() {
            ElMessage.error("投票已结束")
        }
    },
    created() {
        this.projectId = this.$route.params.votId
        this.getResult()
    }
}
</script>
<style scoped>
.mainContent {
    width: 50vw;
    margin: 0 auto;
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
    margin-right: 20px;
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

.statusContent {
    position: absolute;
}

.status {
    position: relative;
    margin-left: 3px;
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