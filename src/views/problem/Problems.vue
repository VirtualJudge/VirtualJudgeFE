<template>
  <div>
    <Row>
      <Col span="18">
        <Table :loading="loading" :columns="columns" :data="problems" style="margin: 10px"></Table>
      </Col>
      <Col span="6">
        <Card style="margin: 10px">
          <div slot="title">
            <Icon type="document-text"></Icon>
            查找题目
          </div>
          <Form>
            <FormItem prop="">
              <Select v-model="selected">
                <Option v-for="item in support" :key="item" :value="item">
                  {{item}}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input type="text" v-model="problem_id" placeholder="题目编号"/>
            </FormItem>
            <FormItem>
              <Button type="primary" :loading="search_loading" @click="handleSearchStart()">查找</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'

  export default {
    name: "Problems",
    data() {
      return {
        support: [],
        search_loading: false,
        selected: '',
        problem_id: '',
        timer: '',
        columns: [
          {
            title: '#',
            key: 'id',
            width: 100,
            sortable: true
          },
          {
            title: '源名称',
            key: 'remote_oj',
            width: 100
          },
          {
            title: '源编号',
            key: 'remote_id',
            width: 100,
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                },
                attrs: {
                  href: params.row.remote_url,
                  target: '_blank'
                },
              }, params.row.remote_id)
            }
          },
          {
            title: '标题',
            // key: 'title',
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
              }, params.row.title)
            }
          },
          {
            title: '更新时间',
            key: 'update_time',
            width:150
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
        this.getProblems();
        this.getSupport();
      },
      handleSearch() {
        api.getProblem(this.selected, this.problem_id).then(res => {
          if (res.data.data.request_status > 1) {
            if (res.data.data.request_status > 2) {
              this.$Message.error('查找失败');
            }
            clearInterval(this.timer);
            this.search_loading = false;
            this.$router.push({
              name: 'problem',
              params: {
                remote_oj: this.selected, remote_id:
                this.problem_id
              }
            })
          }
        }, res => {
          clearInterval(this.timer);
          this.$Message.error('查找失败');
          this.search_loading = false;
        })

      },
      handleSearchStart() {
        this.search_loading = true;
        this.handleSearch();
        this.timer = setInterval(() => {
          this.handleSearch()
        }, 2000);
        //this.search_loading = false;
      },
      getSupport() {
        api.getSupport().then(res => {
          this.support = res.data.data;
          this.selected = this.support[0];
        }, res => {
          console.log(res);
        })
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
