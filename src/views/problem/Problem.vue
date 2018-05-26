<template>
  <Row>
    <Col span="18">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="document-text"></Icon>
          {{problem.title}}
        </p>
        <iframe id="id_frame" :src="frame_url" width="100%" height="500px" scrolling="no" frameborder="0">
        </iframe>
      </Card>
      <template v-if="isAuthenticated">
        <Card style="margin: 10px">
          <Form inline>
            <FormItem prop="user">
              <Select v-model="formItem.selected" style="min-width: 60px">
                <Option v-for="item in languages" :key="item.oj_language" :value="item.oj_language">
                  {{item.oj_language_name}}
                </Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button :loading="submit_loading" type="primary" @click="submitCode()">提交</Button>
            </FormItem>
          </Form>
          <codemirror v-model="formItem.code"></codemirror>
        </Card>
      </template>
    </Col>
    <Col span="6">
      <Card :loading="loading" style="margin: 10px">
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
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'
  import Operation from "iview/src/components/transfer/operation";

  export default {
    name: "Problem",
    components: {Operation},
    data() {
      return {
        isAuthenticated: false,
        submit_loading: false,
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
          this.problem.update_time = moment(res.data.data.update_time).calendar()
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
          this.$Message.success('提交成功')
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
  }
</style>
