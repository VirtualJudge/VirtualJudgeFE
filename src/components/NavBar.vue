<template>
  <div>
    <Menu mode="horizontal" theme="light" :active-name="active_nav">
      <MenuItem class="left-menu-item" name="/" to="/">
        首页
      </MenuItem>
      <MenuItem class="left-menu-item" name="/problem" to="/problem">
        题目
      </MenuItem>
      <MenuItem class="left-menu-item" name="/submission" to="/submission">
        提交
      </MenuItem>
      <MenuItem class="left-menu-item" name="/rank" to="/rank">
        排行
      </MenuItem>
      <Submenu name="/help">
        <template slot="title">
          帮助
        </template>
        <MenuItem class="left-menu-item" name="/help" to="/help">
          首页
        </MenuItem>
        <MenuItem class="left-menu-item" name="/compiler" to="/compiler">
          编译器

        </MenuItem>
      </Submenu>
      <template v-if="!isAuthenticated">
        <div class="right-menu-item">
          <Button type="default" class="right-menu-item-button" @click="handleRegisterClick">
            注册

          </Button>
          <Button type="default" class="right-menu-item-button" @click="loginModal=true">
            登录

          </Button>
        </div>
      </template>
      <template v-else>
        <div class="right-menu-item">
          <Submenu name="user">
            <template slot="title">
              <Avatar :src="emailHashURL">{{ profile.username }}</Avatar>
            </template>
            <MenuGroup v-if="isAdminRole" title="高级">
              <MenuItem name="/system" to="/system">系统设置</MenuItem>
            </MenuGroup>
            <MenuGroup title="基础">
              <MenuItem name="/user" :to="userUrl">个人信息</MenuItem>
              <MenuItem name="/self" to="/self">个人设置</MenuItem>
              <MenuItem name="logout" @click.native="handleLogout">退出登录</MenuItem>
            </MenuGroup>
          </Submenu>
        </div>
      </template>

      <Modal v-model="loginModal" :scrollable="true" :closable="false" @on-visible-change="visibleChange">
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
import {mapActions, mapGetters} from 'vuex'
import Login from "@/components/user/Login";

export default {
  name: "NavBar",
  components: {Login},
  data() {
    return {
      isLogin: false,
      loginModal: false,
      enabledRegister: true,
      modalChange: null,
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions(['getProfile', 'clearProfile', 'randomCaptcha']),
    visibleChange(visible) {
      if (visible) {
        this.randomCaptcha()
      }
    },
    handleRegisterClick() {
      this.$router.push('/register')
    },

    handleLogout() {
      this.clearProfile()
    }
  }, computed: {
    ...mapGetters(['isAuthenticated', 'userUrl', 'isAdminRole', 'profile', 'emailHashURL', 'captcha_url', 'active_nav']),
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
