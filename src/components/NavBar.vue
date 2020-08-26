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
      <Submenu name="/help">
        <template slot="title">
          帮助
        </template>
        <MenuItem class="left-menu-item" name="/help" to="/help">
          首页
        </MenuItem>
        <MenuItem class="left-menu-item" name="/compiler" to="/compiler">
          编译器信息

        </MenuItem>
      </Submenu>
      <Dropdown class="left-menu-item">
        <span>
          语言
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem name="zh-hans"><country-flag country='chn'/></DropdownItem>
          <DropdownItem name="en"><country-flag country='gbr'/></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <template v-if="!isAuthenticated">
        <div class="right-menu-item">
          <Button type="default" class="right-menu-item-button" @click="handleRegisterClick">注册</Button>
          <Button type="default" class="right-menu-item-button" @click="loginModal=true">登录</Button>
        </div>
      </template>
      <template v-else>
        <div class="right-menu-item">
          <Submenu name="user">
            <template slot="title">
              <Avatar :src="emailHashURL">{{ profile.username }}</Avatar>
            </template>
            <MenuGroup title="高级">
              <MenuItem name="/system/problem" to="/system/manage_problem">题目管理</MenuItem>
              <MenuItem name="/system/permission" to="/system/manage_permission">权限管理</MenuItem>
            </MenuGroup>
            <MenuGroup title="基本">
              <MenuItem name="/user" :to="userUrl">个人信息</MenuItem>
              <MenuItem name="/self" to="/self">个人设置</MenuItem>
              <MenuItem name="logout" @click.native="clearProfile">退出登录</MenuItem>
            </MenuGroup>
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
import CountryFlag from 'vue-country-flag'

export default {
  name: "NavBar",
  components: {Login, CountryFlag},
  data() {
    return {
      isLogin: false,
      loginModal: false,
      enabledRegister: true,
      modalChange: null
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapActions(['getProfile', 'clearProfile', 'randomCaptcha']),
    visibleChange(visible) {
      if (visible) {
        this.randomCaptcha()
      }
    },
    handleRegisterClick(){
      this.$router.push('/register')
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
