import {defineStore} from "pinia";

export const useVoteInfoStore = defineStore('voteInfo',{
    state: () => ({
        vote: {}
    })
})

export const useStepStore = defineStore('step',{
    state: () => ({
        active: 1
    })
})

export const usePublishStore = defineStore('publish',{
    state: () => ({
        params: {
            title: '',
            project_info: '',
            startTime: '',
            endTime: '',
            wayWin: 0,
            votingNumber: 0,
            items: []
        }
    })
})