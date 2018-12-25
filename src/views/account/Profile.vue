<template>
  <div class="container">
    <div class="avatar-container">
      <img class="avatar" :src="profile.avatar"/>
    </div>
    <Card :padding="100">
      <div v-if="profile.username">
        <p style="margin-top: -10px">
          <span v-if="profile.username" class="emphasis">{{profile.username}} {{profile.nickname}}</span>
          <span v-if="profile.school">武汉科技大学</span>
        </p>
        <p v-if="profile.motto">
          {{profile.motto}}
        </p>
        <hr id="split"/>

        <div class="flex-container">
          <div class="left">
            <p>解决数量</p>
            <p class="emphasis">{{profile.accepted}}</p>
          </div>
          <div class="right">
            <p>提交数量</p>
            <p class="emphasis">{{profile.submitted}}</p>
          </div>
        </div>
        <div id="icons">
          <a :href="profile.github">
            <Icon type="social-github-outline" size="30"></Icon>
          </a>
          <a :href="'mailto:'+ profile.email">
            <Icon class="icon" type="ios-email-outline" size="30"></Icon>
          </a>
          <a :href="profile.blog">
            <Icon class="icon" type="ios-world-outline" size="30"></Icon>
          </a>
        </div>
      </div>
    </Card>
  </div>

</template>

<script>
  import api from "../../api";

  export default {
    name: "Profile",
    data() {
      return {
        isAuthenticated: false,
        profile: {
          motto: '',
          avatar: '',
          school:'学校',
          username: 'root',
          nickname: 'root',
          accepted: 0,
          submitted: 0,
          github: '',
          email: '',
          blog: ''
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

  .container {
    position: relative;
    width: 75%;
    margin: 170px auto;
    text-align: center;
  }

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .avatar-container {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    top: -90px;
  }

  .avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    box-shadow: 0 1px 1px 0;

  }

  .emphasis {
    font-size: 20px;
    font-weight: 600;
  }

  #split {
    margin: 20px auto;
    width: 90%;
  }

  .flex-container {
    margin-top: 30px;
    padding: auto 20px;
  }

  .left {
    flex: 1 1;
  }

  .middle {
    flex: 1 1;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
  }

  .right {
    flex: 1 1;
  }


  #problems {
    margin-top: 40px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 18px;
  }

  .btns {
    margin-top: 15px;
  }

  .problem-btn {
    display: inline-block;
    margin: 5px;
  }

  #icons {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
  }

  .icon {
    padding-left: 20px;
  }
</style>
