<template>
  <Table :loading="loading" :columns="columns" :data="problems" @on-click="console.log('123')"></Table>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'

  export default {
    name: "Problems",
    data() {
      return {
        columns: [
          {
            title: '#',
            key: 'id',
            width: 100,
            sortable: true
          },
          {
            title: '源名称',
            key: 'remote_oj'
          },
          {
            title: '源编号',
            key: 'remote_id'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '更新时间',
            key: 'update_time'
          }, {
            title: '操作',
            width: 120,
            fixed: 'right',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'problem', params: {
                        remote_oj: params.row.remote_oj,
                        remote_id: params.row.remote_id,
                      }
                    })
                  }
                }
              }, '查看')
            }
          }],
        problems: [],
        loading: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getProblems()
      },
      getProblems() {
        this.loading = true;
        api.getProblems().then(res => {
          this.loading = false;
          this.problems = res.data.data;
          moment.locale('zh-CN');
          for (let i = 0; i < this.problems.length; ++i) {
            this.problems[i].update_time = moment(this.problems[i].update_time).calendar();
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
