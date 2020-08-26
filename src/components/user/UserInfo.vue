<template>
  <div class="main-view">
    <Row>
      <Col span="6">
        <Card dis-hover>
          <Row :gutter="8">
            <Col span="10">
              <div style="width: 100%; max-width: 100px; text-align: center">
                <img class="img-icon" alt="icon" :src="emailHashURL"/>
              </div>
            </Col>
            <Col span="14">
              <div class="info-div">用户名: {{ username }}</div>
              <div class="info-div">提交量: {{ total_submitted }}</div>
              <div class="info-div">通过量: {{ total_passed }}</div>
              <div class="info-div">ＡＣ量: {{ total_accepted }}</div>
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


import api from "@/utils/api";
import message from "@/utils/message";
import md5 from "js-md5";

export default {
  name: "UserInfo",
  data() {
    return {
      username: '-',
      emailHashURL: '',
      total_submitted: '-',
      total_passed: '-',
      total_accepted: '-',
    }
  },
  mounted() {
    this.init(this.$route.params.id)
  },
  methods: {
    init(user_id) {
      api.getUserInformation(user_id).then(res => {
        if (res.data.err === null) {
          this.username = res.data.data.username || '-'
          this.total_submitted = res.data.data.total_submitted
          this.total_passed = res.data.data.total_passed
          this.total_accepted = res.data.data.total_accepted
          this.emailHashURL =  'https://cn.gravatar.com/avatar/' + (res.data.data.email ? md5(res.data.data.email) + '?s=200' : '')
        } else {
          this.profile = {}
          this.$Message.error(message.err(res.data.err))
        }

      })
    }
  },
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

.info-div {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}
</style>
