<template>
  <Table style="margin: 10px" :loading="loading" :columns="columns"
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
            title: '排名',
            key: 'index'
          },
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '签名',
            key: 'motto'
          },
          {
            title: '通过数',
            key: 'accepted'
          },
          {
            title: '提交数',
            key: 'submitted'
          },
          {
            title: '正确率',
            key: 'ratio'
          },
        ],
        ranks: []
      }
    },
    mounted() {
      document.title = '排行榜';
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
          let id = 1;
          for (let item in this.ranks) {
            this.ranks[item].index = id++;
            this.ranks[item].motto = '';
            if (this.ranks[item].submitted === 0) {
              this.ranks[item].ratio = 0;
            } else {
              this.ranks[item].ratio = (this.ranks[item].accepted / this.ranks[item].submitted * 100).toFixed(2) + '%';
            }
          }
        }, res => {
          this.loading = false;
        })
      }

    }
  }
</script>

<style scoped>

</style>
