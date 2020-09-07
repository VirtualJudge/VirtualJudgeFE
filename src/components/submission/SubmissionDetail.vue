<template>
  <div class="main-view">
    <Row>
      <Col span="18">
        <Card dis-hover>
          <p slot="title">代码</p>
          <pre v-if="code" v-highlightjs="code"><code :class="code_type"></code></pre>
        </Card>
        <Collapse style="margin-top: 10px" v-model="collapse_val">
          <Panel v-if="additional_info['error']" name="1">
            错误信息
            <pre slot="content" v-highlightjs="additional_info['error']"><code class="shell"></code></pre>
          </Panel>
          <Panel v-if="additional_info['result']" name="2">
            运行结果
            <pre slot="content" v-highlightjs="additional_info['result']"><code class="text"></code></pre>
          </Panel>
        </Collapse>
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
                <span slot="description">{{ time_spend }} MS</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="内存花费">
                <span slot="description"> {{ memory_spend }} MB</span>
              </ListItemMeta>
            </ListItem>
          </List>
          <Button type="success" v-if="code" @click="handleCopyClick">复制代码到剪切板</Button>
        </Card>

      </Col>
    </Row>


  </div>
</template>

<script>
import api from "@/utils/api";
import message from "@/utils/message";
import {SUBMISSION_VERDICTS} from "@/utils/constant";

export default {
  name: "SubmissionDetail",
  data() {
    return {
      code: '',
      code_type: '',
      verdict: {},
      time_spend: '-',
      memory_spend: '-',
      problem: {},
      user: {},
      additional_info: {'error': null, 'result': null},
      collapse_val: '0',

    }
  }, mounted() {
    api.getSubmissionPersonal(this.$route.params.id).then(res => {
      if (res.data.err === null) {
        let response = res.data.data || {}
        this.code = response.code || ''
        this.code_type = response.lang
        this.problem = response.problem || {}
        this.user = response.user || {}
        this.verdict = SUBMISSION_VERDICTS[response.verdict] || {}
        this.time_spend = response.time_spend || '-'
        this.memory_spend = response.memory_spend || '-'
        this.additional_info = response.additional_info || {'error': null, 'result': null}
        if (this.additional_info['result']) {
          this.additional_info['result'] = JSON.stringify(this.additional_info['result'], null, 2)
        }
      } else {
        this.$Message.error(message.err(res.data.err))
      }
    })
  },
  methods: {
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
