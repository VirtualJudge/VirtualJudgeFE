<template>
  <Row>
    <Col span="18">
      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="document-text"></Icon>
          {{select_problem.title}}
        </p>
        <iframe id="id_frame" :src="select_problem.frame_url" width="100%" height="0px" scrolling="no" frameborder="0">
        </iframe>
        <Spin size="large" fix v-if="select_problem.loading"></Spin>
      </Card>
      <template v-if="isAuthenticated">
        <Modal v-model="submit_modal" width="50%">
          <div slot="header">
            <h3>
              <Icon type="code-working"></Icon>
              提交代码
            </h3>
          </div>
          <Select @on-change="handleLanguageChange" v-model="select_problem.selected"
                  style="min-width: 60px;max-width: 200px;">
            <Option v-for="item in languages" :key="item.oj_language"
                    :value="item.oj_language">
              {{item.oj_language_name}}
            </Option>
          </Select>
          <codemirror :options="cmOptions" v-model="select_problem.code"
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
          <Icon type="md-list"></Icon>
          基本信息
        </p>
        <ul>
          <li>源平台:
            <Tag>{{select_problem.remote_oj}}</Tag>
          </li>
          <li>源编号:
            <Tag>{{select_problem.remote_id}}</Tag>
          </li>
          <li>内存限制:
            <Tag color="red">{{select_problem.memory_limit}}</Tag>
          </li>
          <li>时间限制:
            <Tag color="green">{{select_problem.time_limit}}</Tag>
          </li>
          <li>更新时间:
            <Tag>{{select_problem.update_time}}</Tag>
          </li>
        </ul>
        <Spin size="large" fix v-if="select_problem.loading"></Spin>
      </Card>

      <Card style="margin:10px;">
        <div slot="title">
          <Icon type="md-list"></Icon>
          操作
        </div>
        <ul>
          <li>
            <Button :disabled="!isAuthenticated" type="primary" @click="submit_modal=true">提交题目
            </Button>
          </li>
        </ul>
      </Card>

      <Card style="margin: 10px">
        <p slot="title">
          <Icon type="md-list"></Icon>
          题目列表
        </p>
        <Row type="flex" justify="space-around" class="code-row-bg" style="margin-top: 10px"
             v-for="problems_row in problems" :key="problems_row.row">
          <Col span="4" v-for="item in problems_row.data" :key="item.id">
            <Button :type="item.type" v-if="item.id === select_problem.id" shape="circle">{{item.id}}</Button>
            <Button :type="item.type" v-else @click="onIdTableClick(item.id)">{{item.id}}</Button>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from '../../api'
  import moment from 'moment'
  import local from '../../local'

  export default {
    name: "Contest",
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
        submit_modal: false,
        problems: [],
        raw_problems: [],
        languages: [],
        submit_loading: false,
        isAuthenticated: false,
        select_problem: {
          id: 1,
          title: '',
          time_limit: '',
          memory_limit: '',
          remote_oj: '',
          remote_id: '',
          update_time: '',
          loading: false,
          frame_url: '',
          selected: '',
          code: ''

        },
        contest_id: '',
      }
    },
    mounted() {
      this.init();

    },
    methods: {
      submitCode() {
        this.submit_loading = true;
        api.submitCode(this.select_problem.remote_oj, this.select_problem.remote_id, this.select_problem.selected, this.select_problem.code).then(res => {
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
      },
      handleLanguageChange() {
        local.setLastLanguage(this.select_problem.remote_oj, this.select_problem.selected);
      },
      handleDefaultLanguage() {
        if (local.getLastLanguage(this.select_problem.remote_oj)) {
          this.select_problem.selected = local.getLastLanguage(this.select_problem.remote_oj)
          return true
        }
        return false
      },
      getProblem(remote_oj, remote_id) {
        api.getProblem(remote_oj, remote_id).then(res => {


          if (res.data.data.request_status > 1) {
            if (res.data.data.request_status > 2) {
              this.$Message.error('更新失败');
            } else {
              this.select_problem.frame_url = '/api/problem/' + this.select_problem.remote_oj + '/' + this.select_problem.remote_id + '/html/';
              document.getElementById('id_frame').contentWindow.location.reload(true);
              this.select_problem.loading = false;
              this.select_problem.title = res.data.data.title;
              this.select_problem.time_limit = res.data.data.time_limit;
              this.select_problem.memory_limit = res.data.data.memory_limit;
              this.select_problem.remote_id = res.data.data.remote_id;
              this.select_problem.remote_oj = res.data.data.remote_oj;
              moment.locale('zh-CN');
              this.select_problem.update_time = moment(res.data.data.update_time).calendar()
            }

            //clearInterval(this.timer);
            //this.refresh_loading = false;
          }

        }, res => {

        });
      },
      getLanuages(remote_oj) {
        api.getLanguages(remote_oj).then(res => {
          this.languages = res.data.data;
          if (!this.handleDefaultLanguage()) {
            this.select_problem.selected = this.languages[0].oj_language;
          }

        }, res => {
          console.log(res);
        })
      },
      init() {
        this.getAuth();

        this.contest_id = this.$route.params.id;
        api.getContestProblems(this.contest_id).then(res => {
          this.handleContestProblems(res.data);
        }, res => {
        });
        window.setInterval(() => {
          this.reInitFrame()
        }, 500);
      },
      handleContestProblems(data) {
        let length = data.data.length;
        for (let i = 0; i * 4 < length; ++i) {
          let list_item = {
            row: i,
            data: []
          };
          for (let j = 0; j < 4; ++j) {
            if (i * 4 + j < length) {
              let item_type = 'default';
              if (data.data[i * 4 + j].status === 0) {
                item_type = 'success';
              } else if (data.data[i * 4 + j].status === 1) {
                item_type = 'warning';
              }
              list_item.data.push({
                id: i * 4 + j + 1,
                status: data.data[i * 4 + j].status,
                type: item_type,
                remote_oj: data.data[i * 4 + j].remote_oj,
                remote_id: data.data[i * 4 + j].remote_id
              });
              this.raw_problems.push({
                id: i * 4 + j,
                status: data.data[i * 4 + j].status,
                type: item_type,
                remote_oj: data.data[i * 4 + j].remote_oj,
                remote_id: data.data[i * 4 + j].remote_id
              })
              //console.log(data.data[i * 4 + j])
            }
          }
          this.problems.push(list_item);
          this.select_problem.remote_oj = this.raw_problems[0].remote_oj;
          this.select_problem.remote_id = this.raw_problems[0].remote_id;
          this.getProblem(this.select_problem.remote_oj, this.select_problem.remote_id);
          this.getLanuages(this.select_problem.remote_oj)
        }
      },
      onIdTableClick(index) {
        this.select_problem.id = index;
        this.select_problem.remote_oj = this.raw_problems[index - 1].remote_oj;
        this.select_problem.remote_id = this.raw_problems[index - 1].remote_id;
        this.getProblem(this.select_problem.remote_oj, this.select_problem.remote_id);
        this.getLanuages(this.select_problem.remote_oj)
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
    }
  }
</script>

<style scoped>
  ul li {
    list-style: none;
    margin: 5px auto;
  }
</style>
