<template>
  <Menu mode="horizontal" @on-select="handleRoute" style="min-width: 900px">
    <div class="logo">
      <span>Virtual Judge<sup><Tag color="green" style="font-size: 12px;">Beta 1</Tag></sup></span>
    </div>
    <MenuItem name="/">
      <Icon type="home"></Icon>
      首页
    </MenuItem>
    <MenuItem name="/problems">
      <Icon type="ios-list"></Icon>
      题目
    </MenuItem>
    <MenuItem name="/status">
      <Icon type="navigate"></Icon>
      提交
    </MenuItem>
    <MenuItem name="/contest">
      <Icon type="flag"></Icon>
      题组
    </MenuItem>
    <MenuItem name="/rank">
      <Icon type="stats-bars"></Icon>
      排行榜
    </MenuItem>
    <template v-if="!isAuthenticated">
      <div class="right-item">
        <Button type="ghost" shape="circle" @click="modalLogin=true">
          <Icon type="log-in"></Icon>
          登录
        </Button>
        <Button type="ghost" shape="circle" @click="modalRegister=true">
          <Icon type="person-add"></Icon>
          注册
        </Button>
      </div>
    </template>
    <template v-else>
      <div class="right-item">
        <Button type="ghost" shape="circle">
          <Icon type="person"></Icon>
          {{ username}}
        </Button>
        <Button type="ghost" shape="circle" @click="logout()">
          <Icon type="log-out"></Icon>
          登出
        </Button>
      </div>
    </template>

    <Modal v-model="modalLogin" width="360">
      <div slot="header">
        登录
      </div>
      <Login></Login>
      <div slot="footer" style="display: none"></div>
    </Modal>
    <Modal v-model="modalRegister" width="360">
      <div slot="header">
        注册
      </div>
      <Register></Register>
      <div slot="footer" style="display: none"></div>
    </Modal>
  </Menu>
</template>

<script>
  import api from '../api'
  import Login from "../views/account/Login";
  import Register from "../views/account/Register";

  export default {
    name: "NavBar",
    components: {Login, Register},
    data() {
      return {
        loading: false,
        modalRegister: false,
        modalLogin: false,
        isAuthenticated: false,
        username: ''
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      handleRoute(route) {
        this.$router.push(route)
      },
      logout() {
        api.logout().then(res => {
          window.location.reload();
        }, res => {
          window.location.reload();
        })
      },
      getAuth() {
        api.getAuth().then(res => {
          this.username = res.data.data;
          this.isAuthenticated = true;
        }, res => {
          this.isAuthenticated = false;

        })
      }
    }
  }
</script>

<style scoped>
  .right-item {
    float: right;
    margin-left: 10px;
    margin-right: 10px;
  }

  .logo {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    float: left;
    line-height: 60px;
  }
</style>
