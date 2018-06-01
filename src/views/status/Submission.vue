<template>
  <div>
    <Card>
      <Table :columns="columns" :data="verdict.table_data"></Table>
    </Card>
    <template v-if="verdict.code">
      <Card>
        <codemirror :options="cmOptions" v-model="verdict.code"
                    style="margin-top:5px;border: 1px gainsboro solid;"></codemirror>
      </Card>
    </template>
  </div>
</template>

<script>
  import api from '../../api';
  import moment from 'moment';
  export default {
    name: "Submission",
    data() {
      return {
        cmOptions: {
          tabSize: 4,
          lineNumbers: true,
          line: true,
          readOnly: true
        },
        submission_id: '',
        verdict: {
          code: '',
          table_data: [],
        },
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
            key: 'remote_id'
          }, {
            title: '运行时间',
            key: 'execute_time'
          }, {
            title: '运行内存',
            key: 'execute_memory'
          }, {
            title: '语言',
            key: 'language_name',
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
      }
    },
    beforeCreate(){
      this.$Spin.show();
    },
    mounted() {
      this.init();
    },
    updated(){
      this.$Spin.hide();
    },
    methods: {
      init() {

        this.submission_id = this.$route.params.id;
        this.getVerdict(this.submission_id);
      },
      getVerdictColor(verdict_code) {
        let color_list = ['black', 'green', 'yellow', 'red', 'pink'];
        return color_list[verdict_code]
      },
      getVerdict(submission_id) {
        api.getVerdict(submission_id).then(res => {
          this.verdict.code = res.data.data.code;
          this.verdict.table_data.push(res.data.data);
          for(let i = 0;i<this.verdict.table_data.length; ++i){
            this.verdict.table_data[i].create_time = moment(this.verdict.table_data[i].create_time).calendar();
          }
        }, res => {
          this.$Message.error('加载失败');
        });
      }
    }
  }
</script>

<style scoped>

</style>
