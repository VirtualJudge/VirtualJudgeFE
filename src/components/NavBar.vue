<template>
  <Menu mode="horizontal" @on-select="handleRoute" style="min-width: 600px">
    <MenuItem name="/">
      <Icon type="home"></Icon>
      首页
    </MenuItem>
    <MenuItem name="/problems">
      <Icon type="ios-list"></Icon>
      题目
    </MenuItem>
    <MenuItem name="/status">
      <Icon type="paper-airplane"></Icon>
      提交
    </MenuItem>
    <MenuItem name="/rank">
      <Icon type="stats-bars"></Icon>
      排行榜
    </MenuItem>
    <template v-if="!isAuthenticated">
      <div class="right-item">
        <Button @click="modalLogin=true">
          <Icon type="log-in"></Icon>
          登录
        </Button>
        <Button @click="modalRegister=true">
          <Icon type="person-add"></Icon>
          注册
        </Button>
      </div>
    </template>
    <template v-else>
      <div class="right-item">
        <MenuItem name="/register">
          <Icon type="person"></Icon>
          个人信息
        </MenuItem>
        <MenuItem name="/logout">
          <Icon type="log-out"></Icon>
          登出
        </MenuItem>
      </div>
    </template>

    <Modal v-model="modalLogin">
      <div slot="header">
        登录
      </div>
      <Login></Login>
      <div slot="footer" style="display: none"></div>
    </Modal>
    <Modal v-model="modalRegister">
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
        isAuthenticated: false
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      handleRoute(route) {
        this.$router.push(route)
      },
      getAuth() {
        api.getAuth().then(res => {
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
    margin-right: 10px;
  }
</style>
