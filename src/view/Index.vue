<!-- 在这里获取uuid，保存到stone里 -->
<template>
    <MyHead/>
    <div class="site">
        <router-view/>
    </div>
    <Footer/>
</template>
<script>

import Head from '../components/Head.vue'
import MyHead from '../components/Head.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'Index',
    components: {Footer, MyHead, Head},
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