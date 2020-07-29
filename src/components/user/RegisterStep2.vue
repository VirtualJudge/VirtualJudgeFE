<template>
    <div>
        <h2 style="text-align: center;margin-bottom: 10px">验证邮箱地址</h2>
        <div>
            <p>xudian.cn@gmail.com</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterStep2",
        mounted() {
            this.$emit('step', 1)
        }
    }
</script>

<style scoped>
</style>
