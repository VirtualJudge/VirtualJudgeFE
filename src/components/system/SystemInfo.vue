<template>
  <div>
    <Row>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">注册用户</p>
          <h1 class="system-info-card-num"><code>2</code></h1>
        </Card>
      </Col>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">题目数量</p>
          <h1 class="system-info-card-num"><code>23</code></h1>
        </Card>
      </Col>
      <Col class="system-info-col" span="8">
        <Card dis-hover>
          <p slot="title">提交数量</p>
          <h1 class="system-info-card-num"><code>120</code></h1>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "SystemInfo"
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
