<template>
  <div>
    <Row>
      <Col span="18">
        <Card style="margin: 10px">
          <Row type="flex" justify="end">
            <Col>
              <Page :total="pages.total" size="small" :page-size-opts="pages.page_size_opts" :current="pages.current"
                    :page-size="pages.page_size" @on-change="handlePageChange"
                    @on-page-size-change="handlePageSizeChange" show-sizer show-total></Page>
            </Col>
          </Row>

          <Table :loading="loading" :columns="columns" :data="problems" style="margin: 10px auto;"></Table>
          <BackTop></BackTop>
        </Card>

      </Col>
      <Col span="6">
        <Card style="margin: 10px">
          <div slot="title">
            <Icon type="document-text"></Icon>
            查找题目
          </div>
          <Form>
            <FormItem prop="">
              <Select @on-change="handleOJChange()" v-model="selected">
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
  import local from '../../local'
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
            title: '源名称',
            sortable: true,
            key: 'remote_oj',
            filters: [],
            filterMethod(value, row) {
              return row.remote_oj.indexOf(value) > -1;
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

            width: 150
          }],
        problems: [],
        problems_data: [],
        loading: true,
        pages: {
          total: 0,
          page_size: 20,
          current: 1,
          page_size_opts: [20, 50, 100, 250, 500]
        }
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
      handleOJChange() {
        local.setLastOJ(this.selected);
      },
      handleOJDefault() {
        if (local.getLastOJ()) {
          this.selected = local.getLastOJ()
        }
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
        this.problems = this.problems_data.slice((this.pages.current - 1) * this.pages.page_size, this.pages.current * this.pages.page_size)
      },
      handleSearch() {
        api.getProblem(this.selected, this.problem_id).then(res => {
          if (res.data.data.request_status > 1) {
            if (res.data.data.request_status > 2) {
              this.$Message.error('查找失败');
              clearInterval(this.timer);
              this.search_loading = false;
            } else {
              clearInterval(this.timer);
              this.search_loading = false;
              this.$router.push({
                name: 'problem',
                params: {
                  remote_oj: this.selected,
                  remote_id: this.problem_id
                }
              })
            }
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
          for (let item in this.support) {
            this.columns[1].filters.push({
              label: this.support[item],
              value: this.support[item]
            });
          }
          this.handleOJDefault()
        }, res => {
          console.log(res);
        })
      },
      getProblems() {
        this.loading = true;
        api.getProblems().then(res => {
          this.loading = false;
          this.problems_data = res.data.data;
          this.slicePage();
          moment.locale('zh-CN');
          for (let i = 0; i < this.problems_data.length; ++i) {
            this.problems_data[i].update_time = moment(this.problems_data[i].update_time).calendar();
          }
          this.pages.total = this.problems_data.length;
        }, res => {
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
