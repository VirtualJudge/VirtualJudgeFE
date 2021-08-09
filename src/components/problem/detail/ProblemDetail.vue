<template>
  <div class="main-view">
    <h2 style="text-align: center">{{ problem.title }}</h2>
    <Row>
      <Col span="16">
        <Tabs v-model="tab_val">
          <TabPane label="Html" name="Html" v-if="!!editor_value.html">
            <iframe :src="frame_url" width="100%" height="1000px" style="border: 0;">

            </iframe>
          </TabPane>
          <TabPane label="Markdown" name="Markdown" :disabled="!editor_value.markdown" v-if="!!editor_value.markdown">
            <mavon-editor
                v-if="editor_value.markdown"
                v-model="editor_value.markdown"
                defaultOpen="preview"
                codeStyle="atom-one-light"
                :externalLink="externalLink"
                previewBackground="#ffffff"
                v-bind:boxShadow="false"
                v-bind:tabSize="4"
                v-bind:editable="false"
                v-bind:subfield="false"
                v-bind:toolbarsFlag="false"
                fontSize="16px"
            />
          </TabPane>
          <TabPane label="PDF" name="PDF" :disabled="!editor_value.pdf" v-if="!!editor_value.pdf">
<!--            <embed height="800" width="100%" v-if="tab_val==='PDF'" :src="editor_value.pdf">-->
          </TabPane>

        </Tabs>

      </Col>
      <Col span="8" style="padding-left: 20px">
        <Card dis-hover>
          <p slot="title">信息</p>
          <List :split="false">
            <ListItem>
              <ListItemMeta title="题目来源">
                <span slot="description"><a :href="problem.remote_url">{{ problem.remote_oj }}-{{
                    problem.remote_id
                  }}</a></span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="时间限制">
                <span slot="description">{{ problem.time_limit }}</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="内存限制">
                <span slot="description">{{ problem.memory_limit }}</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="Special Judge">
                <span slot="description">{{ problem.spj }}</span>
              </ListItemMeta>
            </ListItem>
            <ListItem>
              <ListItemMeta title="更新时间">
                <span slot="description">{{ problem.last_update }}</span>
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
                <Input
                    v-model="code"
                    :maxlength="65536"
                    :show-word-limit="true"
                    type="textarea"
                    @on-keydown="handleKeyDown"
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
import {PROBLEM_SUBMIT_LANGUAGES, SITE_INFO, STORAGE} from "@/utils/constant";
import {mapGetters} from 'vuex'
import storage from "@/utils/storage";
import moment from "moment";

export default {
  name: "ProblemDetail",

  data() {
    return {
      tab_val: '',
      externalLink: true,
      editor_value: {
        html: '',
        pdf: '',
        markdown: ''
      },
      frame_url: '',
      problem: {},
      code: '',
      lang: '',
      submitButtonLoading: false,
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
        if (this.problem) {
          this.problem.last_update = moment(this.problem.last_update).fromNow()
        }
        this.frame_url = `/api/problem/${problem_id}/html/`
        if (this.problem.title !== null)
          document.title = `${this.problem.title} - ${SITE_INFO.default}`
        this.editor_value.html = res.data.data.content.html || null
        this.editor_value.markdown = res.data.data.content.markdown || ''
        this.editor_value.pdf = res.data.data.content.pdf || ''
        if (this.editor_value.markdown) {
          this.tab_val = 'Markdown'
        } else if (this.editor_value.pdf) {
          this.tab_val = 'PDF'
        } else if (this.editor_value.html) {
          this.tab_val = 'Html'
        }
      }
    })
  }, methods: {
    handleSubmitClick() {
      this.submitButtonLoading = true
      api.postSubmissionCreate(this.problem.id, this.code, this.lang).then(res => {
        if (res.data.err === null) {
          this.$Message.success('提交成功')
          setTimeout(() => {
            this.$router.push('/submission')
          }, 200)
        } else {
          this.$Message.error(message.err(res.data.err))
        }
      }).finally(() => {
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
    ...mapGetters(['isAuthenticated']),
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

</style>
