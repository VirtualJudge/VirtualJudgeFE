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
      <template v-if="isAuthenticated && !refresh_loading">
        <Modal v-model="submit_modal" width="50%">
          <div slot="header">
            <h3>
              <Icon type="code-working"></Icon>
              提交代码
            </h3>
          </div>
          <Select @on-change="handleLanguageChange" v-model="formItem.selected"
                  style="min-width: 60px;max-width: 200px;">
            <Option v-for="item in languages" :key="item.oj_language"
                    :value="item.oj_language">
              {{item.oj_language_name}}
            </Option>
          </Select>
          <codemirror :options="cmOptions" v-model="formItem.code"
                      style="margin-top:5px;border: 1px gainsboro solid;"></codemirror>
          <div slot="footer">
            <Button @click="submit_modal=false">取消</Button>
            <Button :loading="submit_loading" type="primary" @click="submitCode()">提交</Button>
          </div>
        </Modal>
      </template>
    </Col>
    <Col span="6">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="ios-list"></Icon>
          基本信息
        </p>
        <ul>
          <li>源平台:
            <Tag>{{problem.remote_oj}}</Tag>
          </li>
          <li>源编号:
            <Tag>{{problem.remote_id}}</Tag>
          </li>
          <li>内存限制:
            <Tag color="red">{{problem.memory_limit}}</Tag>
          </li>
          <li>时间限制:
            <Tag color="green">{{problem.time_limit}}</Tag>
          </li>
          <li>更新时间:
            <Tag>{{problem.update_time}}</Tag>
          </li>
        </ul>
        <Spin size="large" fix v-if="refresh_loading || loading"></Spin>
      </Card>
      <Card style="margin: 0 10px;">
        <div slot="title">
          <Icon type="flag"></Icon>
          操作
        </div>
        <ul>
          <li>
            <Button :loading="refresh_loading" :disabled="refresh_loading || !isAuthenticated" @click="refresh">更新题目
            </Button>
          </li>
          <li>
            <Button :disabled="refresh_loading || !isAuthenticated" type="primary" @click="submit_modal=true">提交题目
            </Button>
          </li>
        </ul>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import local from '../../local'
  import moment from 'moment'
  import Operation from "iview/src/components/transfer/operation";

  export default {
    name: "Problem",
    components: {Operation},
    data() {
      return {
        cmOptions: {
          tabSize: 4,
          lineNumbers: true,
          line: true,
          theme: "monokai",
          lineNumberFormatter: (line) => {
            return ''
          }
        },
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
        formItem: {
          selected: '',
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
      handleLanguageChange() {
        console.log(this.formItem.selected);
        local.setLastLanguage(this.problem.remote_oj, this.formItem.selected);
      },
      handleDefaultLanguage() {
        if (local.getLastLanguage(this.problem.remote_oj)) {
          this.formItem.selected = local.getLastLanguage(this.problem.remote_oj)
        }
      },
      handleRefresh() {

        api.getProblem(this.remote_oj, this.remote_id).then(res => {
          console.log(res);
          if (res.data.data.request_status > 1) {
            if (res.data.data.request_status > 2) {
              this.$Message.error('更新失败');
            } else {
              document.getElementById('id_frame').contentWindow.location.reload(true);
              this.loading = false;
              this.problem.title = res.data.data.title;
              this.problem.time_limit = res.data.data.time_limit;
              this.problem.memory_limit = res.data.data.memory_limit;
              this.problem.remote_id = res.data.data.remote_id;
              this.problem.remote_oj = res.data.data.remote_oj;
              moment.locale('zh-CN');
              this.problem.update_time = moment(res.data.data.update_time).calendar()
            }

            clearInterval(this.timer);
            this.refresh_loading = false;
          }
        }, res => {
          clearInterval(this.timer);
          this.$Message.error('更新失败');
          this.refresh_loading = false;
        })

      },
      refresh() {
        this.refresh_loading = true;
        this.loading = true;
        api.refreshProblem(this.remote_oj, this.remote_id).then(res => {
          this.timer = setInterval(() => {
            this.handleRefresh()
          }, 2000);
        }, res => {
          this.refresh_loading = false;
          this.$Message.error('刷新失败');
        })
      },
      init() {
        this.remote_oj = this.$route.params.remote_oj;
        this.remote_id = this.$route.params.remote_id;
        this.frame_url = '/api/problem/' + this.remote_oj + '/' + this.remote_id + '/html/';
        this.getProblem(this.remote_oj, this.remote_id);
        this.getLanuages(this.remote_oj);
        this.getAuth();
        window.setInterval(() => {
          this.reInitFrame()
        }, 500);
      },
      getLanuages(remote_oj) {
        api.getLanguages(remote_oj).then(res => {
          this.languages = res.data.data;
          this.formItem.selected = this.languages[0].oj_language;
        }, res => {
          console.log(res);
        })
      },

      getProblem(remote_oj, remote_id) {
        this.loading = true;
        api.getProblem(remote_oj, remote_id).then(res => {
          this.loading = false;
          this.problem.title = res.data.data.title;
          this.problem.time_limit = res.data.data.time_limit;
          this.problem.memory_limit = res.data.data.memory_limit;
          this.problem.remote_id = res.data.data.remote_id;
          this.problem.remote_oj = res.data.data.remote_oj;
          moment.locale('zh-CN');
          this.problem.update_time = moment(res.data.data.update_time).calendar();
          this.handleDefaultLanguage()
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
        api.submitCode(this.remote_oj, this.remote_id, this.formItem.selected, this.formItem.code).then(res => {
          this.submit_loading = false;
          this.$Message.success('提交成功');
          this.$router.push('/submissions')
        }, res => {
          this.submit_loading = false;
          this.$Message.error('提交失败')
        })
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
