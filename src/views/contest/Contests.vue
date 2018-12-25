<template>
  <Row>
    <Col span="18">
      <Card style="margin: 10px">
        <div slot="title">
          <Row type="flex" justify="end">
            <Col>
              <i-switch v-model="mine_contests" size="large" @on-change="switch_change">
                <span slot="open">我的</span>
                <span slot="close">全部</span>
              </i-switch>
            </Col>
          </Row>

        </div>
        <Table :loading="loading" :columns="columns" :data="contests" style="margin: 10px auto;"></Table>
      </Card>
    </Col>
    <Col span="6">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="flag"></Icon>
          操作
        </p>
        <ul style="list-style: none">
          <li>
            <router-link to="/contests/new"><Icon type="md-add" />新建比赛</router-link>
          </li>
        </ul>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'

  export default {
    name: "Contests",
    data() {
      return {
        isAuthenticated: false,
        mine_contests: false,
        loading: true,
        contests: [],
        columns: [
          {
            title: '#',
            sortable: true,
            key: 'id',

          },
          {
            title: '标题',
            sortable: true,
            //key: 'title',
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest', params: {
                        id: params.row.id,
                      }
                    })
                  }
                }
              }, params.row.title)
            }
          },
          {
            title: '拥有者',
            key: 'user',
          },
          {
            title: '创建时间',
            sortable: true,
            key: 'created_time',

          },
        ],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        document.title = '比赛列表';
        this.getAuth();
        this.getContests();
        this.loading = false;
      },

      getContests() {
        api.getContests().then(res => {

          this.contests = res.data.data;
          moment.locale('zh-CN');
          for (let i = 0; i < this.contests.length; ++i) {
            this.contests[i].created_time = moment(this.contests[i].created_time).calendar();
          }

        }, res => {
          console.log(res);
        });
      },
      getAuth() {
        api.getAuth().then(res => {
          this.isAuthenticated = true;

        }, res => {
          console.log(res);
        })
      },
      switch_change(status) {
        console.log('switch change');
      }
    }
  }
</script>

<style scoped>

</style>
