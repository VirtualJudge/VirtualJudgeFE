<template>
  <Row>
    <Col span="6">
      <Card style="margin:10px;">
        <div slot="title" style="text-align: center;">
          <Avatar size="large">{{profile.username}}</Avatar>
          <br/>
        </div>
        <Row>
          <Col span="4" offset="4">用户名</Col>
          <Col span="4" offset="8">{{profile.username}}</Col>
        </Row>
        <Row v-if="profile.nickname">
          <Col span="4" offset="4">昵称</Col>
          <Col span="4" offset="8">{{profile.nickname}}</Col>
        </Row>
        <Row>
          <Col span="4" offset="4">提交数</Col>
          <Col span="4" offset="8">{{profile.submitted}}</Col>
        </Row>

        <Row>
          <Col span="4" offset="4"><p>通过数</p></Col>
          <Col span="4" offset="8"><p>{{profile.accepted}}</p></Col>
        </Row>
      </Card>

    </Col>
    <Col span="18">
      <Card title="解决的问题" icon="md-list" style="margin: 10px">

      </Card>
    </Col>
  </Row>
</template>

<script>
  import api from "../../api";

  export default {
    name: "Profile",
    data() {
      return {
        isAuthenticated: false,
        profile: {
          avatar: 'https://cdn.v2ex.com/gravatar/',
          username: '',
          nickname: '',
          accepted: '',
          submitted: '',
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getProfile();
      },
      getProfile() {
        api.getProfile().then(res => {
          this.profile.avatar = 'https://cdn.v2ex.com/gravatar/' + res.data.data.email;
          this.profile.submitted = res.data.data.submitted;
          this.profile.accepted = res.data.data.accepted;
          this.profile.nickname = res.data.data.nickname;
          this.profile.username = res.data.data.username;
          console.log(res);
        }, res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 0;

  }
</style>
