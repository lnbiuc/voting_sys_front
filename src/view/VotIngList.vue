<!-- 显示已经开启的投票列表 -->
<template>
    <div class="mainContent">
        <div class="votList">
            <div class="vot" v-for="v in votes" :key = v.uuid @click="toDetail(v.projectId)">
                <div class="statusContent">
                    <div class="status">
                        <a class="ui green ribbon label">状态：{{v.status}}</a>
                    </div>
                </div>
                <div class="title">
                    <p style="font-size: 25px;font-weight: 400">{{v.title}}</p>
                    <span>{{v.describe}}</span>
                </div>
                <div class="votInfo">
                    <span>产生{{v.wayWin}}名获胜者&nbsp;|&nbsp;</span>
                    <span>可投{{ v.votingNumber }}张票</span>
                </div>
                <div class="time">
                    <span>截止时间：{{v.endTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {useVoteInfoStore} from '../pinia/index.js'

export default {
    name: 'VotingList',
    data() {
        return {
            votes: [
                {
                    "uuid":"uuid（64位）",
                    "projectId":"hgSd23",
                    "title":"XX投票",
                    "describe":"这是关于。。。的投票",
                    "startTime":"2021-10-20 20:01:01",
                    "endTime":"2021-10-20 20:01:01",
                    "wayWin":3,
                    "votingNumber":"5",
                    "status":"open"
                },
                {
                    "uuid":"uuid（64位）",
                    "projectId":"fdfdf",
                    "title":"XX投票",
                    "describe":"这是关于。。。的投票",
                    "startTime":"2021-10-20 20:01:01",
                    "endTime":"2021-10-20 20:01:01",
                    "wayWin":3,
                    "votingNumber":"5",
                    "status":"open"
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
                this.$router.push('/detail/'+projectId)
            })
        }
    },
    created() {

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
    margin-left: 6px;
}

.time {
    display: flex;
    flex-direction: row;
    justify-content: end;
    color: gray;
}

.votInfo {

}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94vw;
    }
}
</style>