<template>
  <div class="main-view">
    <h2 style="text-align: center">{{ problem.title }}</h2>
    <Row>
      <Col span="16">
        <Tabs v-model="tab_val">
          <TabPane label="Markdown" name="Markdown" :disabled="!editor_value.markdown">
            <mavon-editor
                v-if="editor_value.markdown"
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
            <embed height="800" width="100%" v-if="tab_val==='PDF'" :src="editor_value.pdf">
          </TabPane>
          <TabPane label="Legacy" name="Legacy" :disabled="!editor_value.legacy">
            <div>
              <Card class="legacy-item" dis-hover v-if="editor_value.legacy  && editor_value.legacy.description">
                <p slot="title">题目描述</p>
                <div>
                  <content v-html="editor_value.legacy.description"></content>
                </div>
              </Card>

              <Card class="legacy-item" dis-hover v-if="editor_value.legacy  && editor_value.legacy.input">
                <p slot="title">输入描述</p>
                <div>
                  <content v-html="editor_value.legacy.input"></content>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover v-if="editor_value.legacy  && editor_value.legacy.output">
                <p slot="title">输出描述</p>
                <div>
                  <content v-html="editor_value.legacy.output"></content>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover v-if="editor_value.legacy  && editor_value.legacy.sample_input">
                <p slot="title">输入样例</p>
                <div>
                  <pre style="background: #fafafa;padding: 5px;"><code>{{
                      editor_value.legacy.sample_input
                    }}</code></pre>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover v-if="editor_value.legacy && editor_value.legacy.sample_output">
                <p slot="title">输出样例</p>
                <div>
                  <pre style="background: #fafafa;padding: 5px;"><code>{{
                      editor_value.legacy.sample_output
                    }}</code></pre>
                </div>
              </Card>
              <Card class="legacy-item" dis-hover v-if="editor_value.legacy && editor_value.legacy.hint">
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
                <span slot="description">{{ problem.time_limit }} ms</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="内存限制">
                <span slot="description">{{ problem.memory_limit }} MiB</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="题目权限">
                <span slot="description">{{ privilege.name }}</span>
              </ListItemMeta>
            </ListItem>
          </List>
        </Card>
        <Card style="margin-top: 10px" dis-hover v-if="isAuthenticated">
          <p slot="title">提交</p>
          <Form>
            <FormItem>
              <label>
                <Select class="mono-text" :disabled="privilegeCode !== 0" v-model="lang"
                        @on-change="handleProblemLanguageChange">
                  <Option
                      class="mono-text"
                      :key="item"
                      :disabled="languages[item].disabled"
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
                       @on-keydown="handleKeyDown"
                       ref="textarea"
                       class="mono-text"
                       :disabled="privilegeCode !== 0"
                       :autosize="{minRows: 10,maxRows: 40}"/>
              </label>
            </FormItem>
            <FormItem>
              <Button type="primary" :disabled="privilegeCode !== 0"
                      @click="handleSubmitClick"
                      :loading="submitButtonLoading">提交
              </Button>
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
import {PROBLEM_SUBMIT_LANGUAGES, STORAGE, PROBLEM_PUBLIC_TYPE} from "@/utils/constant";
import {mapGetters} from 'vuex'
import storage from "@/utils/storage";

export default {
  name: "ProblemDetail",

  data() {
    return {
      tab_val: '',
      editor_value: {
        legacy: null,
        pdf: '',
        markdown: ''
      },
      privilegeCode: 0,
      privilege: PROBLEM_PUBLIC_TYPE[0],
      problem: {},
      code: '',
      lang: '',
      submitButtonLoading: false,
      judge_result: {
        short: '',
        info: ''
      },
      languages: PROBLEM_SUBMIT_LANGUAGES
    }
  },
  mounted() {
    this.lang = storage.get(STORAGE.PROBLEM_LANGUAGE_KEY, 'c')
    let problem_id = this.$route.params.id
    if (problem_id === null) {
      this.$router.push('/problem')
    }
    api.getProblemDetail(problem_id).then(res => {
      if (res.data.err) {
        this.$Message.error(message.err(res.data.err))
      } else {
        this.problem = res.data.data || {}
        this.privilegeCode = res.data.data.public || 0
        this.privilege = PROBLEM_PUBLIC_TYPE[this.privilegeCode]
        this.editor_value.legacy = res.data.data.content.legacy || null
        this.editor_value.markdown = res.data.data.content.markdown || ''
        this.editor_value.pdf = res.data.data.content.pdf || ''
        if (this.editor_value.markdown) {
          this.tab_val = 'Markdown'
        } else if (this.editor_value.pdf) {
          this.tab_val = 'PDF'
        } else if (this.editor_value.legacy) {
          this.tab_val = 'Legacy'
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
    },
    handleProblemLanguageChange(value) {
      storage.set(STORAGE.PROBLEM_LANGUAGE_KEY, value)
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
