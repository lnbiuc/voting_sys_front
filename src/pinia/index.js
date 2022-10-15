import {defineStore} from "pinia";

export const useUuidStore = defineStore('uuid', {
    state: () => ({
        uuid: ''
    }),
})

export const useVoteInfoStore = defineStore('voteInfo',{
    state: () => ({
        vote: {}
    })
})