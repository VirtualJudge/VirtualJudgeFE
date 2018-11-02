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
            <Icon type="md-list"></Icon>
            筛选题目列表
          </div>
          <Form>
            <FormItem label="来源" prop="">

              <Select v-model="filter.selected">
                <Option value="default">
                  全部
                </Option>
                <Option v-for="item in support" :key="item" :value="item">
                  {{item}}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="题目编号">
              <Input type="text" v-model="filter.id" clearable/>
            </FormItem>
            <FormItem label="题目标题">
              <Input type="text" v-model="filter.title" clearable/>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleFilterStart()" :loading="filter.loading" shape="circle"
                      icon="ios-search">筛选
              </Button>
            </FormItem>
          </Form>
        </Card>
        <!--
        <Card style="margin: 10px">
          <div slot="title">
            <Icon type="md-list"></Icon>
            最近未通过
          </div>

        </Card>
        -->
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
        filter: {
          selected: 'default',
          id: '',
          title: '',
          loading: false
        },
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
        raw_problems: [],
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
        document.title = '题目列表';
        this.getProblems({});
        this.getSupport();
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
        this.problems = this.raw_problems.slice((this.pages.current - 1) * this.pages.page_size, this.pages.current * this.pages.page_size)
      },
      getSupport() {
        api.getSupport().then(res => {
          this.support = res.data.data;
          this.selected = this.support[0];
        }, res => {
          console.log(res);
        })
      },
      getProblems(params) {
        this.loading = true;
        this.filter.loading = true;
        api.getProblems(params).then(res => {
          this.loading = false;
          this.filter.loading = false;
          this.raw_problems = res.data.data;
          this.slicePage();
          moment.locale('zh-CN');
          for (let i = 0; i < this.raw_problems.length; ++i) {
            this.raw_problems[i].update_time = moment(this.raw_problems[i].update_time).calendar();
          }
          this.pages.total = this.raw_problems.length;
        }, res => {
          this.loading = false;
          this.filter.loading = false;
        })
      },
      handleFilterStart() {
        let params = {};
        if (this.filter.selected !== 'default') {
          params['remote_oj'] = this.filter.selected;
        }
        if (this.filter.id !== '') {
          params['remote_id'] = this.filter.id;
        }
        if (this.filter.title !== '') {
          params['title'] = this.filter.title;
        }
        this.getProblems(params);
      }
    }
  }
</script>

<style scoped>

</style>
