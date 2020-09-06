<template>
  <div class="main-view">
    <Row>
      <Col span="6">
        <Card dis-hover>
          <span slot="title">基础信息</span>
          <Icon slot="extra" size="large" :type="followed" color="#ff9900" @click="handleFollowChange"></Icon>
          <div slot="default">
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
          </div>
        </Card>
      </Col>
      <Col span="18" style="padding-left: 10px;margin-bottom: 20px">
        <Card dis-hover v-if="activities.length">
          <span slot="title">近期活动</span>
          <Timeline>
            <TimelineItem v-for="item in activities" :key="item.id">
              <p class="timeline-time">{{ item.formatted_create_time }}</p>
              <p class="timeline-content">{{ item.info }}</p>
            </TimelineItem>

          </Timeline>

        </Card>
      </Col>
    </Row>

  </div>

</template>

<script>

import {mapGetters} from 'vuex'
import api from "@/utils/api";
import message from "@/utils/message";
import md5 from "js-md5";

export default {
  name: "UserInfo",
  data() {
    return {
      user_id: null,
      username: '-',
      emailHashURL: '',
      total_submitted: '-',
      total_passed: '-',
      total_accepted: '-',
      activities: [],
      followed: 'md-star-outline'
    }
  },
  mounted() {
    this.user_id = this.$route.params.id
    this.init(this.user_id)
    this.loadActivities(this.user_id)
  },
  methods: {
    init(user_id) {
      api.getUserInformation(user_id).then(res => {
        if (res.data.err === null) {
          this.username = res.data.data.username || '-'
          this.total_submitted = res.data.data.total_submitted
          this.total_passed = res.data.data.total_passed
          this.total_accepted = res.data.data.total_accepted
          this.emailHashURL = 'https://cn.gravatar.com/avatar/' + (res.data.data.email ? md5(res.data.data.email) + '?s=200' : '')
        } else {
          this.profile = {}
          this.$Message.error(message.err(res.data.err))
        }
      })
      api.getUserIsFollowed(user_id).then(res => {
        if (res.data.err === null) {
          if (res.data.data.followed) {
            this.followed = 'md-star'
          }
        }
      })
    },
    handleFollowChange() {
      if (this.followed === 'md-star') {
        this.followed = 'md-star-outline'
        api.postChangeFollowing(this.user_id, false).then(res => {
          if (res.data.err === null) {
            this.$Message.success('取消关注成功')
          } else {
            this.$Message.error('取消关注失败')
          }
        })
      } else {
        this.followed = 'md-star'
        api.postChangeFollowing(this.user_id, true).then(res => {
          if (res.data.err === null) {
            this.$Message.success('关注成功')
          } else {
            this.$Message.error('关注失败')
          }
        })
      }
    },
    loadActivities(user_id) {
      api.getSelfActivities(user_id).then(res => {
        if (res.data.err === null) {
          this.activities = []
          for (let item in res.data.data) {
            if (Object.prototype.hasOwnProperty.call(res.data.data, item)) {
              this.activities.push(Object.assign(res.data.data[item], {
                formatted_create_time: this.$moment(res.data.data[item].create_time).format('lll')
              }))
            }
          }
        }
      })
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'profile', 'userId'])
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

.info-div {
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}

.timeline-time {
  font-size: 14px;
  font-weight: bold;
}

.timeline-content {
  padding-left: 5px;
}
</style>
