<template>
  <Card style="max-width: 500px;min-width:400px;margin:20px auto;text-align: center;">
    <div slot="title">
      <img class="avatar" :src="profile.avatar"/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col span="6" offset="9">{{profile.nickname}} | {{profile.username}}</Col>
      </Row>
    </div>
    <div slot="extra">
      <Icon type="star"></Icon>
    </div>

    <Row type="float">
      <Col span="4" offset="4">提交数</Col>
      <Col span="4" offset="8">{{profile.submitted}}</Col>
    </Row>
    <Row>
      <Col span="4" offset="4">通过数</Col>
      <Col span="4" offset="8">{{profile.accepted}}</Col>
    </Row>
  </Card>
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
