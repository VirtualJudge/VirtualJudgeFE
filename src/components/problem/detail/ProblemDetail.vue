<template>
  <div class="main-view">
    <h2 style="text-align: center">{{ problem.title }}</h2>
    <Row>
      <Col span="16">
        <Tabs :value="tab_val">
          <TabPane label="Markdown" name="Markdown" :disabled="!editor_value.markdown">
            <mavon-editor
                v-model="editor_value.markdown"
                defaultOpen="preview"
                codeStyle="atom-one-light"
                previewBackground="#ffffff"
                v-bind:boxShadow="false"
                v-bind:tabSize="4"
                v-bind:editable="false"
                v-bind:subfield="false"
                v-bind:toolbarsFlag="false"
                fontSize="16px"
            />
          </TabPane>
          <TabPane label="PDF" name="PDF" :disabled="!editor_value.pdf">
            <embed height="800" width="100%" :src="editor_value.pdf">
          </TabPane>
          <TabPane label="Legacy" name="Legacy" :disabled="!editor_value.legacy.description">
            <div>
              <Card class="legacy-item" dis-hover>
                <p slot="title">题目描述</p>
                <div>
                  <content v-html="editor_value.legacy.description"></content>
                </div>
              </Card>

              <Card class="legacy-item" dis-hover>
                <p slot="title">输入描述</p>
                <div>
                  <content v-html="editor_value.legacy.input"></content>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover>
                <p slot="title">输出描述</p>
                <div>
                  <content v-html="editor_value.legacy.output"></content>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover>
                <p slot="title">输入样例</p>
                <div>
                  <pre style="background: #fafafa;padding: 5px;"><code>{{
                      editor_value.legacy.sample_input
                    }}</code></pre>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover>
                <p slot="title">输出样例</p>
                <div>
                  <pre style="background: #fafafa;padding: 5px;"><code>{{
                      editor_value.legacy.sample_output
                    }}</code></pre>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover>
                <p slot="title">提示</p>
                <div>
                  <content v-html="editor_value.legacy.hint"></content>
                </div>
              </Card>
            </div>
          </TabPane>
        </Tabs>

      </Col>
      <Col span="8" style="padding-left: 20px">
        <Card dis-hover>
          <p slot="title">信息</p>
          <List :split="false">
            <ListItem>
              <ListItemMeta title="时间限制">
                <span slot="description">{{ problem.time_limit }} MS</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="内存限制">
                <span slot="description">{{ problem.memory_limit }} MB</span>
              </ListItemMeta>
            </ListItem>
          </List>
        </Card>
        <Card style="margin-top: 10px" v-if="isAuthenticated">
          <p slot="title">提交</p>
          <Form>
            <FormItem>
              <label>
                <Select class="mono-text" v-model="lang">
                  <Option
                      class="mono-text"
                      :key="item"
                      :label="languages[item].short"
                      v-for="item in Object.keys(languages)"
                      :value="item">
                    <span>{{ languages[item].short }}</span>
                    <span style="float:right;color:#ccc">{{ languages[item].withVersion }}</span>
                  </Option>
                </Select>
              </label>
            </FormItem>
            <FormItem>
              <label>
                <Input v-model="code"
                       type="textarea"
                       autofocus
                       @on-keydown="handleKeyDown"
                       ref="textarea"
                       class="mono-text"
                       :autosize="{minRows: 10,maxRows: 40}"/>
              </label>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitClick" :loading="submitButtonLoading">提交</Button>
              <span v-if="judge_result.short==='P'" style="margin-left: 10px;color: gold">
                {{ judge_result.info }}
              </span>
              <span v-if="judge_result.short==='R'" style="margin-left: 10px;color: #2b85e4">
                {{ judge_result.info }}
              </span>
              <span v-if="judge_result.short==='AC'" style="margin-left: 10px;color: #18b566">
                {{ judge_result.info }}
              </span>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>

</template>

<script>
import api from "@/utils/api";
import message from "@/utils/message";
import {PROBLEM_SUBMIT_LANGUAGES} from "@/utils/constant";
import {mapGetters} from 'vuex'

export default {
  name: "ProblemDetail",

  data() {
    return {
      tab_val: 'Markdown',
      editor_value: {
        legacy: {},
        pdf: '',
        markdown: ''
      },
      legacy_value: {},
      problem: {},
      code: '',
      lang: 'c',
      submitButtonLoading: false,
      judge_result: {
        short: '',
        info: ''
      },
      languages: PROBLEM_SUBMIT_LANGUAGES
    }
  },
  mounted() {
    let problem_id = this.$route.params.id
    if (problem_id === null) {
      this.$router.push('/problem')
    }
    api.getProblemDetail(problem_id).then(res => {
      if (res.data.err) {
        this.$Message.error(message.err(res.data.err))
      } else {
        this.problem = res.data.data || {}
        this.editor_value.legacy = res.data.data.content.legacy || {}
        this.editor_value.markdown = res.data.data.content.markdown || ''
        this.editor_value.pdf = res.data.data.content.pdf || ''
        if (this.editor_value.markdown) {
          this.tab_val = 'Markdown'
        } else if (this.editor_value.pdf) {
          this.tab_val = 'PDF'
        } else if (this.editor_value.legacy) {
          this.tab_val = 'Legacy'
        } else {
          this.tab_val = 'Markdown'
        }
      }
    })
  }, methods: {
    handleSubmitClick() {
      this.submitButtonLoading = true
      api.postSubmissionCreate(this.problem.id, this.code, this.lang).then(res => {
        if (res.data.err === null) {
          this.$Message.success('提交成功')
        } else {
          this.$Message.error(message.err(res.data.err))
        }
        this.submitButtonLoading = false
      })
    },
    handleKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
      }
    }
  }, computed: {
    ...mapGetters(['isAuthenticated'])
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

.mono-text {
  font-family: "Ubuntu Mono", "JetBrains Mono", Consolas, Menlo, Courier, monospace;
}

.legacy-item {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
