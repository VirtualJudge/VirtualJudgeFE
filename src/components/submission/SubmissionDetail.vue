<template>
  <div class="main-view">
    <Row>
      <Col span="18">
        <Card dis-hover>
          <p slot="title">代码</p>
          <pre v-if="code" v-highlightjs="code"><code :class="code_type"></code></pre>
        </Card>
        <Card style="margin-top: 10px" v-if="additional_info['error']" dis-hover>
          <p slot="title">错误信息</p>
          <code style="white-space:pre-line;">
            {{ additional_info['error'] }}
          </code>
        </Card>
        <Card style="margin-top: 10px" v-if="result_data.length" dis-hover>
          <p slot="title">运行结果</p>
          <Table :columns="result_col" :data="result_data">
          </Table>
        </Card>
      </Col>
      <Col span="6" style="padding-left: 10px">
        <Card dis-hover>
          <p slot="title">信息</p>
          <List v-if="code" :split="false">
            <ListItem>
              <ListItemMeta title="作者">
                <span style="cursor: pointer; color: #3399ff" slot="description" @click="handleUsernameClick">
                  {{ user.username }}
                </span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="题目">
                <span style="cursor: pointer; color: #3399ff" slot="description"
                      @click="handleProblemClick">
                  {{ problem.title }}
                </span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="结果">
                <Tag :color="verdict.color" slot="description">{{ verdict.info }}</Tag>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="时间花费">
                <span slot="description">{{ time_cost }} ms</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="内存花费">
                <span slot="description"> {{ memory_cost }} MiB</span>
              </ListItemMeta>
            </ListItem>
          </List>
          <Button type="success" v-if="code" @click="handleCopyClick">复制代码到剪切板</Button>
          <Divider v-if="changePublicStatus"/>
          <div v-if="changePublicStatus">
            代码是否公开：
            <i-switch v-model="is_public" size="large" @on-change="handlePublicStatusChange">
              <span slot="open">公开</span>
              <span slot="close">私密</span>
            </i-switch>
          </div>
          <Divider v-if="isAdminRole"/>
          <Button v-if="isAdminRole" type="info" @click="handleRejudge">重判</Button>
        </Card>

      </Col>
    </Row>


  </div>
</template>

<script>
import api from "@/utils/api";
import message from "@/utils/message";
import {SUBMISSION_VERDICTS} from "@/utils/constant";
import {mapGetters} from 'vuex';

export default {
  name: "SubmissionDetail",
  data() {
    return {
      code: '',
      code_type: '',
      verdict: {},
      time_cost: '-',
      memory_cost: '-',
      problem: {},
      user: {},
      additional_info: {'error': null, 'result': null},
      is_public: false,
      result_col: [{
        title: '序号',
        maxWidth: 100,
        render: (h, params) => {
          return h('span', params.index + 1)
        }
      }, {
        title: '内存花费',
        render: (h, params) => {
          return h('span', params.row.memory + ' MiB')
        }
      }, {
        title: '时间花费',
        render: (h, params) => {
          return h('span', params.row.cpu_time + ' ms')
        }
      }, {
        title: 'exit',
        render: (h, params) => {
          return h('span', params.row.exit_code)
        }
      }],
      result_data: []

    }
  }, mounted() {
    api.getSubmissionPersonal(this.$route.params.id).then(res => {
      if (res.data.err === null) {
        let response = res.data.data || {}
        this.code = response.code || ''
        this.code_type = response.lang
        this.is_public = response.is_public || false
        this.problem = response.problem || {}
        this.user = response.user || {}
        this.verdict = SUBMISSION_VERDICTS[response.verdict] || {}
        this.time_cost = response.time_cost || '-'
        this.memory_cost = response.memory_cost || '-'
        this.additional_info = response.additional_info || {'error': null, 'result': null}
        this.result_data = this.additional_info['result'] || []
      } else {
        this.$Message.error(message.err(res.data.err))
      }
    })
  },
  methods: {
    handleRejudge() {
      api.getRejudgeRequest(this.$route.params.id).then(res => {
        if (res.data.err === null) {
          this.$Message.success('重新判题任务提交成功')
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    },
    handleCopyClick() {
      this.$copyText(this.code).then(() => {
        this.$Message.success('代码已经成功复制到剪切板')
      })
    },
    handleProblemClick() {
      this.$router.push(`/problem/${this.problem.id}`)
    },
    handleUsernameClick() {
      this.$router.push(`/user/${this.user.id}`)
    },
    handlePublicStatusChange() {
      api.putSubmissionPublicChange(this.$route.params.id, this.is_public).then(res => {
        if (res.data.err === null) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      })
    }

  },
  computed: {
    ...mapGetters(['isAdminRole', 'userId', 'isAuthenticated']),
    changePublicStatus: function () {
      return !!(this.isAdminRole || (this.isAuthenticated && this.userId === this.user.id));
    }
  }
}
</script>

<style scoped>
.main-view {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
</style>
