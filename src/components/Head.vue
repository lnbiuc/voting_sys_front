<template>
    <div class="head">
        <div class="logo">
            <span @click="goto(1)">
                Anonymous_voting_sys
            </span>
        </div>
        <div class="route">
            <span @click="goto(2)">
                <span><i class="icon list ol"/>投票列表</span>
            </span>
            <span @click="goto(3)">
                <span><i class="icon chart bar"/>发起投票</span>
            </span>
        </div>
        <div class="link">
            <span @click="goto(4)">
                <span>注册/登陆</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyHead',
    methods: {
        goto(index) {
            switch (index) {
                case 1:
                    return this.$router.push('/')
                case 2:
                    return this.$router.push('/votingList')
                case 3:
                    return this.$router.push('/publish')
                case 4:
                    return this.$router.push('/signup')
            }
        }
    }
}
</script>
<style scoped>
.head {
    display: flex;
    flex-direction: row;
    height: 60px;
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
}

.head >>> * {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    flex: 1;
    justify-content: end !important;
}

.route {
    flex: 2;
}

.route > span, .link > span, .logo > span {
    height: inherit;
    display: block;
    margin: auto 5px;
    font-size: 1.3em;
    padding: 15px;
    cursor: pointer;
}

.route > span:hover, .link > span:hover, .logo > span:hover {
    color: #747bff;
}

.link {
    flex: 1;
    justify-content: start !important;
}

@media screen and (max-width: 1000px) {
    .logo {
        display: none;
    }
}
</style>