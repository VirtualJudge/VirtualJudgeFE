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
        <Card>
          <p slot="title">信息</p>
          <p>时间限制：{{ problem.time_limit }} MS</p>
          <p>内存限制：{{ problem.memory_limit }} MB</p>
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
      problem: {}
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
