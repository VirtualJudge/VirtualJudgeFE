<template>

</template>

<script>
  import api from '../../api'

  export default {
    name: "Logout",
    mounted() {
      api.logout().then(res => {
        this.$router.push('/');
      }, res => {
        this.$Message.error('登出失败')
      })

    }
  }
</script>

<style scoped>

</style>
