<template>
  <Table style="margin: 15px auto; width: 100%; max-width: 1200px;" :loading="loading" :columns="columns"
         :data="ranks"></Table>
</template>

<script>
  import api from '../../api'

  export default {
    name: "Rank",
    data() {
      return {
        loading: false,
        columns: [
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '通过数',
            key: 'accepted'
          },
          {
            title: '尝试数',
            key: 'attempted'
          },
          {
            title: '提交数',
            key: 'submitted'
          }],
        ranks: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getRank()
      },
      getRank() {
        this.loading = true;
        api.getRank().then(res => {
          this.loading = false;
          this.ranks = res.data.data;
        }, res => {
          this.loading = false;
        })
      }

    }
  }
</script>

<style scoped>

</style>
