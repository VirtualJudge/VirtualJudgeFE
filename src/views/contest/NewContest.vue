<template>
  <Row>
    <Col span="16">
      <Card style="margin: 10px">
        <div slot="title">
          题目列表
        </div>
        <Table :columns="columns_data" :data="table_data"></Table>
      </Card>
    </Col>
    <Col span="8">
      <Card style="margin: 10px">
        <div slot="title">
          选择题目
        </div>
        <Form>
          <FormItem label="题目来源">
            <Select v-model="formItem.origin">
              <Option v-for="item in support" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="题目编号">
            <Input v-model="formItem.problem_id" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem>
            <Button :loading="formItem.loading" type="primary" @click="handleClick">添加题目</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style="margin: 10px">
        <div slot="title">
          提交题组
        </div>
        <Form>
          <FormItem label="题组名称">
            <Input v-model="contestItem.title" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem>
            <Button type="success">添加题组</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'

  export default {
    name: "NewContest",
    data() {
      return {
        support: [],
        contestItem: {
          title: '',
          problems: []
        },
        formItem: {
          origin: '',
          problem_id: '',
          timer: '',
          loading: false,
        },
        columns_data: [
          {
            title: '源平台',
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
            title: '操作',
            render: (h, params) => {
              return h('a', {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {

                  }
                }
              }, 'delete')
            }
          }
        ],
        table_data: []
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getSupport();
      },
      handleClick() {
        this.formItem.loading = true;
        this.formItem.timer = setInterval(() => {
          this.getProblem(this.formItem.origin, this.formItem.problem_id)
        }, 1000)

      },
      getSupport() {
        api.getSupport().then(res => {
          this.support = res.data.data;
          this.formItem.origin = res.data.data[0];
        }, res => {
          console.log(res);
        })
      },
      getProblem(remote_oj, remote_id) {
        api.getProblem(remote_oj, remote_id).then(res => {
          console.log(res);
          if (res.data.data.request_status === 2) {
            let item = {
              'title': res.data.data.title,
              'remote_oj': res.data.data.remote_oj,
              'remote_id': res.data.data.remote_id,
            };
            this.table_data.push(item);
            clearInterval(this.formItem.timer);
            this.formItem.loading = false;
          } else if (res.data.data.request_status > 2) {
            this.$Message.error('查找失败');
            clearInterval(this.formItem.timer);
            this.formItem.loading = false;
          }

        }, res => {
          this.$Message.error('查找失败');
          clearInterval(this.formItem.timer);
          this.formItem.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
