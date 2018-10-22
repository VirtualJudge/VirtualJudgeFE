<template>

</template>

<script>
  import api from '../../api'

  export default {
    name: "Logout",
    mounted() {
      api.logout().then(res => {
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
      }, res => {
        this.$Message.error('登出失败')
      })

    }
  }
</script>

<style scoped>

</style>
