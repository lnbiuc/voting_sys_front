<template>
    <h1>items</h1>
    <el-button @click="submit">提交</el-button>
</template>

<script>

export default {
    name: "items",
    methods: {
        submit() {
            this.$router.push('/publish/submit/' + "error")
        }
    }
}
</script>

<style scoped>

</style>