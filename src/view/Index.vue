<!-- 在这里获取uuid，保存到stone里 -->
<template>
    <MyHead/>
    <div class="site">
        <router-view/>
    </div>
    <Footer/>
</template>
<script>
import {useUuidStore} from '../pinia/index.js'
import Head from '../components/Head.vue'
import MyHead from '../components/Head.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Index',
    components: {Footer, MyHead, Head},
    data() {
        return {
            uuid: ''
        }
    },
    methods: {
        getUuid() {
            if (localStorage.getItem("uuid")) {
                const store = useUuidStore()
                this.uuid = localStorage.getItem("uuid")
                store.uuid = localStorage.getItem("uuid")
            } else {
                this.uuid = "fdsfsdfkfdsgjzdvlmnjoifzjgiofjdgfdjgk"
                const store = useUuidStore()
                store.uuid = this.uuid
                localStorage.setItem("uuid", this.uuid)
            }
        }
    },
    created() {
        this.getUuid()
    }
}
</script>
<style scoped>
.site {
    width: 100vw;
    min-height: calc(100vh - 110px);
    overflow: auto;
}

.foot {
    width: 100vw;
    height: 50px;
    position: relative;
    background-color: lightpink;
}
</style>