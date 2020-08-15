<template>
  <div class="main-view">
    <Row>
      <Col span="6">
        <Card dis-hover>
          <Row :gutter="8">
            <Col span="10">
              <div style="width: 100%; max-width: 100px; text-align: center">
                <img class="img-icon" alt="icon" :src="emailHashURL" />
              </div>
            </Col>
            <Col span="14">
              <div class="infodiv">用户名: {{profile.username}}</div>
              <div class="infodiv">提交量: {{profile.total_submitted ? profile.total_submitted : 0}}</div>
              <div class="infodiv">通过量: {{profile.total_passed ? profile.total_passed : 0}}</div>
              <div class="infodiv">ＡＣ量: {{profile.total_accepted? profile.total_accepted : 0}}</div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="18">

      </Col>
    </Row>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'


export default {
  name: "UserInfo",
  methods: {

  },
  computed: {
    ...mapGetters(['emailHashURL', 'profile']),
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

.img-icon {
  border-radius: 50%;
  width: 100%;
}

.infodiv {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}
</style>
