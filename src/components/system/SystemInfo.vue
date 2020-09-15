<template>
  <div>
    <Row>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">注册用户</p>
          <h1 class="system-info-card-num"><code>{{ user_cnt }}</code></h1>
        </Card>
      </Col>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">题目数量</p>
          <h1 class="system-info-card-num"><code>{{ problem_cnt }}</code></h1>
        </Card>
      </Col>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">提交数量</p>
          <h1 class="system-info-card-num"><code>{{ submission_cnt }}</code></h1>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  name: "SystemInfo",
  data() {
    return {
      user_cnt: '-',
      problem_cnt: '-',
      submission_cnt: '-'
    }
  },
  mounted() {
    api.getSystemInfo().then(res => {
      if (res.data.err === null) {
        try {
          this.user_cnt = res.data.data.user_cnt
          this.problem_cnt = res.data.data.problem_cnt
          this.submission_cnt = res.data.data.submission_cnt
          // eslint-disable-next-line no-empty
        }catch {

        }
      }
    })
  }
}
</script>

<style scoped>
.system-info-col {
  padding: 10px;
}

.system-info-card-num {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px
}
</style>
