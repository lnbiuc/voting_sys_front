<template>
    <div class="form">
        <router-view/>
    </div>
</template>

<script>

import {useStepStore} from '../pinia/index.js'

export default {
    name: "Publish",
    data() {
        return {
            active: 1
        }
    },
    methods: {
        stepChange() {
            const store = useStepStore()
            store.active = this.active
        }
    },
    created() {
        this.stepChange()
    },
}
</script>

<style scoped>
.form {
    width: 50vw;
    margin: 20px auto;
    overflow: auto;
}

@media screen and (max-width: 1000px) {
    .form {
        width: 94vw;
    }
}
</style>