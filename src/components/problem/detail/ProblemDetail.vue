<template>
  <div class="main-view">
    <h2 style="text-align: center">{{ problem.title }}</h2>
    <Row>
      <Col span="16">
        <Tabs :value="tab_val">
          <TabPane label="Markdown" name="Markdown" v-if="editor_value.markdown">
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
          <TabPane label="PDF" name="PDF" v-if="editor_value.pdf">
            <embed height="800" width="100%" :src="editor_value.pdf">
          </TabPane>
        </Tabs>

      </Col>
      <Col span="8" style="padding-left: 20px">
        <Card dis-hover>
          <p slot="title">信息</p>
          <p>时间限制：{{ problem.time_limit }} MS</p>
          <p>内存限制：{{ problem.memory_limit }} MB</p>
        </Card>
        <Card style="margin-top: 10px">
          <p slot="title">提交</p>
          <Form>
            <FormItem>
              <label>
                <Select class="mono-text" v-model="lang">
                  <Option
                      class="mono-text"
                      :key="item.val"
                      v-for="item in languages"
                      :value="item.val">
                    {{ item.info }}
                  </Option>
                </Select>
              </label>
            </FormItem>
            <FormItem>
              <label>
                <Input v-model="code"
                       type="textarea"
                       autofocus
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

export default {
  name: "ProblemDetail",

  data() {
    return {
      tab_val: 'Markdown',
      editor_value: {},
      problem: {},
      code: '',
      lang: 'c',
      submitButtonLoading: false,
      fake: 3,
      timer: null,
      judge_result: {
        short: '',
        info: ''
      },
      languages: [{
        val: 'c',
        info: 'C (GCC 9.2.0)'
      }, {
        val: 'cpp',
        info: 'C++ (G++ 9.2.0)'
      }, {
        val: 'java',
        info: 'Java (OpenJDK 14)'
      }, {
        val: 'python',
        info: 'Python (Python 3.8)'
      }, {
        val: 'go',
        info: 'Go (Golang 1.14.3)'
      }]
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
        this.editor_value = res.data.data.content || {}
        if (this.editor_value.markdown) {
          this.tab_val = 'Markdown'
        } else if (this.editor_value.pdf) {
          this.tab_val = 'PDF'
        } else {
          this.tab_val = 'Markdown'
        }
      }
    })
  }, methods: {
    handleSubmitClick() {
      this.submitButtonLoading = true
      this.judge_result = {
        short: 'P',
        info: 'Pending'
      }
      this.timer = setInterval(this.getResult, 1000)
    },
    getResult() {
      if (this.fake > 0) {
        this.fake--
        this.judge_result = {
          short: 'R',
          info: 'Running'
        }
      } else {
        this.submitButtonLoading = false
        clearInterval(this.timer)
        this.timer = null
        this.judge_result = {
          short: 'AC',
          info: 'Accepted'
        }
      }
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

.mono-text {
  font-family: "Ubuntu Mono", "JetBrains Mono", Consolas, Menlo, Courier, monospace;
}
</style>
