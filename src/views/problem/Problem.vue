<template>
  <Row>
    <Col span="18">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="document-text"></Icon>
          {{problem.title}}
        </p>
        <iframe id="id_frame" :src="frame_url" width="100%" height="0px" scrolling="no" frameborder="0">
        </iframe>
        <Spin size="large" fix v-if="refresh_loading || loading"></Spin>
      </Card>
      <Card style="margin: 10px" v-if="isAuthenticated">
        <CodeMirror :value.sync="form.code"
                    :languages="languages"
                    :language="form.language"
                    @changeLang="handleLanguageChange"
                    @resetCode="handleResetCode"></CodeMirror>
        <Button :loading="submit_loading" type="success" @click="submitCode">提交</Button>
      </Card>

    </Col>
    <Col span="6">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="ios-list"></Icon>
          基本信息
        </p>
        <ul>
          <li>源平台:
            <span style="font-weight: bolder">{{problem.remote_oj}}</span>
          </li>
          <li>源编号:
            <span style="font-weight: bolder">{{problem.remote_id}}</span>
          </li>
          <li>内存限制:
            <span style="font-weight: bolder">{{problem.memory_limit}}</span>
          </li>
          <li>时间限制:
            <span style="font-weight: bolder">{{problem.time_limit}}</span>
          </li>
          <li>更新时间:
            <span style="font-weight: bolder">{{problem.update_time}}</span>
          </li>
        </ul>
        <Spin size="large" fix v-if="refresh_loading || loading"></Spin>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'
  import CodeMirror from '@/components/CodeMirror'
  export default {
    name: "Problem",
    components: {
      CodeMirror
    },
    data() {
      return {
        isAuthenticated: false,
        submit_loading: false,
        refresh_loading: false,
        submit_modal: false,
        timer: '',
        loading: false,
        frame_url: '',
        remote_oj: '',
        remote_id: '',
        languages: [],
        form: {
          language: '',
          code: ''
        },
        problem: {
          title: '',
          time_limit: '',
          memory_limit: '',
          remote_oj: '',
          remote_id: '',
          update_time: '',
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.remote_oj = this.$route.params.remote_oj;
        this.remote_id = this.$route.params.remote_id;
        this.frame_url = '/api/problem/' + this.remote_oj + '/' + this.remote_id + '?html=true';
        this.getProblem(this.remote_oj, this.remote_id);
        this.getLanguage(this.remote_oj);
        this.getAuth();
        window.setInterval(() => {
          this.reInitFrame()
        }, 500);
      },
      getLanguage(remote_oj) {
        api.getLanguage(remote_oj).then(res => {
          this.languages = res.data.data
          this.form.language = this.languages[0].oj_language
        }, res => {
          console.log(res);
        })
      },

      getProblem(remote_oj, remote_id) {
        this.loading = true;
        api.getProblem(remote_oj, remote_id).then(res => {
          this.loading = false;
          this.problem.title = res.data.data.title;
          document.title = this.problem.title;
          this.problem.time_limit = res.data.data.time_limit;
          this.problem.memory_limit = res.data.data.memory_limit;
          this.problem.remote_id = res.data.data.remote_id;
          this.problem.remote_oj = res.data.data.remote_oj;
          moment.locale('zh-CN');
          this.problem.update_time = moment(res.data.data.update_time).calendar();
        }, res => {
          this.loading = false;
        })
      },
      reInitFrame() {
        let iframe = document.getElementById("id_frame");
        try {
          let bHeight = iframe.contentWindow.document.body.scrollHeight;
          let dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
          iframe.height = Math.min(bHeight, dHeight);
        } catch (ex) {
        }
      },
      submitCode() {
        this.submit_loading = true;
        api.submitCode(this.remote_oj, this.remote_id, this.form.language, this.form.code).then(res => {
          this.submit_loading = false;
          this.$Message.success('提交成功');
          this.$router.push('/submission')
        }, res => {
          this.submit_loading = false;
          this.$Message.error('提交失败')
        })
      },
      handleResetCode() {
        this.$Modal.confirm({
          title: 'warning',
          content: 'Are you sure you want to reset your code?',
          onOk: () => {
            this.form.code = ''
          }
        })
        this.form.code = ''
      },
      handleLanguageChange(language) {
        this.form.language = language
        console.log(this.form)
      },
      getAuth() {
        api.getAuth().then(res => {
          this.isAuthenticated = true;
        }, res => {
          this.isAuthenticated = false;
        })
      }
    }
  }
</script>

<style scoped>
  ul li {
    list-style: none;
    margin: 5px auto;
  }
</style>
