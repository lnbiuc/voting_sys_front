<!-- 显示已经开启的投票列表 -->
<template>
    <div class="mainContent">
        <div class="votList">
            <div class="vot" v-for="v in votes" :key=v.uuid>
                <div class="statusContent">
                    <div class="status">
                        <a v-if="v.status" class="ui green ribbon label">状态：进行中</a>
                        <a v-if="!v.status" class="ui red ribbon label">状态：已结束</a>
                    </div>
                </div>
                <div class="title" @click="toDetail(v.projectId)">
                    <p style="font-size: 25px;font-weight: 400">{{ v.title }}</p>
                    <span>{{ v.describe }}</span>
                </div>
                <div class="votInfo">
                    <span>产生{{ v.wayWin }}名获胜者&nbsp;|&nbsp;</span>
                    <span>可投{{ v.votingNumber }}张票</span>
                </div>
                <div class="time">
                    <span>截止时间：{{ v.endTime }}</span>
                </div>
                <div v-if="!v.status" class="result">
                    <el-button type="primary" @click="toResult(v.projectId)">查看结果</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useVoteInfoStore} from '../pinia/index.js'
import {getVotingList} from '../axios/index.js'

export default {
    name: 'VotingList',
    data() {
        return {
            temp: '',
            votes: [
                {
                    "projectId": "123",
                    "title": "正在加载",
                    "describe": "数据正在加载，请稍等",
                    "startTime": "2021-10-20 20:01:01",
                    "endTime": "2021-10-20 20:01:01",
                    "wayWin": 3,
                    "votingNumber": "5",
                    "status": true
                }
            ]
        }

    },
    methods: {
        toDetail(projectId) {
            const store = useVoteInfoStore()
            store.projectId = projectId
            for (let v in this.votes) {
                if (this.votes[v].projectId === projectId) {
                    store.vote = this.votes[v]
                }
            }
            this.$nextTick(() => {
                this.$router.push('/detail/' + projectId)
            })
        },
        getVotes() {
            getVotingList().then(res => {
                this.votes = res.data.data.projects
                let uuid = res.data.data.uuid
                window.localStorage.setItem('uuid', uuid)
            })
        },
        toResult(projectId) {
            this.$router.push('/result/' + projectId)
        }
    },
    created() {
        this.getVotes()
    }
}
</script>
<style scoped>
.mainContent {
    width: 50vw;
    margin: 0 auto;
    text-align: center;
}

.votList {
    margin: 10px 10px;
}

.vot {
    display: flex;
    flex-direction: column;
    border: 1px solid #d0d7de;
    border-radius: 7px;
    margin: 20px auto;
    padding: 10px 10px;
    cursor: pointer;
}

.vot:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
    0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.5s;
}

.statusContent {
    position: absolute;
}

.status {
    position: relative;
    margin-left: 3px;
}

.time {
    display: flex;
    flex-direction: row;
    justify-content: end;
    color: gray;
}

.votInfo {

}

.title:hover {
    color: #747bff;
}

.result {

}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94vw;
    }
}
</style>