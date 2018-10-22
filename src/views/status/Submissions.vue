<template>
  <Row>
    <Col>
      <Card style="margin: 10px">
        <div slot="title">
          <template v-if="login_user">
            <Row type="flex" justify="end">
              <Col>
                <i-switch v-model="mine_contests" size="large" @on-change="switch_change">
                  <span slot="open">我的</span>
                  <span slot="close">全部</span>
                </i-switch>
              </Col>
              <Col>
                <Page :total="pages.total" :page-size-opts="[20,30,50,100]" :current="pages.current" size="small"
                      :page-size="pages.page_size" show-sizer></Page>
              </Col>
            </Row>
          </template>
        </div>
        <Table :loading="loading_table" :columns="columns" :data="submissions"></Table>
        <BackTop></BackTop>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'

  export default {
    name: "Submissions",
    data() {
      return {
        loading_table: false,
        mine_contests: false,
        login_user: '',
        pages: {total: 0, page_size: 20, current: 1},
        columns: [
          {
            title: '#',
            key: 'id'
          }, {
            title: '用户',
            key: 'user'
          }, {
            title: '源名称',
            key: 'remote_oj'
          }, {
            title: '源编号',
            render: (h, params) => {
              return h('a', {
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
              }, params.row.remote_id)
            }
          }, {
            title: '运行时间',
            key: 'execute_time'
          }, {
            title: '运行内存',
            key: 'execute_memory'
          }, {
            title: '语言',
            key: 'language_name',
            render: (h, params) => {
              if (params.row.user === this.login_user) {
                return h('a', {
                  props: {
                    type: 'text',
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'submission', params: {
                          id: params.row.id,
                        }
                      })
                    }
                  }
                }, params.row.language_name)
              } else {
                return h('span', {
                  props: {
                    type: 'text',
                  },
                }, params.row.language_name)
              }

            }
          }, {
            title: '执行结果',
            width: 200,
            render: (h, params) => {
              return h('Tag', {
                props: {
                  color: this.getVerdictColor(params.row.verdict_code)
                }
              }, params.row.verdict)
            }
          }, {
            title: '创建时间',
            key: 'create_time'
          }
        ],
        submissions: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getSubmissions();
        this.getAuth();
      },
      getVerdictColor(verdict_code) {
        let color_list = ['black', 'green', 'yellow', 'red', 'pink'];
        return color_list[verdict_code]
      },
      getAuth() {
        api.getAuth().then(res => {
          this.login_user = res.data.data;
        }, res => {
          this.login_user = ''
        })
      },
      getSubmissions(data) {
        this.loading_table = true;
        return api.getSubmissions(data).then(res => {
          this.loading_table = false;
          this.submissions = res.data.data;
          moment.locale('zh-CN');
          for (let i = 0; i < this.submissions.length; ++i) {
            this.submissions[i].create_time = moment(this.submissions[i].create_time).calendar()
          }
        }, res => {
          this.loading_table = false;
        })
      },
      switch_change(status) {
        console.log(status);
        if (status) {
          let data = {
            'user': this.login_user
          };
          this.getSubmissions(data);
        } else {
          this.getSubmissions();
        }
      }
    }
  }
</script>

<style scoped>

</style>
