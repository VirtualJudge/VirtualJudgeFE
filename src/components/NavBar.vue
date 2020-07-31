<template>
  <div>
    <Menu mode="horizontal" theme="light" :active-name="activeItem">
      <MenuItem class="left-menu-item" name="/" to="/">
        首页
      </MenuItem>
      <MenuItem class="left-menu-item" name="/problem" to="/problem">
        题目
      </MenuItem>
      <MenuItem class="left-menu-item" name="/submission" to="/submission">
        提交
      </MenuItem>
      <MenuItem class="left-menu-item" name="/help" to="/help">
        帮助
      </MenuItem>
      <MenuItem class="left-menu-item" name="/register" to="/register"
                v-if="!isAuthenticated && enabledRegister">注册
      </MenuItem>
      <template v-if="!isAuthenticated">
        <div class="right-menu-item">
          <Button type="default" class="right-menu-item-button" @click="loginModal=true">登录</Button>

        </div>
      </template>
      <template v-else>
        <div class="right-menu-item">
          <Submenu name="user">
            <template slot="title">
              <Avatar :src="emailHashURL">{{ profile.username }}</Avatar>
            </template>
            <MenuItem name="setting">个人设置</MenuItem>
            <MenuItem name="logout" @click.native="clearProfile">退出登录</MenuItem>
          </Submenu>
        </div>
      </template>

      <Modal v-model="loginModal" @on-visible-change="visibleChange">
        <div slot="header">
          登录
        </div>
        <Login @closeModal="loginModal=false"/>
        <div slot="footer" style="display: none"></div>
      </Modal>
    </Menu>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Login from "./user/Login";

export default {
  name: "NavBar",
  components: {Login},
  data() {
    return {
      isLogin: false,
      loginModal: false,
      activeItem: '',
      enabledRegister: true,
      modalChange: null
    }
  },
  mounted() {
    this.getProfile()
    let path = this.$route.fullPath
    if (path in ['/', '/problem', '/submission', '/help', '/register']) {
      this.activeItem = path
    }
  },
  methods: {
    ...mapActions(['getProfile', 'clearProfile', 'randomCaptcha']),
    visibleChange(visible) {
      if(visible){
        this.randomCaptcha()
      }

    }
  }, computed: {
    ...mapGetters(['isAuthenticated', 'isAdminRole', 'profile', 'emailHashURL','captcha_url']),
  }
}
</script>

<style scoped>
.right-menu-item {
  float: right;
  margin-right: 10px;
}

.right-menu-item-button {
  margin: 0 5px 0 5px;
}
</style>
