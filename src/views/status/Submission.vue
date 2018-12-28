<template>
  <div>
    <Row>
      <Col span="6">
        <Card style="margin: 10px">
          <div slot="title">
            <Icon type="md-analytics"/>
            信息
          </div>
          <Row>
            <Col span="8">编号</Col>
            <Col span="16">
              <Tag>{{result.id}}</Tag>
            </Col>
          </Row>
          <Row v-if="result.execute_time">
            <Col span="8">时间</Col>
            <Col span="16">
              <Tag>{{result.execute_time}}</Tag>
            </Col>
          </Row>
          <Row v-if="result.execute_memory">
            <Col span="8">内存</Col>
            <Col span="16">
              <Tag>{{result.execute_memory}}</Tag>
            </Col>
          </Row>
          <Row>
            <Col span="8">创建时间</Col>
            <Col span="16">
              <Tag>{{result.create_time}}</Tag>
            </Col>
          </Row>
          <Row>
            <Col span="8">提交用户</Col>
            <Col span="16">
              <Tag>{{result.username}}</Tag>
            </Col>
          </Row>
          <Row>
            <Col span="8">结果</Col>
            <Col span="16">
              <Verdict :verdict="result.verdict"
                       :reloadable="result.reloadable"
                       :submission_id="result.submission_id"
                       :verdict_info="result.verdict_info"></Verdict>
            </Col>
          </Row>
          <Row>
            <Col span="8">语言</Col>
            <Col span="16">
              <Tag>{{result.language_name}}</Tag>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">
        <Card style="margin: 10px;">
          <div slot="title">
            <Icon type="md-code-working"/>
            代码
            <Button shape="circle"
                    v-clipboard:copy="result.code"
                    v-clipboard:success="onCopySuccess"
                    v-clipboard:error="onCopyError">
              <Icon type="md-clipboard"/>
            </Button>
          </div>
          <pre style="tab-size: 4;">{{result.code}}</pre>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import api from '@/api';
  import moment from 'moment';
  import Verdict from "@/components/Verdict";

  export default {
    name: "Submission",
    components: {
      Verdict
    },
    data() {
      return {
        cmOptions: {
          tabSize: 4,
          lineNumbers: true,
          line: true,
          readOnly: true,
        },
        submission_id: '',
        result: {
          id: '',
          code: '',
          create_time: '',
          execute_memory: '',
          execute_time: '',
          remote_oj: '',
          remote_id: '',
          username: '',
          language_name: '',
          verdict: '',
          verdict_info: '',
          reloadable: false

        },
        verdict: {
          code: '',
          table_data: [],
        },
      }
    },
    beforeCreate() {
      this.$Spin.show();
    },
    mounted() {
      this.init();
    },
    updated() {
      this.$Spin.hide();
    },
    methods: {
      onCopySuccess() {
        this.$Message.success('拷贝成功')
      },
      onCopyError() {
        this.$Message.error('拷贝失败')
      },
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
          console.log(res.data.data)
          this.result.id = res.data.data.id
          this.result.remote_id = res.data.data.remote_id
          this.result.remote_oj = res.data.data.remote_oj
          this.result.execute_time = res.data.data.execute_time
          this.result.execute_memory = res.data.data.execute_memory
          this.result.code = res.data.data.code
          this.result.username = res.data.data.user
          this.result.verdict = res.data.data.verdict
          this.result.reloadable = res.data.data.reloadable
          this.result.verdict_info = res.data.data.verdict_info ? res.data.data.verdict_info : 'submitted'
          this.result.language_name = res.data.data.language_name
          this.result.create_time = moment.utc(res.data.data.create_time).local().calendar();

        }, res => {
          this.$Message.error('加载失败');
        });
      }
    }
  }
</script>

<style scoped>
  ul li {
    padding: 5px 10px;
    list-style-type: none;
  }

  .CodeMirror {
    height: auto;
  }

  .CodeMirror-scroll {
    height: auto;
    overflow-y: hidden;
    overflow-x: auto;
  }
</style>
