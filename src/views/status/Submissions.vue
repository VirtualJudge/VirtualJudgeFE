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
              <Divider type="vertical"/>
              <Col>
                <Page :total="pages.total" :page-size-opts="[20,30,50,100]" :current="pages.current" size="small"
                      @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"
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
  import api from '@/api'
  import moment from 'moment'
  import Verdict from '@/components/Verdict'
  import ws from '@/ws'

  export default {
    name: "Submissions",
    components: {
      Verdict
    },
    data() {
      let protocol = window.location.href.indexOf("https://") ? 'ws://' : 'wss://'
      return {
        protocol: protocol,
        loading_table: false,
        mine_contests: false,
        login_user: '',
        isAdministrator: false,
        auto_reload: false,
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
            width: 200,
            render: (h, params) => {
              if (params.row.user === this.login_user || this.isAdministrator) {
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
            width: 250,
            render: (h, params) => {
              return h(Verdict, {
                props: {
                  verdict: params.row.verdict,
                  verdict_info: params.row.verdict_info,
                  submission_id: params.row.id,
                  reloadable: params.row.reloadable
                }
              })
            }
          }, {
            title: '创建时间',
            key: 'create_time',
            width: 140
          }
        ],
        submissions: [],
        submissions_data: [],
        timer: null,
        ws: null
      }
    },
    mounted() {
      this.init();
      this.ws = ws.WebSocketFunc(this.protocol, 'submission', this.handleWsUpdate)
    },
    beforeDestroy() {
      this.ws.close()
    },
    methods: {
      init() {
        document.title = '提交列表';
        this.getSubmissions();
        this.getAuth();

      },
      handlePageChange(current) {
        this.pages.current = current;
        this.slicePage();

      },
      handlePageSizeChange(page_size) {
        this.pages.page_size = page_size;
        this.slicePage();
      },
      slicePage() {
        this.submissions = this.submissions_data.slice((this.pages.current - 1) * this.pages.page_size, this.pages.current * this.pages.page_size)
      },
      getVerdictColor(verdict) {
        let color_list = {
          'Accepted': 'success',
          'Running': 'primary',
          'Compile Error': 'warning',
          'Result Error': 'error',
          'Submit Failed': '#FFA2D3'
        }
        return color_list[verdict]
      },
      getAuth() {
        api.getAuth().then(res => {
          this.login_user = res.data.data;
        }, res => {
          this.login_user = ''
        });
        api.getPrivilege().then(res => {
          if (res.data.data) {
            this.isAdministrator = res.data.data;
          }
        }, res => {
          this.isAdministrator = false;
        })
      },
      handleWsUpdate(message) {
        for (let i = 0; i < this.submissions_data.length; ++i) {
          if (this.submissions_data[i].id === message.id) {
            this.submissions_data[i].verdict = message.verdict;
            this.submissions_data[i].verdict_info = message.verdict_info;
            this.submissions_data[i].execute_time = message.execute_time;
            this.submissions_data[i].execute_memory = message.execute_memory;
            break
          }
        }
        this.slicePage()
      },
      getSubmissions(data) {
        this.loading_table = true;
        return api.getSubmissions(data).then(res => {
          this.loading_table = false;
          this.submissions_data = res.data.data;
          this.pages.total = this.submissions_data.length;
          this.slicePage();
          moment.locale('zh-CN');
          for (let i = 0; i < this.submissions_data.length; ++i) {
            if (this.submissions_data[i].verdict_info === null) {
              this.submissions_data[i].verdict_info = 'Submitted'
            }
            this.submissions_data[i].create_time = moment.utc(this.submissions_data[i].create_time).local().calendar()
          }
        }, res => {
          this.loading_table = false;
        })
      },
      switch_change(status) {
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
